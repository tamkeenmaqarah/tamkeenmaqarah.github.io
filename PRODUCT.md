# Ashab Al Khaimah

<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
A dedicated subset of Tamkeen Youth, gathering every Sunday after Fajr in a warm Najdi tent.

## Product Purpose
Support Qur’an memorization review, review of Saturday and Tuesday halaqas, weekly quizzes and a shared leaderboard.

## Operating Context
The Sunday gathering takes place in a Najdi tent with heaters and warm lighting. Members use the website to take quizzes and see standings. Teachers manage quizzes and grades on the existing Tamkeen server.

## Capabilities and Constraints
Preserve the deployed application's public API, quiz links, scoring, teacher access, privacy boundaries and approved funny answers. GitHub Pages serves static files. The repository contains a bundled React application rather than its original source workspace. The user confirmed a fully bilingual English and Arabic interface, including RTL. Upstream commit d87e721 adds saved quiz progress and private missed-question practice on the current device; preserve these behaviors and keep practice out of the shared leaderboard.

## Brand Commitments
أصحاب الخيمة / Ashab Al Khaimah, a circle inside Tamkeen. مقرأة تمكين remains the parent group identity. User references establish Najdi tent warmth, red/black/ivory Sadu weaving, and natural Arabic typography. Avoid generic AI-styled dashboards and generic pan-Islamic decoration. Sacred text is content, never decoration. Reference photos guide material and detail but must not appear in the UI. The user requested intricate Najdi detail, glowing interactive orange lanterns and other restrained app animations, with no unnecessary promotional prose. The latest refinement explicitly replaces the light beige ground with darker red and asks for more welcoming, roomy spacing.

## Evidence on Hand
Existing public app and live server; four user-supplied tent, Sadu textile and majlis reference images. Do not invent scores, members, dates, quiz content or venue photographs.

## Product Principles
- Make the weekly review and quiz easy to reach.
- Honor the actual gathering and its Najdi setting.
- Give Arabic equal functionality and typographic care.
- Preserve the existing data and security model.

Latest refinement: Use separate hand-drawn pixel-art Sadu cushions (floor mattress, long backrest, square pillow and cylindrical armrest) around public screens, not a complete seating scene. Generated illustrations were rejected and are not shipped. Gentle decorative movement follows the shared pause, offscreen/hidden and reduced-motion rules. Preserve upstream 499c84f remembered-name/password tent door and password recovery; localize and style it consistently. User explicitly requested publishing the completed site.

Homework: teacher assignments lead the Sunday view, with group work and account-scoped individual work. Students can mark preparation themselves; this is not grading and never changes points or standings. Teachers create, edit and remove assignments and inspect prepared names in their private dashboard. Editing resets preparation marks; revision checks protect concurrent changes. Students’ own practice notes remain separate, explicitly shared with the group, and stored by student and Sunday. Preserve draft guards, Save/Remove actions and device copies for explicit retry after shared-save failures. Default to the strictly next Sunday in device-local time, including on Sundays. A native date picker selects that date’s Sunday (or the following Sunday for another weekday), with previous/next week controls and a full localized date.

Qur’an integration: the user chose both a reading tab and a Homework picker. Fetch the 114-surah index and Arabic Uthmani text directly from Al Quran Cloud, preserving the returned text and diacritics. A selected range adds an explicit reference to the homework draft without removing existing notes or saving automatically. Explicit saved references open the reader; do not guess legacy free-text/page assignments. Use an attributed source, dedicated self-hosted Amiri Quran font, bounded requests, successful-response caching, readable errors and retry.

Study support: the Tuesday halaqa playlist is `PLJHIkqUYcGAA`, titled The Arab Spring. Explicit Qur’an references and supported YouTube lesson links in assignments open the existing reader or lesson. Optional Gemini actions create a three-phase Recall/Check/Repeat plan for the chosen practice time, three revision cards from supplied halaqa notes, a source-grounded answer to a question about supplied notes, or a simpler explanation of an existing teacher note on a missed quiz answer. Card answers must exactly match excerpts in the supplied notes; AI must not invent religious texts, references or rulings. Recitation remains teacher-checked; there is no paid voice-correction integration.

Gemini requests run only after explicit student activation, with homework/notes disclosure before submission and English/Arabic output. The browser calls the existing Cloudflare server and never receives the provider key. Plan, card and note-question requests have daily limits of eight per account (or network when unsigned) and forty shared. Source-note drafts use session storage; result reuse is bounded to forty in-memory entries. Deployment verification on 28 October 2026 confirmed the teacher server, public assignment privacy projection, three English and three Arabic cards with exact source excerpts, and an Arabic three-phase plan totaling 15 minutes. Static frontend publication is tracked separately.

Discoverability refinement (28 October 2026): Home now leads with a compact week/date and hearth, the current Sunday’s actual group/account homework preview and the weekly quiz. Quiz actions reflect saved local attempts as Resume quiz or View result. Visible launch actions open Tuesday halaqa, notes and missed-question practice. Eight student destinations remain visible, including Halaqas & study and Account; mobile uses four columns and two rows. Study has visible Watch halaqas / My notes & AI / Missed questions sections; the selected section is retained in its URL on refresh and when the current study destination is reselected. Notes are an open workspace with a source textarea, revision-card action and explicit Q&A action. Notes require 100–6,000 characters; questions require 8–240 with adjacent helper copy. A found answer must be a 12–700-character exact source excerpt; missing information returns an explicit no-answer state. Homework has section jump links and visible Plan with AI actions opening inline review forms. The Qur’an reader offers contextual review planning with reference and difficulty, without submitting verse text. Missed-question practice and teacher-note explanation actions are visible beside their context. Account has visible Profile photo / Sign-in settings anchors and direct settings actions alongside the existing security utility. The Najdi identity, imagery and tokens remain pinned. Backend deployment eca480b / workflow 40816548729 succeeded; live English Q&A returned an exact source excerpt and Arabic missing information returned no-answer. The independent final discoverability review returned ship after both bounded fixes passed; public frontend d46697a / Pages workflow 40817029584 published successfully; production EN/AR browser regressions passed with writes intercepted, and live public Home captures passed without writes.
