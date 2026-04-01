# Quartex — Project Rules

## Tech Stack
- **Monorepo**: Turborepo + pnpm workspaces
- **API** (`apps/api/`): Fastify, TypeScript, Drizzle ORM, PostgreSQL, Zod, JWT + Argon2
- **Website** (`apps/web/`): TanStack Start (SSR), React, Tailwind CSS, TypeScript
- **Admin** (`apps/admin/`): React + Vite (SPA), TanStack Router, Tailwind CSS, TypeScript
- **Shared** (`packages/shared/`): Types, validators, constants shared across apps

## Model Usage
| Task | Agent | Model |
|------|-------|-------|
| Architecture, complex logic, debugging | Main | Opus |
| File edits, component scaffolding, migrations | Implementer | Sonnet |
| Codebase exploration, research | Researcher | Sonnet |
| Quick lookups, linting, formatting checks | Quick tasks | Haiku |

## Implementation Flow
1. **Plan** — Discuss scope, define files to create/modify, get approval
2. **Implement** — Build in small, testable increments
3. **Verify** — Run dev server, check for TypeScript/lint errors
4. **Test** — Write and run E2E tests (Playwright) for critical flows
5. **Review** — Self-review diff before marking complete

## Code Rules
- Max 50 lines per function, max 500 lines per file
- No `any` types — use proper TypeScript throughout
- API routes: one file per resource, grouped by domain
- Components: one component per file, colocate styles
- Database: all schema changes via Drizzle migrations, never raw SQL
- Validation: Zod schemas shared between API and frontend where possible
- No dead code, no commented-out blocks

## Naming Conventions
- Files: `kebab-case.ts` / `kebab-case.tsx`
- Components: `PascalCase`
- Functions/variables: `camelCase`
- DB tables/columns: `snake_case`
- API routes: `/api/v1/resource-name` (kebab-case, versioned)

## Git
- Commit style: conventional commits (`feat:`, `fix:`, `chore:`, etc.)
- Branch naming: `feat/short-description`, `fix/short-description`

## Design System
- Dark mode first — bg: `#0A0F1C`, accent: `#3B82F6`, text: white
- Fonts: Inter (body), Space Grotesk (headings)
- Mobile-first responsive design
- More visuals, less text — use icons (Lucide), illustrations, gradients
