# AI Agent Instructions

This file helps AI coding agents (like opencode) work effectively on this project.

<!-- agent-updated: 2026-07-11 — Initial setup with all rules -->
<!-- agent-updated: 2026-08-25 — Added mandatory SEO/AEO/GEO preservation rules, corrected stale routing/hosting/build lines -->

## Tools & Skills

- **opencode** — Primary tool. Use `skill` for specialized tasks.
- **Customize opencode skill** — Use when editing opencode config (`.opencode/`, `opencode.json`).
- **n8n-mcp-tools-expert** — Use when working with n8n node configurations.
- **n8n-node-configuration** — Use for detailed n8n node guidance.

## Skill Usage Rule

Always try to use a skill before any task (max 3 per task). If a skill matches the task, load and follow it.

## Project Context

- **Purpose:** Portfolio site for AI Automation & Systems Engineer
- **Stack:** React 19 + TypeScript + Vite 6 + Tailwind CSS (CDN)
- **Routing:** React Router v7 (BrowserRouter, lazy-loaded routes: `/`, `/blog`, `/blog/:id`, `/guides/*`)
- **Styling:** Tailwind classes inline — no CSS modules. Custom CSS in `index.html` `<style>` block.
- **Hosting:** HestiaCP (Apache VPS) — `.htaccess` maps extensionless URLs to prerendered `.html` files, serves real 404s via `ErrorDocument`, and handles affiliate funnel redirects
- **CI/CD:** GitHub Actions (build → prerender → SCP to server) — verified from `.github/workflows/`
- **SEO/AEO/GEO:** build-time prerendering (`scripts/prerender.mjs`) + per-page `<Seo>` metadata + JSON-LD schema + `robots.txt` / `llms.txt` / `.md` mirrors + Google Indexing API script (`scripts/request-indexing.mjs`) — see the preservation rules below, they are mandatory

## Session Protocol

Mandatory order — do not skip or reorder:

1. **Read MEMORY.md fully** — read the entire file at session start
2. **Read-before-write** — always read the target file(s) before editing; never write blind
3. **Never overwrite MEMORY.md** — only append or patch; never delete or restructure existing entries
4. **Update MEMORY.md at session end** — log decisions, completed work, next steps, blockers

## Exploration Scope

- **Max depth:** 3 folders from project root
- **Priority read order:** `package.json` → entry point (`index.tsx`) → `App.tsx` → `types.ts` → `index.html`
- **Stop once:** stack (React 19 + TypeScript + Vite 6), project type (static SPA portfolio), and entry point (`index.tsx` → `App.tsx`) are identified
- Do not recursively read every file

## Key Conventions

- **No CSS modules** — all styles via Tailwind CDN or inline `<style>` in `index.html`
- **No comments** in code unless semantically necessary
- **Component names** — PascalCase, named exports (`export const Component: React.FC = () =>`)
- **Types** — shared in `types.ts`, local interfaces in data files
- **Animation** — `FadeIn` wrapper component for scroll-triggered reveals
- **Data files** — `data/videos.ts` (auto-synced via YouTube API/RSS), `data/blog.ts` (posts from `data/posts/*.json`)

## SEO/AEO/GEO Preservation Rules (MANDATORY)

The site earns visibility three ways: search engines (SEO), answer engines like ChatGPT and Perplexity (AEO), and generative engines that read `llms.txt` and the `.md` mirrors (GEO). Every change — new features, pages, edits, deployments — must pass the rules below. A violation is a release-blocking bug because it costs existing traffic. These rules exist because each one was learned from a real incident on this site.

### Non-negotiables

1. **Never skip or remove prerendering.** `npm run build` must run `vite build && node scripts/prerender.mjs`. Every route ships full static HTML (content, title, canonical, JSON-LD) in the first byte. Never deploy an SPA-shell-only build.
2. **Never soft-404.** Unknown URLs must return HTTP 404 via `ErrorDocument 404 /404.html`. Do not re-add a catch-all that rewrites unmatched paths to `index.html` (it previously served homepage content at 200 for any URL, which wasted crawl budget and created duplicates).
3. **Every page gets unique SEO metadata** via the `<Seo>` component: unique title ending in `| Lanre`, unique meta description, self-canonical, and page-appropriate JSON-LD (Person/WebSite on home, Article + FAQPage + Breadcrumb on guides, Article + Breadcrumb on blog posts, CollectionPage on the blog index). Duplicate titles caused "Duplicate without user-selected canonical" — do not regress.
4. **Every new route goes in `public/sitemap.xml` with a fresh lastmod before merge.** The prerender script reads the sitemap, so a page missing from it is neither prerendered nor indexable.
5. **Indexed URLs are permanent.** Never change, delete, or repurpose an indexed URL without a 301 to the nearest relevant page (in `.htaccess` or HestiaCP). Canonical URL decisions must stay identical everywhere: sitemap, llms.txt, `<Seo>`, prerender output.
6. **`noindex` only on error pages.** Real pages never carry noindex. The `<Seo>` cleanup behavior (removing a stale robots meta on navigation) is required — do not break it.
7. **robots.txt stays permissive.** Never add `Disallow` for any crawler — especially AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot). Keep the `Sitemap:` line.
8. **Keep AEO/GEO surfaces in sync.** When pages are added or retitled, update `public/llms.txt`. The `.md` mirrors regenerate from the sitemap during prerender — keep that pipeline intact.
9. **Don't gut indexed content.** When rewriting a page, keep the URL, preserve its core headings and keywords, and don't shrink the word count without reason. Deleted content needs a 301.
10. **Affiliate funnel URLs are sacred.** The `/forexbroker`, `/cheapestvps`, `/cheapestn8nvps`, `/vps6`, `/vps8`, `/vps12` redirects must never be removed, reordered, or repointed.

