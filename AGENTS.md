# AI Agent Instructions

This file helps AI coding agents (like opencode) work effectively on this project.

<!-- agent-updated: 2026-07-11 — Initial setup with all rules -->

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
- **Routing:** React Router v7 (hash links on home, `/blog`, `/blog/:id`)
- **Styling:** Tailwind classes inline — no CSS modules. Custom CSS in `index.html` `<style>` block.
- **Hosting:** HestiaCP (Apache VPS) — uses `.htaccess` for SPA fallback
- **CI/CD:** GitHub Actions (build → SCP to server) — verified from `.github/workflows/`

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
- **Data files** — `data/videos.ts` (auto-synced via YouTube RSS), `data/blog.ts` (empty array; posts served from `public/posts/`)
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
npm run build    # Production build to dist/ (vite build)
npm run preview  # Preview production build locally (vite preview)
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
