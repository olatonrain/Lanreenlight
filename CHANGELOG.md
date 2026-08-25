# Changelog

Date-based, category-tagged entries. Categories: Added, Fixed, Changed, Removed.

---

2026-08-25

Added
- `scripts/request-indexing.mjs` — Google Indexing API client (zero extra deps; JWT auth via service account key) that pings every sitemap URL with `URL_UPDATED`; run after content deploys
- Mandatory SEO/AEO/GEO preservation rules in `AGENTS.md` — 10 non-negotiables + pre-deploy verification checks, so future feature/page work can never silently regress traffic
- "Traffic Protection Policy" section in `CONTENT_STRATEGY.md` linking the full rule set
- Mandatory weekly content cadence: trend-driven blog post, ≥1,200 words, product-linked with CTA — workflow in `CONTENT_STRATEGY.md` ("Trend-Driven Monetized Posts"), enforcement pointer in `AGENTS.md` ("Content Cadence")

Changed
- `AGENTS.md` — corrected stale lines: routing/hosting/build descriptions now reflect prerender + real-404 reality; documented the indexing script in the commands list
- `CONTENT_STRATEGY.md` — new mandatory monetized-post workflow: trend research loop, product mapping table, conversion post anatomy, promotion checklist, UTM-based measurement

---

2026-08-22

Added
- Build-time prerendering (`scripts/prerender.mjs`, puppeteer) — every sitemap route ships as full static HTML with content, titles, canonicals, and schema in the first byte; also generates markdown mirrors (`.md`) of every guide and blog page for AI/LLM crawlers
- `components/Seo.tsx` — per-page title, meta description, Open Graph, Twitter tags, and JSON-LD injection
- `data/schema.ts` — schema.org helpers: Person, WebSite, Article, FAQPage, BreadcrumbList, CollectionPage
- `components/NotFound.tsx` — catch-all 404 route (was homepage soft-404)
- `public/robots.txt` — sitemap reference + explicit allow rules for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, etc.)
- `public/llms.txt` — LLM-discoverable site overview linking all guides (with markdown mirrors) and blog posts
- JSON-LD on every page type: Person + WebSite (home), Article + FAQPage + BreadcrumbList (guides), Article + BreadcrumbList (blog posts), CollectionPage (blog index)
- `.htaccess` — extensionless→`.html` rewrite for prerendered files, mod_deflate compression, mod_expires caching headers
- Prerendered `404.html` served via `ErrorDocument` — unknown URLs return a real HTTP 404 status with the branded 404 page (`noindex`), instead of HTTP 200 serving the homepage

Changed
- `package.json` — `npm run build` now runs `vite build && node scripts/prerender.mjs`; puppeteer added as dev dependency
- All 7 guides + blog pages — unique keyword-targeted titles and meta descriptions via Seo/GuidesLayout props (`seoTitle`, `seoDescription`, `path`)
- `App.tsx` — route-level code splitting (React.lazy + Suspense), homepage Person/WebSite schema, catch-all 404 route
- `BlogPostPage.tsx` — manual title/description mutation replaced with Seo component + Article schema
- `public/sitemap.xml` — refreshed lastmod dates (2026-08-22)
- `index.html` — GA4 loader now no-ops while the measurement ID is a placeholder; removed dead aistudiocdn importmap
- Prerender failures are now fatal (build exits 1) — every route is served from a prerendered file, so a partial prerender must never reach production

Fixed
- Canonical tags now present in initial HTML per route (captured by prerender) — previously JS-only, causing Search Console "Duplicate without user-selected canonical"
- `CanonicalLink.tsx` — missing React import (tsc error)
- Scroll-reveal content no longer captured hidden by prerenderer (disables smooth scroll, force-reveals FadeIn wrappers)
- Soft-404 eliminated: unknown URLs (e.g. `/guides/typo`, `/blog/missing`) previously returned HTTP 200 with homepage content and homepage canonical — now return HTTP 404 with a `noindex` branded page

---


2026-08-19

Added
- AgentrouterGuide.tsx — new guide at `/guides/agentrouter-setup` covering 5 setup methods (OpenCode, Claude CLI, Claude App, Google Antigravity, OmniRoute + cheap VPS)
- New video entry in data/videos.ts (AgentRouter / free Claude Code credit, youtubeId GYvYHpi4DJk)
- AgentRouter quick-link card in VideoHub.tsx (7 cards total, grid now md:grid-cols-4)

Changed
- GuidesLayout.tsx — CTA now renders an external `<a>` (new tab) when the link is a URL, instead of react-router Link
- App.tsx — added `/guides/agentrouter-setup` route
- data/videos.ts — renumbered all video IDs sequentially after inserting the new video (14 videos total)
- public/sitemap.xml — added agentrouter-setup URL
- N8nGuide.tsx, VpsGuide.tsx — cross-linked AgentRouter guide in relatedGuides

---

2026-08-12

Added
- Two new SEO-optimized pillar pages: WebDevelopmentGuide (`/guides/web-development`), AppDevelopmentGuide (`/guides/app-development`)
- CanonicalLink.tsx — dynamic per-route canonical tags to fix duplicate-content indexing
- CONTENT_STRATEGY.md — Cluster 5 (Web Development) and Cluster 6 (App Development) specs
- Aggressive SEO/AEO/GEO guidelines in CONTENT_STRATEGY.md (structured data, direct answers, entity authority)

