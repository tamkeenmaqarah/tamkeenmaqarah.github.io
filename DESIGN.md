---
name: أصحاب الخيمة / Ashab Al Khaimah
description: A bilingual Qur’an review circle on deep oxblood textile, lit by interactive orange lanterns and a pixel-art dish heater.
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
  heater:
    backgroundColor: transparent
    rounded: '{rounded.control}'
    width: 112px
    height: 144px
  heater-week:
    width: 88px
    height: 114px
  heater-week-mobile:
    width: 70px
    height: 90px
  heater-week-narrow:
    width: 58px
    height: 76px
  heater-footer:
    width: 96px
    height: 124px
  heater-footer-mobile:
    width: 84px
    height: 108px
  heater-door:
    width: 86px
    height: 112px
  heater-door-mobile:
    width: 76px
    height: 98px
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
  avatar:
    backgroundColor: '{colors.rug-motif}'
    width: 28px
    height: 28px
  avatar-large:
    width: 136px
    height: 136px
  profile-settings:
    backgroundColor: '#35151bed'
    rounded: '{rounded.control}'
    padding: 32px
  assignment-surface:
    backgroundColor: '{colors.upholstery}'
    textColor: '{colors.ink}'
    padding: 34px 32px 28px
  study-section:
    backgroundColor: '{colors.upholstery}'
    padding: 8px
  study-section-selected:
    backgroundColor: '{colors.action}'
    textColor: '{colors.action-ink}'
    rounded: '{rounded.panel}'
    padding: 12px 16px
    height: 52px
  notes-source:
    backgroundColor: '{colors.form-clay}'
    textColor: '{colors.field-ink}'
    rounded: '{rounded.control}'
    padding: 22px
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

Individual floor, backrest, square and cylindrical cushion silhouettes add a small crafted accent. A separate pixel-art dish heater shares their stepped geometry and gives the gathering a bounded, interactive source of radiant warmth. Each is hand-drawn crisp-edge SVG; keep them separate and clear of reading and controls. The bilingual remembered-name/password tent door uses the same red, brass, cream fields and lantern vocabulary.

**Key Characteristics:**

- Deep oxblood rug ground with quiet geometric motifs, warm ivory reading and amber actions.
- Black, ivory and ochre Sadu, upholstered majlis side rails, stepped plaster and brass detail.
- Equal English and Arabic functionality, with RTL and mixed-script isolation.
- Stable interactive lantern and dish-heater buttons, bounded orange warmth and fluid control feedback.
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

- **Brass:** supporting detail and quiet ornament. **Focus:** a brighter warm ring for keyboard navigation. Concentrated orange halos stay bounded around lamps, heater coils and portraits. A faint heater spill can warm the rug behind the content; it cannot obscure reading or intercept input.

### Neutral

- **Ink:** warm ivory reading on red. **Muted:** warm supporting copy. **Line:** subdued reddish-brown divisions. **White:** the lightest cream token where the existing interface uses it.
- **Panel:** red public quiz and empty-state surfaces. **Moment dark:** the approved moment's deeper warm ground.
- **Form clay:** focused start, login and editor forms. **Field / field ink:** cream input surfaces with dark reading, including inside clay forms.

**The Material Detail Rule.** Repeat the authored Najdi textile, plaster and brass vocabulary across edges and section details; keep ornament outside reading and control hit areas.

## Typography

**Display font:** Amiri, serif. **English headings:** Lora, Georgia, serif. **Body and controls:** Figtree with IBM Plex Sans Arabic; Arabic reverses that priority. **Qur’an reading:** dedicated Amiri Quran, falling back to Amiri and serif. Font files are served locally; the Amiri Quran asset includes its OFL license.

The Arabic identity is generous and calligraphic; English headings are literary without becoming ceremonial. Controls stay quiet and compact. English text that remains English retains its own family in the Arabic interface.

