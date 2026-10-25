---
name: Tamkeen Maqra’ah
description: 'The Tamkeen League: a friendly youth quiz league with clear student actions and private teacher tasks.'
colors:
  navy: "#153a65"
  ink: "#1a2d49"
  blue: "#315fe9"
  blue-dark: "#2348bd"
  yellow: "#ffce58"
  coral: "#ff917c"
  lilac: "#c7b6f6"
  paper: "#f5f7fb"
  white: "#fff"
  muted: "#586c85"
  line: "#d8e1ee"
  soft-blue: "#eaf0ff"
  focus: "#a86400"
typography:
  headline:
    fontFamily: Figtree, Arial, sans-serif
    fontSize: 31px
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-.025em"
  section:
    fontFamily: Figtree, Arial, sans-serif
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-.025em"
  body:
    fontFamily: Figtree, Arial, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  action:
    fontFamily: Figtree, Arial, sans-serif
    fontSize: 15px
    fontWeight: 700
    lineHeight: 1.6
  label:
    fontFamily: Figtree, Arial, sans-serif
    fontSize: 15px
    fontWeight: 600
    lineHeight: 1.6
  question:
    fontFamily: Figtree, Arial, sans-serif
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.6
    letterSpacing: "-.02em"
  score:
    fontFamily: Barlow Condensed, sans-serif
    fontSize: 80px
    fontWeight: 700
    lineHeight: 1
  podium-score:
    fontFamily: Barlow Condensed, sans-serif
    fontSize: 30px
    fontWeight: 700
    lineHeight: 1
rounded:
  tag: 4px
  compact: 6px
  field: 7px
  button: 8px
  choice: 9px
  support: 10px
  surface: 14px
  circle: 50%
spacing:
  '8': 8px
  '10': 10px
  '12': 12px
  '14': 14px
  '15': 15px
  '16': 16px
  '18': 18px
  '20': 20px
  '22': 22px
  '24': 24px
  '25': 25px
  '26': 26px
  '28': 28px
  '30': 30px
  '32': 32px
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: 11px 18px
    typography: "{typography.action}"
  button-primary-hover:
    backgroundColor: "{colors.blue-dark}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
    padding: 11px 18px
    typography: "{typography.action}"
  button-secondary-hover:
    backgroundColor: "{colors.soft-blue}"
  button-result:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.navy}"
    rounded: "{rounded.button}"
    padding: 11px 18px
    typography: "{typography.action}"
  button-text:
    backgroundColor: transparent
    textColor: "{colors.blue-dark}"
    padding: 7px 0
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: 12px 14px
  student-quiz:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: 28px
  quiz-choice:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.choice}"
    padding: 15px
  quiz-choice-chosen:
    backgroundColor: "{colors.soft-blue}"
  answer-option:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.choice}"
    padding: 19px
  answer-option-picked:
    backgroundColor: "{colors.soft-blue}"
    padding: 18px
  status-published:
    backgroundColor: "#e1f0e6"
    textColor: "#2d6844"
    rounded: "{rounded.tag}"
    padding: 2px 7px
  status-draft:
    backgroundColor: "#f0e9fc"
    textColor: "#6b4b92"
    rounded: "{rounded.tag}"
    padding: 2px 7px
  status-closed:
    backgroundColor: "#e9edf3"
    textColor: "#57647a"
    rounded: "{rounded.tag}"
    padding: 2px 7px
  builder-panel:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: 28px
---
# Design System: Tamkeen Maqra’ah

## Overview

**Creative North Star: "The Tamkeen League"**

A friendly youth tournament expressed through a club crest, clear quiz actions, podiums and teacher team sheets. Royal blue identifies actions and selections; navy contains score displays; yellow marks achievement. Pale paper, flat white surfaces and readable slate text keep the working areas calm.

Figtree carries the interface and Barlow Condensed gives real scores their scoreboard character. Students choose a quiz, answer one question at a time and receive their saved result. Teachers work through visible destinations and choices. Celebration is brief and tied to completion; group standings and approved funny answers are public. Editing grades, private submitted answers and unpublished answer keys stay in the authorized teacher area.

**Key Characteristics:**
- Home, Quizzes, Leaderboard and Funny answers for everyone; teachers also have Grades.
- Visible radio choices and explicit next actions.
- Real ranks, shared ties and strong numeric hierarchy.
- Brief selection feedback and finite result celebration.
- Readable mobile forms and visible keyboard focus.

**Verification basis:** Extracted from `app/page.tsx`, `app/ui.tsx` and `app/globals.css`. Browser preview was declined for this refinement. Existing `.impeccable/review` screenshots predate it; responsive visual recapture remains pending and this document does not establish a visual pass.

## Colors

A vivid club palette sits on cool paper, with navy score stages and restrained semantic state colors. The frontmatter records the current shared CSS palette and the local coral celebration color; additional component state colors remain local. Current paper, muted, line, soft-blue and focus values reflect the readability refinement.

### Primary
- **Royal Blue** (`blue`): primary actions, selected controls, progress and answer indicators. **Deep Royal** (`blue-dark`): primary hover, selected navigation text and text actions.
- **Club Navy** (`navy`): crest, private podium and submitted-result stage.

