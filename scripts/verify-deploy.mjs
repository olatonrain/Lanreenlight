// SEO deploy verification gate — run AFTER a deploy finishes.
// Usage: node scripts/verify-deploy.mjs [base-url]   (default https://lanreenlight.com)
//
// Implements the mandatory post-change verification from AGENTS.md:
//   1. Readiness wait — poll homepage until HTTP 200 (every 5s, up to 150s)
//   2. Googlebot-UA checks: 3 pages return 200 with sane cache headers and no set-cookie
//   3. robots.txt not Disallow: / and still has the Sitemap: line
//   4. sitemap.xml <loc> count >= hard floor (2/3 of expected)
//   5. no noindex in robots meta on homepage + 2 key pages
// Any failure -> exit 1 with a rollback instruction.
import https from 'node:https';

const BASE = (process.argv[2] || 'https://lanreenlight.com').replace(/\/$/, '');
const GOOGLEBOT_UA = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const SITEMAP_LOC_FLOOR = 15; // hard floor: ~2/3 of current 23 URLs — raise when sitemap grows
const KEY_PAGES = ['/guides/n8n-automation', '/blog/self-host-n8n-and-omniroute-on-a-vps'];

const fetchRaw = (path, { ua = GOOGLEBOT_UA, method = 'GET' } = {}) => new Promise((resolve, reject) => {
    const req = https.request(`${BASE}${path}`, {
        method,
        headers: { 'User-Agent': ua },
    }, res => {
        let body = '';
        res.on('data', c => { body += c; if (body.length > 2e6) res.destroy(); });
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    req.setTimeout(20000, () => req.destroy(new Error('timeout')));
    req.end();
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

// 1. Readiness wait
let ready = false;
for (let i = 0; i < 30 && !ready; i++) {
    try {
        const r = await fetchRaw('/');
        if (r.status === 200) ready = true;
    } catch { /* booting */ }
    if (!ready) await sleep(5000);
}
if (!ready) {
    console.error(`🚨 SEO VERIFICATION FAILED — homepage never reached 200 within 150s — roll back NOW (git revert + redeploy)`);
    process.exit(1);
}
console.log('✓ Homepage is up (200)');

const failures = [];

// 2. Googlebot-UA page checks
for (const page of ['/', ...KEY_PAGES]) {
    const r = await fetchRaw(page);
    const cache = (r.headers['cache-control'] || '').toLowerCase();
    const cookies = r.headers['set-cookie'];
    if (r.status !== 200) failures.push(`${page}: status ${r.status} (expected 200)`);
    if (cookies) failures.push(`${page}: set-cookie present for Googlebot (${String(cookies).slice(0, 80)})`);
    if (/no-store|private/.test(cache)) failures.push(`${page}: Cache-Control "${cache}" blocks caching for bots`);
    if (r.status === 200 && !cookies && !/no-store|private/.test(cache)) console.log(`✓ ${page} (Googlebot UA): 200, cache "${cache || 'default'}", no set-cookie`);
}

// 3. robots.txt
const robots = await fetchRaw('/robots.txt', { ua: 'Googlebot' });
if (robots.status !== 200 || /^\s*Disallow:\s*\/\s*$/mi.test(robots.body)) failures.push('robots.txt: missing or blocks all crawlers');
if (!/^Sitemap:/mi.test(robots.body)) failures.push('robots.txt: Sitemap: line missing');
if (!failures.some(f => f.startsWith('robots'))) console.log('✓ robots.txt permissive with Sitemap line');

// 4. Sitemap floor
const sm = await fetchRaw('/sitemap.xml');
const locs = [...sm.body.matchAll(/<loc>/g)].length;
if (sm.status !== 200 || locs < SITEMAP_LOC_FLOOR) {
    failures.push(`sitemap.xml: ${sm.status}, ${locs} <loc> entries (floor ${SITEMAP_LOC_FLOOR})`);
} else {
    console.log(`✓ sitemap.xml: ${locs} URLs (>= floor ${SITEMAP_LOC_FLOOR})`);
}

// 5. noindex probe
for (const page of ['/', ...KEY_PAGES]) {
    const r = await fetchRaw(page);
    if (/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(r.body)) failures.push(`${page}: noindex in robots meta`);
}
if (!failures.some(f => f.includes('noindex'))) console.log('✓ no noindex on homepage + key pages');

if (failures.length) {
    console.error('\n🚨 SEO VERIFICATION FAILED — roll back NOW (git revert + redeploy)');
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
}
console.log('\nAll deploy verification checks passed.');
