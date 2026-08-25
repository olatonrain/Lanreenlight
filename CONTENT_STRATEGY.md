# Content Strategy

## Overview

Portfolio and knowledge hub for Lanre (AI Automation & Systems Engineer). The site positions Lanre as an authority in AI automation, VPS infrastructure, web & app development, algorithmic trading, and crypto node operations — with a monetization model built on affiliate partnerships (hosting, VPS, trading tools) and digital products (Expert Advisors).

**SEO/AEO/GEO Strategy:** Aggressive search intent optimization across all three engine types:
- **SEO** — Traditional Google/Bing ranking via pillar pages, topic clusters, internal linking, structured data
- **AEO** — Answer Engine Optimization for AI Overviews, Perplexity, ChatGPT search — concise Q&A sections, FAQ schema, direct answer formatting
- **GEO** — Generative Engine Optimization for LLM citations — authoritative entity mentions, comprehensive coverage, citation-worthy data points

## Traffic Protection Policy (MANDATORY — full rules in AGENTS.md "SEO/AEO/GEO Preservation Rules")

Existing traffic is the top priority for every content change. The short version:

- Every indexed URL is permanent — moves require a 301, never a silent delete or repurpose.
- New pages go into `sitemap.xml` (fresh lastmod) + `llms.txt` + prerender + unique title/description/canonical/JSON-LD, then get pinged via `node scripts/request-indexing.mjs`.
- Never serve soft-404s, never `noindex` real pages, never Disallow crawlers in robots.txt, never shrink or gut indexed content without reason.
- After every content deploy, run the mandatory checks (build, curl title/canonical/noindex, 404 probe) before declaring done.

<!-- agent-updated: 2026-08-25 — Added traffic protection policy linking AGENTS.md rules -->

## Current State (2026-07-11)

### Page Inventory

| Route | Type | Description |
|-------|------|-------------|
| `/` (Home) | Landing / mega-page | 8 one-page sections: Hero, About, Expertise, VideoHub, Partnership, Stats, Algorithms, Contact |
| `/guides/n8n-automation` | Pillar | AI Automation Guide (n8n, AI agents, LLM workflows) |
| `/guides/vps-hosting-guide` | Pillar | Cheapest VPS Guide (server management, hosting) |
| `/guides/algorithmic-trading` | Pillar | Forex Trading Bots Guide (MT5 EAs, prop firms) |
| `/guides/crypto-node-ops` | Pillar | Crypto Node Guide (DePIN, blockchain nodes) |
| `/guides/web-development` | Pillar | Full-Stack Web Development Guide |
| `/guides/app-development` | Pillar | App Development Guide (React Native, PWA, ASO) |
| `/guides/agentrouter-setup` | Guide | AgentRouter Setup Guide (free Claude Code credit, AI gateway, 5 methods) |
| `/blog` | Listing | Blog post listing (static import from `data/posts/`) |
| `/blog/:id` | Article | Individual blog post (loaded by ID from `data/posts/`) |

### Homepage Sections

| Section | Topic | Content Type |
|---------|-------|-------------|
| Hero | Brand positioning — "Architecting Systems That Scale" | Headline + CTA |
| About | Founder intro, MetroHyp Digital, 3yr n8n experience | Bio copy |
| Expertise | 5 service areas: n8n, AI, Web Dev, VPS, Revenue Systems | Cards |
| VideoHub | Video library (13 videos: Forex 7, Crypto 3, AI Automation 1, Node Ops 0) | Video grid + filters |
| Partnership | Affiliate value props for hosting/infra brands | Copy + reasons |
| Stats | Metrics (30+ apps, 100K MAU, 40-60% cost reduction) | Data display |
| Algorithms | 3 Expert Advisors (Flux Scalper Pro, Orbit Swing, Prop Guard v2) | Product cards |
| Contact | Newsletter (Scalability Weekly) + partnership CTA | Form + CTAs |

### Blog Posts

| Title | Date | Category | Type |
|-------|------|----------|------|
| The Shift: Why I Left Traditional Marketing | 2026-01-20 | Philosophy | Personal narrative |
| From Digital Marketing to AI Architecture: My Evolution | 2026-01-19 | My Journey | Personal narrative |

### Video Library (by category)

| Category | Count | Example Titles |
|----------|-------|----------------|
| Forex | 7 | n8n VPS Setup Blueprint, Automate Trading Bot, AI Is Changing Everything |
| Crypto | 3 | Bless Network $1000, Nodepay $1000, Crypto Beginner Mistakes |
| AI Automation | 1 | The Confidence Lie — AI Hallucination |
| Node Ops | 0 | — |

