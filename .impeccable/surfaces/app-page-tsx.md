---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/globals.css"]
---

# Task-first quiz website

Mode: Operate. Targets: quiz library, student attempts, grades, leaderboard, funny answers, guided quiz builder and AI drafter. The user retains the selected League identity, asks for maximum intuitiveness and explicitly removes dropdowns. Code-first execution remains approved. The user explicitly authorizes public names, scores and teacher-approved funny answers; preserve private editing and full answer keys.

## Direction contract
THESIS: Tamkeen League is a friendly youth quiz league with one task per screen and visible choices. Students find a quiz; teachers create, grade, compare and share.

OWN-WORLD: Navy club masthead, vivid royal blue actions, yellow champion podium, pale blue working surfaces, coral and lavender rank accents. Self-hosted Figtree for readable UI and Barlow Condensed for scoreboard numerals. Crisp 12px corners, flat task rows and strong baseline alignment.

STORY: Students choose an open quiz, answer one question at a time and receive a real saved score. Teachers use four named destinations, enter paper grades together and build quizzes through Details, Questions and Publish. AI drafts need source evidence and teacher review.

FIRST VIEWPORT: Compact masthead; teachers see Quizzes, Grades, Leaderboard and Funny answers. Quizzes leads with Create quiz, secondary Draft with AI, then a single readable list. Students start on Home, with a weekly schedule, quiz availability, standings and approved funny answers. Home, Quizzes, Leaderboard and Funny answers remain visible even without a quiz. No sidebar. The home page introduces the community; each task has its own page. Visible radio cards replace quiz dropdowns; Manage quiz opens a page of named actions. Signature interaction: one short question arrival, answer-selection feedback and finite confetti after submission; reduced motion disables these.

FORM: Youth tournament scoreboard and team sheets; grounded candidate 1, assistant’s pick delegated by the user; seed 71a555e0. Other candidates were game console, trip passport, community poster, club magazine, museum exhibit and route map. This direction’s honest risk is familiar scoreboard language; precise typography and meaningful task density carry its distinction.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Verification constraint for this refinement
Local browser preview at 127.0.0.1:5173 was declined by the browser permission gate. Do not work around that refusal. Existing screenshots under .impeccable/review predate this refinement and are not final evidence. Source, TypeScript, build and API checks are available; responsive visual review remains pending renewed browser authorization. Gemini is configured and a live five-question draft passed source and quality checks on 25 October 2026.