### Mandatory checks before any merge/deploy

- Run `npm run build` locally — every route must prerender (the build fails on any route error by design).
- For every new or changed URL: `curl -s https://lanreenlight.com<path>` returns 200 with a unique `<title>`, the correct `<link rel="canonical">`, and JSON-LD.
- No stray noindex on real pages: `curl -s <url> | grep -i noindex` is empty.
- Soft-404 check: `curl -s -o /dev/null -w "%{http_code}" https://lanreenlight.com/check-nonexistent-xyz` returns 404.
- After any deploy that touches content, run `node scripts/request-indexing.mjs` to ping Google (Indexing API; service account key at `~/Downloads/trans-parsec-481518-j2-98265b142411.json`, or `INDEXING_SERVICE_ACCOUNT_KEY` base64 env var in CI).

### If in doubt

Any change that touches an existing URL, title, heading, sitemap entry, or redirect is SEO-affected. Verify before and after. Never claim "traffic is safe" without running the checks above.
- **Alias** — `@/` maps to project root in imports

## Documentation Conventions

### MEMORY.md format

Fixed 5-field schema. New entries appended at top (most recent first):

```
## 2026-07-11 — Brief topic

### Last Session
### Done
### Decisions
### Next Steps
### Blockers & Open Questions
```

**Archive:** If MEMORY.md exceeds 500 lines, move oldest entries to `MEMORY_ARCHIVE.md`.

### CHANGELOG.md format

Date-based, category-tagged entries — no semver unless the project explicitly ships versioned releases:

```
2026-07-11

Added
- New feature description

Fixed
- Bug fix description

Changed
- Existing behavior changed

Removed
- Feature removed
```

## Patch-Not-Overwrite Rule

- All doc edits are patches to existing sections, not full rewrites
- Exception: file doesn't exist yet (initial creation)
- Preserve human-written notes — never delete them
- Mark agent additions with `<!-- agent-updated: YYYY-MM-DD — description -->`

## Uncertainty Rule

If content can't be verified from the codebase:
- Insert `<!-- TODO: verify -->` inline at the uncertain point
- Log the uncertainty in MEMORY.md under Blockers & Open Questions
- Never fabricate behavior, paths, or config values

## SECURITY.md vs SAFETY.md Boundary

| File | Content Scope |
|------|--------------|
| `SECURITY.md` | Vulnerability reporting, dependency scanning, secrets handling, auth policy |
| `SAFETY.md` | Data handling limits, deployment guardrails, rollback triggers, human-in-the-loop checkpoints |

Zero content overlap between the two files.

## Build/Test/Lint/Deploy Commands

Verified from `package.json`:

```bash
npm run dev      # Start dev server on port 3000 (vite)
npm run build    # Production build: vite build + prerender all sitemap routes to static HTML (fails on any route error)
npm run preview  # Preview production build locally (vite preview)
node scripts/request-indexing.mjs   # Ping Google Indexing API with all sitemap URLs (run after content deploys)
```

No lint or test scripts exist in `package.json`.

## Agent Boundaries

Never modify these files/directories without explicit user approval:

- `.env` / `.env.*` (none exist currently — `*.local` is gitignored)
- `secrets/` (does not exist)
- `credentials/` (does not exist)
- `migrations/` (does not exist)
- `.git/`
- CI/CD configs (`.github/workflows/`)
- Production deploy configs

## Deploy Documentation Rule

CI/CD exists at `.github/workflows/deploy.yml` — document its actual steps. Do not invent a pipeline if none exists.

## Documentation Maintenance

| File | When to Update |
|------|---------------|
| `MEMORY.md` | **Every session** — log decisions, context, next steps |
| `CHANGELOG.md` | After completing work (features, fixes, deploy, content, breaking changes) |
| `ARCHITECTURE.md` | When new modules added, data flow changes, or architecture shifts |
| `CONTENT_STRATEGY.md` | When clusters, pillar pages, taxonomy, or content workflow changes |
| `README.md` | When features, setup steps, or tech stack change significantly |
| `DEPLOY_GUIDE.md` | When deployment process or CI/CD changes |
| `CONTRIBUTING.md` | Rarely — only when code conventions change |
| `SECURITY.md` | Rarely — only when security policy or contact changes |
| `SAFETY.md` | Rarely — only when safety guidelines change |
| `AGENTS.md` | Rarely — only when agent workflow/instructions change |

## Git

- Commits use conventional commits: `feat:`, `fix:`, `chore:`, `style:`, `deploy:`, `content:`
- Before committing, review diff and stage only intended files
- Do not force push or rewrite history

## Memory

- After every session, update MEMORY.md with key decisions, context, and next steps
- MEMORY.md serves as the primary context carrier between sessions