### Key Observations

- **Zero pillar pages** — all content lives on the home page or in blog posts
- **No topic clusters** — blog posts are personal narratives, not topical guides
- **13 videos have no corresponding blog posts** — lost SEO opportunity
- **Internal linking is absent** — no links between related content
- **Video categories exist** but blog posts have no consistent taxonomy

---

## Content Clusters

Four natural topic clusters emerge from existing content:

### Cluster 1: n8n Automation

**Target keywords:** n8n workflow automation, n8n self-hosted, n8n VPS setup, n8n AI integration, automate with n8n

#### Pillar Page
- **Route:** `/guides/n8n-automation`
- **Title:** n8n Automation Guide — From Zero to Production Systems
- **Scope:** What n8n is, self-hosting vs cloud, workflow design patterns, AI integration, webhooks, error handling, scaling
- **Links to every cluster piece below**

#### Cluster Content (convert videos → blog posts)

| Priority | Title | Video Source | Notes |
|----------|-------|-------------|-------|
| P0 | n8n VPS Setup Blueprint — Charge Clients $500 | Video #6 | Step-by-step setup guide |
| P0 | Is Self-Hosting n8n on $3.99 VPS a Mistake? | Video #7 (RPPJkD452iU) | Pros/cons comparison |
| P1 | How to Use n8n Free Forever — Self-Hosted Guide | Video #8 (SvipG4uv0E4) | Getting started guide |
| P1 | n8n + AI: Building Intelligent Workflows with LLMs | Expertise section + videos | AI integration deep-dive |
| P2 | Your AI Agent Said "Done" — But Did It Actually Do Anything? | Video #4 (Gf6wQzVN2jg) | AI reliability in automation |
| P0 | AgentRouter Setup — Free Claude Code Credit (5 Methods) | Video #14 (GYvYHpi4DJk) | AI gateway routing for coding agents |

### Cluster 2: VPS & Cloud Infrastructure

**Target keywords:** cheapest VPS, VPS for automation, VPS comparison 2026, cloud hosting Africa, n8n VPS, Docker VPS

#### Pillar Page
- **Route:** `/guides/vps-hosting-guide`
- **Title:** The Complete VPS Hosting Guide — Choosing, Setting Up, and Optimizing
- **Scope:** VPS types, providers (OpenClaw, Hostinger, etc.), setup (HestiaCP, Docker), security, monitoring, cost comparison
- **Location for affiliate link consolidation**

#### Cluster Content

| Priority | Title | Video Source | Notes |
|----------|-------|-------------|-------|
| P0 | I Found the CHEAPEST OpenClaw VPS | Video #1 | VPS review/comparison |
| P0 | Cheapest VPS — Best Cheap VPS in 2025 for < $5 | Video #11 (6aKpNFdb_Wk) | Budget VPS roundup |
| P1 | Docker, Coolify, Dokploy — Which Deployment Tool Wins? | From Expertise section | Deployment comparison |
| P1 | Ubuntu Server Optimization for Production Apps | General expertise | Performance tuning guide |

### Cluster 3: Algorithmic Trading & Forex Bots

**Target keywords:** forex trading bot, algorithmic trading, Expert Advisor, MT5 automation, prop firm challenge EA, trading bot setup

#### Pillar Page
- **Route:** `/guides/algorithmic-trading`
- **Title:** Algorithmic Trading Guide — Building, Testing, and Deploying Forex Bots
- **Scope:** EA types, backtesting, prop firm challenges, risk management, MT5 vs cTrader, broker selection
- **Product page for Expert Advisors lives here**

#### Cluster Content

| Priority | Title | Video Source | Notes |
|----------|-------|-------------|-------|
| P0 | Automate Your Trading — Bot That Made $1,023/Month | Video #9 (ZNUfwpIVpPE) | Bot setup case study |
| P1 | Prop Guard v2 — Pass Prop Firm Challenges with 92% Success | From Algorithms section | Product deep-dive |
| P1 | Flux Scalper Pro vs Orbit Swing — Which EA Is Right for You? | From Algorithms section | EA comparison |
| P2 | AI in Trading — How LLMs Are Changing Algorithmic Strategies | Video #5 (REM5NipOtro) | AI+trading intersection |

### Cluster 4: Crypto Node Operations (DePIN)

**Target keywords:** crypto node passive income, DePIN nodes, blockchain node setup, VPS for crypto, Humanode, Bless Network

