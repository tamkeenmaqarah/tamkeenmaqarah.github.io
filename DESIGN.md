---
name: أصحاب الخيمة / Ashab Al Khaimah — Teacher dashboard
description: A private operating dashboard in the public circle’s dark Najdi textile world.
colors:
  rug: '#4c1b28'
  sidebar: '#321319'
  working-ground: '#35151bdb'
  entry-ground: '#35151bf0'
  panel: '#54232b'
  selected: '#652b34'
  ink: '#f0dfc2'
  muted: '#d0ad8c'
  line: '#7c4b3e'
  action: '#e7b479'
  action-hover: '#f1c790'
  action-ink: '#3c1920'
  focus: '#ffbd69'
  form-clay: '#ead3ab'
  field: '#f5e5c7'
  field-ink: '#3a2920'
  form-muted: '#6a4b31'
  form-action: '#742c34'
  form-action-hover: '#5e222c'
  form-secondary-hover: '#dec29a'
  form-action-ink: '#fff2d9'
  form-selection: '#decaac'
  brand-gold: '#f5d8a0'
  published: '#c2d5b3'
typography:
  headline:
    fontFamily: Lora, Georgia, serif
    fontSize: 38px
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: -0.025em
  title:
    fontFamily: Lora, Georgia, serif
    fontSize: 25px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: -0.025em
  heading-arabic:
    fontFamily: Amiri, serif
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: '0'
  brand-arabic:
    fontFamily: Amiri, serif
    fontSize: 34px
    fontWeight: 400
    lineHeight: 1.7
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
  navigation:
    fontFamily: Figtree, "IBM Plex Sans Arabic", sans-serif
    fontSize: 15px
  total:
    fontFamily: Lora, serif
    fontSize: 35px
    fontWeight: 400
    lineHeight: 1.2
rounded:
  panel: 5px
  navigation: 4px
  status: 3px
  button: 8px
spacing:
  desktop-block: 44px
  desktop-inline: 48px
  tablet-block: 36px
  tablet-inline: 28px
  mobile-block: 28px
  mobile-inline: 20px
  navigation-gap: 6px
components:
  button-primary:
    backgroundColor: '{colors.action}'
    textColor: '{colors.action-ink}'
    rounded: '{rounded.button}'
    padding: 11px 18px
  button-primary-hover:
    backgroundColor: '{colors.action-hover}'
  button-secondary:
    backgroundColor: transparent
    textColor: '#f0cfaa'
    rounded: '{rounded.button}'
    padding: 11px 18px
  button-form:
    backgroundColor: '{colors.form-action}'
    textColor: '{colors.form-action-ink}'
    rounded: '{rounded.button}'
    padding: 11px 18px
  button-form-hover:
    backgroundColor: '{colors.form-action-hover}'
  button-form-secondary-hover:
    backgroundColor: '{colors.form-secondary-hover}'
    textColor: '{colors.form-action}'
  input:
    backgroundColor: '{colors.field}'
    textColor: '{colors.field-ink}'
    rounded: '{rounded.panel}'
    height: 46px
    typography: '{typography.body}'
  sidebar-item:
    backgroundColor: transparent
    textColor: '#ddc0a0'
    rounded: '{rounded.navigation}'
    padding: 12px 14px
    height: 49px
    typography: '{typography.navigation}'
  sidebar-item-selected:
    backgroundColor: '{colors.selected}'
    textColor: '#ffe0a5'
  editing-sheet:
    backgroundColor: '{colors.form-clay}'
    textColor: '{colors.field-ink}'
    rounded: '{rounded.panel}'
  empty-state:
    backgroundColor: '{colors.panel}'
    textColor: '{colors.ink}'
    rounded: '{rounded.panel}'
    padding: 36px 28px
---

# Design System: أصحاب الخيمة / Ashab Al Khaimah — Teacher dashboard

## Overview

**Creative North Star: "A quiet working room inside the Najdi circle"**

The teacher dashboard belongs to the same deep burgundy Najdi world as the public student site. A muted geometric rug, dark fabric, warm ivory reading, amber actions, Amiri Arabic headings and Lora English headings establish that relationship. A persistent task sidebar and restrained working sheets give private teaching work its own clear organization.

The dashboard is a calm operating surface for quizzes, grades, Sunday homework and approved funny answers. Actual counts and task rows carry the hierarchy. Keep the Sadu seam at the navigation edge and teacher entry; content receives space, fine rules and quiet tonal separation. There is no ornamental animation in the teacher shell.

**Key Characteristics:**

