import { readFile } from 'node:fs/promises';
import { createSign } from 'node:crypto';
import https from 'node:https';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP = path.resolve(__dirname, '../public/sitemap.xml');
const INDEXING_SCOPE = 'https://www.googleapis.com/auth/indexing';
const INDEXING_ENDPOINT = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

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
        scope: INDEXING_SCOPE,
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
            const ok = res.statusCode < 400;
            console.log(`  ${res.statusCode} ${url}${ok ? '' : ` — ${data}`}`);
            resolve(res.statusCode);
        });
    });
    req.on('error', reject);
    req.end(body);
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
    let ok = 0;
    for (const url of urls) {
        const status = await notifyUpdated(token, url);
        if (status < 400) ok++;
    }
    console.log(`\n${ok}/${urls.length} accepted.`);
};

run().catch(err => { console.error(`Failed: ${err.message}`); process.exit(1); });