#### Pillar Page
- **Route:** `/guides/crypto-node-ops`
- **Title:** Crypto Node Operations Guide — Passive Income Through DePIN
- **Scope:** What is DePIN, node types, hardware/VPS requirements, project evaluation, income projections, tax considerations

#### Cluster Content

| Priority | Title | Video Source | Notes |
|----------|-------|-------------|-------|
| P0 | How I Made Bless Network Pay Me $1,000 | Video #10 | Case study with setup |
| P0 | I Made Nodepay $1,000 on a $5 VPS (DePIN) | Video #13 | DePIN earnings guide |
| P1 | $1,000 Mistakes Crypto Beginners Regret Making | Video #12 | Beginner pitfalls |
| P2 | Humanode, Fizznode, Hemi — Node Operator Comparison | From blog post | Project comparison |

### Cluster 5: Web Development

**Target keywords:** web development, full-stack developer, React web app, website development cost, how to build a website, web application development

#### Pillar Page
- **Route:** `/guides/web-development`
- **Title:** Full-Stack Web Development Guide — Build, Launch, and Scale
- **Scope:** stack selection, frontend (React/TS/Tailwind), backend (APIs, auth, databases), deployment (Docker, Nginx, VPS), performance/Core Web Vitals, SEO in SPAs, OWASP security
- **Location for web development service conversions**

#### Cluster Content

| Priority | Title | Source | Notes |
|----------|-------|--------|-------|
| P1 | From Digital Marketer to AI Architect — The Tech Stack | Blog post | Stack rationale |
| P1 | Deploying a React App on a VPS (CI/CD) | Expertise + VPS guide | Deployment deep-dive |
| P2 | React 19 + Vite: A Production Setup | General expertise | Tooling guide |

### Cluster 6: App Development

**Target keywords:** app development, mobile app development cost, React Native, how to make an app, PWA, app store optimization, cross-platform app

#### Pillar Page
- **Route:** `/guides/app-development`
- **Title:** App Development Guide — From Idea to App Store
- **Scope:** PWA vs native, React Native vs Flutter, backend architecture, ASO, monetization, launch & growth
- **Location for app development service conversions**

#### Cluster Content

| Priority | Title | Source | Notes |
|----------|-------|--------|-------|
| P1 | PWA vs Native App — Which Should You Build? | From Web Development guide | Decision framework |
| P2 | React Native + Expo: Shipping to iOS and Android | General expertise | Build guide |
| P2 | ASO: Ranking in the App Store | General expertise | Store optimization |

---

## Pillar Page Specification

### Route Pattern
```
/guides/{cluster-slug}
```

### URL Structure
```
https://lanreenlight.com/guides/n8n-automation
https://lanreenlight.com/guides/vps-hosting-guide
https://lanreenlight.com/guides/algorithmic-trading
https://lanreenlight.com/guides/crypto-node-ops
https://lanreenlight.com/guides/web-development
https://lanreenlight.com/guides/app-development
```

### Page Template
Each pillar page follows this structure:

```
1. H1: Broad topic title
2. Intro paragraph (200-300 words) — overview, what the reader will learn
3. Table of contents (anchor links to sections)
4. Main sections (3-6 sections covering subtopics)
   - Each section: H2, body content, optional table/diagram
   - Each section: link out to relevant cluster blog post
5. Expert Advisor / Product showcase (if applicable)
6. FAQ section (3-5 questions with answers)
7. CTA — newsletter signup or partnership inquiry
```

