---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["app.js","components.js","styles.css"]
---

# Public application redesign
Mode: Operate. Scope: home, public quizzes and attempts/results, leaderboard, funny answers, remembered-name/password tent door, and shared navigation. The private teacher server is external.

## Direction contract
THESIS: أصحاب الخيمة / Ashab Al Khaimah, Sunday after Fajr, one quiz action, real scores and approved group moments. No welcome slogans, tutorial filler or reference photographs in the interface.
OWN-WORLD: Deep oxblood textile ground with warm ivory ink, amber-orange lantern light, black/ivory/ochre Sadu side rails, stepped Najdi plaster trim and brass details. Clay is reserved for focused reading forms. Amiri Arabic lettering, Lora English headings, quiet sans-serif controls. Standard buttons, navigation and semantic standings tables.
STORY: Identify the circle inside Tamkeen, find the available weekly quiz, and check shared results. Preserve authored content, scoring, equal-rank behavior and teacher handoff. English and Arabic have equal functionality; RTL shapes and isolates mixed-script content correctly.
FIRST VIEWPORT: Slim bilingual masthead and four text tabs. The Arabic name sits centrally between two authored brass lanterns against deep red textile, within a fine frame; stepped plaster and a broad Sadu band finish the gathering panel. A concise weekly quiz action follows, then actual standings beside one approved moment. The wider desktop shell and more generous section/row spacing make room for the gathering. Mobile keeps the same hierarchy without overflow.
FORM: User-pinned Najdi cushions, floor seating and warm lighting override seed:5bf0ddea54788456. Code-first app screen. Latest user requests rename the group, remove the photo, and replace the soft beige ground with deeper red, orange light, more room and intricate detail. Motifs repeat at section rules, tables, quiz panels and results without impeding controls.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Motion thesis
Focal: Two brass lantern bodies sway one degree within stable button targets while bounded orange light gently changes opacity. Pointer or keyboard activation brightens/dims each lantern; its pressed state and action label are bilingual. Continuity: selected navigation underline and existing quiz-question transitions. Feedback: pressed controls, selected answers, progress colors and result medal/score. Budget: CSS transform/opacity only for loops, no dependency, offscreen/hidden pause via IntersectionObserver, a user pause control, and static reduced-motion fallback. Content starts visible and interactive.

## Latest user refinement
Separate hand-drawn pixel-art red Sadu floor cushion, long backrest, square pillow and cylindrical armrest accents replace generated illustrations. No composite majlis seating scene. Place the square and backrest at hero edges, an armrest at the door and quiz, and a floor mattress at the shared footer. Keep ornament clear of controls. Their two-pixel breathing motion shares the lantern visibility pause, global pause and reduced-motion behavior.

Latest upstream integration: Preserve commit 499c84f password recovery and password change. Both reuse the tent-door form system and bilingual controls; the mobile header password action is a labeled SVG button.

## Homework repair
Preserve the public Najdi interface and existing homework API. Make own saved homework visible, distinguish shared saves from phone-only copies, retain failed or pending saves for retry, and prevent week changes during a save. Use a native date input and existing amber controls; show the full localized Sunday date. The initial week is strictly the next Sunday in device-local time. Selecting another weekday maps to its following Sunday. Verify desktop/mobile EN/AR plus save, reload, per-week isolation, deletion and offline recovery with synthetic writes.
