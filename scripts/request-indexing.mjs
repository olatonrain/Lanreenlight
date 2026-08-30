import { readFile } from 'node:fs/promises';
import { createSign } from 'node:crypto';
import https from 'node:https';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP = path.resolve(__dirname, '../public/sitemap.xml');
const INDEXING_SCOPE = 'https://www.googleapis.com/auth/indexing';
const WEBMASTERS_SCOPE = 'https://www.googleapis.com/auth/webmasters';
const INDEXING_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish';
const METADATA_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications/metadata';
const SITEMAP_RESUBMIT_ENDPOINT = 'https://searchconsole.googleapis.com/webmasters/v3/sites';
// Domain property (verified via DNS TXT) — siteUrl must use the sc-domain: form
const SITE_URL = 'sc-domain:lanreenlight.com';

const getKeyPath = () => {
    if (process.argv[2]) return process.argv[2];
    if (process.env.INDEXING_SERVICE_ACCOUNT_KEY) return 'env:base64';
    return path.join(process.env.HOME || '/root', 'Downloads', 'trans-parsec-481518-j2-98265b142411.json');
};

const loadKey = async () => {
    const p = getKeyPath();
    if (p === 'env:base64') return JSON.parse(Buffer.from(process.env.INDEXING_SERVICE_ACCOUNT_KEY, 'base64').toString());
    return JSON.parse(await readFile(p, 'utf8'));
};

const b64url = (buf) => Buffer.from(buf).toString('base64url');

const getAccessToken = (key) => new Promise((resolve, reject) => {
    const now = Math.floor(Date.now() / 1000);
    const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const payload = b64url(JSON.stringify({
        iss: key.client_email,
        scope: `${INDEXING_SCOPE} ${WEBMASTERS_SCOPE}`,
        aud: key.token_uri,
        iat: now,
        exp: now + 3600,
    }));
    const sign = createSign('RSA-SHA256');
    sign.update(`${header}.${payload}`);
    const signature = sign.sign(key.private_key, 'base64url');

    const body = JSON.stringify({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: `${header}.${payload}.${signature}`,
    });
    const req = https.request(key.token_uri, { method: 'POST', headers: { 'Content-Type': 'application/json' } }, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            try { resolve(JSON.parse(data).access_token); }
            catch { reject(new Error(`Token response (${res.statusCode}): ${data}`)); }
        });
    });
    req.on('error', reject);
    req.end(body);
});

const notifyUpdated = (token, url) => new Promise((resolve, reject) => {
    const body = JSON.stringify({ url, type: 'URL_UPDATED' });
    const req = https.request(INDEXING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    }, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            // HARD LESSON: publish can return 200 with an EMPTY latestUpdate —
            // Google accepted the call but registered nothing. Only a non-empty
            // latestUpdate counts as accepted.
            let registered = false;
            try {
                const parsed = JSON.parse(data);
                registered = res.statusCode < 400 && !!parsed.urlNotificationMetadata?.latestUpdate;
            } catch { /* non-JSON = not registered */ }
            const label = res.statusCode >= 400 ? 'ERROR'
                : registered ? 'accepted'
                : '200-but-NOT-registered';
            console.log(`  ${res.statusCode} ${label} ${url}${res.statusCode >= 400 ? ` — ${data.slice(0, 120)}` : ''}`);
            resolve(registered ? 'accepted' : 'unverified');
        });
    });
    req.on('error', reject);
    req.end(body);
});

const resubmitSitemap = (token) => new Promise((resolve) => {
    // The RELIABLE re-crawl signal. Requires the webmasters scope (readonly -> 403).
    const feedpath = encodeURIComponent('https://lanreenlight.com/sitemap.xml');
    const req = https.request(`${SITEMAP_RESUBMIT_ENDPOINT}/${encodeURIComponent(SITE_URL)}/sitemaps/${feedpath}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Length': 0 },
    }, res => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            const ok = res.statusCode < 400;
            console.log(`Sitemap resubmit: ${res.statusCode}${ok ? '' : ` — ${data.slice(0, 160)}`}`);
            resolve(ok);
        });
    });
    req.on('error', () => { console.error('Sitemap resubmit: request failed'); resolve(false); });
    req.end();
});

const run = async () => {
    console.log('Loading service account key…');
    const key = await loadKey();
    console.log(`Account: ${key.client_email}`);

    const xml = await readFile(SITEMAP, 'utf8');
    const urls = [...xml.matchAll(/<loc>(https:\/\/lanreenlight\.com[^<]*)<\/loc>/g)].map(m => m[1]);
    console.log(`${urls.length} URLs in sitemap.\n`);

    console.log('Obtaining access token…');
    const token = await getAccessToken(key);
    console.log('Token obtained.\n');

    console.log('Requesting indexing…');
    let ok = 0, unverified = 0;
    for (const url of urls) {
        const result = await notifyUpdated(token, url);
        if (result === 'accepted') ok++;
        else unverified++;
    }
    console.log(`\n${ok}/${urls.length} registered via Indexing API${unverified ? ` (${unverified} returned 200 but were NOT registered — treated as unverified)` : ''}.`);

    console.log('\nResubmitting sitemap via Search Console API (reliable re-crawl signal)…');
    const sitemapOk = await resubmitSitemap(token);
    if (!ok && !sitemapOk) {
        console.error('\nNeither the Indexing API nor the sitemap resubmit succeeded — indexing was NOT requested.');
        process.exit(1);
    }
};

run().catch(err => { console.error(`Failed: ${err.message}`); process.exit(1); });