### Secondary
- **Champion Yellow** (`yellow`): champion podium, trophy medal, text selection and the result-stage return action.

### Tertiary
- **Coral** (`coral`) and **Lilac** (`lilac`): finite confetti; lilac also distinguishes the third podium tier.

### Neutral
- **Cool Paper** (`paper`): page canvas and sticky action-bar background. **White** (`white`): task lists and forms. **Soft Blue** (`soft-blue`): selected radio cards and supporting notes.
- **Reading Ink** (`ink`): headings and body text. **Muted Slate** (`muted`): explanations, metadata and inactive navigation. **Team Sheet Line** (`line`): container borders and dividers.
- **Amber Focus** (`focus`): keyboard outline distinct from the selected blue treatment.

**The Earned Score Rule.** Use champion color and scoreboard numerals for real scores and ranks; never manufacture progress or standings.

## Typography

**Display Font:** Barlow Condensed, sans-serif fallback; self-hosted at weight 700.
**Body Font:** Figtree, Arial, sans-serif; self-hosted at weights 400, 600, 700 and 800.

**Character:** Friendly interface lettering meets tall scoreboard numerals. Headings use tight tracking and balanced wrapping; questions and answers use generous line height. User-authored question and answer content uses automatic text direction.

### Hierarchy
- **Headline:** 31px/1.3 at 800, becoming 28px at 580px. Attempt titles use 29px/1.4, becoming 26px on phones.
- **Section:** 22px/1.3 at 700; task-specific titles range from 20–23px, and the result title uses 27px.
- **Body:** 16px/1.6 at 400. Descriptions use 14–15px; quiet help and metadata use 12–13px. Longer explanations are capped at 65ch.
- **Action:** 15px/1.6 at 700 for primary and secondary controls, with 13–14px compact variants. Text actions use 14px at 600. Teacher navigation uses 15px at 600, reducing to 12px on phones.
- **Label:** 15px/1.6 at 600 outside the field. Inputs remain 16px, including on phones.
- **Question:** 24px/1.6 at 700; phone questions use 23px/1.65. Answer rows use 18px/1.65 at 400, reducing to 17px on phones.
- **Score:** 80px/1 at 700 in submitted results, becoming 76px on phones; the denominator uses 37px/34px. Podium points use 30px/1, becoming 28px; rank blocks use 26px/24px. Grade and ranking rows use Figtree with tabular numerals.

**The Two Voices Rule.** Figtree carries reading and actions; Barlow Condensed carries scoreboard numbers.

## Layout

The application header and main shell are centered at a maximum 1120px with 32px desktop gutters. The masthead is 77px high; the teacher navigation below it is 57px high. Main content uses 34px top and 65px bottom padding. The header stays sticky. At 850px gutters become 25px, main vertical padding becomes 28px/50px, and teacher quiz rows stack their copy and actions. At 580px gutters become 20px, main vertical padding becomes 26px/44px, the masthead becomes 73px high, and navigation remains one visible row at 58px high.

The student attempt is capped at 740px; the builder, AI drafter and manage screen at 800px; teacher login at 600px. Student quiz cards use a single list. Teacher quizzes use divided rows in one container. Grades and rankings use CSS grids: phone grade rows put the student above regular, bonus and total values; phone ranking rows keep rank and identity beside score and percentage. No sidebar is part of the current application composition.

Quiz-selection cards use two columns with 12px gaps and become one column at 580px. Form pairs also become one column at 580px. The builder stepper remains three equal columns. Grade saving and builder progression use sticky bottom bars. Internal task padding typically falls between 22px and 28px; compact controls use 8–15px gaps and section spacing uses 20–30px. Preserve this task density and clear alignment.

## Elevation & Depth

The shipped system has no box shadows. Navy score stages, pale blue supporting areas, white working surfaces, fine borders and whitespace establish depth. Stronger borders and outlines communicate selection and focus.

**The Flat Team Sheet Rule.** Separate working surfaces with tone, whitespace and fine borders; keep resting surfaces free of shadows.

## Shapes

Large containers use the implemented 14px radius. Buttons use 8px, fields 7px, and answer or quiz-selection rows 9px. Status tags use 4px corners; small question-picker controls use 6px. Supporting notices use 8–10px. Circular initials, check indicators and medals serve identity, selection or achievement. The navy crest has 10px upper and 16px lower corners; podium blocks have 7px upper corners and square lower edges. Icons are SVG with a 1.8 stroke width; no raster artwork ships.

## Components

### Buttons

Explicit verbs state the next action. Primary controls are blue with white text; secondary controls are white with a `#c6d3e6` border and reading ink. Both use 11px/18px padding and a 46px minimum height. Primary hover becomes deep royal; secondary hover becomes soft blue with a stronger border. The result-stage return action is yellow on navy and retains yellow on hover. Text actions have no filled background and underline on hover. Buttons use an 8px gap, 160ms background/border transitions and a 0.98 active scale. Keyboard focus is a 3px amber outline offset 4px; disabled controls use half opacity and a disabled cursor.

### Chips

