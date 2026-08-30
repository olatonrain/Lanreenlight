# Safety Guidelines

Data handling limits, deployment guardrails, rollback triggers, and human-in-the-loop checkpoints.

**Scope boundary:** This file covers operational safety only. For security vulnerabilities, dependency scanning, secrets handling, and authentication policy, see `SECURITY.md`. Zero content overlap.

<!-- agent-updated: 2026-07-11 — Initial file creation -->

---

## Data Handling Limits

| Category | Limit | Notes |
|----------|-------|-------|
| Client-side state | No user PII stored | Portfolio site — no login, forms, or data persistence |
| Form submissions | None implemented | Contact section is static CTA only; no form handler wired up <!-- TODO: verify --> |
| Blog content | Static JSON files | Served from `public/posts/` — no database |
| API keys | `GEMINI_API_KEY` in `.env.local` | Injected at build via Vite `define`; never committed |
| GA4 tracking | Placeholder ID `G-XXXXXXXXXX` | Replace with real ID before relying on analytics data |

## Deployment Guardrails

| Guardrail | Implementation | Status |
|-----------|---------------|--------|
| Build must pass before deploy | `npm run build` in CI pipeline | ✅ Verified from `.github/workflows/deploy.yml` |
| No direct push to production server | CI-only SCP via `appleboy/scp-action` | ✅ SSH key required, no password auth |
| SPA routing fallback | `.htaccess` rewrite rules in `public/` | ✅ Verified |
| Source maps | Not configured in `vite.config.ts` | ⚠️ Consider disabling in production |

## SEO/AEO/GEO Deployment Guardrails (from industry incident post-mortems)

A preventable mistake cost one site 1,000+ daily impressions for weeks. These guardrails exist so this site never repeats that class of failure. Full rule set in `AGENTS.md` → "SEO/AEO/GEO Guardrails (Non-Negotiable)".

**Never deploy when any of these is true:**

- `.htaccess` change without a Googlebot-UA check before AND after (this site's equivalent of a middleware edit — headers/rewrites/redirects all live there).
- Sitemap `<loc>` set shrank vs the previous deploy (a URL silently disappeared).
- Any real page gained `noindex` or a broken/changed canonical as a side effect.
- Bulk status flips to draft/inactive/removed (mass de-indexing) without a 301 plan + user sign-off.
- Rendering changed such that the prerendered HTML a bot sees differs from what users see.
- robots.txt lost the `Sitemap:` line or gained any `Disallow`.

**Rollback triggers (revert the commit + redeploy immediately):**

- Googlebot UA gets an error, wrong cache behavior, or cookie flips on the homepage.
- Sitemap drops URLs vs the previous deploy.
- Any recently-ranking URL returns 404 or noindex.

**Post-deploy ritual (every deploy, code or content):** Googlebot-UA curl on the homepage + 2 key pages, robots.txt check, sitemap `<loc>` diff vs previous deploy, noindex probe, soft-404 probe, then `node scripts/request-indexing.mjs` — and log the results in MEMORY.md. Remember: an Indexing API HTTP 200 is NOT proof of indexing (200-with-empty-`latestUpdate` happens) — sitemap resubmission is the reliable signal.

## Rollback Triggers

Rollback to a previous deploy requires reverting the git commit and re-running CI:

1. `git revert HEAD` (or target commit hash)
2. Push to `main` — CI will auto-deploy the previous build
3. Verify at `https://lanreenlight.com`

**Emergency rollback:** If CI is broken, deploy manually:
```bash
git checkout <last-known-good-commit>
npm run build
scp -r dist/* user@server-ip:/home/Lanreenlight/web/lanreenlight.com/public_html/
```

## Human-in-the-Loop (HITL) Checkpoints

| Action | Requires Human Approval? | Reason |
|--------|------------------------|--------|
| Editing `.github/workflows/` | ✅ Yes | CI/CD pipeline changes can break deployment |
| Editing `.htaccess` | ✅ Yes | Apache config can cause redirect loops or 500 errors |
| Editing `vite.config.ts` | ✅ Yes | Build config changes affect production output |
| Adding new npm dependencies | ✅ Yes | Supply chain risk; verify package provenance |
| Editing blog post content | ✅ No | Static content, low risk |
| Editing component styles | ✅ No | Visual changes are safe to iterate |
| Updating `data/videos.ts` | ✅ No | Auto-synced via GitHub Actions daily |

## Monitoring & Alerts

| Monitor | Method | Status |
|---------|--------|--------|
| Uptime | None configured | ⚠️ No uptime monitor set up <!-- TODO: verify --> |
| Build failures | GitHub Actions notifications | ✅ Email notifications from GitHub |
| Deploy failures | GitHub Actions logs | ✅ Manual check required |
| SSL certificate | HestiaCP / Apache manages | ✅ Assumed active <!-- TODO: verify --> |
