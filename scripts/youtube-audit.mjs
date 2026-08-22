import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHANNEL_ID = 'UCs9e33racEAMcCfReN4Bc_g';
const API_BASE = 'https://www.googleapis.com/youtube/v3';
const ALLOWED_HOSTS = new Set(['www.googleapis.com']);

function assertSafeUrl(url) {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
        throw new Error(`Blocked non-http(s) protocol: ${parsed.protocol}`);
    }
    const host = parsed.hostname.toLowerCase();
    if (!ALLOWED_HOSTS.has(host)) {
        throw new Error(`Blocked unapproved host: ${host}`);
    }
    if (
        host === 'localhost' ||
        host === '::1' ||
        host.endsWith('.localhost') ||
        host.endsWith('.local') ||
        host.endsWith('.internal') ||
        /^(10\.|127\.|0\.|169\.254\.|192\.168\.)/.test(host) ||
        /^172\.(1[6-9]|2\d|3[01])\./.test(host)
    ) {
        throw new Error(`Blocked private/reserved address: ${host}`);
    }
    return url;
}

function loadApiKey() {
    const envPath = path.join(__dirname, '../.env.local');
    if (!fs.existsSync(envPath)) throw new Error('.env.local not found — add YOUTUBE_API_KEY to it');
    const match = fs.readFileSync(envPath, 'utf8').match(/^YOUTUBE_API_KEY=(.+)$/m);
    if (!match) throw new Error('YOUTUBE_API_KEY not defined in .env.local');
    return match[1].trim().replace(/^["']|["']$/g, '');
}

const API_KEY = loadApiKey();

async function api(endpoint, params) {
    const url = assertSafeUrl(`${API_BASE}/${endpoint}?${new URLSearchParams({ ...params, key: API_KEY })}`);
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ChannelAudit/1.0)' } });
    if (!res.ok) throw new Error(`API ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return res.json();
}

function parseIsoDuration(iso) {
    const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!m) return 0;
    return (+(m[1] || 0)) * 3600 + (+(m[2] || 0)) * 60 + (+(m[3] || 0));
}

const LINK_MARKERS = {
    contaboRedirect: ['lanreenlight.com/cheapestvps', 'lanreenlight.com/cheapestn8nvps', 'lanreenlight.com/vps6', 'lanreenlight.com/vps8', 'lanreenlight.com/vps12'],
    cjDirect: ['anrdoezrs.net', 'dpbolvw.net', 'kqzyfj.com', 'contabo.com'],
    deriv: ['track.deriv.com', 'deriv.com', 'lanreenlight.com/forextrading', 'lanreenlight.com/forexbroker'],
    agentrouter: ['agentrouter.org'],
    site: ['lanreenlight.com'],
    otherReferral: ['ref=', 'referrer=', 'inviter=', 'aff=', '/ref/', 'signup?code'],
};

function auditVideo(v) {
    const snippet = v.snippet || {};
    const stats = v.statistics || {};
    const desc = snippet.description || '';
    const lowerDesc = desc.toLowerCase();
    const durationSec = parseIsoDuration(v.contentDetails?.duration || '');
    const views = +(stats.viewCount || 0);
    const likes = +(stats.likeCount || 0);
    const comments = +(stats.commentCount || 0);

    const links = {};
    for (const [group, markers] of Object.entries(LINK_MARKERS)) {
        links[group] = markers.some(m => lowerDesc.includes(m.toLowerCase()));
    }

    const hasChapters = /^\s*\d{1,2}:\d{2}\s/s.test(desc);
    const issues = [];
    if (/\(link in description\)/i.test(desc)) issues.push('PLACEHOLDER "(link in description)" text');
    if (durationSec > 600 && !hasChapters) issues.push(`no chapters (${Math.round(durationSec / 60)}min video)`);
    if (!Object.values(links).some(Boolean)) issues.push('NO links at all in description');
    if (links.deriv && /forextrading/.test(lowerDesc) && !/forexbroker/.test(lowerDesc)) issues.push('uses legacy /forextrading path (redirected now, prefer /forexbroker)');
    if ((snippet.title || '').length > 70) issues.push(`title ${snippet.title.length} chars (truncates in search)`);
    if (views > 100 && !links.site && !links.contaboRedirect && !links.cjDirect) issues.push('100+ views but no site/VPS link');

    return {
        id: v.id,
        title: snippet.title,
        published: (snippet.publishedAt || '').slice(0, 10),
        views,
        likes,
        comments,
        durationSec,
        tags: (snippet.tags || []).length,
        links,
        issues,
    };
}

async function main() {
    console.log(`YouTube channel audit — ${new Date().toISOString().slice(0, 10)}\n`);

    const channel = await api('channels', { part: 'snippet,statistics,contentDetails', id: CHANNEL_ID });
    const c = channel.items?.[0];
    if (!c) throw new Error('Channel not found — check CHANNEL_ID or API key');
    console.log(`CHANNEL: ${c.snippet.title} (@${c.snippet.customUrl})`);
    console.log(`Subs: ${c.statistics.subscriberCount} | Total views: ${c.statistics.viewCount} | Videos: ${c.statistics.videoCount}\n`);

    const uploadsId = c.contentDetails.relatedPlaylists.uploads;
    const videoIds = [];
    let pageToken = null;
    do {
        const page = await api('playlistItems', { part: 'contentDetails', playlistId: uploadsId, maxResults: 50, ...(pageToken ? { pageToken } : {}) });
        videoIds.push(...page.items.map(i => i.contentDetails.videoId));
        pageToken = page.nextPageToken;
    } while (pageToken);
    console.log(`Fetched ${videoIds.length} upload IDs\n`);

    const videos = [];
    for (let i = 0; i < videoIds.length; i += 50) {
        const batch = await api('videos', { part: 'snippet,statistics,contentDetails', id: videoIds.slice(i, i + 50).join(',') });
        videos.push(...batch.items);
    }

    const audited = videos.map(auditVideo).sort((a, b) => b.views - a.views);

    console.log('=== FULL CATALOG (by views) ===');
    for (const v of audited) {
        const linkFlags = Object.entries(v.links).filter(([, on]) => on).map(([k]) => k).join(',') || '-';
        console.log(`${String(v.views).padStart(6)}v ${v.likes}L ${v.published} ${Math.round(v.durationSec / 60)}min tags:${v.tags} [${linkFlags}] ${v.title.slice(0, 60)}`);
    }

    console.log('\n=== LINK COVERAGE TOTALS ===');
    for (const [group] of Object.entries(LINK_MARKERS)) {
        console.log(`${group}: ${audited.filter(v => v.links[group]).length}/${audited.length} videos`);
    }

    const withIssues = audited.filter(v => v.issues.length);
    console.log(`\n=== ISSUES (${withIssues.length} videos) ===`);
    for (const v of withIssues) {
        console.log(`\n${v.title} (${v.views}v, ${v.id})`);
        v.issues.forEach(i => console.log(`  - ${i}`));
    }

    const totalIssues = withIssues.reduce((n, v) => n + v.issues.length, 0);
    console.log(`\nSUMMARY: ${audited.length} videos audited, ${totalIssues} issues across ${withIssues.length} videos`);
}

main().catch(err => { console.error('Audit failed:', err.message); process.exit(1); });
