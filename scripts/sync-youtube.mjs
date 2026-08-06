import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../data/videos.ts');

const CHANNEL_ID = 'UCs9e33racEAMcCfReN4Bc_g';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

async function syncVideos() {
    console.log(`Fetching latest videos from YouTube RSS feed...`);

    try {
        const response = await fetch(RSS_URL);
        if (!response.ok) {
            throw new Error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
        }

        const xml = await response.text();

        // Basic regex parsing for the simple Atom feed
        const entries = xml.split('<entry>').slice(1);

        const videos = entries
            .map(entry => {
                const titleMatch = entry.match(/<title>(.*?)<\/title>/);
                const videoIdMatch = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/);
                const publishedMatch = entry.match(/<published>(.*?)<\/published>/);
                const descriptionMatch = entry.match(/<media:description>(.*?)<\/media:description>/s);

                if (!titleMatch || !videoIdMatch || !publishedMatch) return null;

                const title = titleMatch[1]
                    .replace(/&quot;/g, '"')
                    .replace(/&amp;/g, '&')
                    .replace(/&#39;/g, "'")
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>');

                const videoId = videoIdMatch[1];
                const published = new Date(publishedMatch[1]);
                const desc = descriptionMatch ? descriptionMatch[1] : '';

                // Formatted date (e.g., Feb 21, 2026)
                const dateOpts = { year: 'numeric', month: 'short', day: '2-digit' };
                const dateStr = published.toLocaleDateString('en-US', dateOpts);

                // Try to infer category from title or keep generic
                let category = 'AI Automation';
                const lowerTitle = title.toLowerCase();
                const lowerDesc = desc.toLowerCase();

                if (lowerTitle.includes('forex') || lowerTitle.includes('trading') || lowerDesc.includes('forex') || lowerTitle.includes('ea ')) {
                    category = 'Forex';
                } else if (lowerTitle.includes('crypto') || lowerTitle.includes('nodepay') || lowerTitle.includes('bless') || lowerTitle.includes('depin')) {
                    category = 'Crypto';
                } else if (lowerTitle.includes('node') || lowerTitle.includes('vps') && !lowerTitle.includes('n8n')) {
                    category = 'Node Ops';
                }

                // Extract resource links if possible
                const resources = [];
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

        // Generate TypeScript file contents
        let tsContent = `import { Video } from '../types';\n\nexport const VIDEOS: Video[] = [\n`;

        fullVideos.forEach((v, index) => {
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
            if (index < fullVideos.length - 1) tsContent += `,`;
            tsContent += `\n`;
        });

        tsContent += `];\n`;

        fs.writeFileSync(DATA_FILE, tsContent, 'utf8');
        console.log(`Successfully updated ${DATA_FILE} with ${fullVideos.length} videos.`);

    } catch (error) {
        console.error('Failed to sync videos:', error);
        process.exit(1);
    }
}

syncVideos();
