# Contributing

## Code Conventions

### General
- **No comments** in code unless semantically necessary (e.g., complex regex, workaround explanation)
- Use meaningful variable/function names — code should be self-documenting
- Follow the existing patterns in the file you're editing

### TypeScript & React
- Components: **PascalCase**, named exports (`export const MyComponent: React.FC = () =>`)
- Files: PascalCase for components (`Hero.tsx`), camelCase for utilities (`sync-youtube.mjs`)
- Types/Interfaces: PascalCase, shared types go in `types.ts`
- Props: define locally in the component file unless reused elsewhere

### Styling
- **No CSS modules** — all styles via Tailwind CDN utility classes
- Custom CSS only in `index.html` `<style>` block
- Use `FadeIn` wrapper for scroll-triggered animations
- Follow the brand color palette defined in `index.html` Tailwind config

### Imports
- Use `@/` alias for project root imports (e.g., `import { Video } from '@/types'`)
- Group imports: React/libraries first, then project files, then types

### Git & Commits
- Use conventional commits:
  - `feat:` — new feature
  - `fix:` — bug fix
  - `chore:` — tooling, config, maintenance
  - `style:` — CSS/animation changes only
  - `deploy:` — deployment-related changes
  - `content:` — text, copy, SEO updates
- Keep commits focused — one logical change per commit
- Review `git diff` before staging
- Do not force push or rewrite history

### Before Submitting
1. Run `npm run build` — must pass without errors
2. Review your diff — no debugging artifacts, commented code, or secrets
3. Update `CHANGELOG.md` if the change is significant
4. Update `MEMORY.md` with any decisions or context worth preserving

## PR Workflow

1. Create a feature branch from `main`
2. Make your changes following conventions above
3. Run `npm run build` and verify
4. Open a PR against `main` with a clear description
5. Ensure CI checks pass before merging
