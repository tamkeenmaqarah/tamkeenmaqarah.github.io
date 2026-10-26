# Tamkeen Maqra’ah
<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
Youth-group students set a name and password once before they enter the tent. This phone remembers them after that. The teacher creates quizzes, records paper grades, reviews submitted attempts and shares summaries in WhatsApp.

## Product Purpose
A quiz site for the Sunday-morning circle that meets in Yasin Naseri’s tent. Tamkeen is the wider youth group. This site is for the subset who sit in that tent, stay with the Quran, and quiz the Tamkeen halaqas. Easy navigation and readable text are confirmed priorities.

## Positioning
The site belongs to one tent inside Tamkeen, not to the whole youth group and not to a generic quiz product.

## Operating Context
The circle meets Sunday mornings in Yasin Naseri’s tent. The teacher supplies a transcript or detailed teaching notes; topic-only input needs the intended teaching points. YouTube ingestion is not wanted. Gemini quiz drafting and funny-answer suggestions are implemented behind teacher authentication, with a server-side provider key configured on the ChatGPT site. Generated questions require source excerpts and teacher review. A five-question live draft passed source validation on 25 October 2026 in that environment; the live teacher site was still serving the older quote check after that. No quiz or grades were changed.

Students may use phones. Teacher tasks and quiz-taking must both work on mobile and desktop. Online quizzes have one point per question and explanations after submission. Teacher supports original paper marks plus bonus points.

## Capabilities and Constraints
React/Vinext, Cloudflare Workers and D1 through Sites. Published quizzes and submissions synchronize through the database. A student sets a name and password on the first visit. The phone keeps that sign-in, so the next visit opens straight into the tent. The teacher’s secret link is separate. Teacher controls, detailed submitted answers and answer keys remain private. The user explicitly authorized public group names, scores and teacher-approved funny answers on 25 October 2026. The teacher authenticates with a secret capability link. Original historical quiz grades: Yaseen 11/13, Hassonah 10/13 including bonus, Adam 8/13, Hamza 8/13, Aymen 5/13, Mohamed Mahmoud 4/13. Ties share rank. No manufactured attendance, streaks or additional quiz history. New online attempts use self-reported names. Full original corrected question document is unavailable; a separate three-question practice exercise is a draft.

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
