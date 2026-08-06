# Deployment Guide

## Overview

Deployed to **HestiaCP** (Apache VPS) via GitHub Actions. Every push to `main` triggers an automatic build + SCP deploy.

---

## Prerequisites

- GitHub repository access with `main` branch protection
- SSH key pair for server access
- Server IP and credentials stored as GitHub secrets

## GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `SERVER_IP` | IP address of HestiaCP VPS <!-- TODO: verify this secret is configured in GitHub --> |
| `SSH_PRIVATE_KEY` | Private SSH key for passwordless SCP <!-- TODO: verify key is valid and authorized --> |
| `GEMINI_API_KEY` | Gemini API key (used in dev, needed for build) |

---

## CI/CD Pipeline

### Deploy Workflow (`.github/workflows/deploy.yml`)

Trigger: Push to `main`

1. **Checkout** — Pull latest code
2. **Setup Node** — Node.js 20
3. **Install** — `npm install`
4. **Build** — `npm run build` → outputs to `dist/`
5. **SCP to Server** — `appleboy/scp-action` copies `dist/` contents to target directory

**Target directory:** `/home/Lanreenlight/web/lanreenlight.com/public_html`

### Video Sync Workflow (`.github/workflows/update-videos.yml`)

Trigger: Daily at 05:00 UTC (or manual via `workflow_dispatch`)

1. **Checkout** — Pull latest code
2. **Setup Node** — Node.js 20
3. **Run sync script** — `node scripts/sync-youtube.mjs`
4. **Commit & Push** — Commits updated `data/videos.ts` if changed

---

## Manual Deploy

```bash
# 1. Build
npm run build

# 2. SCP to server (replace placeholders)
scp -r dist/* user@server-ip:/home/Lanreenlight/web/lanreenlight.com/public_html/

# Or use the sync script
./sync_repo.sh "deploy: description"
```

## Server Setup (HestiaCP / Apache)

### SPA Rewrite Rule

The `.htaccess` file in the document root handles SPA routing:

```apache
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteRule ^ index.html [L]
```

### Verify Deployment

1. Check `https://lanreenlight.com` loads correctly
2. Test direct URL access to `/blog` and `/blog/some-post`
3. Confirm SPA fallback works (refresh on a blog page)
4. Verify sitemap loads at `/sitemap.xml`

---

## Environment Variables

Set `GEMINI_API_KEY` in `.env.local` for local development:

```bash
GEMINI_API_KEY=your_key_here
```

This is injected via Vite's `define` in `vite.config.ts`. The key is available at `process.env.GEMINI_API_KEY` in client code.

---

## Troubleshooting

| Issue | Likely Cause | Fix |
|-------|-------------|-----|
| Blank page on deploy | Missing `.htaccess` in `dist/` | Verify `public/.htaccess` copies to build |
| Redirect loops | Incorrect `RewriteBase` | Ensure `RewriteBase /` matches document root |
| 404 on route refresh | No SPA fallback | Check `.htaccess` rules are active |
| SCP permission denied | SSH key mismatch | Regenerate key, update GitHub secret |
| Video sync not updating | No new videos since last run | Check YouTube RSS feed manually |