### Internal Linking Rules
- Each pillar page links to every cluster piece in its group
- Each cluster blog post links back to its pillar page with anchor text matching the target keyword
- Blog posts within the same cluster cross-link where relevant
- Home page Expertise cards link to pillar pages (not #hash anchors)

---

## Content Creation Workflow

### Video → Blog Post Conversion

When a new YouTube video is published:

1. **Transcribe** the video (YouTube transcript or Whisper)
2. **Draft** blog post from the transcript — reformat as prose, add headings, expand concepts
3. **Categorize** using the cluster taxonomy (one of: n8n, VPS, Trading, Crypto)
4. **Tag** with subtopics
5. **Add internal links** — link to pillar page + 1-2 related cluster posts
6. **Save** to `data/posts/{slug}.json`
7. **Update sitemap** with new URL

### Blog Post JSON Schema

```json
{
    "id": "kebab-case-slug",
    "title": "SEO-Optimized Title Here",
    "date": "2026-07-11",
    "category": "One of: n8n | VPS | Trading | Crypto | Philosophy",
    "excerpt": "Meta description (150-160 chars)",
    "imageUrl": "https://images.unsplash.com/...",
    "youtubeId": "YouTube video ID if applicable",
    "content": "<h2>Section 1</h2><p>Full HTML content here...</p>"
}
```

### Taxonomy

| Cluster | Category Tag | Associated Nav Item |
|---------|-------------|-------------------|
| n8n Automation | n8n | What I Do |
| VPS & Infrastructure | VPS | What I Do |
| Algorithmic Trading | Trading | Expert Advisors |
| Crypto Nodes | Crypto | Knowledge Hub |
| Web Development | Web | What I Do |
| App Development | App | What I Do |
| — | Philosophy | Blog |

---

## Trend-Driven Monetized Posts (MANDATORY)

At least one new blog post every week, anchored to a live trend, at least 1,200 words, and built around a product the site monetizes (affiliate link or own product). The reader should land on the trend, get a real solution, and finish with something buyable in front of them. Traffic and awareness are the fuel; product clicks are the engine. All of AGENTS.md's SEO/AEO/GEO Preservation Rules apply to every post.

### 1. Find the trend

This is a standing research loop, not a one-off:

- **Google Trends** — rising queries in AI automation, VPS/self-hosting, forex bots, DePIN/crypto nodes, web & app development
- **YouTube** — search suggestions plus trending in the niche; the channel's own top performers are a signal
- **Reddit** — r/n8n, r/selfhosted, r/VPS, r/algotrading, r/DePIN, r/webdev, r/reactnative
- **Google autocomplete + "People Also Ask"** boxes
- **Search Console → Queries report** — queries the site already gets (real demand, easier to rank for)
- **X/Twitter and niche newsletters** — what's picking up this week

Pick topics where a product maps naturally. A trend with no monetizable angle goes on the idea list, not the calendar.

### 2. Validate before writing

- The topic has visible momentum (rising trend line, recurring questions, active threads).
- The site can add something original: hands-on experience, numbers, a setup guide, a comparison.
- One of the products below fits without forcing it.

### 3. Map the trend to a product

| Cluster / topic | Product | Link path |
|---|---|---|
| VPS, self-hosting, n8n hosting, crypto nodes | Contabo VPS (affiliate) | `/cheapestvps` or `/vps6` / `/vps8` / `/vps12` |
| Forex, trading bots, prop firms | Deriv (affiliate) | `/forexbroker` |
| AI coding agents, Claude Code, AI gateways | AgentRouter (affiliate) | affiliate link from `data/videos.ts` |
| Trading, EA comparisons | Expert Advisors (own products) | Algorithms section + trading guide |
| Web/app builds, tooling | Web/App dev services | `/guides/web-development`, `/guides/app-development` |
| Any post | Newsletter (Scalability Weekly) | Contact section on home |

Every post links to at least one product mid-content and repeats the CTA in a closing box. A post with no product link fails the requirement.

### 4. Write for conversion (1,200+ words)

- **Hook (first ~100 words):** the trend, why it matters now, what the reader gets
- **Body (3–5 sections):** real steps or experience, subheadings that carry keywords, 1–2 internal links to pillar guides per the internal-linking rules
- **Product placement:** a contextual mention where the product solves the problem, then a closing CTA box ("If you want this without the hassle…")
- **FAQ (3–5 questions):** feeds AEO and featured snippets, catches buyers late in the funnel
- **Author bio + newsletter CTA** at the end — own the audience, don't rent it from Google
- **Affiliate disclosure:** one clear line near the first product link ("Some links are affiliate links — I may earn a commission at no cost to you."). Required for trust and compliance, and it keeps citation quality clean for AEO/GEO.

### 5. Publish correctly

Same checklist as every page (AGENTS.md rules): add `data/posts/{slug}.json`, sitemap.xml (fresh lastmod), llms.txt, unique title/description/canonical/Article schema; prerender must pass; verify 200 + title + canonical + no noindex; then `node scripts/request-indexing.mjs`.

### 6. Promote everywhere

- Post to X, LinkedIn, Facebook, Instagram, Telegram — a different angle on each, not the same sentence
- If a matching video exists: link in the YouTube description and a pinned comment (the channel is the site's biggest traffic source)
- Newsletter mention (Scalability Weekly)
- Internal link from the relevant pillar guide when the topic fits a cluster

### 7. Measure and iterate

- Product links carry UTM params (`?utm_source=blog&utm_medium=post&utm_campaign={slug}`) so GA4 shows which post converts
- Watch in GA4: post → affiliate link clicks, newsletter signups. Watch in GSC: impressions and CTR per post
- Underperformers: refresh the content (never delete the URL — 301 or keep it)
- Winners: mine for follow-ups and expand into a mini-cluster

<!-- agent-updated: 2026-08-25 — Added mandatory trend-driven monetized post workflow -->

---

## SEO/AEO/GEO Guidelines

### On-Page Basics (SEO)
- **Title tags:** `{Primary Keyword} | Lanre Enlight` (max 60 chars)
- **Meta descriptions:** 150-160 chars, include primary keyword + CTA
- **URLs:** kebab-case, no stop words (`/guides/vps-hosting-guide` not `/guides/the-vps-hosting-guide`)
- **Headings:** One H1 per page, hierarchical H2/H3

### Internal Linking
- Every blog post: minimum 2 internal links (pillar page + 1 related post)
- Every pillar page: link to ALL cluster pieces
- Home page sections: link to pillar pages (currently uses `#hash` anchors only)

### Sitemap
- `public/sitemap.xml` — auto-updated with new routes and blog posts
- Priority: pillar pages = 1.0, cluster blog posts = 0.8, listing pages = 0.9

### Image Optimization
- Use descriptive filenames (not `photo-1451187580459.jpg`)
- Add `alt` text with keywords
- Use WebP format where possible

### Structured Data (AEO/GEO)
- **Article schema** on all blog posts and pillar pages
- **FAQ schema** on pillar pages (3-5 questions with concise answers)
- **Product schema** on Expert Advisor pages
- **Organization schema** on home page
- **VideoObject schema** on Video Hub entries

### AEO Optimization (AI Overviews, Perplexity, ChatGPT Search)
- Every pillar page includes 3-5 direct Q&A pairs answering "what is", "how to", "best for" queries
- Answers formatted in 40-60 word chunks for easy extraction
- Use "Answer:" prefix in FAQ answers for clear snippet identification
- Target featured snippet formats: lists, tables, step-by-step instructions
- Include "People Also Ask" style questions in FAQ sections

### GEO Optimization (LLM Citations)
- Every pillar page establishes entity authority: author bio, credentials, verifiable metrics ($4.2M+ volume, 68.4% win rate, 30+ apps built)
- Include original data points and proprietary metrics (not just summaries)
- Cite specific tool versions, dates, and measurable outcomes
- Structure content so LLMs can extract complete concepts (self-contained sections)
- Build topical depth across all 4 clusters — LLMs cite sources that cover a topic comprehensively

---

## Implementation Roadmap

### Phase 1 (Foundation)
- [x] Create 6 pillar pages as standalone routes in `App.tsx`
- [x] Add `GuidesLayout` component for pillar page template
- [x] Update navbar with "Guides" dropdown or section
- [x] Update sitemap with pillar URLs

### Phase 2 (Fill Clusters)
- [ ] Convert priority videos into blog posts (P0 + P1 from each cluster)
- [ ] Add blog posts for Web Development and App Development cluster (new, non-video clusters)
- [ ] Re-categorize existing blog posts into cluster taxonomy
- [ ] Add internal links between all related content

### Phase 3 (Polish)
- [ ] Add structured data (Article, FAQ, Product, Service schemas)
- [x] Dynamic canonical tags per route (CanonicalLink component)
- [ ] Create topic-specific landing pages for high-value keywords
- [ ] Set up content performance tracking (GA4 events on pillar pages)

---

## Affiliate Link Strategy

Affiliate links should live primarily within pillar pages and relevant cluster posts, not on the home page. This ensures:

1. Visitors reach affiliate content with buying intent (they searched for it)
2. Google sees topical relevance between the content and the link
3. Links are contextual, not promotional

### Currently Tracked Affiliate Routes (from `data/videos.ts`)
- `https://lanreenlight.com/cheapestvps`
- `https://lanreenlight.com/cheapestn8nvps`
- `https://lanreenlight.com/forextrading`

These redirects should point to the relevant pillar page or blog post — not directly to the affiliate offer.

---

## Maintenance

- **Monthly:** Review Search Console for underperforming pages, update content
- **Quarterly:** Audit internal links, refresh pillar page data (pricing, stats)
- **Per video publish:** Convert to blog post within 48 hours
- **Per blog post publish:** Add internal links, update sitemap

---

<!-- agent-updated: 2026-07-11 — Initial content strategy document with 4 clusters and pillar page specs -->
