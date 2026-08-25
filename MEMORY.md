# Project Memory

Newest entries first. See MEMORY_ARCHIVE.md for older sessions.

<!-- agent-updated: 2026-08-22 — YouTube analytics deep-dive logged: referral-first strategy (Contabo VPS 6/8/12, Deriv, OmniRoute) -->

---

## 2026-08-25 — Google Indexing API wired + SEO/AEO/GEO preservation rules codified

### Last Session
2026-08-24/25 — GSC shows only 2 indexed pages (home + blog); soft-404 fix deployed; user provided GSC service account key

### Done
- **Google Indexing API enabled:** user provided service account key `~/Downloads/trans-parsec-481518-j2-98265b142411.json` (`lanreenlight-index@trans-parsec-481518-j2.iam.gserviceaccount.com`); user added it as **Owner** in GSC (Settings → Users and permissions)
- Built `scripts/request-indexing.mjs` — zero-dependency (Node crypto JWT + https), reads sitemap.xml, sends `URL_UPDATED` to `indexing.googleapis.com` for each URL; key resolution: CLI arg → `INDEXING_SERVICE_ACCOUNT_KEY` (base64 env var) → default Downloads path
- **Ran it: 11/11 URLs accepted (HTTP 200)** — home, 7 guides, blog index, 2 posts. First run before GSC permission returned 403 "Failed to verify the URL ownership" — resolved once owner added
- **Codified mandatory SEO/AEO/GEO preservation rules** in `AGENTS.md` (new section "SEO/AEO/GEO Preservation Rules (MANDATORY)"): 10 non-negotiables (never skip prerender, never soft-404, unique meta per page, sitemap entry per route, indexed URLs permanent + 301 on moves, noindex only on error pages, permissive robots.txt, llms.txt/.md sync, don't gut content, affiliate funnel URLs sacred) + mandatory pre-deploy checks (build, curl title/canonical/noindex, 404 probe, run indexing script) + "if in doubt" rule
- Also fixed stale AGENTS.md lines (SPA fallback wording → prerender reality, build commands) and added short "Traffic Protection Policy" section to `CONTENT_STRATEGY.md` linking the full rules

### Decisions
- Any future agent must treat SEO/AEO/GEO violations as release-blocking bugs; rules live in AGENTS.md so every session reads them
- Indexing API pings after content deploys are now part of the deploy ritual (`node scripts/request-indexing.mjs`)
- `.mimosa/` directory exists in repo root (untracked, not ours — leave alone)

### Next Steps
- OPTIONAL (pending user approval — AGENTS.md forbids editing CI/CD without it): add indexing call to `.github/workflows/deploy.yml` post-deploy step with key stored as GitHub secret `INDEXING_SERVICE_ACCOUNT_KEY`
- Watch GSC Page indexing report over next 1–2 weeks: 7 guides + 2 posts should move from "not indexed" to indexed after today's Indexing API ping
- Consider `npm run index` alias for the indexing script (currently invoked as `node scripts/request-indexing.mjs`)

### Blockers & Open Questions
- Can't see GSC data directly (no API access beyond Indexing API) — indexing status inferred from user's screenshots
- Whether HestiaCP grants `AllowOverride` for mod_deflate/mod_expires remains unconfirmed (compression headers absent live)

---

## 2026-08-22 — site: index audit → soft-404 fix + fatal prerender

### Last Session
2026-08-22 — SEO/AEO/GEO unblock (prerendering, per-page meta, schema, robots/llms.txt)

### Done
- Diagnosed user's `site:lanreenlight.com` report (only home + blog indexed): audit confirmed NO technical blocker remains — robots.txt clean (no noindex/X-Robots-Tag anywhere), sitemap valid (11 URLs, all 200), all 7 guides linked from homepage in raw HTML, 3,600–4,100 words of content each, unique titles/canonicals, GSC verified via DNS TXT
- Found + fixed real soft-404 defect from the prerender deploy: unknown URLs returned HTTP 200 with homepage content + homepage canonical (old SPA catch-all `RewriteRule ^ index.html` still active in .htaccess)
- `public/.htaccess` — catch-all replaced with `RewriteRule ^ - [R=404,L]` + `ErrorDocument 404 /404.html`
- `scripts/prerender.mjs` — now prerenders `404.html` (renders `/__404__` through the NotFound route, rewrites relative asset paths to absolute so it works at any URL depth); prerender failures now FATAL (build exits 1) — precondition for removing the SPA fallback, since every route is served from a prerendered file
- `Seo.tsx` — new `noindex` prop (adds `<meta name="robots" content="noindex, follow">`, removes it on cleanup so SPA nav can't leak noindex onto real pages); wired into NotFound
- Verified locally: build passes, 404.html contains branded content + noindex + absolute `/assets/` paths + zero hidden FadeIn elements; tsc clean

### Decisions
- Every route must exist as a physical prerendered .html file; a failed/incomplete prerender now blocks deploy instead of silently shipping an SPA shell that would 404 under the new .htaccess
- 404 page marked `noindex, follow` (branded page, keep link equity flowing)

### Next Steps
- USER: in Google Search Console submit `https://lanreenlight.com/sitemap.xml` (Sitemaps page) and URL-inspect + "Request indexing" each of the 7 guide URLs — the guides were unindexable shells until 2026-08-22, so Google must recrawl; `site:` results lag days–weeks after that
- DONE (2026-08-22, remote commit ed6d999): GA4 activated with real measurement ID `G-XMN0TFX6BM`
- Watch GSC Page indexing report after ~1 week: guides should move from "not indexed" to indexed
- Deferred: Tailwind/Font Awesome off CDN (LCP), mod_deflate/mod_expires appear disabled on host (compression headers absent live)

### Blockers & Open Questions
- Cannot see GSC data (no API access) — indexing status is inferred, not verified
- mod_deflate/mod_expires still not emitting headers live despite IfModule rules in .htaccess — likely disabled at server level; needs HestiaCP/host action

---

## 2026-08-22 — YouTube analytics deep-dive: referral-first content strategy

### Last Session
2026-08-22 — SEO/AEO/GEO unblock: prerendering, per-page meta, schema, robots/llms.txt

### Done
- Analyzed user's 18-page YouTube Analytics export (source PDF: `~/Downloads/@YouTube Analytics @YouTube Data How will i know t.pdf`)
- Channel: Lanre Enlight — 742 subs, 80 videos, ~39.8K total views, YT monetization disabled → ALL revenue is referral-based (Contabo via CJ affiliate anrdoezrs.net, Deriv, AgentRouter aff=2CTV, node/airdrop programs)
- Key channel data logged: YT_SEARCH drives 28,508 views (dominant source); EXT_URL weakest (964 views — site underused); related-video traffic has best watch time (252s); card clicks ≈ zero across channel — affiliate links only in descriptions
- Proven conversion pattern: "earning-opportunity video where the VPS is the required unlock" (InitVerse Node 463 views/7 subs, OpenClaw VPS 476 views — the only 2 Contabo-linked videos >400 views). Generic "cheap VPS review" format has worst retention (9.1%)
- Title formula that works: free/cheap + concrete dollar figure + mainstream search demand (top video: off-niche "Renew Apple Music free" 19,120 views, 67.3% retention)
- Money batch (ICN→Multipl range): Nodepay PC wallet video best (1,542 views, 29 shares); Glacier best sub-rate (2.6%); only InitVerse video carried a Contabo link — it made the referral money
- Skills used: content-creator + content-marketer

**Public channel audit + funnel repair (2026-08-22 session 2, API key live):**
- User's Deriv funnel confirmed: `lanreenlight.com/forexbroker` → 302 → `track.deriv.com/_kIunlnHY-5BMjdsyM5hasGNd7ZgqdRLk/1/` → Deriv signup (affiliate_279729) — configured in HestiaCP server config
- `.env.local` created with `YOUTUBE_API_KEY` (was malformed space-separated — fixed to `=` syntax; gitignored via `*.local`)
- **REPAIRED: `public/.htaccess` now redirects `/forextrading` → `/forexbroker` (301)** — was rendering NotFound; 13 videos + 5 site resource links in `data/videos.ts` used the dead path
- `.htaccess` also mirrors server-side redirects in-repo (`/cheapestvps`, `/cheapestn8nvps`, `/forexbroker`) as fallback + adds `/vps6` `/vps8` `/vps12` → Contabo CJ link (single link until per-plan CJ tracking IDs exist — plan-level attribution only via server access logs)
- Built `scripts/youtube-audit.mjs` (YouTube Data API v3, host-allowlisted fetch, key from `.env.local`, never printed): channel stats, full 80-video catalog, link-coverage, chapter/placeholder/title checks — rerun anytime with `node scripts/youtube-audit.mjs`
- **Audit headline results:** top 9 videos = ~33K views (83% of channel) have NO links in descriptions at all (incl. MT4 iPhone video 1,452v — pure trading-intent audience, zero Deriv CTA); agentrouter direct link in 0/80 videos; contaboRedirect 13/80, deriv 10/80, cjDirect 4/80; ~15 junk "15 August 2023" auto-titled videos (5–39v, no links) cluttering catalog; most 10min+ videos lack chapters; OpenClaw video still has "(link in description)" placeholder text

**Earlier same-day findings (pre-API-key, public checks):**
- Channel branding solid ("Digital Laboratory / servers into income", Nigeria, links: lanreenlight.com, Instagram, LinkedIn)
- `/forextrading` Deriv funnel found broken (NotFound page) — **FIXED this session via .htaccess redirect (see above)**
- `/cheapestvps` → 301 → CJ `dpbolvw.net/click-101311044-14573812` and `/cheapestn8nvps` → 301 → CJ `kqzyfj.com/click-101311044-17183968` — verified working live (HestiaCP server config); now mirrored in repo `.htaccess`
- OpenClaw Contabo video (476 views, OTouLWgvV7U): description contains placeholder "Get Contabo VPS for OpenClaw (link in description)" instead of direct link; promised "next video: OpenClaw config + JSON + monthly API spending" NEVER shipped (RSS: no follow-up exists); spec text (2 vCPU/8GB/400GB) outdated vs current Contabo lineup
- AgentRouter video (GYvYHpi4DJk, 8 views, 31:07): no chapters/timestamps; "free forever" overpromise vs credit model; desc says $200 credit, video says $175/$125 — inconsistent; referral only via site guide (extra click) — no direct agentrouter.org/register?aff=2CTV link in description
- Upload cadence broken: zero uploads Mar–May 2026; Feb 20-21 generic AI hashtag-commentary videos (8–27 views) diluted channel; last 4 videos (June–Aug) are B2B/generic (8–16 views) — audience mismatch per PDF diagnosis
- Live-site checks: /guides/agentrouter-setup serves prerendered 200 correctly
- **Deploy verified 2026-08-22 (session 2):** commits 4f57c3c/319ddaa/3318dbf → CI run 32561399981 success → live chain confirmed: `/forextrading` 301 → `/forexbroker` → 302 → track.deriv.com → Deriv signup (affiliate_279729 tag present); `/vps6` 301 → Contabo CJ link. Deriv funnel fully operational
- **"Automate Video Sync" workflow failing intermittently** (2 of last 8 scheduled runs: 08-21 06:52, 08-22 06:44 UTC) — YouTube RSS returns 404 from GitHub Actions datacenter IPs (works fine locally). Proposed fix: switch sync-youtube.mjs to Data API (needs YOUTUBE_API_KEY as GitHub Actions secret) — BLOCKED on user approval (CI config is agent-restricted)
- Mimosa deep scan (job mt43h4si, scanId 2026-08-22T08-06-43): completed, 0 findings, 145 packages, static-evidence-only; 11 dependency advisories matched 3 packages — review scan dir `~/.mimosa/security-scans/project-c86af609edfefbfc7ccd2863/` next session

**Session 3 — "let fix them" (fixes applied + OAuth tooling):**
- FIXED: video-sync CI switched RSS→Data API (`sync-youtube.mjs` rewrite: channels→playlistItems, key from env/`.env.local`, host-allowlisted, latest-20) + `YOUTUBE_API_KEY` set as GitHub secret via `gh secret set` + workflow passes env var. Manual trigger run 32562221180 SUCCESS; bot committed `1adbeb6` autonomously — sync is self-sustaining again
- `data/videos.ts` regenerated: 18 videos (added Cheapest VPS 2025 / $1,000 Mistakes / Grass Rewards); category heuristic fixed to strip lanreenlight.com URLs before classifying (remaining 'Forex' tags come from genuine prose like "where i trade forex" — acceptable)
- BUILT (awaiting user OAuth): `scripts/youtube-auth.mjs` (loopback :30083 consent flow, refresh token → `.env.local`) + `scripts/youtube-update.mjs` (`backup` / `apply <plan> [--yes]` dry-run-first / `unlist <ids> [--yes]`)
- `youtube-fixes/` (gitignored): `plan-2026-08-22.json` — 9 description fixes ready (MT4+Deriv/VPS CTA, Apple Music/Instagram/ChatGPT/Canva +site CTA, Nodepay×2 +VPS CTA, OpenClaw placeholder→real link, AgentRouter +direct referral); `unlist-junk.txt` — 14 auto-titled junk IDs (15 August 2023 / 9 May 2024 videos, 6–39v)
- Commits: 9bea546 (sync fix), bd7b55a (OAuth tooling); Mimosa hook keeps warning about incomplete pre-commit scan — full re-audit still pending

**Session 4 — OAuth completed, all YouTube fixes APPLIED (2026-08-22):**
- User completed OAuth console setup (Client ID/Secret in `.env.local`); `youtube-auth.mjs` loopback flow succeeded — refresh token saved, verified for "Lanre Enlight" (write scope youtube.force-ssl). Patched favicon-request bug in auth script
- Backup first: all 80 videos (snippet+status) → `youtube-fixes/backup-2026-08-22.json` (full rollback possible)
- Applied 9/9 description fixes via `youtube-update.mjs apply --yes`: MT4 iPhone + Deriv/VPS CTA; Apple Music/Instagram/ChatGPT/Canva + site CTA; Nodepay PC+Mobile + VPS CTA; OpenClaw placeholder → real Contabo link; AgentRouter + direct referral link
- Unlisted 14/14 junk auto-titled videos (IDs in `youtube-fixes/unlist-junk.txt`; reversible → privacyStatus public)
- Post-fix audit: catalog 80→66 public; site links 13→20 videos, contaboRedirect 13→16, deriv 10→11, agentrouter 0→1, placeholder issues 0
- `videos.ts` resynced — AgentRouter Free Credit affiliate resource now renders on site hub
- Remaining manual: chapters for AgentRouter 31min + OpenClaw 14min videos (YouTube Studio); per-plan CJ IDs; GA4 real ID

**Session 5 — affiliate-link clarification + GA4 instructions (2026-08-22):**
- USER CLARIFIED: all Contabo VPS plans share ONE destination — there are NO per-plan links. Differentiation is by use-case paths, each with its own CJ link ID (attribution works per-link in CJ): `/cheapestvps` → dpbolvw 14573812 (generic), `/cheapestn8nvps` → kqzyfj 17183968, `/cheapest-openclaw-vps` → kqzyfj 17245853. "Per-plan CJ tracking IDs" next-step is MOOT — removed
- `/cheapest-openclaw-vps` verified working (server-side 301) and mirrored into repo `.htaccess`
- OpenClaw video description updated again: link switched from generic `/cheapestvps` to dedicated `/cheapest-openclaw-vps`
- `/vps6` `/vps8` `/vps12` redirects kept (all → generic Contabo CJ link — consistent with user's model; harmless, usable in video CTAs if wanted)
- GA4 setup instructions given to user (analytics.google.com → property → web stream → G-XXXXXXXXXX); ID still pending

**Session 6 — GA4 LIVE (2026-08-22):**
- User provided GA4 Measurement ID `G-XMN0TFX6BM` → wired into `index.html` (placeholder no-op branch removed from active path), build verified, deployed (`ed6d999`), **live tag confirmed on homepage**. Analytics unblocked after 6 weeks of placeholder
- Site funnel (YouTube → site → affiliate redirects) is now measurable; affiliate redirects themselves are server-side 301/302 (GA4 won't fire on them — measure via landing pages + CJ dashboard instead)

### Decisions
- **Core strategy: 3-tier Contabo funnel** — VPS 6 = "Start" (entry, first AI gateway), VPS 8 = "Grow" (PRIMARY product, freelancer/agency stack), VPS 12 = "Scale" (production/multi-client). Plan-based video series + playlist with natural upgrade path; separate tracking URLs `/vps6` `/vps8` `/vps12`; never claim all plans suit everything — give a simple decision rule per workload
- **Next video: "How to Host OmniRoute and n8n 24/7 on Contabo VPS 6"** — counter-programs competitor video A4ykehVQK9c (local-only install) with always-on VPS angle: PM2 persistence, port 20128, /v1 endpoint, free providers (Kiro, Qoder, Pollinations, NVIDIA NIM, Cloudflare AI), Contabo CTA at ~2:30 timestamp
- Second validated concept: "Deriv Volatility 75 bot 24/7 on a $5 Contabo VPS" — free demo funnel, stitches Deriv + Contabo referrals; avoid saturated "best forex VPS" comparison angle
- Referral mechanics standard for every video: YouTube card at sign-up/checkout timestamps, end screen chaining (related-video viewers watch longest), pinned comment with links, companion page with copy-paste commands, affiliate disclosure
- Honest positioning rule: don't promise VPS = income or unlimited free AI; sell plans on total workload (OmniRoute needs only ~2 vCPU/2GB — headroom is for n8n + Docker + clients)

### Next Steps
- **User action: complete OAuth setup** (console.cloud.google.com, same project as API key): OAuth consent screen (External, test user olatonrainyt@gmail.com) → Create OAuth client ID (Desktop app) → add `YOUTUBE_CLIENT_ID` + `YOUTUBE_CLIENT_SECRET` to `.env.local` → tell agent → agent runs `node scripts/youtube-auth.mjs` (user clicks Google login themselves) → then agent applies: backup → `apply plan-2026-08-22.json` → `unlist` the 14 junk IDs → re-run audit
- Chapters for 31-min AgentRouter video + 14-min OpenClaw video still need manual timestamps in YouTube Studio (agent has no caption/timestamp data — user action, ~10 min)
- Per-plan CJ tracking IDs for /vps6 /vps8 /vps12 — user action in CJ dashboard
- Replace GA4 placeholder (`GA_ID` in index.html) — funnel measurement still blind without it
- Site: OmniRoute companion guide + email capture/lead magnets (from earlier plan)
- Review 11 Mimosa dependency advisories (3 packages)

### Blockers & Open Questions
- GA4 ID still placeholder — cannot measure YouTube→site→referral funnel until replaced
- Per-plan Contabo CJ tracking IDs don't exist yet — user must create them in CJ Affiliate dashboard
- API key is read-only public scope (no retention/traffic-source/card-click data) — private YouTube Studio data still requires periodic manual exports (CSV/PDF) or future OAuth setup
- Video-sync CI fix (RSS→API) awaiting explicit user approval to modify `.github/workflows/`
- 11 dependency advisories (3 packages) from Mimosa scan unreviewed

---

## 2026-08-22 — SEO/AEO/GEO unblock: prerendering + per-page meta + structured data

### Last Session
2026-08-19 — AgentRouter guide + video hub entry

### Done
- Diagnosed 0 SEO/AEO/GEO visibility: SPA served empty `#root` HTML to non-JS crawlers, JS-only canonicals, single global title/description, no robots.txt/llms.txt, no structured data
- Built `scripts/prerender.mjs` (puppeteer, runs after `vite build`): renders all 11 sitemap routes to static HTML (unique titles, canonicals, JSON-LD, fully-revealed content in first byte), generates `.md` mirrors of every guide/blog page, gracefully falls back to SPA shell if no browser available (CI-safe)
- Created `components/Seo.tsx` (per-page title/description/OG/Twitter/canonical/JSON-LD) + `data/schema.ts` (Person, WebSite, Article, FAQPage, BreadcrumbList, CollectionPage)
- Wired Seo into: HomePage (Person+WebSite), GuidesLayout (Article+FAQPage+BreadcrumbList auto-generated from faqs; new `path`/`seoTitle`/`seoDescription` props), all 7 guides, Blog (CollectionPage), BlogPostPage (Article+BreadcrumbList, replaced manual title mutation)
- Added `public/robots.txt` (sitemap ref + explicit AI crawler allows: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, etc.) and `public/llms.txt` (site overview + guide/blog links with markdown mirrors)
- `.htaccess`: extensionless→`.html` rewrite for prerendered files + mod_deflate + mod_expires caching
- `App.tsx`: React.lazy code-splitting for all routes (main bundle 293KB vs single-bundle before), catch-all `NotFound.tsx` 404 route
- `index.html`: GA4 loader no-ops on placeholder ID, removed dead aistudiocdn importmap
- `public/sitemap.xml` lastmod refreshed to 2026-08-22; fixed pre-existing tsc error in CanonicalLink.tsx
- Verified: `npm run build` clean end-to-end, unique titles on all 11 pages, static canonicals, schema present, article body text in first-byte HTML, 0 hidden FadeIn elements in captures

### Decisions
- Prerender via puppeteer post-build (not SSR framework migration) — zero restructuring, captured DOM is exactly what users see; route files written as `dist{path}.html` + `.htaccess` rewrite rule (no trailing-slash 301 issues vs directory/index.html approach)
- Markdown mirrors generated at build time (always in sync with React content, never hand-maintained)
- JSON-LD generated from existing guide `faqs` data — single source of truth
- Prerenderer disables smooth-scroll + force-reveals FadeIn wrappers at capture time so no content is captured hidden; hover overlays (`group-hover:opacity-100`) intentionally left as-is
- Skipped hard 404 in .htaccess — if CI lacks a browser, prerender falls back to SPA shell and a hard 404 rule would break every route; client-side NotFound handles UX instead
- Puppeteer devDependency; build never fails on prerender errors (warn + exit 0)

### Next Steps
- Submit sitemap in Google Search Console + URL-inspect/request indexing for all 11 URLs
- Replace GA4 placeholder (`GA_ID` in index.html) with real measurement ID and link GSC ↔ GA4
- Validate schema in Google Rich Results Test (FAQPage on guides)
- Monitor GSC impressions over 2–4 weeks; target first impressions on "n8n tutorial", "cheapest VPS", "agentrouter" clusters
- Tailwind/Font Awesome CDN → self-hosted builds (LCP improvement)

### Blockers & Open Questions
- GA4 ID still placeholder (loader now skips gracefully — replace `GA_ID` in index.html)
- Compression/caching headers not observed on live homepage — mod_deflate/mod_expires may be disabled in HestiaCP Apache (IfModule guards prevent errors; enable modules server-side if possible) <!-- TODO: verify -->
- Tailwind CDN + Font Awesome CDN still runtime-loaded (LCP risk; PostCSS migration deferred)
- n8n webhook for blog publishing still unverified

**Deploy verified 2026-08-22:** CI runs 32551124066 / 32553103251 / 32553388193 prerendered all routes on the runner and deployed; live checks confirmed guides serve prerendered HTML (unique titles + FAQ content in first byte), robots.txt / llms.txt / .md mirrors all 200. One follow-up fix: `/blog` 301s to `/blog/` (Apache DirectorySlash wins over .htaccess rewrite because dist/blog/ is a physical directory) — resolved by adopting `/blog/` as the canonical URL in sitemap.xml, llms.txt, and Blog Seo/schema; page-level Seo now owns the canonical tag (`data-page` marker, CanonicalLink defers).

---

## 2026-08-19 — AgentRouter guide + video hub entry

### Last Session
2026-08-12 — Two new pillar pages (Web/App Dev) + canonical duplicate fix + SEO/AEO/GEO docs

### Done
- Built `AgentrouterGuide.tsx` (`/guides/agentrouter-setup`) — pillar-style guide covering 5 setup methods (OpenCode, Claude CLI, Claude App, Google Antigravity, OmniRoute on a cheap VPS), what AgentRouter is, method-selection guidance, security/cost reality check
- CTA on guide links to user's AgentRouter referral: `https://agentrouter.org/register?aff=2CTV`
- Added video to `data/videos.ts` (youtubeId GYvYHpi4DJk, category AI Automation) with AgentRouter affiliate + 3 lanreenlight affiliate resources — renumbered all video IDs sequentially (now 14 videos)
- Added route `/guides/agentrouter-setup` to `App.tsx`
- Updated `GuidesLayout.tsx` CTA to render external `<a>` links (was react-router Link only — couldn't open external URLs)
- Added AgentRouter quick-link card in `VideoHub.tsx` (7 cards, grid `md:grid-cols-4`)
- Cross-linked AgentRouter guide in `N8nGuide.tsx` + `VpsGuide.tsx` relatedGuides
- Updated `public/sitemap.xml` with agentrouter-setup URL
- Build passes cleanly (`npm run build` successful)

### Decisions
- AgentRouter guide NOT added to navbar dropdown — reachable via video hub quick link + internal cross-links (user preference)
- Guide CTA uses external anchor (new tab) for the referral link
- Video category set to AI Automation (coding agents/gateway routing)
- AgentRouter guide relatedGuides point to AI Automation, VPS, Web Dev, App Dev — no reciprocal nav entry

### Next Steps
- Push to main to trigger GitHub Actions deploy
- Submit sitemap.xml to Google Search Console (includes new agentrouter-setup URL)
- Request indexing for `/guides/agentrouter-setup`
- Monitor Search Console for the AgentRouter page impressions (target: "agentrouter", "free claude code credit", "agentrouter opencode")

### Blockers & Open Questions
- n8n webhook for blog publishing: posts in `public/posts/` — can't verify webhook is active
- GA4 tracking ID is a placeholder
- AgentRouter guide content based on video description + public docs — unverified against full transcript
- No test or lint scripts exist in package.json

---

## 2026-08-12 — Two new pillar pages (Web/App Dev) + canonical duplicate fix + SEO/AEO/GEO docs

### Last Session
2026-08-06 — Four pillar pages built + homepage search-intent rewrite + deploy ready

### Done
- Built `WebDevelopmentGuide.tsx` (`/guides/web-development`) — full-stack stack selection, frontend/backend, deployment, Core Web Vitals, OWASP, app dev bridge
- Built `AppDevelopmentGuide.tsx` (`/guides/app-development`) — PWA vs native, React Native vs Flutter, ASO, monetization, launch/growth
- Added both routes to `App.tsx`
- Added both guides to `Navbar.tsx` Guides dropdown (6 total)
- Fixed `About.tsx` Web Development card link (was pointing to n8n guide — now `/guides/web-development`)
- Expanded `VideoHub.tsx` and `Expertise.tsx` quick links to all 6 guides (grids now `md:grid-cols-3`)
- Cross-linked all 4 original pillar pages' relatedGuides to the 2 new guides
- Updated `public/sitemap.xml` with 2 new URLs
- Created `CanonicalLink.tsx` — dynamic per-route canonical tag to fix Google "Duplicate without user-selected canonical" error
- Updated `CONTENT_STRATEGY.md` — added Cluster 5 (Web Dev) + Cluster 6 (App Dev), aggressive SEO/AEO/GEO guidelines
- Updated README.md, CHANGELOG.md
- Build passes cleanly (`npm run build` successful)

### Decisions
- Web/app development are now 5th and 6th topic clusters — site now covers all 6 target ranking topics: AI automation, server management, trading bots, blockchain/crypto nodes, web development, app development
- Web Development guide includes an app-development bridge section (progressive: web → PWA → native)
- App Development guide links back to Web Development guide — backend-first architecture positioning
- Aggressive SEO/AEO/GEO adopted in CONTENT_STRATEGY.md: FAQ schema, direct-answer formatting (AEO), entity authority + proprietary metrics (GEO)

### Next Steps
- Push to main to trigger GitHub Actions deploy
- Resubmit sitemap.xml to Google Search Console
- Request indexing for `/guides/web-development` and `/guides/app-development`
- Monitor Search Console for duplicate-canonical resolution after CanonicalLink deploy
- Replace GA4 placeholder (`G-XXXXXXXXXX`) with real measurement ID
- Add structured data (Service, Article, FAQ schema) — Phase 3

### Blockers & Open Questions
- n8n webhook for blog publishing: posts in `public/posts/` — can't verify webhook is active
- GA4 tracking ID is a placeholder
- No test or lint scripts exist in package.json

---

## 2026-08-06 — Four pillar pages built + homepage search-intent rewrite + deploy ready

### Last Session
2026-07-11 — Content strategy documentation + sitemap/SEO fixes

### Done
- Created `GuidesLayout.tsx` — shared pillar page template with sticky sidebar TOC navigation
- Built all 4 pillar pages:
  - `N8nGuide.tsx` — `/guides/n8n-automation` targeting "n8n tutorial", "n8n workflow automation", "n8n AI agent"
  - `VpsGuide.tsx` — `/guides/vps-hosting-guide` targeting "cheapest VPS 2026", "best VPS for crypto nodes", "VPS hosting comparison"
  - `TradingGuide.tsx` — `/guides/algorithmic-trading` targeting "MT5 Expert Advisor", "prop firm challenge EA", "forex trading bot"
  - `CryptoNodeGuide.tsx` — `/guides/crypto-node-ops` targeting "crypto node passive income", "DePIN node setup", "validator node requirements"
- Added 4 routes to `App.tsx` for all pillar pages
- Added Guides dropdown to `Navbar.tsx` (desktop + mobile) with icons and descriptions
- Restructured homepage sections for search intent:
  - `Hero.tsx` — added pillar guide CTAs, keyword-rich tagline
  - `About.tsx` — added pillar page links + keyword-optimized copy
  - `Expertise.tsx` — added pillar guide links to capability cards
  - `Algorithms.tsx` — added link to full trading guide + EA descriptions targeting search terms
  - `VideoHub.tsx` — added 4 quick-link cards to pillar guides
- Updated `public/sitemap.xml` with 4 new pillar URLs
- Updated `README.md` with new project structure, features, components list
- Updated `CHANGELOG.md` with comprehensive entry for all changes
- Build passes cleanly (`npm run build` successful)
- Preview server verified at localhost:3001

### Decisions
- Pillar pages use dedicated `/guides/` route prefix (not `/blog/`) to distinguish authoritative hubs from timely posts
- Shared `GuidesLayout` component ensures consistent UX across all 4 pillars
- Navbar dropdown uses hover on desktop, tap-to-expand on mobile
- Homepage CTAs link directly to pillar pages (not blog) for immediate authority capture
- Keyword targeting based on Search Console impressions + keyword research: "n8n tutorial", "cheapest VPS", "MT5 Expert Advisor", "prop firm challenge EA", "crypto node passive income"
- **Aggressive SEO/AEO/GEO strategy adopted:** pillar pages built for Google ranking, AI Overviews/Perplexity extraction, and LLM citation authority — includes FAQ schema, structured data, entity credentials, proprietary metrics, direct-answer formatting

### Next Steps
- Push to main to trigger GitHub Actions deploy to HestiaCP VPS
- Submit updated sitemap.xml to Google Search Console
- Request indexing for new pillar page URLs via URL Inspection tool
- Monitor Search Console for pillar page impressions/clicks over 30 days
- Replace GA4 placeholder (`G-XXXXXXXXXX`) with real measurement ID

### Blockers & Open Questions
- n8n webhook for blog publishing: posts in `public/posts/` — can't verify webhook is active
- GA4 tracking ID is a placeholder
- No test or lint scripts exist in package.json

---

## 2026-07-11 — Content strategy documentation + sitemap/SEO fixes

### Last Session
2026-07-11 — Google Search Console setup + SPA SEO fix

### Done
- Created `CONTENT_STRATEGY.md` — comprehensive content strategy document covering:
  - Current content inventory (pages, sections, blog posts, video library)
  - 4 content clusters: n8n Automation, VPS & Infrastructure, Algorithmic Trading, Crypto Nodes
  - Spec for 4 pillar pages with route patterns, templates, and internal linking rules
  - Video-to-blog conversion workflow for all 13 existing videos
  - SEO guidelines, affiliate link strategy, implementation roadmap
- Created `public/sitemap.xml` with all 4 pages (home, blog, 2 posts)
- Populated `data/blog.ts` with static imports of JSON blog posts (was empty array) — fixes SPA crawler visibility
- Rebuilt `dist/` with sitemap and inlined blog data
- Updated CHANGELOG.md with entries for both sessions

### Decisions
- 4 topic clusters defined: n8n, VPS, Trading, Crypto — matching existing video categories and expertise areas
- Pillar pages at `/guides/{cluster-slug}` — separate from blog, serving as authoritative hub pages
- Blog post taxonomy matches video categories for consistency
- Affiliate links consolidated into pillar pages (contextual, not promotional)
- Blog post data moved from dynamic-only to static imports for crawler visibility

### Next Steps
- Deploy the new build to server
- Submit `https://lanreenlight.com/sitemap.xml` in Search Console
- Use URL Inspection tool to request indexing of `/blog` and both blog post URLs
- Begin Phase 1: create 4 pillar pages as standalone routes
- Convert top-priority videos into blog posts (P0 from each cluster)
- Replace GA4 placeholder (`G-XXXXXXXXXX`) with real measurement ID

### Blockers & Open Questions
- n8n webhook for blog publishing: posts in `public/posts/` — can't verify webhook is active
- GA4 tracking ID is a placeholder
- No test or lint scripts exist in package.json

---

## 2026-07-11 — Google Search Console setup + SPA SEO fix

### Last Session
2026-07-11 — Upgraded documentation to full spec

### Done
- Created `public/sitemap.xml` with all 4 pages (home, blog, 2 posts)
- Populated `data/blog.ts` with static imports of JSON blog posts (was empty array) — fixes crawler visibility for SPA routes
- Rebuilt `dist/` with sitemap and inlined blog data
- Added `resolveJsonModule` is already handled by Vite esbuild (no tsconfig change needed)
- Note: blog posts exist in both `data/posts/` and `public/posts/` — `data/posts/` is the source for the app, `public/posts/` is served as static JSON for external use

### Decisions
- Blog post data moved from dynamic-only (`import.meta.glob`) to static imports in `data/blog.ts` so content renders on first paint for crawlers
- Dynamic imports in `Blog.tsx`/`BlogPostPage.tsx` kept as complement — Vite deduplicates at build time
- Domain property verification via DNS TXT record (no meta tag needed)

### Next Steps
- Deploy the new build to server (SCP via CI/CD or manually)
- Submit `https://lanreenlight.com/sitemap.xml` in Search Console
- Use URL Inspection tool to request indexing of `/blog` and both blog post URLs
- Replace GA4 placeholder (`G-XXXXXXXXXX`) with real measurement ID
- Add more blog posts or confirm n8n webhook is actively publishing

### Blockers & Open Questions
- n8n webhook for blog publishing: posts in `public/posts/` — can't verify webhook is active
- GA4 tracking ID is a placeholder
- No test or lint scripts exist in package.json

---

## 2026-07-11 — Upgraded documentation to full spec

### Last Session
2026-07-11 — Initial documentation scaffolding

### Done
- Upgraded AGENTS.md with all rules: session protocol, exploration scope, patch-not-overwrite, uncertainty, SECURITY/SAFETY boundary, agent boundaries, build commands verified from package.json
- Created SAFETY.md with data handling guardrails, rollback triggers, and HITL checkpoints — zero overlap with SECURITY.md
- Rewrote MEMORY.md to top-first append format (newest entries at top) with 500-line archive note
- Renamed file from lowercase `memory.md` to `MEMORY.md`
- Updated CHANGELOG.md with docs upgrade entry
- Updated CONTRIBUTING.md references from `memory.md` to `MEMORY.md`
- Verified actual commands from package.json: `npm run dev` → vite, `npm run build` → vite build, `npm run preview` → vite preview — no lint/test scripts exist
- Verified exploration at max depth 3: stack (React 19 + TS + Vite 6) and entry point (index.tsx → App.tsx) identified
- Flagged unverifiable content with `<!-- TODO: verify -->` markers

### Decisions
- MEMORY.md uses top-first append: newest entries at top, archive at 500 lines
- AGENTS.md references `MEMORY.md` (uppercase) consistently throughout
- SAFETY.md created as separate file with zero overlap vs SECURITY.md
- Agent additions marked with `<!-- agent-updated -->` tags
- Unverifiable claims marked with `<!-- TODO: verify -->` inline

### Next Steps
- Replace GA4 placeholder (`G-XXXXXXXXXX`) with real measurement ID
- Add more blog posts or confirm n8n webhook is actively publishing <!-- TODO: verify -->
- Consider moving from Tailwind CDN to PostCSS for production builds
- Add form submission handler for Contact section
- Implement search/filter for Video Hub
- Add dark mode support
- Set up uptime monitoring

### Blockers & Open Questions
- n8n webhook for blog publishing: `public/posts/` contains 2 post files but cannot verify webhook is currently active <!-- TODO: verify -->
- GA4 tracking ID `G-XXXXXXXXXX` is a placeholder — needs real ID before production analytics work
- No test script exists in package.json — needs testing framework decision (vitest?)
- No lint script exists in package.json

---

## 2026-07-11 — Initial documentation scaffolding

### Last Session
(initial session)

### Done
- Created README.md, AGENTS.md, MEMORY.md, CHANGELOG.md
- Created CONTRIBUTING.md, SECURITY.md, ARCHITECTURE.md, DEPLOY_GUIDE.md
- Populated all files with accurate project-specific content after exploring the codebase
- Set up fixed 5-field format for MEMORY.md and date-based category-tagged format for CHANGELOG.md

### Decisions
- MEMORY.md uses fixed 5-field format: Last Session, Done, Decisions, Next Steps, Blockers & Open Questions
- CHANGELOG.md uses date-based entries with Added/Fixed/Changed/Removed categories (no semver)
- Session protocol: read-before-write, append-only memory updates
- AGENTS.md includes escalation rule: flag missing deps in Blockers instead of fabricating

### Next Steps
- (see above — superseded by subsequent session)

### Blockers & Open Questions
- BLOG_POSTS array in `data/blog.ts` is empty — posts served from `public/posts/` via n8n webhook; confirm webhook is active
- GA4 tracking ID is a placeholder — needs real ID before production analytics work
- No tests exist yet — need to decide on testing framework (vitest?)
