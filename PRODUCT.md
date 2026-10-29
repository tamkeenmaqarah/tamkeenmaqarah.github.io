# Tamkeen Maqra’ah
<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
Youth-group students set a name and password once before they enter the tent, or come in with Google and then choose the tent name. This phone remembers them after that. The teacher creates quizzes, records paper grades, reviews submitted attempts and shares summaries in WhatsApp.

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
Full roster, ages, quiz cadence, rewards and cumulative scoring across quizzes remain unknown. The public home, leaderboard and funny answers remain available even with no published quiz. GitHub Pages serves the static public interface; the existing Sites server retains the database, Gemini and authenticated teacher controls.

## Confirmed correction
The user corrected the ar-Ruman / al-Arak funny answer attribution to Ayman on 25 October 2026. Keep the original historical grade names and scores unchanged. The user approved a free GitHub organization named tamkeenmaqarah for the requested tamkeenmaqarah.github.io address.

## Sunday Homework and Student Study Support
Teachers privately create, edit and remove Sunday assignments for everyone or one signed-in student, using account recipients. The public view shows group assignments and only the current account’s individual assignments. Preparation is self-reported, visible as prepared names to the teacher, and separate from grades, recitation assessment and leaderboard points. Editing resets preparation marks; revision checks reject stale edits, deletion and preparation changes, and deletion removes marks atomically. Students’ own shared practice notes remain a separate per-student/per-Sunday stream. Preserve draft guards and clear save, removal, error and retry feedback. Native date controls default to the strictly next device-local Sunday; another weekday maps forward to Sunday.

The Tuesday halaqa playlist is `PLJHIkqUYcGAA`, titled The Arab Spring. Teachers can append its link to instructions. Explicit Qur’an references open the existing reader; source content remains separate from ornament.

Optional student Gemini actions provide a Recall/Check/Repeat review plan with server-apportioned practice minutes, three revision cards with answers validated as exact supplied-note excerpts, and a simpler explanation of an existing teacher note for a missed quiz answer. Supplied material is data, never instructions; do not invent religious text, rulings or references. AI runs only on explicit activation, has bilingual output and visible submission disclosure, and keeps the key on the Cloudflare server. New plan/card requests are limited to eight per account (or unsigned network) per day and forty shared. Public source drafts use session storage and result reuse is bounded to forty in-memory entries. No paid voice-correction integration is included. Deployment verification on 28 October 2026 confirmed the teacher server, public assignment privacy projection, English and Arabic cards with exact source excerpts, and an Arabic three-phase plan totaling 15 minutes. A brief source was rejected as insufficient before fuller notes succeeded. Static frontend publication is tracked separately.
