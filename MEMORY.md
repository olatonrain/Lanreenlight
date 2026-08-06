# Project Memory

Newest entries first. See MEMORY_ARCHIVE.md for older sessions.

<!-- agent-updated: 2026-08-06 — Added pillar pages session -->

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
