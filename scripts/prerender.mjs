import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');
const SITEMAP = path.resolve(__dirname, '../public/sitemap.xml');
const PORT = 4173;
const ORIGIN = `http://127.0.0.1:${PORT}`;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.md': 'text/markdown; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml',
    '.ico': 'image/x-icon',
};

const startServer = () =>
    new Promise((resolve, reject) => {
        const server = createServer(async (req, res) => {
            try {
                const pathname = decodeURIComponent(new URL(req.url, ORIGIN).pathname);
                let file = path.join(DIST, pathname);
                if (!existsSync(file) || file.endsWith(path.sep)) {
                    file = existsSync(path.join(file, 'index.html'))
                        ? path.join(file, 'index.html')
                        : path.join(DIST, 'index.html');
                }
                const body = await readFile(file);
                res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
                res.end(body);
            } catch {
                res.writeHead(500);
                res.end();
            }
        });
        server.on('error', reject);
        server.listen(PORT, '127.0.0.1', () => resolve(server));
    });

const getRoutes = async () => {
    const xml = await readFile(SITEMAP, 'utf8');
    return [...xml.matchAll(/<loc>https:\/\/lanreenlight\.com([^<]*)<\/loc>/g)]
        .map(m => (m[1] === '' || m[1] === '/' ? '/' : m[1].replace(/\/+$/, '')));
};

const revealAllFadeIns = () =>
    page.evaluate(
        () =>
            new Promise(resolve => {
                document.documentElement.classList.remove('scroll-smooth');
                document.documentElement.style.scrollBehavior = 'auto';
                let y = 0;
                const step = () => {
                    window.scrollTo(0, y);
                    y += 400;
                    if (y < document.documentElement.scrollHeight + 400) {
                        setTimeout(step, 80);
                    } else {
                        setTimeout(() => resolve(null), 250);
                    }
                };
                step();
            })
    ).then(() =>
        page.evaluate(() => {
            document.querySelectorAll('div').forEach(el => {
                const cls = el.className;
                if (typeof cls === 'string' && cls.includes('duration-[1000ms]') && cls.includes('opacity-0')) {
                    el.classList.remove('opacity-0', 'translate-y-8', '-translate-y-8', 'translate-x-8', '-translate-x-8');
                    el.classList.add('opacity-100');
                }
            });
        })
    );

let page;

const extractMarkdown = () =>
    page.evaluate(() => {
        const root = document.querySelector('main') || document.querySelector('article') || document.body;
        const skip = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'IFRAME', 'NAV', 'HEADER', 'FOOTER', 'ASIDE'];
        const inline = node => {
            let text = '';
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    text += child.textContent;
                } else if (child.nodeName === 'STRONG' || child.nodeName === 'B') {
                    text += `**${inline(child)}**`;
                } else if (child.nodeName === 'EM' || child.nodeName === 'I') {
                    text += `*${inline(child)}*`;
                } else if (child.nodeName === 'A') {
                    text += `[${inline(child)}](${child.href})`;
                } else if (!skip.includes(child.nodeName)) {
                    text += inline(child);
                }
            });
            return text.replace(/\s+/g, ' ').trim();
        };
        const lines = [];
        const walk = node => {
            node.childNodes.forEach(child => {
                if (child.nodeType !== Node.ELEMENT_NODE) return;
                const tag = child.nodeName;
                if (skip.includes(tag)) return;
                if (/^H[1-4]$/.test(tag)) {
                    lines.push(`\n${'#'.repeat(Number(tag[1]))} ${inline(child)}\n`);
                } else if (tag === 'P') {
                    const text = inline(child);
                    if (text) lines.push(`${text}\n`);
                } else if (tag === 'UL' || tag === 'OL') {
                    child.querySelectorAll(':scope > li').forEach((li, i) => {
                        const text = inline(li);
                        if (text) lines.push(`${tag === 'OL' ? `${i + 1}.` : '-'} ${text}`);
                    });
                    lines.push('');
                } else if (tag === 'IFRAME' && child.src) {
                    lines.push(`[Embedded video](${child.src})\n`);
                } else {
                    walk(child);
                }
            });
        };
        walk(root);
        return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    });

