---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["app.js","components.js","styles.css","assets/majlis-heater.svg","assets/heater-coils.svg"]
---

# Public application redesign
Mode: Operate. Scope: home, public quizzes and attempts/results, leaderboard, funny answers, remembered-name/password tent door, and shared navigation. The private teacher server is external.

## Direction contract
THESIS: أصحاب الخيمة / Ashab Al Khaimah, Sunday after Fajr, one quiz action, real scores and approved group moments. No welcome slogans, tutorial filler or reference photographs in the interface.
OWN-WORLD: A continuous deep oxblood geometric Najdi rug ground with muted diamonds and warm ivory ink, amber-orange lantern light, upholstered majlis side rails, black/ivory/ochre Sadu, stepped Najdi plaster trim and brass details. Authored SVG assets `assets/najdi-rug.svg` and `assets/majlis-edge.svg` supply the floor and framing; task surfaces stay calm and opaque. Clay is reserved for focused reading forms. Amiri Arabic lettering, Lora English headings, quiet sans-serif controls. Standard buttons, navigation and semantic standings tables.
STORY: Identify the circle inside Tamkeen, find the available weekly quiz, and check shared results. Preserve authored content, scoring, equal-rank behavior and teacher handoff. English and Arabic have equal functionality; RTL shapes and isolates mixed-script content correctly.
FIRST VIEWPORT: Slim bilingual masthead with six student destinations and a named native account disclosure for name, password, sign-out and teacher entry. Navigation and utilities retain 44px targets; mobile shows all six destinations in a three-by-two grid. The disclosure dismisses on Escape or an outside pointer. The desktop header lamp occupies reserved flow space and hides on mobile; hero and door lamps remain. Short landscape screens use a scrolling header. The Arabic name sits centrally between two authored brass lanterns against deep red textile, within a fine frame; stepped plaster and a broad Sadu band finish the gathering panel. A concise weekly quiz action follows, then actual standings beside one approved moment. The wider desktop shell and more generous section/row spacing make room for the gathering. Mobile keeps the same hierarchy without overflow.
FORM: User-pinned Najdi cushions, floor seating and warm lighting override seed:5bf0ddea54788456. Code-first app screen. Latest user requests retain the established identity and deepen its material framing: a quiet red diamond rug, upholstered edges (48px desktop, 18px at 1100px, 6px at 620px), orange light, more room and intricate detail. Motifs repeat at section rules, tables, quiz panels and results without impeding controls.
FINISH: Independently reviewed with disposition ship and no material fixes. All 16 `final-*.png` captures in `.impeccable/review/polish/` were visually validated; `checks.json` records passing runtime checks. The refinement adds only authored geometric SVG assets, with no new raster assets or production data writes. DESIGN.md and its schemaVersion 2 sidecar canonize the approved material and responsive behavior.

## Motion thesis
Focal: Existing lanterns and a separate pixel-art dish heater cast bounded orange warmth across the Najdi rug. Native buttons keep their geometry still while local light responds; each heater has bilingual normal/boost actions and aria-pressed. Continuity: one measured tab rail moves over 230ms after pointer activation and aligns immediately for keyboard, font/layout resize and RTL. New tab content commits before instant scroll reset. Feedback: 160ms controls, a 180ms pointer-only account unfold, 550ms lantern boost, and heater coil/halo changes over 720ms / 650ms with scale settling over 900ms. Budget: only transform/opacity loops; 5.5s heater-core radiance shares offscreen/hidden pause, the visit-wide pause and static reduced-motion behavior. Pause state survives the door-to-app transition. Ambient room warmth stays behind readable content and cannot capture input. Content starts visible and interactive.

## Latest user refinement
Separate hand-drawn pixel-art red Sadu floor cushion, long backrest, square pillow and cylindrical armrest accents replace generated illustrations. No composite majlis seating scene. Place the square and backrest at hero edges, an armrest at the door and quiz, and a floor mattress at the shared footer. Keep ornament clear of controls. Their two-pixel breathing motion shares the lantern visibility pause, global pause and reduced-motion behavior.

Latest upstream integration: Preserve commit 499c84f password recovery and password change. Both reuse the tent-door form system and bilingual controls; the mobile header password action is a labeled SVG button.

## Homework repair
Preserve the public Najdi interface and existing homework API. Make own saved homework visible, distinguish shared saves from phone-only copies, retain failed or pending saves for retry, and prevent week changes during a save. Use a native date input and existing amber controls; show the full localized Sunday date. The initial week is strictly the next Sunday in device-local time. Selecting another weekday maps to its following Sunday. Verify desktop/mobile EN/AR plus save, reload, per-week isolation, deletion and offline recovery with synthetic writes.

## Qur’an extension
User chose both a Qur’an reading tab and a Homework surah/ayah picker. Preserve the existing Najdi shell and data flows. Reuse cream fields and warm amber actions; sacred text is content on a quiet clay reading panel, never ornament. Use self-hosted Amiri Quran at32px/2.6 (28px mobile), unmodified Arabic Uthmani text with separate ayah numbers and source attribution. Add references to existing homework drafts only on explicit activation; normal Save homework remains required. Saved explicit ranges navigate to the reader and survive refresh through URL parameters. Load and validate the real API, cache successful responses, abort stale/slow requests and provide retry. Interface controls remain fully bilingual. Preserve the current Al Quran Cloud provider, source-text `translate="no"` protection and page-level `notranslate` metadata. Halaqa media loads after a play or lesson activation, with player/list columns on desktop, a mobile stack and an external YouTube fallback. Google sign-in exposes loading and failure states.


## Radiant motion refinement

The user explicitly requested fluid, high-quality motion across the existing site and dish heaters warming the display, within the approved visual world. Preserve the original rug, upholstered rails, script pairing, Sadu cushions and account tokens. Use the authored `assets/majlis-heater.svg` image and `assets/heater-coils.svg` background; the design sidecar’s portable preview inlines those same geometric paths.

Keep the hero heater at 112×144px desktop and 80×104px at 750px, clear of the title and side cushions. The footer groups a floor cushion with a 96×124px heater (84×108px mobile), including on account and homework screens. Door heaters remain visually beside the sheet but follow the form/actions in native keyboard order. No focus trap or decorative overlay may block the sign-in task.

Final motion review returned ship with the single bounded door focus-order item resolved and no remaining fixes. Both door surfaces now place the heater after all form/actions; native Tab regressions pass and all motion captures were refreshed at the same paths. Implementation verification reports the four-case motion browser suite, thirteen unit checks, profile browser checks and 320/390/768/1440 mobile regressions passing. This documentation pass does not rerun those checks or assert hardware Safari frame rates.

Current visual references: `.impeccable/review/motion/desktop.png`, `mobile.png`, `mobile-ar.png`, `homework-mobile.png`, `hearth-mobile.png`, `hearth-mobile-ar.png`, `door-mobile.png` and `.impeccable/review/account-320-ar.png`. See `.impeccable/surfaces/components-js-heater.md` for the shared object and motion contract.
