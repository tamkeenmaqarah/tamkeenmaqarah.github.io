---
name: أصحاب الخيمة / Ashab Al Khaimah
description: A bilingual Qur’an review circle on deep oxblood textile, lit by interactive orange lanterns.
colors:
  rug: '#4c1b28'
  rug-motif: '#5e2634'
  upholstery: '#32151b'
  fabric: '#742c34'
  fabric-deep: '#2b1016'
  paper: '#3d151b'
  white: '#fff2d9'
  ink: '#f0dfc2'
  muted: '#d0ad8c'
  line: '#7c4b3e'
  brass: '#d4a063'
  focus: '#ffbd69'
  header: '#321319'
  hero: '#5b222b'
  action: '#e7b479'
  action-hover: '#f1c790'
  action-ink: '#3c1920'
  form-clay: '#ead3ab'
  field: '#f5e5c7'
  field-ink: '#3a2920'
  panel: '#54232b'
  moment-dark: '#2b191c'
  sadu-red: '#8e2430'
  stitch-black: '#241e1a'
  stitch-ivory: '#e8ddc5'
  ochre: '#be974d'
typography:
  display-arabic:
    fontFamily: Amiri, serif
    fontSize: 91px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: '0'
  headline:
    fontFamily: Lora, Georgia, serif
    fontSize: 42px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: -0.025em
  title:
    fontFamily: Lora, Georgia, serif
    fontSize: 25px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: -0.025em
  body:
    fontFamily: Figtree, "IBM Plex Sans Arabic", sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  body-arabic:
    fontFamily: '"IBM Plex Sans Arabic", Figtree, sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.9
    letterSpacing: normal
  label:
    fontFamily: Figtree, "IBM Plex Sans Arabic", sans-serif
    fontSize: 15px
    fontWeight: 600
  score:
    fontFamily: Lora, Georgia, serif
    fontSize: 22px
    fontWeight: 400
  door-name:
    fontFamily: Amiri, serif
    fontSize: 55px
    fontWeight: 400
    lineHeight: 1.6
  door-change-title:
    fontFamily: Lora, Georgia, serif
    fontSize: 32px
    lineHeight: 1.4
  quran:
    fontFamily: '"Amiri Quran", Amiri, serif'
    fontSize: 32px
    fontWeight: 400
    lineHeight: 2.6
    letterSpacing: '0'
  quran-heading:
    fontFamily: '"Amiri Quran", Amiri, serif'
    fontSize: 35px
    fontWeight: 400
    lineHeight: 1.8
rounded:
  material: 2px
  compact: 3px
  panel: 4px
  control: 5px
spacing:
  control-gap: 12px
  mobile-gutter: 20px
  tablet-gutter: 30px
  desktop-gutter: 40px
  community-gap: 56px
  upholstery-desktop: 48px
  upholstery-tablet: 18px
  upholstery-mobile: 6px
components:
  button-primary:
    backgroundColor: '{colors.action}'
    textColor: '{colors.action-ink}'
    rounded: '{rounded.control}'
    padding: 11px 20px
    typography: '{typography.label}'
  button-primary-hover:
    backgroundColor: '{colors.action-hover}'
  button-secondary:
    textColor: '#f0cfaa'
    rounded: '{rounded.control}'
    padding: 11px 20px
    typography: '{typography.label}'
  button-text:
    textColor: '#edbd89'
    padding: 7px 0
  input:
    backgroundColor: '{colors.field}'
    textColor: '{colors.field-ink}'
    rounded: '{rounded.control}'
    padding: 12px 14px
    typography: '{typography.body}'
  quiz-panel:
    backgroundColor: '{colors.panel}'
    rounded: '{rounded.panel}'
    padding: 34px
  moment-card:
    backgroundColor: '{colors.moment-dark}'
    rounded: '{rounded.material}'
    padding: 30px 29px
  form-panel:
    backgroundColor: '{colors.form-clay}'
    textColor: '#3d2921'
    rounded: '{rounded.panel}'
  lantern:
    rounded: '{rounded.control}'
    width: 80px
    height: 170px
  header-lantern:
    width: 44px
    height: 88px
  account-trigger:
    textColor: '#f0cb98'
    rounded: '{rounded.control}'
    padding: 8px 12px
    size: 44px
  tent-door:
    backgroundColor: '{colors.panel}'
    padding: 28px 46px 40px
    width: min(100%, 520px)
  cushion:
    width: 160px
    height: 100px
  quran-reading:
    backgroundColor: '{colors.form-clay}'
    textColor: '{colors.field-ink}'
    padding: 30px 40px
    typography: '{typography.quran}'
