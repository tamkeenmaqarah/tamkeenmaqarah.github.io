---
version: 1
slug: "components-js-heater"
primary_target: "components.js"
related_targets: ["app.js", "styles.css", "assets/majlis-heater.svg", "assets/heater-coils.svg"]
---

# Shared radiant heater and motion continuity

Mode: Operate. Preserve the shared approved Najdi interaction/material system across Home, tent door, footer and header utilities.

## Direction contract

THESIS: Give the existing room a real-looking pixel-art source of warmth and fluid, restrained interaction without moving reading or hit targets.
OWN-WORLD: The separate authored dish heater matches the cushions’ crisp stepped geometry. Live implementation uses an SVG image shell and SVG background coil layer; portable design previews may inline those same paths. Warm halo, rug spill and faint room warmth remain bounded behind content, with no pointer interception.
STORY: Activate a stable heater button to boost/lower its local warmth; use the shared pause control to stop ambient motion for the visit. Keep native Enter/Space behavior, translated labels, aria-pressed and visible focus. A user who paused at the door stays paused after entering.
FIRST VIEWPORT: The compact Home hearth uses an 88×114px heater, 70×90px at 750px and 58×76px at 380px, beside its lantern and desktop backrest. Footer object is 96×124px or 84×108px mobile beside the floor cushion. Door object is 86×112px or 76×98px mobile, with focus order after form/actions. Keep all text and targets clear.
FORM: Heater normal/boost changes coil opacity over 720ms, halo/spill opacity over 650ms and scale over 900ms, using cubic-bezier(.16,1,.3,1). The 5.5s core loop uses transform and opacity only, shares offscreen/document-hidden/global pause guards and becomes static for reduced motion. Controls still work without animation. Header tab continuity uses a 230ms measured rail with immediate keyboard/resize placement; account disclosure uses a 180ms pointer unfold and immediate keyboard opening; lantern boost uses 550ms; shared controls use 160ms feedback. Tab scroll resets after commit.
FINISH: DESIGN.md holds actual heater size variants, and schemaVersion 2 design.json carries motion tokens plus a portable inline-geometry heater preview. The existing account tokens and backend design contract are preserved. Screenshot references and implementation verification reports are recorded in index-html.md. Real hardware Safari FPS remains unverified; no fresh detector or browser run belongs to this documentation pass.