- **Arabic display:** the retained ceremonial/door identity uses the frontmatter display role (91px / 1.6); tablet becomes (77px), mobile (61px), and the narrowest breakpoint (51px).
- **Headline:** English public page titles use (42px), reducing to (34px) on mobile. Arabic page titles preserve their existing Amiri treatment. Generic headings descend through (36px / 25px / 21px); home section headings use (29px), reducing to (27px) on mobile.
- **Body:** the base is (16px); supporting public copy commonly uses (13–15px), with more generous Arabic line height. Page descriptions cap at (59ch), and review explanations at (65ch).
- **Labels:** action labels are (15px, 600); navigation is (13px), becoming (12px) on mobile. Table labels are (12px), becoming (10px) on mobile.
- **Scores:** Lora tabular numbers use (22px), reduced to (20px) in the home table and (19px) on mobile. Result scores use (80px), reducing to (70px) on mobile.
- **Qur’an text:** the retained frontmatter role describes embedded assigned-range reading (32px / 2.6; 28px at 750px). The public library scopes its continuous text separately: a (36px) initial setting, adjustable (24–48px), line height (2.8), weight (400) and zero tracking. At (750px), continuous text uses (90%) of the selected size with (2.7) line height. Public surah headings use (44px / 1.8), becoming (32px / 1.8) on mobile. Inline ayah listening markers use (16px) numerals in (44 × 44px) targets. These are surface rules, not replacements for incumbent type primitives.

**The Two Scripts Rule.** Use Amiri for Arabic display and headings, Lora for English headings, and the language-appropriate sans serif for body and controls. Remove English tracking from Arabic.

## Layout

The centered shell has a maximum width of (1280px) and desktop inline gutters of (40px). The sticky masthead has a (7px) textile edge, (93px) brand row and (54px) text navigation. Main content uses (45px) top and (72px) bottom padding. The footer caps at (1200px). Fixed authored upholstered majlis side rails occupy (48px) at each viewport edge, narrowing to (18px) at (1100px) and (6px) at (620px), and cannot intercept input. The rug repeats at (384 × 384px) on the body and tent-door ground; keep text and controls on calm surfaces.

Home standings and the approved moment use a (1.28fr / 1fr) grid with a (56px) gap and (42px) space above. Home task and weekly-quiz panels use the compact paired layout described below. Table rows and cards breathe: standard table cells use (20px 17px), home cells (17px 14px), and public quiz panels (34px) padding.

At (900px), gutters become (30px), main padding becomes (34px 30px 58px), and the community gap becomes (34px). At (620px), the grid becomes one column with a (38px) gap; main padding is (28px 20px 49px), with the compact header and navigation behavior described below. The Latin masthead label hides while Arabic identity and language controls remain. The weekly action stays beside its copy and permits wrapped labels, stacking across the available width at (380px).

Home uses a compact week/date introduction with a bounded lantern, heater and backrest at its side, followed by actual Sunday homework and the weekly quiz in a (1.3fr / 1fr) grid with a (24px) gap. The introduction uses (26px 32px) padding and a (176px) minimum height; its title is (42px / 1.3), with Amiri and (1.5) line height in Arabic. The compact hearth reserves (260px × 150px); its heater is (88px × 114px). At (750px), the introduction uses (22px 20px 28px), a (34px) title and a smaller hearth; homework and quiz stack with a (16px) gap. The task panels use (28px 30px), reducing to (22px 20px). At (380px), the introduction further tightens its inline padding and hearth.

At (750px), the header brand row has a (76px) minimum height with (10px 20px 6px) padding and unwrapped utility controls; below (620px), inline padding becomes (16px). Six student destinations use a visible three-column, two-row grid with (44px) minimum targets and a (94px) minimum navigation height. The header lamp hides at (750px); the compact Home hearth and tent-door lamps remain. In landscape at heights up to (500px), the header scrolls with the page. The shared footer retains its separate floor-cushion and heater grouping; footer heaters are (96px × 124px), reducing to (84px × 108px). The tent door centers a sheet no wider than (520px) in a full-height red ground; its desktop sheet padding is (28px 46px 40px), reducing to (24px 24px 32px) at (750px).

The Home launch band uses the existing task-action layout. Within Halaqas, the visible Lessons / Missed questions section bar has two equal columns, retaining amber selection and the existing section spacing. Primary student notes and generic AI-plan/notes-derived-card/Q&A forms are no longer present; their retained style declarations and frontmatter primitives describe legacy styling rather than a new surface to reproduce. Account jump links retain wrapping (44px) targets.

The Homework week band uses (44px / minmax(0, 1fr) / 44px) columns. At (750px), the full localized date takes its own first grid row; the native input and arrow controls share the second row. The reader’s one-ayah practice sheet uses (28px 32px) padding, reducing to (22px 18px). The current Reveal card and answer reserve (190px) minimum height, reducing to (170px) at (750px). Range fields use two columns, a (16px) gap and a (460px) maximum width. Self-check actions wrap on desktop and use two equal columns with a (10px) gap on mobile, retaining (48px) minimum targets. Readiness actions wrap, and the primary readiness button spans available width on mobile.

