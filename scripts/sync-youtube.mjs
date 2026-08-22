import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/videos.ts');

const CHANNEL_ID = 'UCs9e33racEAMcCfReN4Bc_g';
const API_BASE = 'https://www.googleapis.com/youtube/v3';
const ALLOWED_HOSTS = new Set(['www.googleapis.com']);
const MAX_VIDEOS = 20;

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
    if (process.env.YOUTUBE_API_KEY) return process.env.YOUTUBE_API_KEY;
    const envPath = path.join(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const match = fs.readFileSync(envPath, 'utf8').match(/^YOUTUBE_API_KEY=(.+)$/m);
        if (match) return match[1].trim();
    }
    throw new Error('YOUTUBE_API_KEY not found (env var or .env.local)');
}

async function fetchWithRetry(url, retries = 3) {
    let lastError;
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VideoSync/1.0)' } });
            if (response.ok) return response.json();
            lastError = new Error(`Failed to fetch API: ${response.status} ${response.statusText}`);
        } catch (error) {
            lastError = error;
        }
        const delay = attempt * 5000;
        console.log(`API fetch attempt ${attempt}/${retries} failed (${lastError.message}). Retrying in ${delay / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    throw lastError;
}

async function fetchUploads() {
    const key = loadApiKey();
    const channel = await fetchWithRetry(assertSafeUrl(`${API_BASE}/channels?${new URLSearchParams({ part: 'contentDetails', id: CHANNEL_ID, key })}`));
    const uploadsPlaylistId = channel.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) throw new Error('Uploads playlist not found for channel');
    const page = await fetchWithRetry(assertSafeUrl(`${API_BASE}/playlistItems?${new URLSearchParams({ part: 'snippet', playlistId: uploadsPlaylistId, maxResults: String(MAX_VIDEOS), key })}`));
    return (page.items || []).map(i => ({
        videoId: i.snippet.resourceId.videoId,
        title: i.snippet.title,
        desc: i.snippet.description || '',
        published: new Date(i.snippet.publishedAt),
    }));
}

async function syncVideos() {
    console.log(`Fetching latest videos from YouTube Data API...`);

    try {
        const entries = await fetchUploads();

        const videos = entries
            .map(entry => {
                const title = entry.title;
                const videoId = entry.videoId;
                const published = entry.published;
                const desc = entry.desc;

                // Formatted date (e.g., Feb 21, 2026)
                const dateOpts = { year: 'numeric', month: 'short', day: '2-digit' };
                const dateStr = published.toLocaleDateString('en-US', dateOpts);

                // Try to infer category from title or keep generic
                let category = 'AI Automation';
                const lowerTitle = title.toLowerCase();
                const lowerDesc = desc.toLowerCase().replace(/lanreenlight\.com\/\S+/g, '');

                if (lowerTitle.includes('forex') || lowerTitle.includes('trading') || lowerDesc.includes('forex') || lowerTitle.includes('ea ')) {
                    category = 'Forex';
                } else if (lowerTitle.includes('crypto') || lowerTitle.includes('nodepay') || lowerTitle.includes('bless') || lowerTitle.includes('depin')) {
                    category = 'Crypto';
                } else if ((lowerTitle.includes('node') || lowerTitle.includes('vps')) && !lowerTitle.includes('n8n') && !lowerTitle.includes('agentrouter')) {
                    category = 'Node Ops';
                }

                // Extract resource links if possible
                const resources = [];
                if (desc.includes('https://agentrouter.org/register')) {
                    resources.push({ label: 'AgentRouter Free Credit', url: 'https://agentrouter.org/register?aff=2CTV', type: 'affiliate' });
                }
                if (desc.includes('https://lanreenlight.com/cheapestvps')) {
                    resources.push({ label: 'Cheapest VPS', url: 'https://lanreenlight.com/cheapestvps', type: 'affiliate' });
                }
                if (desc.includes('https://lanreenlight.com/cheapestn8nvps')) {
                    resources.push({ label: 'Best n8n VPS', url: 'https://lanreenlight.com/cheapestn8nvps', type: 'affiliate' });
                }
                if (desc.includes('https://lanreenlight.com/forextrading')) {
                    resources.push({ label: 'Forex Trading', url: 'https://lanreenlight.com/forextrading', type: 'affiliate' });
                }

                return {
                    id: videoId, // Use videoId for unique id
                    title,
                    videoId,
                    published,
                    dateStr,
                    category,
                    resources,
                    isShort: title.includes('#shorts') || desc.includes('#shorts') || title.includes('#aiagents') || title.includes('#AIReality')
                };
            })
            .filter(v => v !== null);

        // Filter out shorts (heuristic: usually <= 60s, but we don't have duration in RSS. 
        // We filter if title/desc contains specific shorts tags, or we manually curate)
        // Since we want full-length videos, we'll exclude ones with our known tags for now.
        const fullVideos = videos.filter(v => !v.isShort);

        // Sort by newest first
        fullVideos.sort((a, b) => b.published.getTime() - a.published.getTime());

        // Preserve manual entries from the existing file that aren't in the RSS feed
        // (e.g., videos YouTube hasn't surfaced yet, or manually curated resources).
        const existingIds = new Set(fullVideos.map(v => v.videoId));
        const existingContent = fs.existsSync(DATA_FILE) ? fs.readFileSync(DATA_FILE, 'utf8') : '';
        const existingVideos = [];
        if (existingContent.includes('export const VIDEOS')) {
            const matches = existingContent.matchAll(/\{\s*\n\s*id: '(\d+)',\n\s*title: "([\s\S]*?)",\n\s*date: '([\s\S]*?)',\n\s*category: '([\s\S]*?)',\n\s*youtubeId: '([\s\S]*?)',\n\s*resources: \[([\s\S]*?)\]\n\s*\}/g);
            for (const m of matches) {
                if (!existingIds.has(m[5])) {
                    const resources = [];
                    const resourceMatches = m[6].matchAll(/\{\s*label: '([\s\S]*?)',\s*url: '([\s\S]*?)',\s*type: '([\s\S]*?)'\s*\}/g);
                    for (const r of resourceMatches) {
                        resources.push({ label: r[1], url: r[2], type: r[3] });
                    }
                    existingVideos.push({
                        id: m[1],
                        title: m[2].replace(/\\"/g, '"'),
                        videoId: m[5],
                        dateStr: m[3],
                        category: m[4],
                        resources
                    });
                }
            }
        }

        const allVideos = [...fullVideos, ...existingVideos];

        // Generate TypeScript file contents
        let tsContent = `import { Video } from '../types';\n\nexport const VIDEOS: Video[] = [\n`;

        allVideos.forEach((v, index) => {
            tsContent += `    {\n`;
            tsContent += `        id: '${index + 1}',\n`;
            tsContent += `        title: ${JSON.stringify(v.title)},\n`;
            tsContent += `        date: '${v.dateStr}',\n`;
            tsContent += `        category: '${v.category}',\n`;
            tsContent += `        youtubeId: '${v.videoId}',\n`;
            tsContent += `        resources: [\n`;

            v.resources.forEach((r, rIndex) => {
                tsContent += `            { label: '${r.label}', url: '${r.url}', type: '${r.type}' }`;
                if (rIndex < v.resources.length - 1) tsContent += `,`;
                tsContent += `\n`;
            });

            tsContent += `        ]\n`;
            tsContent += `    }`;
            if (index < allVideos.length - 1) tsContent += `,`;
            tsContent += `\n`;
        });

        tsContent += `];\n`;

        fs.writeFileSync(DATA_FILE, tsContent, 'utf8');
        console.log(`Successfully updated ${DATA_FILE} with ${allVideos.length} videos.`);

    } catch (error) {
        console.error('Failed to sync videos:', error);
        process.exit(1);
    }
}

syncVideos();
