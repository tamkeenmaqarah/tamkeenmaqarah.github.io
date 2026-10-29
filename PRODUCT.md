# Tamkeen Maqra’ah
<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
Youth-group students aged 10–17 set a name and password once before they enter the tent, or come in with Google and then choose the tent name. This phone remembers them after that. The teacher creates quizzes, records paper grades, reviews submitted attempts and shares summaries in WhatsApp.

## Product Purpose
A quiz site for the Sunday-morning circle that meets in Yasin Naseri’s tent. Tamkeen is the wider youth group. This site is for the subset who sit in that tent, stay with the Quran, and quiz the Tamkeen halaqas. Easy navigation and readable text are confirmed priorities.

## Positioning
The site belongs to one tent inside Tamkeen, not to the whole youth group and not to a generic quiz product.

## Operating Context
The circle meets Sunday mornings in Yasin Naseri’s tent. The teacher supplies a transcript or detailed teaching notes; topic-only input needs the intended teaching points. YouTube ingestion is not wanted. Gemini quiz drafting and funny-answer suggestions are implemented behind teacher authentication, with a server-side provider key configured on the ChatGPT site. Generated questions require source excerpts and teacher review. A five-question live draft passed source validation on 25 October 2026 in that environment; the live teacher site was still serving the older quote check after that. No quiz or grades were changed.

Students may use phones. Teacher tasks and quiz-taking must both work on mobile and desktop. Online quizzes have one point per question and explanations after submission. Teacher supports original paper marks plus bonus points.

## Capabilities and Constraints
React/Vinext, Cloudflare Workers and D1 through Sites. Published quizzes and submissions synchronize through the database. A student sets a name, a password, and a recovery word on the first visit, or comes in with Google and chooses the tent name once. Google’s email is not the leaderboard name. The phone keeps that sign-in, so the next visit opens straight into the tent. The recovery word makes a new password if the old one is forgotten. The teacher’s secret link is separate. Teacher controls, detailed submitted answers and answer keys remain private. The user explicitly authorized public group names, scores and teacher-approved funny answers on 25 October 2026. The teacher authenticates with a secret capability link. Original historical quiz grades: Yaseen 11/13, Hassonah 10/13 including bonus, Adam 8/13, Hamza 8/13, Aymen 5/13, Mohamed Mahmoud 4/13. Ties share rank. No manufactured attendance, streaks or additional quiz history. New online attempts use self-reported names. Full original corrected question document is unavailable; a separate three-question practice exercise is a draft.

## Brand Commitments
Name: the Sunday tent of Yasin Naseri, inside Tamkeen / خيمة ياسين. English and Arabic, with Arabic at the center of the name. The user rejected a generic green panel look and the later navy league look. On 25 October 2026 the user pinned the interior of a Saudi majlis tent: red striped cloth, black-and-white geometric bands, and floor seating. Historical grade names and scores stay unchanged.

## Product Principles
- Make a student’s next action obvious.
- Celebrate learning and achievement without inventing progress.
- Make recurring teacher tasks quick.
- Use visible choices and direct actions instead of dropdowns. Keep Quizzes, Grades, Leaderboard and Funny answers as separate teacher tasks.
- Celebrate submission with finite confetti and respect reduced-motion preferences.
- Share group standings and approved funny answers publicly; protect grading edits and full answer keys.
- Keep the home page useful between quizzes, with the weekly schedule and community content.

## Open Decisions
Full roster, rewards and cumulative scoring across quizzes remain unknown. Ages 10–17 and mostly Sunday use with weekday revision are owner-confirmed. The public home, leaderboard and funny answers remain available even with no published quiz. GitHub Pages serves the static public interface; the existing Sites server retains the database, Gemini and authenticated teacher controls.

## Confirmed correction
The user corrected the ar-Ruman / al-Arak funny answer attribution to Ayman on 25 October 2026. Keep the original historical grade names and scores unchanged. The user approved a free GitHub organization named tamkeenmaqarah for the requested tamkeenmaqarah.github.io address.

## Sunday Preparation and In-person Review
The owner confirmed students are 10–17, using the site mostly on Sundays and also for weekday revision. The core loop is exact assigned work → practise → complete an attached short check → report ready or ask for help → teacher review in person. Digital readiness does not verify recitation and never awards leaderboard points.

Teachers assign Qur’an, halaqa, quiz or other work to everyone or one active account. Qur’an assignments carry a validated surah/ayah range and memorisation/review goal. Halaqa assignments carry a supported YouTube video or playlist and can attach a published quiz; quiz assignments require a published quiz. Other work has instructions. The editor previews the resulting student action. Title-only edits preserve progress; changes to the actual work reset it with explicit wording. Removal withdraws the assignment from students, with Undo removal and later restore preserving previous progress. Assignment revisions, progress versions, idempotent creation and bounded 15-second requests protect stale/repeated writes; failed saves retain drafts.