- Deep burgundy rug and dark working ground, with warm ivory reading and amber actions.
- A persistent logical-start sidebar that becomes a compact sticky menu on mobile.
- Clay editing sheets, cream fields and visible save actions.
- Equal English and Arabic functionality with mirrored layout and isolated mixed-script numbers.
- Real operational counts, clear task rows and restrained Sadu detail.

## Colors

The frontmatter owns the normative values. These tokens describe the effective teacher.css layer loaded after the older shared stylesheet.

### Primary

- **Amber action / action hover / action ink:** primary actions on the dark working ground. **Form action / form action ink:** dark burgundy actions on clay editing sheets.
- **Rug:** the shared geometric Najdi floor. **Sidebar:** the deepest continuous navigation and footer ground. **Working ground / entry ground:** translucent dark fabric over the rug. **Panel:** quiet empty, management and list surfaces. **Selected:** the active sidebar destination.

### Secondary

- **Focus:** the warm keyboard ring. **Brand gold:** the Arabic brand and actual overview totals. **Published:** muted green wording for published quiz state; keep it semantic and subordinate.

### Neutral

- **Ink / muted / line:** warm primary reading, supporting copy and subtle structural rules on dark ground.
- **Form clay / field / field ink / form muted / form selection:** focused editing sheets, cream controls, readable dark text and selected/review information within them. The form has its own dark reading context; descendants must remain readable there.

**The Working Contrast Rule.** Dark task surfaces use warm light reading; clay editing sheets use dark reading and burgundy controls. Preserve the local form palette through labels, help, notes, choices and source evidence.

## Typography

English headings use locally served Lora; Arabic headings use Amiri with zero tracking. Figtree carries English body and controls, while IBM Plex Sans Arabic leads Arabic body and controls. The sidebar brand is Amiri in either interface language. The teacher surface does not use the older Reem Kufi identity or Barlow scoreboard styling.

- **Headline:** main headings use the headline token; at (750px) they become (31px). Teacher sign-in uses (36px), reducing to (30px).
- **Title:** section headings use the title token, reducing to (24px) on mobile. Arabic headings use (1.6) line height and no Latin tracking.
- **Brand:** sidebar Arabic identity uses the brand token, reducing to (31px) at (1100px) and (29px / 1.5) at (750px).
- **Body:** use the language-appropriate sans serif. Descriptions use (15px / 1.7) and a (65ch) maximum width. Authored quiz names in rows use (17px, 600) sans serif; long names wrap.
- **Navigation:** desktop sidebar labels use (15px), mobile (14px). Its supporting dashboard label uses (13px), reducing to (11px) on mobile.
- **Totals:** real operational counts use Lora tabular numerals, reducing to (29px) on mobile. Counts, ranking scores and percentages remain directionally isolated.

**The Two Scripts Rule.** Mirror the interface with its language: Amiri for Arabic headings, Lora for English headings and the appropriate sans serif for reading and actions.

## Layout

The signed-in shell reserves (248px) at logical inline start for a fixed full-height sidebar. The working main caps at (1440px), with (44px 48px 70px) padding. Sidebar padding is (38px 22px 24px), with (6px) gaps between task destinations. At (1100px), the sidebar becomes (220px), main padding becomes (36px 28px 60px), and sidebar inline padding becomes (16px). Logical properties move the sidebar to the right in Arabic.

At (750px), remove the sidebar reservation and use a full-width sticky top navigation header with a labeled (44px) menu toggle. Opening it reveals a two-column task grid plus student-site, language and sign-out controls; selecting a destination closes the menu. Main padding becomes (28px 20px 48px). On landscape screens up to (500px) high, navigation scrolls with the page. Keep a skip link, visible focus and scroll clearance for the compact header.

The overview begins with a title and Create a quiz action, followed by three actual counts in a ruled horizontal band, then recent quizzes and direct work rows. Count cells share available width, with logical separators and padding that tightens on mobile. Quiz rows retain readable titles, status and a Manage action; the mobile main action spans available width. No invented charts, attendance or progress.

Focused quiz editing caps at (960px). Clay builders, AI forms, grade lists and funny-answer editors reuse the existing forms. At mobile widths, option fields wrap before their controls, save bars wrap and respect the safe area, and grade entry keeps its existing responsive row layout. Tables use a horizontal overflow wrapper where needed.

Teacher entry uses a separate centered column capped at (650px), beneath an Arabic brand, language switch and student-site link. Its panel uses (36px 40px) padding with a narrow Sadu top seam; at (750px), it sits within (20px) page margins with (26px 22px) padding. Preserve visible form labels and readable sign-in errors.

## Elevation & Depth