---

# Design System: أصحاب الخيمة / Ashab Al Khaimah

## Overview

**Creative North Star: "Deep oxblood and orange lamplight"**

Deep oxblood textile, warm ivory ink and interactive orange lamplight place this bilingual learning circle inside its Najdi gathering. Intricacy comes from an authored geometric Najdi rug, upholstered majlis side rails, Sadu geometry, stepped plaster, fine brass-colored rules, separate pixel-art Sadu cushions and actual Arabic lettering. Generous space around sections, tables and actions makes the dark setting welcoming and readable.

Amiri carries the Arabic identity; Lora gives English headings a quiet literary character. Figtree and IBM Plex Sans Arabic keep controls and reading clear. The muted diamond rug carries the continuous public ground; calm red surfaces carry task content and cards, and clay is reserved for focused reading forms. Reference photographs never appear in the interface.

Individual floor, backrest, square and cylindrical cushion silhouettes add a small crafted accent. Each is hand-drawn crisp-edge SVG; keep them separate and clear of reading and controls. The bilingual remembered-name/password tent door uses the same red, brass, cream fields and lantern vocabulary.

**Key Characteristics:**

- Deep oxblood rug ground with quiet geometric motifs, warm ivory reading and amber actions.
- Black, ivory and ochre Sadu, upholstered majlis side rails, stepped plaster and brass detail.
- Equal English and Arabic functionality, with RTL and mixed-script isolation.
- Stable interactive lantern buttons, orange glow and restrained motion.
- Roomy sections, generous table rows and a wider desktop shell.
- Separate hand-drawn pixel-art Sadu cushions, never a complete seating scene.

## Colors

Deep red is the continuous public ground; warm ivory and amber give it legibility and warmth. The frontmatter holds the normative values.

### Primary

- **Rug / rug motif:** the continuous deep red floor and its quiet diamond geometry, authored in `assets/najdi-rug.svg`. Keep contrast low behind content. **Upholstery:** the dark backing for the stitched majlis rail asset, `assets/majlis-edge.svg`.
- **Oxblood fabric, deep fabric and paper:** layered textile reds for the public shell and deeper recesses. **Header** is the darkest masthead ground; **hero** raises the gathering panel tonally without turning it beige.
- **Amber action / action hover:** primary quiz and continuation controls, with dark **action ink**. In clay reading forms, primary controls invert to dark fabric with light text.
- **Sadu red:** the authored textile asset, paired with **stitch black**, **stitch ivory** and **ochre**. Keep its intricate internal palette intact.

### Secondary

- **Brass:** supporting detail and quiet ornament. **Focus:** a brighter warm ring for keyboard navigation. Orange halos stay bounded around the lamps; they do not become a page-wide wash.

### Neutral

- **Ink:** warm ivory reading on red. **Muted:** warm supporting copy. **Line:** subdued reddish-brown divisions. **White:** the lightest cream token where the existing interface uses it.
- **Panel:** red public quiz and empty-state surfaces. **Moment dark:** the approved moment's deeper warm ground.
- **Form clay:** focused start, login and editor forms. **Field / field ink:** cream input surfaces with dark reading, including inside clay forms.

**The Material Detail Rule.** Repeat the authored Najdi textile, plaster and brass vocabulary across edges and section details; keep ornament outside reading and control hit areas.

## Typography

**Display font:** Amiri, serif. **English headings:** Lora, Georgia, serif. **Body and controls:** Figtree with IBM Plex Sans Arabic; Arabic reverses that priority. **Qur’an reading:** dedicated Amiri Quran, falling back to Amiri and serif. Font files are served locally; the Amiri Quran asset includes its OFL license.

The Arabic identity is generous and calligraphic; English headings are literary without becoming ceremonial. Controls stay quiet and compact. English text that remains English retains its own family in the Arabic interface.

