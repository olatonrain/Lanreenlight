# Lanre.Enlight — Portfolio

AI Automation & Systems Engineer portfolio built with **React 19**, **TypeScript**, and **Vite 6**. Showcases expertise in n8n workflow automation, LLM integration, cloud infrastructure, algorithmic trading systems, crypto node operations, and content automation.

**Live:** [https://lanreenlight.com](https://lanreenlight.com) <!-- TODO: verify site is currently accessible -->

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Bundler | Vite 6 |
| Routing | React Router v7 |
| Styling | Tailwind CSS (CDN) |
| Icons | Font Awesome 6 |
| Fonts | Manrope / Playfair Display |
| Hosting | HestiaCP (Apache VPS) |
| CI/CD | GitHub Actions |

---

## Getting Started

```bash
# Prerequisites: Node.js >= 18

# 1. Install dependencies
npm install

# 2. Set environment variables
cp .env.example .env.local   # Add your GEMINI_API_KEY  <!-- TODO: verify .env.example exists (none found in repo) -->

# 3. Start dev server (port 3000)
npm run dev

# 4. Production build
npm run build

# 5. Preview production build
npm run preview
```

---

## Project Structure

```
├── App.tsx                  # Root component with routing
├── index.tsx                # Entry point
├── types.ts                 # Shared TypeScript interfaces
├── components/
│   ├── Navbar.tsx           # Fixed navigation with scroll effects + Guides dropdown
│   ├── Hero.tsx             # Full-screen hero section with pillar guide CTAs
│   ├── About.tsx            # Bio and background (links to pillar guides)
│   ├── Expertise.tsx        # Services / capability cards + pillar guide links
│   ├── Partnership.tsx      # Why partner with me
│   ├── Stats.tsx            # Key metrics section
│   ├── Algorithms.tsx       # Expert Advisor trading bots + guide link
│   ├── VideoHub.tsx         # YouTube video gallery with pillar guide quick links
│   ├── Contact.tsx          # Contact / CTA section
│   ├── Blog.tsx             # Blog listing page
│   ├── BlogPostPage.tsx     # Individual blog post
│   ├── FadeIn.tsx           # Scroll-triggered animation wrapper
│   ├── GuidesLayout.tsx     # Shared pillar page template
│   ├── N8nGuide.tsx         # n8n Automation pillar page
│   ├── VpsGuide.tsx         # VPS Hosting pillar page
│   ├── TradingGuide.tsx     # Algorithmic Trading pillar page
│   └── CryptoNodeGuide.tsx  # Crypto Node Operations pillar page
├── data/
│   ├── videos.ts            # YouTube video data (auto-synced)
│   ├── blog.ts              # Blog posts (static imports)
│   └── posts/               # Blog post JSON files
├── scripts/
│   └── sync-youtube.mjs     # YouTube RSS → data/videos.ts sync
├── public/
│   ├── .htaccess            # Apache SPA rewrite rules
│   ├── sitemap.xml          # SEO sitemap with pillar pages
│   ├── lanre.jpg            # Hero image
│   └── posts/               # Blog post static files
├── .github/workflows/
│   ├── deploy.yml           # Build + SCP deploy to HestiaCP
│   └── update-videos.yml    # Daily YouTube video sync
└── vite.config.ts           # Vite configuration
```

---

## Features

- **Portfolio Showcase** — Hero, About, Expertise, Stats, Partnership sections
- **Video Hub** — Curated YouTube videos with resource links (affiliate) + quick links to pillar guides
- **Expert Advisors** — Algorithmic trading systems (Flux Scalper Pro, Orbit Swing, Prop Guard v2)
- **Blog** — Full blog with dynamic posts from n8n webhook
- **Pillar Guides** — 4 SEO-optimized authority pages: n8n Automation, VPS Hosting, Algorithmic Trading, Crypto Node Operations
- **SPA Routing** — React Router with Apache `.htaccess` fallback
- **SEO** — Open Graph / Twitter meta tags, sitemap.xml with all routes
- **Analytics** — GA4 tracking (placeholder — replace ID in `index.html`)
- **Animations** — Cinematic fade-in on scroll, film grain overlay, glassmorphism nav
- **Responsive** — Full mobile support with hamburger menu

---

## Automation

| Workflow | Trigger | Description |
|----------|---------|-------------|
| YouTube Sync | Daily 05:00 UTC | Fetches YouTube RSS feed, updates `data/videos.ts` |
| Deploy | Push to `main` | Builds project, SCPs `dist/` to HestiaCP server |
| Blog | n8n webhook | Incoming webhook writes blog post to `public/posts/` <!-- TODO: verify webhook is active --> |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | For AI conversation features |
| `SERVER_IP` | Deploy only | HestiaCP server IP (GitHub secret) |
| `SSH_PRIVATE_KEY` | Deploy only | SSH key for SCP deploy (GitHub secret) |

---

## License

Private — All rights reserved.
