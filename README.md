# Ashab Al Khaimah · أصحاب الخيمة

The Tamkeen Maqra’ah public app: weekly quizzes, standings, and teacher-approved funny answers.

## Preview

Run `python3 preview.py --port 4181`, then open http://127.0.0.1:4181. The preview uses Python and curl. It proxies only public data reads so the existing API's production CORS restrictions do not block localhost. Quiz submissions and server account writes are deliberately unavailable in this local preview. The upstream tent door can remember a local name/password on this device.

## Files and publishing

GitHub Pages serves `index.html`, `app.js`, `components.js`, `i18n.js`, `homework.js`, `runtime.js`, `styles.css`, and `assets/` directly. No build or new runtime dependencies are required. Publish all of those files together.

`app.js` is the readable application extracted from the latest published bundle (commit `499c84f`). `runtime.js` preserves its bundled React and Lucide dependencies. `i18n.js` contains interface translations and the persistent language preference. The home page, shared standings table, lanterns and shared shell are authored in `components.js`. `homework.js` owns Sunday date selection and pending device copies. Shared homework saves use the existing teacher API; the public list includes the current student’s saved entry. The calendar picker groups dates by Sunday and the default is the strictly upcoming Sunday.

The latest upstream quiz controller preserves local missed-question practice, saved progress, and the remembered-name/password tent door and password recovery.

Quizzes, scores, submissions, and approved funny answers still use the existing Tamkeen server. Teacher sign-in still opens that server; its private interface is a separate application and is outside this repository. No credentials, unpublished quiz content, or database exports are included here.

The upstream editable Tamkeen workspace can also produce its own standalone page using `TAMKEEN_PAGES_BASE=/ pnpm build:pages`. Uploading that older build over these files will replace this redesign; carry the changes into that workspace before resuming its export workflow.

## Checks

Run `node --test tests/*.test.mjs`. Browser verification covered English and Arabic on desktop and mobile, navigation, language persistence, quiz links, retaining names and answers across language switches and reloads, local missed-question practice without submissions, results, failed-request retries, narrow-phone layout and motion preferences. Submission checks used intercepted synthetic data and made no production writes.

## Visual assets

The user-supplied Najdi majlis and tent photographs informed the design; they are not shipped. The Sadu weave, stepped plaster trim, brass lanterns, favicon, and four individual pixel-art cushion illustrations are authored SVGs. No generated raster illustrations ship. Lanterns brighten/dim with pointer or keyboard input. Their motion pauses offscreen and when the tab is hidden; the header pause control and reduced-motion preference stop decorative animation. Fonts are self-hosted: Figtree, Amiri, Lora, and IBM Plex Sans Arabic, with their SIL Open Font Licenses included.
