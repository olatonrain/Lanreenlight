import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_FILE = path.join(__dirname, '../.env.local');

const SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';
const REDIRECT_PORT = 30083;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}`;
const ALLOWED_HOSTS = new Set(['accounts.google.com', 'oauth2.googleapis.com', 'www.googleapis.com']);

function assertSafeUrl(url) {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') {
        throw new Error(`Blocked non-https protocol: ${parsed.protocol}`);
    }
    const host = parsed.hostname.toLowerCase();
    if (!ALLOWED_HOSTS.has(host)) {
        throw new Error(`Blocked unapproved host: ${host}`);
    }
    if (/^(10\.|127\.|0\.|169\.254\.|192\.168\.)/.test(host) || /^172\.(1[6-9]|2\d|3[01])\./.test(host)) {
        throw new Error(`Blocked private/reserved address: ${host}`);
    }
    return url;
}

function readEnv() {
    const env = {};
    if (fs.existsSync(ENV_FILE)) {
        for (const m of fs.readFileSync(ENV_FILE, 'utf8').matchAll(/^([A-Z_]+)=(.+)$/gm)) {
            env[m[1]] = m[2].trim();
        }
    }
    return env;
}

function writeEnvVar(name, value) {
    const content = fs.existsSync(ENV_FILE) ? fs.readFileSync(ENV_FILE, 'utf8') : '';
    const re = new RegExp(`^${name}=.*$`, 'm');
    if (re.test(content)) {
        fs.writeFileSync(ENV_FILE, content.replace(re, `${name}=${value}`));
    } else {
        fs.writeFileSync(ENV_FILE, content.trimEnd() + `\n${name}=${value}\n`);
    }
}

async function exchangeCode(code, clientId, clientSecret) {
    const res = await fetch(assertSafeUrl('https://oauth2.googleapis.com/token'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
        }),
    });
    if (!res.ok) throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
    return res.json();
}

async function verifyToken(refreshToken, clientId, clientSecret) {
    const tokenRes = await fetch(assertSafeUrl('https://oauth2.googleapis.com/token'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            refresh_token: refreshToken,
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'refresh_token',
        }),
    });
    if (!tokenRes.ok) throw new Error(`Refresh failed: ${tokenRes.status} ${await tokenRes.text()}`);
    const { access_token } = await tokenRes.json();
    const chRes = await fetch(assertSafeUrl(`https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true`), {
        headers: { Authorization: `Bearer ${access_token}` },
    });
    if (!chRes.ok) throw new Error(`Channel check failed: ${chRes.status} ${await chRes.text()}`);
    const ch = await chRes.json();
    return ch.items?.[0]?.snippet?.title || 'unknown channel';
}

async function main() {
    const env = readEnv();
    const clientId = env.YOUTUBE_CLIENT_ID;
    const clientSecret = env.YOUTUBE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        console.error(`Missing YOUTUBE_CLIENT_ID / YOUTUBE_CLIENT_SECRET in .env.local.

Setup (one time, ~5 minutes, in Google Cloud Console on the SAME project as your API key):
1. APIs & Services → OAuth consent screen → External → app name "Lanre Channel Tools" → add olatonrainyt@gmail.com as TEST USER
2. APIs & Services → Credentials → Create Credentials → OAuth client ID → Application type: Desktop app → Create
3. Add to .env.local:
   YOUTUBE_CLIENT_ID=<paste client id>
   YOUTUBE_CLIENT_SECRET=<paste client secret>
4. Run this script again.`);
        process.exit(1);
    }

    const authUrl = assertSafeUrl(`https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
        client_id: clientId,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: SCOPE,
        access_type: 'offline',
        prompt: 'consent',
    })}`);

    console.log('Opening browser for Google login (your password stays with Google — nothing is shared)...');
    console.log(`If the browser does not open, visit manually:\n\n${authUrl}\n`);
    console.log(`Waiting for authorization on ${REDIRECT_URI} ...`);

    const server = http.createServer((req, res) => {
        const url = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);
        const code = url.searchParams.get('code');
        const err = url.searchParams.get('error');
        res.setHeader('Content-Type', 'text/html');
        if (err || !code) {
            res.end('<h3>Authorization failed — you can close this tab.</h3>');
            server.close();
            console.error('Authorization denied or failed:', err || 'no code');
            process.exit(1);
        }
        exchangeCode(code, clientId, clientSecret)
            .then(async tokens => {
                writeEnvVar('YOUTUBE_REFRESH_TOKEN', tokens.refresh_token);
                const channelTitle = await verifyToken(tokens.refresh_token, clientId, clientSecret);
                res.end(`<h3>Authorized for "${channelTitle}" — you can close this tab.</h3>`);
                console.log(`\nSuccess: refresh token saved to .env.local (authorized for: ${channelTitle})`);
                console.log('You can now run: node scripts/youtube-update.mjs backup');
                server.close();
            })
            .catch(e => {
                res.end(`<h3>Error: ${e.message}</h3>`);
                console.error(e.message);
                server.close();
                process.exit(1);
            });
    });

    server.listen(REDIRECT_PORT, '127.0.0.1', () => {
        try { execSync(`open "${authUrl}"`); } catch { console.log('(Could not auto-open browser.)'); }
    });

    setTimeout(() => { console.error('Timed out after 5 minutes.'); process.exit(1); }, 5 * 60 * 1000);
}

main();
