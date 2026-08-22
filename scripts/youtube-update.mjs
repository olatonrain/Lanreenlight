import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_FILE = path.join(__dirname, '../.env.local');
const FIXES_DIR = path.join(__dirname, '../youtube-fixes');
const API_BASE = 'https://www.googleapis.com/youtube/v3';
const CHANNEL_ID = 'UCs9e33racEAMcCfReN4Bc_g';
const ALLOWED_HOSTS = new Set(['www.googleapis.com', 'oauth2.googleapis.com']);

function assertSafeUrl(url) {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') throw new Error(`Blocked non-https protocol: ${parsed.protocol}`);
    const host = parsed.hostname.toLowerCase();
    if (!ALLOWED_HOSTS.has(host)) throw new Error(`Blocked unapproved host: ${host}`);
    if (/^(10\.|127\.|0\.|169\.254\.|192\.168\.)/.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host)) {
        throw new Error(`Blocked private/reserved address: ${host}`);
    }
    return url;
}

function readEnv() {
    const env = {};
    for (const m of fs.readFileSync(ENV_FILE, 'utf8').matchAll(/^([A-Z_]+)=(.+)$/gm)) env[m[1]] = m[2].trim();
    return env;
}

async function getAccessToken(env) {
    const res = await fetch(assertSafeUrl('https://oauth2.googleapis.com/token'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            refresh_token: env.YOUTUBE_REFRESH_TOKEN,
            client_id: env.YOUTUBE_CLIENT_ID,
            client_secret: env.YOUTUBE_CLIENT_SECRET,
            grant_type: 'refresh_token',
        }),
    });
    if (!res.ok) throw new Error(`Auth failed (${res.status}) — run scripts/youtube-auth.mjs first. ${await res.text()}`);
    const json = await res.json();
    return json.access_token;
}

async function api(token, endpoint, { method = 'GET', body } = {}) {
    const res = await fetch(assertSafeUrl(`${API_BASE}/${endpoint}`), {
        method,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`API ${method} ${endpoint} → ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return res.json();
}

async function listAllVideos(token) {
    const env = readEnv();
    const key = env.YOUTUBE_API_KEY;
    const ch = await (await fetch(assertSafeUrl(`${API_BASE}/channels?${new URLSearchParams({ part: 'contentDetails', id: CHANNEL_ID, key })}`))).json();
    const uploadsId = ch.items[0].contentDetails.relatedPlaylists.uploads;
    const ids = [];
    let pageToken = null;
    do {
        const params = { part: 'contentDetails', playlistId: uploadsId, maxResults: '50', key };
        if (pageToken) params.pageToken = pageToken;
        const page = await (await fetch(assertSafeUrl(`${API_BASE}/playlistItems?${new URLSearchParams(params)}`))).json();
        ids.push(...page.items.map(i => i.contentDetails.videoId));
        pageToken = page.nextPageToken;
    } while (pageToken);
    const videos = [];
    for (let i = 0; i < ids.length; i += 50) {
        const batch = await (await fetch(assertSafeUrl(`${API_BASE}/videos?${new URLSearchParams({ part: 'snippet,status,statistics', id: ids.slice(i, i + 50).join(','), key })}`))).json();
        videos.push(...batch.items);
    }
    return videos;
}

async function cmdBackup(token) {
    fs.mkdirSync(FIXES_DIR, { recursive: true });
    const videos = await listAllVideos(token);
    const file = path.join(FIXES_DIR, `backup-${new Date().toISOString().slice(0, 10)}.json`);
    fs.writeFileSync(file, JSON.stringify(videos, null, 2));
    console.log(`Backed up ${videos.length} videos (snippet+status) → ${file}`);
}

function buildNewDescription(current, fix) {
    if (fix.mode === 'append') {
        if (current.includes(fix.text.trim().split('\n')[0])) return null;
        return current.trimEnd() + '\n\n' + fix.text.trim();
    }
    if (fix.mode === 'replaceLine') {
        const lines = current.split('\n');
        let changed = false;
        const out = lines.map(line => {
            if (!changed && line.includes(fix.find)) { changed = true; return fix.text; }
            return line;
        });
        return changed ? out.join('\n') : null;
    }
    if (fix.mode === 'set') return fix.text;
    throw new Error(`Unknown mode: ${fix.mode}`);
}

async function cmdApply(token, planFile, yes) {
    const plan = JSON.parse(fs.readFileSync(planFile, 'utf8'));
    for (const fix of plan.fixes) {
        const current = await api(token, `videos?${new URLSearchParams({ part: 'snippet,status', id: fix.videoId })}`);
        const video = current.items?.[0];
        if (!video) { console.log(`SKIP ${fix.videoId}: not found`); continue; }
        const oldDesc = video.snippet.description || '';
        let newDesc = oldDesc;
        for (const op of fix.operations) {
            const result = buildNewDescription(newDesc, op);
            if (result !== null) newDesc = result;
        }
        if (newDesc === oldDesc) { console.log(`SKIP ${fix.videoId} "${video.snippet.title.slice(0, 50)}": no change needed`); continue; }
        console.log(`\n=== ${fix.videoId} — ${video.snippet.title}`);
        console.log('--- OLD (last 400 chars):\n' + oldDesc.slice(-400));
        console.log('+++ NEW (last 400 chars):\n' + newDesc.slice(-400));
        if (!yes) { console.log('(dry run — rerun with --yes to write)'); continue; }
        await api(token, `videos?part=snippet`, {
            method: 'PUT',
            body: { id: fix.videoId, snippet: { ...video.snippet, description: newDesc } },
        });
        console.log(`WRITTEN: ${fix.videoId}`);
    }
}

async function cmdUnlist(token, ids, yes) {
    for (const id of ids) {
        const current = await api(token, `videos?${new URLSearchParams({ part: 'snippet,status', id })}`);
        const video = current.items?.[0];
        if (!video) { console.log(`SKIP ${id}: not found`); continue; }
        if (video.status.privacyStatus === 'unlisted') { console.log(`SKIP ${id}: already unlisted`); continue; }
        console.log(`${video.status.privacyStatus.toUpperCase()} → UNLISTED: ${video.snippet.title.slice(0, 60)} (${id})`);
        if (!yes) { console.log('(dry run)'); continue; }
        await api(token, `videos?part=status`, {
            method: 'PUT',
            body: { id, status: { ...video.status, privacyStatus: 'unlisted' } },
        });
        console.log(`DONE: ${id}`);
    }
}

const [cmd, ...args] = process.argv.slice(2);
const yes = args.includes('--yes');
const positional = args.filter(a => !a.startsWith('--'));

try {
    if (cmd === 'backup') {
        await cmdBackup(await getAccessToken(readEnv()));
    } else if (cmd === 'apply') {
        if (!positional[0]) throw new Error('Usage: node scripts/youtube-update.mjs apply <plan.json> [--yes]');
        await cmdApply(await getAccessToken(readEnv()), positional[0], yes);
    } else if (cmd === 'unlist') {
        if (!positional.length) throw new Error('Usage: node scripts/youtube-update.mjs unlist <videoId...> [--yes]');
        await cmdUnlist(await getAccessToken(readEnv()), positional, yes);
    } else {
        console.log('Usage:\n  node scripts/youtube-update.mjs backup\n  node scripts/youtube-update.mjs apply <plan.json> [--yes]\n  node scripts/youtube-update.mjs unlist <videoId...> [--yes]');
    }
} catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
}