Students use Open assigned ayahs to reach the Qur’an tab with the full surah and their validated teacher-assigned ayahs highlighted in gold. The week’s accessible Qur’an assignments remain selectable there; assignment/week links use the current API revision, warn when work is withdrawn and offer retry or independent reading when homework cannot load. Practice first asks for an ayah range, prefilled with the exact active assignment and bounded to it; independent practice starts with up to five ayahs of the current passage. Short three/five-ayah presets and Whole assignment/passage remain explicit choices. Reveal ayah stays central: recite from memory, optionally ask for the source’s first word, reveal the attributed Tajweed text, then choose Practise this ayah again or Remembered it. Only flagged ayahs return in subsequent rounds until self-checked. Progress counts remembered ayahs, without a mastery claim. This session is temporary private rehearsal, with no saved spaced-repetition schedule, recording, automatic grading or points. Back to homework returns to the originating task; practice never writes readiness, which students report separately before the teacher checks recitation in person. Assigned lessons open their player and external fallback; attached quizzes use actual saved completion before readiness unlocks. An unavailable attached quiz leaves help available. Pending, ready, help, repeat and reviewed states, plus teacher feedback, are private to the student and teacher. The teacher’s visible Assigned work / Review in person views support reviewing any assigned active student, including someone who never checked in digitally.

Sunday defaults to today when today is Sunday, otherwise the upcoming device-local Sunday. A native calendar maps another chosen weekday forward to Sunday; week arrows move seven days. The full localized date and input remain visually separate on narrow screens.

## Student Navigation and Support
Six primary destinations remain: Home, Homework, Halaqas, Qur’an, Leaderboard and Account. Lesson quizzes remain visible from Home, Halaqas and Homework; approved funny answers remain secondary Home content. Halaqas keeps the Saturday lessons and Tuesday playlist `PLJHIkqUYcGAA`, titled The Arab Spring, alongside lesson quizzes and private missed-question practice. Saved quiz attempts retain Resume quiz / View result behavior and original scoring.

Student note entry, revision cards, notes Q&A and generic AI plans have been removed from the primary interface. Legacy shared homework notes are read-only; existing server endpoints remain for cached clients. Teacher source-grounded AI quiz drafting and explicit explanation of an actual missed-answer teacher note remain. Gemini keys stay server-side, requests are deliberate and disclosed, and no religious text, reference or ruling may be invented.

## Student Roster and Removal
Teachers can search active or archived accounts. Archive preserves history, revokes sessions and blocks further sign-in and legacy anonymous writes under the archived name. Restore permits a new sign-in. Permanent deletion is offered only after archive, with exact-name confirmation and a preview of affected record counts. An atomic revision/count guard rejects a stale preview. Deletion removes the account, photo/identity fields, sessions, individual assignments/progress, account submissions and legacy name-matched submissions, grades, shared notes and approved moments; unrelated accounts’ records remain. Deletion does not prohibit a future new account; archive is the retained disabled-account state.

## Qur’an Source and Boundaries
The public Qur’an tab now provides a searchable 114-surah library, full-surah/range navigation, continuous ivory-and-green mushaf reading, text sizing and explicit device-local save/resume. Attributed Al Quran Cloud `quran-tajweed` annotations become safe React text runs preserving Arabic characters, diacritics and order, with a bilingual 17-category key; self-hosted Amiri Quran remains. Muhammad Siddiq Al-Minshawi — Murattal from trusted EveryAyah audio is the built-in default, supplemented by validated, deduplicated Al Quran Cloud verse-by-verse choices; Mishary Alafasy variants are excluded by owner preference. A saved excluded choice falls back to Al-Minshawi; extra-catalog failure preserves that default with retry. Audio must match the selected edition and trusted path; changes cancel old playback. Text/audio attribution, bounded fetch, caching, validation and readable retry remain. Mobile puts reading before audio, with a visible Reciter & audio link and a fixed native player only when loaded. Homework opens full-surah context with gold assignment highlights and a prefilled, bounded practice range. Reveal ayah remains the central private recall action, followed by self-checked repeat rounds; practice does not write readiness, grade recitation or award points. The teacher picker retains bundled 114-surah metadata; teacher UI is unchanged and no backend deployment is required. Production Foundation endpoints remain disabled. Sacred text is content, never ornament; reflow does not claim fixed printed-page pagination.

## Evidence and Validation Limits
The provisional research brief at the public project’s `.impeccable/research/sunday-workflow.md` combines owner answers, published research, expert inspection and synthetic task scenarios. Its younger/older pupil and Sunday-teacher personas are hypotheses to validate, not real student interviews. The implementation verification reports 16 unit checks, English/Arabic browser scenarios, a real SQLite run of all migrations and archive/delete/security/concurrency/idempotency checks, plus the backend build. These are synthetic checks: no real student account was deleted, no child field study was conducted and no physical iPhone was tested. This documentation pass inspected source only and does not assert publication of the current workflow.
