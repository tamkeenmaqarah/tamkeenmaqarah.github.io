# Ashab Al Khaimah

<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
A dedicated subset of Tamkeen Youth, ages 10–17, gathering every Sunday after Fajr in a warm Najdi tent and revising during the week.

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

## Sunday Preparation and In-person Review
The owner confirmed students are 10–17, using the site mostly on Sundays and also for weekday revision. The core loop is exact assigned work → practise → complete an attached short check → report ready or ask for help → teacher review in person. Digital readiness does not verify recitation and never awards leaderboard points.

Teachers assign Qur’an, halaqa, quiz or other work to everyone or one active account. Qur’an assignments carry a validated surah/ayah range and memorisation/review goal. Halaqa assignments carry a supported YouTube video or playlist and can attach a published quiz; quiz assignments require a published quiz. Other work has instructions. The editor previews the resulting student action. Title-only edits preserve progress; changes to the actual work reset it with explicit wording. Removal withdraws the assignment from students, with Undo removal and later restore preserving previous progress. Assignment revisions, progress versions, idempotent creation and bounded 15-second requests protect stale/repeated writes; failed saves retain drafts.

Students open the exact assigned passage, listen to an ayah, recall one hidden ayah, reveal it to check and finish practice. This is self-practice, with no recording, automatic recitation grading or paid voice service. Assigned lessons open their player and external fallback; attached quizzes use actual saved completion before readiness unlocks. An unavailable attached quiz leaves help available. Pending, ready, help, repeat and reviewed states, plus teacher feedback, are private to the student and teacher. The teacher’s visible Assigned work / Review in person views support reviewing any assigned active student, including someone who never checked in digitally.

Sunday defaults to today when today is Sunday, otherwise the upcoming device-local Sunday. A native calendar maps another chosen weekday forward to Sunday; week arrows move seven days. The full localized date and input remain visually separate on narrow screens.

## Student Navigation and Support
Six primary destinations remain: Home, Homework, Halaqas, Qur’an, Leaderboard and Account. Lesson quizzes remain visible from Home, Halaqas and Homework; approved funny answers remain secondary Home content. Halaqas keeps the Saturday lessons and Tuesday playlist `PLJHIkqUYcGAA`, titled The Arab Spring, alongside lesson quizzes and private missed-question practice. Saved quiz attempts retain Resume quiz / View result behavior and original scoring.

Student note entry, revision cards, notes Q&A and generic AI plans have been removed from the primary interface. Legacy shared homework notes are read-only; existing server endpoints remain for cached clients. Teacher source-grounded AI quiz drafting and explicit explanation of an actual missed-answer teacher note remain. Gemini keys stay server-side, requests are deliberate and disclosed, and no religious text, reference or ruling may be invented.

## Student Roster and Removal
Teachers can search active or archived accounts. Archive preserves history, revokes sessions and blocks further sign-in and legacy anonymous writes under the archived name. Restore permits a new sign-in. Permanent deletion is offered only after archive, with exact-name confirmation and a preview of affected record counts. An atomic revision/count guard rejects a stale preview. Deletion removes the account, photo/identity fields, sessions, individual assignments/progress, account submissions and legacy name-matched submissions, grades, shared notes and approved moments; unrelated accounts’ records remain. Deletion does not prohibit a future new account; archive is the retained disabled-account state.

## Qur’an Source and Boundaries
The public Qur’an tab is a 114-surah library with Arabic/English/name-or-number search, full-surah selection, previous/next surah, optional exact range, reading and private recall. Its continuous mushaf composition uses inline green ayah listening buttons, dedicated self-hosted Amiri Quran and a quiet ivory sheet inside the existing Najdi shell. Text-size controls use a 24–48px setting, initially 36px. Save place explicitly stores the selected ayah on this device, with a resume action; this is reflowable reading, not fixed printed-page pagination. Homework reuses the reader with the teacher’s exact range locked and the existing hidden/reveal/next/finish practice flow.

Attributed Al Quran Cloud `quran-tajweed` text supplies Tajweed rule annotations. Nested and untyped annotation metadata becomes React text runs; Arabic characters, diacritics and order are preserved. A bilingual key explains 17 rule categories with colors darkened for legibility on the reading sheet. Text is never inserted as provider HTML or rewritten by AI. Successful responses are cached; bounded requests, validation, cancellation and visible retry remain.

Muhammad Siddiq Al-Minshawi — Murattal is the built-in default, using trusted EveryAyah verse audio. A native bilingual reciter selector adds the current Al Quran Cloud Arabic verse-by-verse catalog, deduplicating recording variants. Mishary Alafasy and his variants are excluded at the owner’s request; no reason or factual allegation is implied. Choice is saved on this device, and an excluded or unavailable saved choice falls back to Al-Minshawi. The default remains usable if the additional catalog fails, with visible retry. The observed catalog currently yields 17 choices including the built-in default; the provider catalog can change. Other reciter audio must match the exact selected edition and trusted CDN path. Changing reciter, range, mode or ayah cancels previous audio; public passage playback advances ayah by ayah. Text and audio retain separate source links. On mobile, reading comes first, the visible Reciter & audio link reaches controls below the text, and native playback controls float only while audio is loaded, with space reserved below the reader.

The teacher picker still uses the bundled 114-surah metadata list. Teacher UI code and backend deployment are outside this public reader update. Production Foundation endpoints remain disabled. Sacred text is content, never ornament; practice and readiness do not grade recitation or award points.

## Evidence and Validation Limits
The provisional research brief at the public project’s `.impeccable/research/sunday-workflow.md` combines owner answers, published research, expert inspection and synthetic task scenarios. Its younger/older pupil and Sunday-teacher personas are hypotheses to validate, not real student interviews. The implementation verification reports 16 unit checks, English/Arabic browser scenarios, a real SQLite run of all migrations and archive/delete/security/concurrency/idempotency checks, plus the backend build. These are synthetic checks: no real student account was deleted, no child field study was conducted and no physical iPhone was tested. This documentation pass inspected source only and does not assert publication of the current workflow.


The Qur’an library implementation verification additionally reports 17 unit checks, desktop/mobile English and Arabic browser scenarios (1440/390/320/768px), exact glyph comparison across 6,236 ayahs, and live Chromium playback of real EveryAyah Al-Minshawi audio advancing to the next ayah. Browser coverage includes search, reciter changes and cancellation, catalog failure with the default still available, save/resume, text sizing, recall and overflow. App writes were intercepted; no real records were modified. These are implementation reports, not checks rerun by this documentation pass. Physical iPhone/Safari and human recitation assessment remain untested; publication is tracked separately.
