// Internal link floor audit — run against dist/ after `npm run build` (before deploy).
// Usage: node scripts/audit-links.mjs
//
// Enforces the CONTENT_STRATEGY.md "Existing-Ranking Protection" internal link floor:
// every blog post must contain, in its prerendered HTML:
//   1. at least one link to a hub/service page (/guides/ or /#contact)
//   2. at least one link to another blog post (/blog/<other-slug>)
//   3. at least one link to a relevant product page (affiliate/funnel URL)
// Also reports posts that no other page links to (orphans) and slash-less /blog|/guides
// hrefs (they 301 via DirectorySlash and pollute GSC "Page with redirect").
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const DIST = path.resolve(process.cwd(), 'dist');
const POSTS_DIR = path.join(DIST, 'blog');
const AFFILIATE_RE = /(dpbolvw\.net|kqzyfj\.com|andoezrs\.net|track\.deriv\.com|agentrouter\.org|\/cheapestvps|\/cheapestn8nvps|\/cheapest-openclaw-vps|\/forexbroker|\/vps6|\/vps8|\/vps12)/;

const hrefsOf = html => [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);

const files = (await readdir(POSTS_DIR)).filter(f => f.endsWith('.html') && f !== 'index.html');
if (!files.length) { console.error(`No prerendered posts found in ${POSTS_DIR} — run npm run build first.`); process.exit(1); }

const failures = [];
const postSlugs = files.map(f => f.replace(/\.html$/, ''));
const inbound = Object.fromEntries(postSlugs.map(s => [s, 0]));

for (const file of files) {
    const slug = file.replace(/\.html$/, '');
    const html = await readFile(path.join(POSTS_DIR, file), 'utf8');
    const hrefs = hrefsOf(html);

    const hasHub = hrefs.some(h => h.startsWith('/guides/') || h === '/#contact' || h.startsWith('/#'));
    const hasSiblingPost = hrefs.some(h => { const m = h.match(/^\/blog\/([^\/"#?]+)$/); return m && m[1] !== slug; });
    if (hasSiblingPost) { for (const s of postSlugs) { if (hrefs.includes(`/blog/${s}`) && s !== slug) inbound[s]++; } }
    const hasProduct = hrefs.some(h => AFFILIATE_RE.test(h));
    const badSlash = hrefs.filter(h => /^\/(blog|guides)$/.test(h));

    const missing = [];
    if (!hasHub) missing.push('no hub/service link (/guides/* or /#contact)');
    if (!hasSiblingPost) missing.push('no link to another blog post');
    if (!hasProduct) missing.push('no product/affiliate link');
    if (badSlash.length) missing.push(`slash-less hrefs (301 traps): ${badSlash.join(', ')}`);

    if (missing.length) failures.push(`blog/${slug}: ${missing.join('; ')}`);
    else console.log(`✓ blog/${slug}`);
}

// Orphan check: homepage + blog index + guides links count as inbound via their HTML too
for (const seed of ['index.html', 'blog/index.html', 'guides/index.html']) {
    try {
        const html = await readFile(path.join(DIST, seed), 'utf8');
        for (const s of postSlugs) if (hrefsOf(html).includes(`/blog/${s}`)) inbound[s] += 2;
    } catch { /* optional */ }
}
const orphans = postSlugs.filter(s => inbound[s] === 0);
if (orphans.length) failures.push(`orphaned posts (no inbound internal links): ${orphans.join(', ')}`);

if (failures.length) {
    console.error('\n🚨 Link floor audit FAILED:');
    for (const f of failures) console.error(`  - ${f}`);
    process.exit(1);
}
console.log('\nAll posts pass the internal link floor.');
