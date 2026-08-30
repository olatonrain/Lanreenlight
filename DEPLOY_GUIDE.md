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
4. **Build** — `npm run build` (vite build + prerender ALL sitemap routes to static HTML — fails on any route error)
5. **SCP to Server** — `appleboy/scp-action` copies `dist/` contents to target directory

**Target directory:** `/home/Lanreenlight/web/lanreenlight.com/public_html`

### Post-Deploy SEO Verification Gate (MANDATORY — run manually after every deploy)

CI currently ends at SCP (agent-restricted file — adding the gate step to the workflow needs user approval). Until then, run:

```bash
node scripts/verify-deploy.mjs
```

It polls the homepage until 200 (up to 150s), then with the Googlebot UA checks: 3 key pages return 200 with no `set-cookie` and no bot-hostile cache headers; robots.txt is permissive with the `Sitemap:` line; sitemap.xml has at least 15 `<loc>` entries (raise `SITEMAP_LOC_FLOOR` as it grows); no noindex on real pages. Any failure exits 1 with a rollback instruction.

To wire into CI later (requires user approval per Agent Boundaries), add after the SCP step:

```yaml
      - name: SEO Verification Gate
        run: node scripts/verify-deploy.mjs

      - name: Ping Google Indexing
        run: node scripts/request-indexing.mjs
        env:
          INDEXING_SERVICE_ACCOUNT_KEY: ${{ secrets.INDEXING_SERVICE_ACCOUNT_KEY }}
```

### Indexing Ping (after content deploys)

```bash
node scripts/request-indexing.mjs
```

Two signals, one script (service account key: `~/Downloads/trans-parsec-…json` locally, `INDEXING_SERVICE_ACCOUNT_KEY` base64 secret in CI):

1. Indexing API `urlNotifications:publish` per URL — **a 200 response is NOT proof of anything**: Google can return 200 with an empty `latestUpdate` (accepted but registered nothing — observed 2026-08-30, all 23 URLs). The script detects this and labels each URL `accepted` vs `200-but-NOT-registered`.
2. **Sitemap resubmission** via the Search Console API (`PUT /webmasters/v3/sites/sc-domain:lanreenlight.com/sitemaps/…`) — the reliable re-crawl signal. Returns 204 on success. Requires the `webmasters` scope (already in the JWT) and SA ownership of the GSC property.

Real index status is only verifiable via GSC's `urlInspection/index:inspect` API or the URL Inspection UI (`coverageState: "Submitted and indexed"`).

### Link-Floor Audit (before deploys that touch content)

```bash
npm run build && node scripts/audit-links.mjs
```

Enforces the CONTENT_STRATEGY.md internal link floor: every post links a hub page, a sibling post (via the Related Posts template section), and a product/affiliate link; flags orphaned posts and slash-less `/blog`/`/guides` hrefs (DirectorySlash 301 traps).

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

### Prerendered Static Serving

The `.htaccess` file in the document root serves prerendered HTML at extensionless URLs:

```apache
# /blog -> /blog.html (then DirectorySlash 301s directory paths to trailing slash)
RewriteCond %{REQUEST_URI} !\.[a-z0-9]+$
RewriteCond %{REQUEST_FILENAME}.html -f
RewriteRule ^(.+)$ $1.html [L]

# No SPA fallback: unmatched paths are real 404s (never re-add a catch-all to index.html)
RewriteRule ^ - [R=404,L]
ErrorDocument 404 /404.html
```

Canonical URLs carry trailing slashes (`/blog/`, `/guides/`) — always link the slash form internally; the slash-less form 301s and pollutes GSC "Page with redirect".

### Verify Deployment

1. `node scripts/verify-deploy.mjs` (the automated gate — see above)
2. Spot-check a new/changed URL: 200, unique `<title>`, correct canonical, JSON-LD
3. Soft-404 probe: `curl -s -o /dev/null -w "%{http_code}" https://lanreenlight.com/check-nonexistent-xyz` returns 404

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