The retained embedded reader uses native range controls and clay verse rows. Current Homework opens the public library with the complete assigned surah and highlighted ayahs; the practice form asks for a range within the active assignment rather than locking away that choice. The public Qur’an library uses a (250px / minmax(0, 1fr)) grid with a (28px) gap. Its dark, sticky surah library becomes a native disclosure below (1000px). The public reading sheet has (30px 32px) padding, reducing to (22px 18px) at (750px). A continuous RTL passage uses a double green inset frame and inline listening markers, with reflow rather than fixed printed pages. On mobile, text precedes save-place, audio, the Tajweed key and chapter navigation; the visible Reciter & audio link reaches the controls below the passage. Only loaded audio creates the fixed native player, with (130px) bottom space reserved.

Use logical inline properties. The document changes both language and direction. Isolate names and scores with `bdi`; let authored questions and captions determine their own direction. Standings remain semantic tables; the home preview omits the percentage column.

## Elevation & Depth

Depth comes from the quiet rug ground, upholstered edge shading, red tonal layers, fine brass-colored borders, dark moment surfaces, bounded orange lantern halos and radiant heater light. Heater spill and the faint room-warmth layer remain behind content and ignore pointer input. Public panels use no box shadow. Stepped plaster, stitched upholstery and geometric rug detail provide material depth. Lantern hover and bright state add a local SVG drop shadow (0 3px 8px #fc8c3b50); the page itself remains grounded. The tent door alone uses a soft structural shadow (0 22px 60px #1b080c45) below its centered sheet.

**The Bounded Light Rule.** Concentrate orange light around lanterns, heater coils and profile portraits; keep any room spill faint and behind readable content. Keep interactive object targets stable. Pause loops offscreen and when the document is hidden; retain the shared pause control and static reduced-motion path.

## Shapes

Small corners retain the material language: moment cards (2px), results and the home quiz action (3px), public panels and answer options (4px), general buttons, fields and lantern targets (5px). Circles belong to radio checks and the result medal. Fine rules, outlined diamonds, stepped plaster and crisp Sadu geometry recur throughout the interface. Keep textile edges crisp and plaster steps angular. Cushion silhouettes are stepped pixel geometry with `shape-rendering="crispEdges"` and pixelated rendering; retain their woven patterns and four distinct shapes.

## Components

### Buttons

Compact, direct actions with more surrounding room. Public primary buttons use amber with dark red ink and a lighter amber hover. General controls have a (46px) minimum height and (11px 20px) padding; the home quiz action grows to (48px). In clay forms, primary controls use dark fabric and cream text. Secondary controls are transparent with warm light text and a brass-colored border, gaining a red fill on hover. Text actions use light amber and underline on hover. Disabled controls reduce opacity to (0.5); pressed controls scale to (0.98). Shared button and utility feedback uses (160ms) transitions; keyboard activation keeps targets still, and reduced motion removes pressed transforms. Shared keyboard focus is a (3px) warm outline offset by (4px).

### Inputs / Fields

Cream fields with dark text, a thin warm border and control corners. Fields have a (47px) minimum height and (12px 14px) padding; placeholders remain dark enough for the cream field. Preserve visible labels, keyboard focus and existing validation. Start, login and focused editor forms retain clay surfaces, with dark reading and dark primary actions.

### Navigation

Text tabs in the public masthead. Warm muted text brightens on hover; selection gains (700) weight and a (2px) amber underline. One positioned underline translates and resizes to the selected tab over (230ms) with the shared ease-out curve after pointer activation. Its position follows layout, font-size changes, resizing and RTL; keyboard navigation and resize placement are immediate. Tab changes reset scroll after the new surface commits, so a shorter destination cannot inherit a stale scroll position. Language and motion controls remain keyboard accessible with (44px) minimum targets. All six student destinations — Home, Homework, Halaqas, Qur’an, Leaderboard and Account — remain visible in the mobile three-by-two grid, with wrapped labels and a red selected fill. The pause control exposes its pressed state and translated action label. Its initial state reads the document’s existing motion setting, so pausing at the tent door remains paused inside the app.

### Account disclosure

A native `details` / `summary` disclosure groups the remembered name, password change, sign-out and teacher entry. Its labeled summary is at least (44 × 44px), with a warm border, control corners and a red open/hover state. The anchored popover is (250px) wide, bounded by the viewport, with (44px) action rows. At (750px), the summary becomes icon-only while its accessible name retains the account identity. Escape closes it and returns focus to the summary; an outside pointer closes it, and activating an action closes it. Pointer opening unfolds the popover over (180ms) from its trigger-side corner, mirrored in RTL. Keyboard opening and reduced motion show it immediately.

### Account and profile portrait

The account page inherits the public rug, upholstered rails, masthead and script pairing. A centered identity column and a quiet dark settings sheet sit in a (220px / minmax(0, 1fr)) grid with a (64px) gap and (980px) maximum width. At (750px), they stack with a (24px) gap. Settings padding changes from (32px) to (24px 20px). The short Sadu seam stays below the identity, clear of the portrait and controls. Visible Profile photo and Sign-in settings jump links precede the layout; password and sign-out actions are also directly available on the page while the native header account/security utility remains.

Circular portraits are (28px) in shared identity contexts and (136px) on the account page. Use the selected real Google picture, cropped upload or name initials; failed images fall back to initials. A fine amber inner ring and translucent outer ring make the portrait share the lanterns’ bounded warmth. The small glow is (0 2px 12px #ec8e3c5c); the account portrait uses (0 4px 28px #ec8e3c59). Only outer-ring opacity breathes, over (5s); the existing ambient hook respects global pause, offscreen/hidden state and reduced motion.

Photo choice is a draft until explicit **Save photo**; **Cancel** restores the saved selection. Google connection/refresh, upload and initials retain separate labeled actions, with readable preparation, save and failure states. Keep the file limit visible (JPG, PNG or WebP, up to 8 MB). Upload preparation center-crops to a (384 × 384px) JPEG; cloud persistence uses the signed-in profile endpoint. Account copy and status messages have English and Arabic equivalents. Keep the real provider control, password action and sign-out accessible; do not substitute a stock portrait or decorate the save/error state.

### Halaqa media

A labeled play preview loads the selected lesson only after activation; choosing a lesson also starts its player. Keep an external YouTube link available beside the player. Desktop uses player/list columns (1.65fr / 1fr, list minimum 260px) with a (24px) gap; at (750px), they stack with a (12px) gap. The preview uses the deep fabric surface, amber play geometry and a visible inset focus ring.

### Cards / Containers

Public quiz cards and empty states use red panel surfaces, warm borders and (34px) padding; mobile uses (29px 25px). A small outlined diamond keeps the Najdi detail away from content. Focused start forms use clay. Approved moment cards use the dark warm ground, light text, orange answer emphasis, textile edges and a fine caption divider; padding is (30px 29px), or (29px 25px) on mobile. Use actual approved content rather than decorative quotations.

### Standings

Use a semantic table with scoped headers, roomy row dividers, end-aligned scores and tabular numerals. Headers use a raised red tone and brass-colored top rule. Champion rows gain a warmer red fill; names and ranks gain emphasis. Scores are warm light amber. Row hover changes the red surface over (160ms). Preserve real ranks and ties; names can wrap.

### Quiz feedback and results

Answer options are large label targets with native radio inputs, letter markers and circular checks. Red surfaces carry light reading; selection changes the surface to warm burnt red, brightens the border and fills markers with amber. Desktop targets are at least (82px), mobile (80px). Fine-pointer hover shifts an option by (2px) toward reading flow; focus cancels movement. Progress uses subdued red, completed ochre and current amber. Questions enter over (250ms). Results use a red textile ground, warm score, amber medal and short settling motion; confetti is hidden. Private practice uses a quiet ruled section and shared review components, with its practice action above the missed-answer list. Existing teacher notes have a visible dark explanation panel and explicit Explain this note action. Home’s weekly quiz action reflects saved local attempts as Resume quiz or View result.

### Qur’an reader

The public library and assigned Qur’an work reuse one reader. Open assigned ayahs reaches full-surah reading with the teacher’s validated ranges highlighted and the first assigned ayah brought into view. A dark upholstered homework band offers actual accessible assignments and a return to the originating task. Empty weekly-work support sits below the reader, preserving the first reading viewport. The public tab adds a searchable 114-surah list, full chapter selection, previous/next chapter controls, a native range disclosure, text sizing and explicit device-local save/resume. All controls remain labeled in English and Arabic; sacred text retains explicit Arabic language, RTL direction and translation protection.

The owner-pinned public composition is continuous mushaf reading with green inline ayah markers. Its ivory sheet (#f6eedb), dark Arabic ink (#24251d) and double green frame (4px, #8b9a77) are scoped to this reading surface inside the existing Najdi world. Markers are green (44 × 44px) native buttons, darkening on hover/pressed state; playback highlights the current ayah. The frame uses (22px 24px) padding, becoming (18px 12px) on mobile. Assigned ayahs use a scoped gold mark (#ebd49b) and gold listening markers (#e5c679); active playback takes green precedence. A textual legend identifies the assigned ranges, so color is not the only cue. The retained embedded reader uses its clay sheet and separate verse rows. Do not promote these public reader surface values into global palette or typography primitives.

Dedicated Amiri Quran renders attributed Al Quran Cloud Tajweed text. Only annotation metadata is removed; Arabic glyphs, diacritics and order are preserved as React text runs, with no provider HTML. The 17-category bilingual Tajweed key is a native disclosure; semantic rule colors are darkened for reading contrast. Text and selected audio provider have separate visible source links. Sacred text is content, never ornament.

The native reciter selector defaults to Muhammad Siddiq Al-Minshawi — Murattal from EveryAyah. It also offers validated, deduplicated Arabic verse-by-verse recordings from Al Quran Cloud; Mishary Alafasy variants are excluded by owner preference. Preserve the default when the additional catalog fails and offer a visible retry. Changing reciter, range, mode or ayah cancels previous audio. Public listening can advance through the selected passage, and inline ayah buttons start one ayah. On mobile, the audio controls follow the reading; a visible Reciter & audio link reaches them, and loaded native playback floats above the safe-area edge with reserved bottom space.

Loading and errors remain readable, with explicit retry and validation. Audio failure leaves text and recall usable. Practice begins with labeled From ayah / To ayah fields, prefilled with the active assignment or up to five ayahs for independent practice. The active assignment bounds the selectable subset. Short presets and an explicit whole-range reset keep longer work deliberate. Reveal ayah remains the full-width central action; the hidden answer is absent from the DOM until reveal. A first-word hint copies only the attributed source. After reveal, Practise this ayah again and Remembered it advance the session; flagged ayahs return in later rounds and progress counts remembered ayahs. Per-ayah listening and the Tajweed key remain available. Completion states that these are the student’s own checks, then offers practice again or return to Homework; readiness is a separate explicit action. No recording, persistent spaced-repetition schedule, mastery claim, automatic grading or points are implied.

State changes use a (180ms) card arrival with (8px) vertical travel, a (260ms) top-to-bottom text uncover with (6px) travel, and a (220ms) progress scale, all with the shared ease-out curve. Keep Arabic upright; there is no mirrored or 3D-flipped text. Focus follows setup, Reveal, the revealed Arabic and summary. New cards center in the phone viewport smoothly only when movement is allowed; global pause and reduced motion remove movement and make scroll immediate. Save-place copy explicitly names this device. Reflow must not imply a fixed printed-page edition. There is no AI-plan band or student homework-note editor in the primary flow.

### Assigned work and readiness

Homework keeps the native Sunday control on a dark upholstered band with a narrow Sadu bottom seam. The initial date is today on Sunday, otherwise the upcoming Sunday. The teacher-assignment surface uses the upholstery and ink tokens, a narrow Sadu top seam and ruled task rows. Authored titles, isolated exact ranges, instructions and explicit Open assigned ayahs / lesson / short-check actions establish the hierarchy. Qur’an work deep-links with assignment and Sunday context; the current authenticated API revision takes precedence over stale URL ranges. Missing work has a visible warning; a failed lookup offers retry and independent reading. Returning from practice focuses the original task, and choosing another Sunday clears old Qur’an homework context. At (750px), the assignment surface uses (28px 18px 24px) padding and task headers stack.

Textual status appears beside each title; private teacher feedback sits in a ruled section, and readiness actions sit below another fine divider. Pending, ready, help, repeat and reviewed remain readable labels, supported by the existing warm status colors. Attached quiz completion precedes readiness. Use explicit ready/help buttons rather than the former preparation checkbox. Readiness and practice completion never imply a verified recitation or new points. Legacy shared notes are a read-only disclosure below work. Halaqas has Lessons / Missed questions sections; teacher-note explanation remains an explicit source-grounded action beside actual quiz feedback.
### Tent door

The remembered-name/password entry sheet inherits the red panel, woven top edge, cream fields and amber full-width action. Its Amiri name is (55px / 1.6), reducing to (45px) at (750px) and (38px) at (380px). Fields have visible labels, a (48px) minimum height and native name/password autocomplete. Creation, returning-name, alternate-name, recovery-word and password-change modes retain the upstream controller and translated copy. Recovery and password change reuse the same fields, lanterns, cushion and validation treatment. The English password-change heading uses Lora (32px / 1.4), with (34px 0 20px) block margins; Arabic follows the existing Amiri display family. Validation appears as a live alert. The signed-in header exposes password change through the account disclosure with its translated label. Google sign-in shows readable loading or failure status rather than leaving an empty control. Language and pause controls stay above the form; small interactive lanterns frame the sheet, and a separate cylindrical cushion sits below its edge. Do not turn decorative cushion hover into an implied form action.

### Radiant dish heater

A separate hand-authored pixel-art dish heater joins the approved cushion vocabulary. The live shell is `assets/majlis-heater.svg` in an image, with `assets/heater-coils.svg` as its separate coil-layer background; both preserve crisp stepped geometry and pixelated rendering. Do not replace the object with a photograph or a composite seating scene. The reusable heater target is (112 × 144px); the compact Home hearth uses (88 × 114px), (70 × 90px) at (750px) and (58 × 76px) at (380px). Footer heaters are (96 × 124px), reducing to (84 × 108px). The door uses (86 × 112px), reducing to (76 × 98px), and follows the form/actions in keyboard order while retaining its visual position beside the sheet.

Each heater is a stationary native button with bilingual Increase heater warmth / Lower heater warmth labels and `aria-pressed`. Pointer, Enter or Space toggles its own normal/boosted warmth. Its shell and decorative layers cannot intercept input. Normal coils stay visible; boost raises coil opacity over (720ms), halo/spill opacity over (650ms), and halo/spill scale over (900ms), all with `cubic-bezier(.16,1,.3,1)`. The small power light settles over (300ms). Focus uses a (3px) warm ring offset by (5px).

The core breathes over (5.5s), using only opacity and a restrained scale from (0.95) to (1.05). It shares the ambient-motion hook with lanterns, portraits and cushions: pause offscreen, when hidden and through the global pause; reduced motion removes the loop and transition. A boosted heater in the app can reveal faint room warmth over (650ms), behind all content with `pointer-events: none`. Keep coil light local and the textile legible. State changes remain immediate and operable when motion is disabled.

### Pixel-art cushions

Use only the four authored SVGs: floor mattress, long backrest, square pillow and cylindrical armrest. These are separate decorations, not a composite seating scene or generated illustration. Keep their crisp pixel silhouettes at the existing small accent scale. The compact Home hearth uses the long backrest, hidden at (750px); a floor mattress marks the shared footer; the cylindrical armrest appears beside quiz entry and the tent door. The decorative wrappers are hidden from assistive technology.

Ambient breathing moves only the inner artwork by (2px) over a (7s) loop, with staggered delays. Hover-capable pointers lift the wrapper by (3px) and rotate it (−2°) over (220ms). Cushions use the same ambient-motion hook as lanterns: pause outside the viewport and when the document is hidden, and honor the global pause. Reduced motion stops breathing and removes the hover transition. Preserve the underlying content and controls at all times.

### Lanterns and material trim

Lanterns are semantic buttons containing authored inline SVG brass geometry and orange panes. Their button targets remain stationary; only the inner SVG bodies sway. Desktop targets are (80 × 170px), mobile (54 × 115px). Pointer activation, Enter or Space brightens/dims an individual lamp, updates `aria-pressed`, and changes its bilingual action label. Decorative SVG, halo and boost layers remain hidden from assistive technology. A visible (2px) focus ring identifies the stable target.

The two bodies sway between (−1°) and (1°), with offset (8s / 9s) loops. Bounded orange halo and pane brightness run over (4.3s); bright state adds a separate orange boost with a (550ms) opacity transition using the shared ease-out curve. Body-filter feedback settles over (380ms); bright state uses a bounded local drop shadow (0 3px 12px #fc8c3b85). Only transform and opacity animate continuously. A compact lamp can appear in the masthead away from home in reserved flow space (44 × 88px, with 48px flex basis), and is hidden at (750px).

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