- **Arabic display:** the gathering name uses the frontmatter display role (91px / 1.6); tablet becomes (77px), mobile (61px), and the narrowest breakpoint (51px).
- **Headline:** English public page titles use (42px), reducing to (34px) on mobile. Arabic page titles preserve their existing Amiri treatment. Generic headings descend through (36px / 25px / 21px); home section headings use (29px), reducing to (27px) on mobile.
- **Body:** the base is (16px); supporting public copy commonly uses (13–15px), with more generous Arabic line height. Page descriptions cap at (59ch), and review explanations at (65ch).
- **Labels:** action labels are (15px, 600); navigation is (13px), becoming (12px) on mobile. Table labels are (12px), becoming (10px) on mobile.
- **Scores:** Lora tabular numbers use (22px), reduced to (20px) in the home table and (19px) on mobile. Result scores use (80px), reducing to (70px) on mobile.
- **Qur’an text:** dedicated Amiri Quran uses (32px / 2.6), reducing to (28px / 2.6) at (750px). Surah headings use the same family at (35px / 1.8), reducing to (30px). Keep verse text at (400), with zero letter spacing. Separate ayah indices use IBM Plex Sans Arabic (16px / 2.6), reducing to (14px).

**The Two Scripts Rule.** Use Amiri for Arabic display and headings, Lora for English headings, and the language-appropriate sans serif for body and controls. Remove English tracking from Arabic.

## Layout

The centered shell has a maximum width of (1280px) and desktop inline gutters of (40px). The sticky masthead has a (7px) textile edge, (93px) brand row and (54px) text navigation. Main content uses (45px) top and (72px) bottom padding. The footer caps at (1200px). Fixed authored upholstered majlis side rails occupy (48px) at each viewport edge, narrowing to (18px) at (1100px) and (6px) at (620px), and cannot intercept input. The rug repeats at (384 × 384px) on the body and tent-door ground; keep text and controls on calm surfaces.

Home standings and the approved moment use a (1.28fr / 1fr) grid with a (56px) gap and (42px) space above. Weekly quiz actions have (34px / 35px) vertical space. Table rows and cards breathe: standard table cells use (20px 17px), home cells (17px 14px), and public quiz panels (34px) padding.

At (900px), gutters become (30px), main padding becomes (34px 30px 58px), and the community gap becomes (34px). At (620px), the grid becomes one column with a (38px) gap; main padding is (28px 20px 49px), with the compact header and navigation behavior described below. The Latin masthead label hides while Arabic identity and language controls remain. The weekly action stays beside its copy and permits wrapped labels, stacking across the available width at (380px).

The gathering name is centered between two lanterns inside a fine frame, ending in stepped plaster and a broad textile band. Desktop minimum height is (374px), mobile (354px); mobile moves smaller lamps above the name. The woven bottom band is (48px), reducing to (38px). The (380px) breakpoint further reduces the title and action widths.

At (750px), the header brand row has a (76px) minimum height with (10px 20px 6px) padding and unwrapped utility controls; below (620px), inline padding becomes (16px). The six student destinations use a visible three-column, two-row grid with (44px) minimum targets and an (88px) minimum navigation height. The header lamp has reserved desktop flow space and hides at (750px); hero and door lamps remain. In landscape at heights up to (500px), the header scrolls with the page and scroll padding becomes (24px). Hero bottom padding is (106px), increasing to (122px) at (750px) to clear the cushions. The shared footer leaves (100px) above its rule for a centered floor cushion. The tent door centers a sheet no wider than (520px) in a full-height red ground; its desktop sheet padding is (28px 46px 40px), reducing to (24px 24px 32px) at (750px).

The shared Qur’an reader presents its controls in four columns (surah, from ayah, to ayah, action), with a (16px) gap. At (750px), controls use two columns with the surah selector and action spanning both. The clay reading panel uses (30px 40px) padding, reducing to (24px 18px). Its verse list caps at (880px); each RTL verse row reserves a separate index column (32px desktop, 22px mobile).

Use logical inline properties. The document changes both language and direction. Isolate names and scores with `bdi`; let authored questions and captions determine their own direction. Standings remain semantic tables; the home preview omits the percentage column.

## Elevation & Depth