const findExecutable = async () => {
    if (process.env.PUPPETEER_EXECUTABLE_PATH && existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
        return process.env.PUPPETEER_EXECUTABLE_PATH;
    }
    const cacheDir = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome');
    if (existsSync(cacheDir)) {
        const versions = (await readdir(cacheDir)).filter(v => v.startsWith('mac-') || v.startsWith('linux-')).sort().reverse();
        for (const version of versions) {
            for (const bin of [
                path.join(cacheDir, version, 'chrome-mac-x64', 'Google Chrome for Testing.app', 'Contents', 'MacOS', 'Google Chrome for Testing'),
                path.join(cacheDir, version, 'chrome-linux64', 'chrome'),
                path.join(cacheDir, version, 'chrome-linux', 'chrome'),
            ]) {
                if (existsSync(bin)) return bin;
            }
        }
    }
    for (const bin of [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/usr/bin/google-chrome',
        '/usr/bin/google-chrome-stable',
        '/usr/bin/chromium',
        '/usr/bin/chromium-browser',
    ]) {
        if (existsSync(bin)) return bin;
    }
    return undefined;
};

const prerender404 = async () => {
    // Apache serves this via ErrorDocument with a real 404 status. The URL is arbitrary
    // and unrouted, so React renders the NotFound catch-all.
    await page.goto(`${ORIGIN}/__404__`, { waitUntil: 'networkidle2', timeout: 60000 });
    await revealAllFadeIns();
    await new Promise(r => setTimeout(r, 400));
    let html = await page.content();
    // Error-document responses keep the requested URL, so relative asset paths would
    // resolve against it. Absolute paths keep /assets/* correct at any depth.
    html = html.replace(/(src|href)="\.\//g, '$1="/');
    await writeFile(path.join(DIST, '404.html'), html);
    console.log('  ✓ 404.html');
};

const run = async () => {    if (!existsSync(DIST)) {
        throw new Error('dist/ not found — run vite build first.');
    }

    const puppeteer = (await import('puppeteer')).default;

    let browser;
    let server;
    const failed = [];
    try {
        server = await startServer();
        const executablePath = await findExecutable();
        browser = await puppeteer.launch({
            executablePath,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        });
        page = await browser.newPage();
        await page.setViewport({ width: 1440, height: 900 });

        const routes = await getRoutes();
        console.log(`Prerendering ${routes.length} routes…`);

        for (const route of routes) {
            try {
                await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle2', timeout: 60000 });
                await revealAllFadeIns();
                await new Promise(r => setTimeout(r, 400));

                const html = await page.content();
                const htmlPath = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, `${route}.html`);
                await mkdir(path.dirname(htmlPath), { recursive: true });
                await writeFile(htmlPath, html);
                // Routes that are also physical directories (Apache DirectorySlash 301s /blog → /blog/,
                // so the trailing-slash URL needs its own index.html)
                if (route === '/blog' || route === '/guides') {
                    await mkdir(path.join(DIST, route), { recursive: true });
                    await writeFile(path.join(DIST, route, 'index.html'), html);
                }

                if (route !== '/') {
                    const markdown = await extractMarkdown();
                    if (markdown) {
                        const mdPath = path.join(DIST, `${route}.md`);
                        await writeFile(mdPath, `# ${await page.title()}\n\nSource: https://lanreenlight.com${route}\n\n${markdown}\n`);
                    }
                }
                console.log(`  ✓ ${route}`);
            } catch (err) {
                failed.push(`${route}: ${err.message}`);
                console.error(`  ✗ ${route}: ${err.message}`);
            }
        }

        await prerender404();
    } finally {
        if (browser) await browser.close();
        if (server) server.close();
    }

    if (failed.length) {
        throw new Error(`${failed.length} route(s) failed to prerender:\n  ${failed.join('\n  ')}`);
    }
    console.log('Prerender complete.');
};

run().catch(err => {
    console.error(`\nPrerender failed: ${err.message}`);
    console.error('Refusing to deploy: every route is served from a prerendered file, so an incomplete');
    console.error('prerender would 404 the live site. Fix the error above and rebuild.');
    process.exit(1);
});
