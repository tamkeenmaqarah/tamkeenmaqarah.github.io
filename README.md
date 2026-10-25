# Tamkeen Maqra’ah

Community website: https://tamkeenmaqarah.github.io/

GitHub Pages serves the standalone `index.html` from the root of `main`. The home page, quiz list, public standings and approved funny answers use the existing Tamkeen server for live data. Teacher sign-in opens that server for private quiz creation, grading and Gemini.

No credentials, database export or unpublished quiz content are included in this repository.

## Updates

The editable application source is maintained in the Tamkeen app workspace. Run `TAMKEEN_PAGES_BASE=/ pnpm build:pages`, then upload `dist-pages/index.html` and the font license files. Quizzes, scores and approved funny answers update from the server without a new build.

Figtree and Barlow Condensed are distributed under the included SIL Open Font Licenses.