Changed
- App.tsx — added routes for web-development and app-development guides
- Navbar.tsx — Guides dropdown now lists all 6 pillar pages
- About.tsx — Web Development card now links to `/guides/web-development` (was n8n guide)
- VideoHub.tsx — quick links expanded to 6 guides (grid: md:grid-cols-3)
- Expertise.tsx — quick link cards expanded to 6 guides + updated intro copy
- All 4 original pillar pages — cross-linked to the 2 new guides
- public/sitemap.xml — added web-development and app-development URLs
- README.md — updated project structure, features, SEO notes

Fixed
- Duplicate-without-canonical Google error — each route now declares its own canonical URL

---

2026-08-06

Added
- Four SEO-optimized pillar pages at `/guides/{slug}`: N8nGuide, VpsGuide, TradingGuide, CryptoNodeGuide
- GuidesLayout.tsx — shared pillar page template with sticky sidebar navigation
- Guides dropdown in Navbar.tsx (desktop + mobile) linking to all 4 pillar pages
- Quick links to pillar guides in VideoHub.tsx
- Pillar guide CTAs in Hero.tsx, About.tsx, Expertise.tsx, Algorithms.tsx

Changed
- Hero.tsx — restructured hero targeting "AI Automation Engineer" keyword, added pillar guide CTAs
- About.tsx — added pillar page links + keyword-rich copy
- Expertise.tsx — added pillar guide links to capability cards
- Algorithms.tsx — added link to full trading guide + EA descriptions targeting search terms
- VideoHub.tsx — added 4 quick-link cards to pillar guides, added Link import
- data/blog.ts — static imports for blog posts (already in place)
- public/sitemap.xml — added 4 new pillar page URLs
- README.md — updated project structure, features, and components list

Fixed
- Blog post crawler visibility — inlined blog data in data/blog.ts via static imports
- SPA sitemap errors — blog pages now serve actual content instead of home page shell

---

2026-07-11

Added
- CONTENT_STRATEGY.md — content cluster strategy with 4 pillar page specs, video-to-blog conversion workflow, internal linking rules, SEO guidelines, and implementation roadmap
- public/sitemap.xml — sitemap with all 4 pages (home, blog, 2 blog posts)
- Blog post data now statically imported in data/blog.ts (was empty array) — fixes SPA crawler visibility

Changed
- data/blog.ts — replaced empty BLOG_POSTS array with static imports from data/posts/\*.json

2026-07-11

Added
- SAFETY.md — data handling limits, deployment guardrails, rollback triggers, HITL checkpoints (zero overlap with SECURITY.md)
- AGENTS.md: session protocol (mandatory 4-step), exploration scope rules, patch-not-overwrite rule, uncertainty rule, SECURITY/SAFETY boundary, agent boundaries, verified build commands from package.json
- MEMORY.md: top-first append format (newest entries at top), 500-line archive note
- `<!-- TODO: verify -->` markers on unverifiable content throughout docs

Changed
- Renamed `memory.md` to `MEMORY.md` for consistent casing across all documentation
- Rewrote MEMORY.md format: new entries appended at top (most recent first) per spec
- Updated CONTRIBUTING.md references from `memory.md` to `MEMORY.md`
- Updated AGENTS.md documentation maintenance table to include SAFETY.md

---

2026-07-11

Added
- Project documentation files: README.md, AGENTS.md, MEMORY.md, CHANGELOG.md, CONTRIBUTING.md, SECURITY.md, ARCHITECTURE.md, DEPLOY_GUIDE.md
- AGENTS.md: skill usage rules, session protocol, escalation rule, documentation conventions
- MEMORY.md: fixed 5-field format (Last Session, Done, Decisions, Next Steps, Blockers & Open Questions)
- CHANGELOG.md: date-based, category-tagged entries replacing semver format

Changed
- Renamed from `CHANGELOG.md` to new format standards

---

2026-02-xx — Initial Portfolio

Added
- React 19 + TypeScript + Vite 6 project scaffold
- Tailwind CSS via CDN, Font Awesome 6, Google Fonts (Manrope + Playfair Display)
- Cinematic film grain overlay and scroll-triggered fade-in animations
- Glassmorphism navigation bar with scroll-aware styling
- Hero section — full-screen with portrait image, tagline, and CTAs
- About section — professional background and bio
- Expertise section — service capability cards (n8n, LLM, web dev, cloud, trading)
- Video Hub — YouTube video gallery with resource/affiliate links
- Partnership section — "Why partner with me" value propositions
- Stats section — key metrics and achievements
- Algorithms section — Expert Advisor trading bots (Flux Scalper Pro, Orbit Swing, Prop Guard v2)
- Contact section — CTA for collaboration
- Blog — listing page with dynamic post rendering
- BlogPostPage — individual blog post view with HTML content
- React Router v7 with SPA routing and Apache `.htaccess` fallback
- Open Graph / Twitter meta tags for social sharing
- GA4 analytics tracking (placeholder)
- SEO sitemap.xml
- Responsive design with mobile hamburger menu
- GitHub Actions — Deploy workflow: build + SCP to HestiaCP on push to main
- GitHub Actions — Video Sync: daily YouTube RSS to data/videos.ts update
- .htaccess for Apache SPA rewrite support
- sync_repo.sh helper script for quick git workflows
- scripts/sync-youtube.mjs — YouTube RSS parser with category inference and resource extraction

Fixed
- Hero image path resolved 404 error (moved to public/)
- Hero image opacity adjusted for readability (multiple iterations)
- Apache redirect loop resolved via .htaccess

Changed
- Hero image optimized (1.1MB to 87KB)
- Social links and copy refinements
- SEO metadata and dynamic blog titles improved

Removed
- (none)