The dark rug remains visible through quiet fabric layers. Fine warm rules, selected red fills and clay sheets establish hierarchy. Resting teacher panels are flat: no new shadows or decorative glow. The Sadu seam is (7px) at the sidebar edge and (5px) across the mobile header; it cannot intercept input. The entry sheet has a narrow woven top edge.

**The Quiet Dashboard Rule.** Keep the private shell still and task-led; use short existing control feedback instead of lantern loops, ornamental motion or ceremonial panels. Reduced motion disables animations, transitions and smooth scrolling.

## Shapes

Panels and fields use modest control corners; sidebar selections and status marks are slightly tighter. Primary and secondary buttons retain the existing button radius. Rules are thin and structural, and the rug motif stays low contrast behind calm working surfaces. Do not translate the student gathering hero, side cushions or broad decorative bands into dashboard content.

## Components

### Buttons

Amber primary actions with dark burgundy ink lead on dark ground. Transparent secondary controls have warm text and a brass-brown border; hover gains a quiet red fill. Inside clay sheets, primary actions invert to burgundy with warm light text; hover deepens to the form-action-hover token. Clay secondary hover uses the form-secondary-hover token and retains dark burgundy text. Text actions in clay use dark burgundy. Grade and builder save bars return to dark fabric with amber Save actions. Preserve (44px) minimum interactive targets, (44px) icon-button width, disabled feedback and the shared pressed state. Keyboard focus is a (3px) warm ring offset by (4px).

### Inputs / Fields

Cream inputs, textareas and native selectors use dark ink, visible labels and at least (46px) height; body-size input text remains (16px). Warm borders and burgundy caret color belong to the clay palette. Labels, selected radio choices, review notes and source evidence must keep sufficient contrast within the surrounding sheet. Errors and loading/status messages remain visible next to the task.

### Navigation

Overview, Quizzes, Grades, Homework, Leaderboard and Funny answers are labeled icon destinations. Hover raises the dark red tone; active navigation gains the selected fill and warm text plus `aria-current`. The mobile toggle exposes its expanded state and controlled navigation region. Student-site access, language switching and sign-out sit at the sidebar bottom or inside the open mobile menu. Keep bilingual action labels and focus behavior.

### Overview and task rows

Use actual published-quiz count, draft count and the loaded recent-submission count. The recent-quiz list shows up to five available quizzes with question count, publication state and Manage action. Empty data uses a plain factual message and a useful next action. Work rows go directly to grade recording, Sunday homework and AI drafting.

### Editing sheets and save bars

Clay sheets contain the quiz builder, AI drafter, grade rows, sharing text and funny-answer editor. Retain each existing validation, source excerpt, review approval, error state and explicit save/publish action. Selected AI choices use burgundy with warm light text. A dark footer/save bar separates commit actions from fields, stays readable and wraps on narrow screens. Keep teacher publication approval and private answer-key boundaries.

### Status and standings

Publication badges and actual totals communicate real state. Preserve semantic ranking structures, equal-rank calculation and tabular isolated numbers. Teacher grade details remain private. The published-text green is a state cue rather than an accent for unrelated navigation.

### Sunday homework

A localized full Sunday date sits above the native date input, between Previous Sunday and Next Sunday controls. The initial device-local date is strictly the next Sunday, including seven days ahead when opened on a Sunday. Choosing a weekday maps forward to that week’s following Sunday; week buttons move seven days. Mobile keeps the date above two wrapping navigation actions. Homework entries use names isolated with `bdi` and bodies with automatic direction, plus loading, empty, error and retry states.

### Teacher entry

A quiet dark sheet and clay access-key form establish the private area. Preserve password autocomplete, required validation, busy feedback, bilingual explanatory copy and the student-site return link. The Arabic name is identity, not a substitute for a clear Teacher sign in heading.

## Do's and Don'ts

### Do:

- **Do** carry the public burgundy Najdi palette and Amiri/Lora/script pairing into private work.
- **Do** preserve the sidebar hierarchy and its RTL/mobile equivalents.
- **Do** keep form text, choices and source evidence dark and readable on clay.
- **Do** show actual quiz, draft, submission and homework data.
- **Do** retain 44px targets, labels, focus, skip navigation and reduced motion.
- **Do** preserve explicit save/publish, validation, teacher approval and private controls.

### Don't:

- **Don't** restore the obsolete cream public shell, Reem Kufi identity, League palette or no-sidebar contract for the teacher dashboard.
- **Don't** add ornamental loops, student hero scenery or decorative data charts to private work.
- **Don't** replace the native Sunday date control with a custom picker.
- **Don't** expose private answer keys or teacher editing controls through student views.
- **Don't** treat older screenshots or invented data as evidence of current production behavior.
