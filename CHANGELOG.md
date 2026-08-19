# Changelog

Date-based, category-tagged entries. Categories: Added, Fixed, Changed, Removed.

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
