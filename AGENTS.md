# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js (App Router) + TypeScript web app for analyzing and visualizing French payslips using Google Gemini.

- `app/`: Routes, layouts, and API handlers (e.g. `app/api/analyze/route.ts`).
- `components/`: Reusable UI and page components (kebab-case filenames, e.g. `components/api-key-modal.tsx`).
- `lib/`: Client helpers and shared utilities (e.g. `lib/api-client.ts`).
- `hooks/`: React hooks (e.g. `hooks/use-payslip-upload.ts`).
- `types/`: Shared TypeScript types (e.g. `types/payslip.ts`).
- `public/`: Static assets.

## Build, Test, and Development Commands

Use npm (this repo includes `package-lock.json`).

- `npm install`: Install dependencies.
- `npm run dev`: Start the local dev server at `http://localhost:3000`.
- `npm run build`: Create a production build.
- `npm run start`: Run the production server (requires `npm run build` first).
- `npm run lint`: Run ESLint checks.

## Coding Style & Naming Conventions

- Language: TypeScript + React (Next.js App Router).
- Imports: Prefer path alias `@/*` (configured in `tsconfig.json`).
- Components: PascalCase component names; kebab-case filenames under `components/`.
- Formatting: Keep changes consistent with nearby files; run `npm run lint` before opening a PR.

## Testing Guidelines

There is currently no dedicated automated test suite (no `test` script). Validate changes via:

- `npm run lint`
- Manual checks with `npm run dev` (upload flow, dashboard render, API route behavior).

## Commit & Pull Request Guidelines

- Commits follow Conventional Commits-style prefixes (e.g. `feat: ...`, `fix: ...`).
- PRs should include: a short summary, linked issue (if any), and screenshots/GIFs for UI changes.
- Avoid committing secrets; keep `.env` local and use `env.example` as the reference.

## Security & Configuration Tips

- Configure `GEMINI_API_KEY` via `.env` (see `env.example`) or provide a per-request key (sent as `X-Gemini-API-Key`).
- Never log or share API keys in issues/PRs.
