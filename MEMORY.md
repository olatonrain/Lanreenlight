# Project Memory

Newest entries first. See MEMORY_ARCHIVE.md for older sessions.

<!-- agent-updated: 2026-08-22 — SEO/AEO/GEO unblock: prerendering, per-page meta, schema, robots/llms.txt -->

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

**Deploy verified 2026-08-22:** CI run 32551124066 prerendered all 11 routes on the runner and deployed; live checks confirmed `/guides/n8n-automation` serves prerendered HTML (unique title + FAQ content in first byte), robots.txt / llms.txt / .md mirrors all 200.

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
