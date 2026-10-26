# Tamkeen Maqra’ah — application source

This `source` branch contains the complete editable Tamkeen application. The `main` branch contains the separately built public website served at https://tamkeenmaqarah.github.io/. Publishing this source branch does not update `main` or deploy the website.

The app uses React/Vinext, Cloudflare Workers and D1 through Sites. GitHub Pages serves the public interface; the existing Sites server provides live quiz data, submissions, grading, Gemini and private teacher controls.

## Project contents

- `app/`: the home page, quiz experience, leaderboard, funny answers and teacher tools.
- `app/api/`: routes for AI drafts, data, moments, quizzes, records, setup, submissions and teacher authentication.
- `db/` and `drizzle/`: database schema and migrations; no production database export.
- `components/`, `hooks/`, `lib/`, `public/`: components, utilities, fonts and assets.
- `worker/`, `scripts/`, configuration files and `pnpm-lock.yaml`: server runtime, build tooling and pinned dependencies.
- `static-site/`, `vite.pages.config.ts` and `scripts/export-pages.mjs`: the standalone GitHub Pages build.
- `SYSTEM_DESIGN.md`, `AI_SYSTEM_DESIGN.md`, `PRODUCT.md` and `DESIGN.md`: architecture, product and design documentation.

## Development

Use Node.js 22.13 or later and the pnpm version specified in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm dev --port 5173 --hostname 127.0.0.1
pnpm build
```

Generate database migrations with `pnpm db:generate`. Inspect migrations before applying them. Local development uses Wrangler's local database; hosted publishing applies migrations to the server separately.

## Server configuration

Configure `TEACHER_KEY` and `GEMINI_API_KEY` as secret server runtime variables. Local development may use an untracked `.dev.vars` file. Never put actual credentials in this repository, client code or public links. Secret values and environment files are deliberately absent from this branch.

Optional runtime settings include `GEMINI_MODEL` (default `gemini-3.5-flash-lite`), `GEMINI_DAILY_LIMIT` (default 20 teacher tasks per UTC day) and `PUBLIC_SITE_URL` (`https://tamkeenmaqarah.github.io/`). `GOOGLE_CLIENT_ID` can override the public Sign in with Google client id. It is not a secret. The Google Cloud client must allow JavaScript origins `https://tamkeenmaqarah.github.io` and the teacher site origin. The hosted server already has its own configuration; cloning this source does not copy its secrets or data.

## Public website build

```sh
TAMKEEN_PAGES_BASE=/ pnpm build:pages
```

This creates a standalone `dist-pages/index.html` with the public interface and embedded assets. The generated files are ignored by Git. Deploying them to `main` is a separate, explicit step. Keep GitHub Pages configured to publish from `main` at the repository root.

## Features and checks

Students can open a quiz link, enter a name, submit answers and review their score without an account. The home page, leaderboard and teacher-approved funny answers stay available between quizzes. Teacher tools create and publish quizzes, edit paper grades and review AI suggestions.

AI drafting uses pasted halaqah notes or transcripts, followed by a quality check and teacher review. MCQs are graded against the approved answer key without AI. Submission confetti respects reduced-motion preferences.

`node verify-ai.mjs` uses mocked AI responses. `node verify-community.mjs` checks the public community experience. `python3 verify-api.py` and `python3 verify-workflow.py` target the local development server and use local-only test authentication; do not run them against production.

Local environment files, dependencies, generated builds, session logs and review screenshots are excluded from this source snapshot. Font licenses are included under `public/fonts/`.