Published, Draft and Closed status tags state the actual quiz lifecycle in green, lilac and slate treatments. They use 12px/600 text, 2px/7px padding and 4px corners. Filter counts use small quiet rectangular tags. These labels communicate state and are not decorative headings.

### Cards / Containers

Student quiz cards are white, bordered and padded 28px on desktop, reducing to 25px on phones. Each carries a title, concise instructions, question count and a visible Start quiz action; the action becomes full width on phones. Teacher quiz rows share one flat 14px container, with dividers and 25px row padding. White builder panels use 28px padding, reducing to 23px on phones. Results use a navy stage and clipped overflow for confetti. Funny-answer cards use warm paper with an answer highlight and a caption divider.

### Inputs / Fields

White fields use a `#bdccdf` stroke, 7px corners, 12px/14px padding and a 47px minimum height. Hover strengthens the stroke. Labels stay outside the field; keyboard focus uses the shared amber outline. Textareas resize vertically. Builder answer rows pair a real radio input with editable text; the correct choice adds a pale green surface, stronger green border and explicit Correct label.

### Navigation and Direct Actions

Teachers see Quizzes, Grades, Leaderboard and Funny answers as four visible destinations below the masthead. Selected navigation uses deep royal text and a 3px blue lower rule; hover turns blue. On phones the four labels remain visible with 15px icons and 12px text. The account area retains a visible Sign out action. Students see the brand and Teacher sign in without teacher navigation. A skip link appears on focus.

Manage quiz opens a separate page of direct rows: Preview quiz, View results, Make a copy and, when published, Close quiz. Each row combines an SVG icon, action label, short consequence and arrow; a published quiz also offers Copy student link. Preserve these direct choices and the current dropdown-free teacher flows.

### Visible Radio Choices

Quiz selectors present a fieldset of visible cards with quiz title, detail and circular check indicator. Cards use 15px padding, 9px corners and a fine border. Selection adds soft blue, a blue border and filled check; focus outlines the whole card at a 3px offset. AI setup uses the same visible-choice approach for Saturday/Tuesday and 5/10/15 questions, with 8px corners and 13px/20px desktop padding.

### Guided Builder and Source Review

The single-column builder progresses through Details, Questions and Publish. A three-column stepper marks the current stage in blue and completed stages with green checks. Back, Save draft and the named next action stay visible in the sticky footer. A draft needs a title and complete questions; publishing presents the questions and correct answers for review.

The AI drafter asks for a lesson title and transcript or detailed teaching notes, with visible session and question-count choices. Generated question editors show a pale-blue source-excerpt block under the answer explanation. AI-generated quizzes require a teacher-review checkbox before publishing. The setup notice explains the unconfigured provider and the generation button stays disabled until available. Source evidence and review are functional requirements, not decorative trust badges.

### Answer Choices and Results

Large answer radio rows carry a letter, text and circular check. Default rows use a 1px border, 19px padding and 78px minimum height. A picked answer uses a 2px blue border, soft-blue background, 18px compensating padding and filled blue indicators. Focus applies to the whole row. The selected check pops in over 250ms; success-notice checks use 300ms. Questions arrive once from 10px to the right over 250ms.

Podiums center the highest rank, reserve yellow for the champion and group tied students in the same rank. Result medals enter over 550ms. A result renders 30 confetti particles, each falling once over 1.65s with delays up to 175ms; no celebration loops. Loading placeholders use a 1.6s pulse while loading. The CSS reduced-motion rule removes animations and transitions, hides confetti and sets document scrolling to auto.

## Do's and Don'ts

### Do:
- **Do** use royal blue for actions and selections, navy for score stages and yellow for earned achievement.
- **Do** preserve visible task destinations, radio choices and direct actions without dropdowns in the current teacher flows.
- **Do** keep real tied ranks together and keep group grades in the teacher area.
- **Do** retain labels, visible focus, Arabic direction handling, source excerpts and teacher review before AI publication.
- **Do** keep celebration finite and honor reduced-motion preferences.

### Don't:
- **Don't** add invented progress, attendance, streaks or quiz history.
- **Don't** expose teacher standings, answer keys or funny answers in student views.
- **Don't** reuse scoreboard type for paragraphs or form labels.
- **Don't** add decorative eyebrows or redundant numeric ornaments above task headings.
- **Don't** treat old screenshots as evidence that the current refinement passed visual review.

Not canonized or repaired in this documentation pass: the surface brief still names 12px corners while current large surfaces use 14px; programmatic smooth-scroll calls are not gated by reduced-motion preference. The source values are recorded without promoting that motion gap into a reusable rule. Visual recapture is pending after the declined browser preview.

## Community home and Pages

The home page stays available between quizzes. A welcome and Saturday/optional Tuesday schedule lead into one navy quiz-status band, followed by real standings and the latest approved funny answer. At 580px the community content stacks; student navigation uses four visible items and teacher navigation uses two rows. The brand links home, and direct quiz links still open the quiz. GitHub Pages uses the same client with a repository base path; Teacher sign in opens the existing server. Names and scores are disclosed before submission.

The home and public data projections passed source, type and API checks; browser screenshots remain unavailable under the earlier preview restriction.