Depth comes from the quiet rug ground, upholstered edge shading, red tonal layers, fine brass-colored borders, dark moment surfaces and bounded orange lantern halos. Public panels use no box shadow. Stepped plaster, stitched upholstery and geometric rug detail provide material depth. Lantern hover and bright state add a local SVG drop shadow (0 3px 8px #fc8c3b50); the page itself remains grounded. The tent door alone uses a soft structural shadow (0 22px 60px #1b080c45) below its centered sheet.

**The Bounded Light Rule.** Keep orange light local to the lanterns and their stable button targets. Pause loops offscreen and when the document is hidden; retain the header pause control and static reduced-motion path.

## Shapes

Small corners retain the material language: moment cards (2px), results and the home quiz action (3px), public panels and answer options (4px), general buttons, fields and lantern targets (5px). Circles belong to radio checks and the result medal. Fine rules, outlined diamonds, stepped plaster and crisp Sadu geometry recur throughout the interface. Keep textile edges crisp and plaster steps angular. Cushion silhouettes are stepped pixel geometry with `shape-rendering="crispEdges"` and pixelated rendering; retain their woven patterns and four distinct shapes.

## Components

### Buttons

Compact, direct actions with more surrounding room. Public primary buttons use amber with dark red ink and a lighter amber hover. General controls have a (46px) minimum height and (11px 20px) padding; the home quiz action grows to (48px). In clay forms, primary controls use dark fabric and cream text. Secondary controls are transparent with warm light text and a brass-colored border, gaining a red fill on hover. Text actions use light amber and underline on hover. Disabled controls reduce opacity to (0.5); pressed controls scale to (0.98). Shared keyboard focus is a (3px) warm outline offset by (4px).

### Inputs / Fields

Cream fields with dark text, a thin warm border and control corners. Fields have a (47px) minimum height and (12px 14px) padding; placeholders remain dark enough for the cream field. Preserve visible labels, keyboard focus and existing validation. Start, login and focused editor forms retain clay surfaces, with dark reading and dark primary actions.

### Navigation

Text tabs in the public masthead. Warm muted text brightens on hover; selection gains (700) weight and a (2px) amber underline. The thread settles over (220ms); keyboard focus suppresses this animation. Language and motion controls remain keyboard accessible with (44px) minimum targets. All six student destinations remain visible in the mobile three-by-two grid, with wrapped labels and a red selected fill. The pause control exposes its pressed state and translated action label.

### Account disclosure

A native `details` / `summary` disclosure groups the remembered name, password change, sign-out and teacher entry. Its labeled summary is at least (44 × 44px), with a warm border, control corners and a red open/hover state. The anchored popover is (250px) wide, bounded by the viewport, with (44px) action rows. At (750px), the summary becomes icon-only while its accessible name retains the account identity. Escape closes it and returns focus to the summary; an outside pointer closes it, and activating an action closes it.

### Halaqa media

A labeled play preview loads the selected lesson only after activation; choosing a lesson also starts its player. Keep an external YouTube link available beside the player. Desktop uses player/list columns (1.65fr / 1fr, list minimum 260px) with a (24px) gap; at (750px), they stack with a (12px) gap. The preview uses the deep fabric surface, amber play geometry and a visible inset focus ring.

### Cards / Containers

Public quiz cards and empty states use red panel surfaces, warm borders and (34px) padding; mobile uses (29px 25px). A small outlined diamond keeps the Najdi detail away from content. Focused start forms use clay. Approved moment cards use the dark warm ground, light text, orange answer emphasis, textile edges and a fine caption divider; padding is (30px 29px), or (29px 25px) on mobile. Use actual approved content rather than decorative quotations.

### Standings

Use a semantic table with scoped headers, roomy row dividers, end-aligned scores and tabular numerals. Headers use a raised red tone and brass-colored top rule. Champion rows gain a warmer red fill; names and ranks gain emphasis. Scores are warm light amber. Row hover changes the red surface over (160ms). Preserve real ranks and ties; names can wrap.

### Quiz feedback and results

Answer options are large label targets with native radio inputs, letter markers and circular checks. Red surfaces carry light reading; selection changes the surface to warm burnt red, brightens the border and fills markers with amber. Desktop targets are at least (82px), mobile (80px). Fine-pointer hover shifts an option by (2px) toward reading flow; focus cancels movement. Progress uses subdued red, completed ochre and current amber. Questions enter over (250ms). Results use a red textile ground, warm score, amber medal and short settling motion; confetti is hidden. Private practice uses a quiet ruled section and shared review components.

### Qur’an reader

The reading tab and Homework disclosure reuse one shared reader. Keep the familiar cream number fields, native surah selector and amber reading action above a quiet clay reading panel. Label every control; fields use (48px) minimum heights. Surah and range labels follow the selected interface language while the Uthmani text remains Arabic with explicit `lang` and RTL direction.

Use dedicated Amiri Quran for the surah heading and verses. Preserve the returned Al Quran Cloud Uthmani text, diacritics and order exactly; sacred text is reading content, never ornament. Keep the page-level `notranslate` metadata and source-text `translate="no"` protection. A centered heading and fine warm divider introduce the range. Verse rows have (22px) vertical padding, reducing to (18px) on mobile, and a separate ochre-brown index so numbering does not disturb the text. Keep the index legible on clay. The attributed source link stays below the reader in quiet supporting text.

Loading uses a status message; failed or incomplete loading uses readable feedback and an explicit retry action. Range validation stays visible and prevents invalid reading. Successful content is cached, and stale or slow requests are canceled. In Homework, adding a selected range appends its explicit reference to the existing draft; the normal Save action remains necessary. Saved explicit references can open the reading range directly, including after refresh. Do not infer a range from legacy free-form assignments or present an unsaved draft as shared homework.

### Tent door

The remembered-name/password entry sheet inherits the red panel, woven top edge, cream fields and amber full-width action. Its Amiri name is (55px / 1.6), reducing to (45px) at (750px) and (38px) at (380px). Fields have visible labels, a (48px) minimum height and native name/password autocomplete. Creation, returning-name, alternate-name, recovery-word and password-change modes retain the upstream controller and translated copy. Recovery and password change reuse the same fields, lanterns, cushion and validation treatment. The English password-change heading uses Lora (32px / 1.4), with (34px 0 20px) block margins; Arabic follows the existing Amiri display family. Validation appears as a live alert. The signed-in header exposes password change through the account disclosure with its translated label. Google sign-in shows readable loading or failure status rather than leaving an empty control. Language and pause controls stay above the form; small interactive lanterns frame the sheet, and a separate cylindrical cushion sits below its edge. Do not turn decorative cushion hover into an implied form action.

### Pixel-art cushions

Use only the four authored SVGs: floor mattress, long backrest, square pillow and cylindrical armrest. These are separate decorations, not a composite seating scene or generated illustration. Keep their crisp pixel silhouettes at the existing small accent scale. The square and long backrest sit at hero edges; a floor mattress marks the shared footer; the cylindrical armrest appears beside quiz entry and the tent door. The decorative wrappers are hidden from assistive technology.

Ambient breathing moves only the inner artwork by (2px) over a (7s) loop, with staggered delays. Hover-capable pointers lift the wrapper by (3px) and rotate it (−2°) over (220ms). Cushions use the same ambient-motion hook as lanterns: pause outside the viewport and when the document is hidden, and honor the global pause. Reduced motion stops breathing and removes the hover transition. Preserve the underlying content and controls at all times.

### Lanterns and material trim

Lanterns are semantic buttons containing authored inline SVG brass geometry and orange panes. Their button targets remain stationary; only the inner SVG bodies sway. Desktop targets are (80 × 170px), mobile (54 × 115px). Pointer activation, Enter or Space brightens/dims an individual lamp, updates `aria-pressed`, and changes its bilingual action label. Decorative SVG, halo and boost layers remain hidden from assistive technology. A visible (2px) focus ring identifies the stable target.

The two bodies sway between (−1°) and (1°), with offset (8s / 9s) loops. Bounded orange halo and pane brightness run over (4.3s); bright state adds a separate orange boost with a (220ms) opacity transition. Hover adds a restrained local drop shadow. Only transform and opacity animate continuously. A compact lamp can appear in the masthead away from home in reserved flow space (44 × 88px, with 48px flex basis), and is hidden at (750px).

The shared ambient-motion hook pauses lantern and cushion loops offscreen; document visibility also pauses them. The header pause control disables animations and transitions for the visit. Reduced motion keeps lamps static and preserves immediate brighten/dim interaction. Content is present and interactive before animation runs. Reuse the original Sadu and stepped-plaster assets with the authored geometric rug and upholstered side-rail SVGs; reference photography stays out of the UI.

## Do's and Don'ts

### Do:

- **Do** use the four separate authored pixel-art cushion silhouettes at the existing accent placements.
- **Do** use deep red for public grounds, warm ivory for reading and amber for primary actions.
- **Do** reserve clay surfaces for focused reading forms.
- **Do** repeat authored Sadu, stepped plaster and brass details across the public interface.
- **Do** preserve semantic tables, visible keyboard focus, language switching and mixed-script isolation.
- **Do** keep app copy factual and grounded in actual quizzes, standings and approved moments.
- **Do** keep lantern targets stable, keyboard operable and labeled in the current language.
- **Do** keep content visible and interactive before motion starts.

### Don't:

- **Don't** replace the cushions with a composite seating scene, generated illustration or raster asset.
- **Don't** return the public shell to a fully beige or soft light theme.
- **Don't** put reference photographs or raster scene substitutes in the UI.
- **Don't** use sacred text as ornament.
- **Don't** replace the Najdi vocabulary with generic pan-Islamic decoration.
- **Don't** add promotional filler, invented scores, members, dates or quiz content.
- **Don't** propagate legacy blue or purple teacher-control accents into the public design system.
