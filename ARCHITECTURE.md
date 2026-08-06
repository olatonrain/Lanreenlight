# Architecture

## Overview

Single-page application (SPA) portfolio built on React 19. Static content with dynamic blog posts delivered via n8n webhook. No backend server — everything runs client-side. Hosted on Apache VPS with `.htaccess` SPA fallback.

---

## Data Flow

```
┌──────────────┐     ┌──────────────────────┐     ┌──────────────┐
│  YouTube RSS  │────▶│ GitHub Actions       │────▶│ data/videos.ts│
│  (daily sync) │     │ (update-videos.yml)  │     │ (static TS)  │
└──────────────┘     └──────────────────────┘     └──────────────┘

                         ┌──────────────┐
                         │ n8n Webhook  │────▶ public/posts/*.json
                         │ (on publish) │
                         └──────────────┘

┌──────────────┐     ┌──────────────────────┐     ┌──────────────┐
│  Git push     │────▶│ GitHub Actions       │────▶│ HestiaCP VPS │
│  (main)       │     │ (deploy.yml)         │     │ /public_html │
└──────────────┘     └──────────────────────┘     └──────────────┘
```

---

## Module Map

### App Shell (`App.tsx`)
- `BrowserRouter` wrapping all routes
- `Navbar` always rendered (fixed position)
- Routes: `/` (homepage), `/blog`, `/blog/:id`

### Homepage Sections
| Component | Purpose | Data Source |
|-----------|---------|-------------|
| `Hero` | Full-screen intro with portrait photo | Static |
| `About` | Professional background | Static |
| `Expertise` | Service capability cards | `SERVICES[]` (local) |
| `VideoHub` | YouTube video gallery | `VIDEOS[]` from `data/videos.ts` |
| `Partnership` | Value propositions | `REASONS[]` (local) |
| `Stats` | Key metrics | `STATS[]` (local) |
| `Algorithms` | Expert Advisor trading bots | `EAS[]` (local) |
| `Contact` | CTA and contact info | Static |

### Blog System
- **Listing** (`Blog.tsx`): Reads `public/posts/*.json`, renders cards
- **Detail** (`BlogPostPage.tsx`): Reads single post JSON by ID, renders HTML content
- **Data Source**: n8n webhook writes JSON files to `public/posts/` on publish <!-- TODO: verify webhook is currently active -->

### Shared
| Component | Purpose |
|-----------|---------|
| `FadeIn` | Wrapper — triggers fade-up animation on scroll into viewport |

---

## Routing

```
/          → HomePage (hash-scroll sections)
/blog      → Blog listing
/blog/:id  → Blog post detail
```

- Hash links (e.g., `#expertise`, `#contact`) scroll to section anchors
- Non-homepage navigation to hash links prefixes with `/#` for correct routing
- Apache `.htaccess` rewrites all requests to `index.html` for SPA support

---

## Styling Architecture

```
Tailwind CDN (runtime) ─── utility classes in JSX
       +
index.html <style> block ─── global styles, animations, article content
       +
film-grain overlay ─── fixed SVG noise layer for cinematic effect
```

No CSS-in-JS, no CSS modules, no PostCSS. Tailwind config defined in `<script>` block in `index.html`.

---

## Key Modules

### `types.ts`
Shared interfaces: `NavItem`, `Stat`, `EAStats`, `ExpertAdvisor`, `ServiceItem`, `PartnerReason`, `ResourceLink`, `Video`

### `scripts/sync-youtube.mjs`
- Fetches YouTube RSS feed for channel `UCs9e33racEAMcCfReN4Bc_g`
- Parses entries, infers category from title/description
- Filters out #shorts
- Writes TypeScript array to `data/videos.ts`
- Maintains `id` ordering by publish date

### CI/CD
- **Deploy**: Build → SCP `dist/` to `/home/Lanreenlight/web/lanreenlight.com/public_html`
- **Video Sync**: Runs `sync-youtube.mjs`, commits updated `data/videos.ts`
