# Tamkeen Maqra’ah — quiz website system design

## Product
A recurring home for youth-group quizzes. Students open a shared link, enter a display name, answer one multiple-choice question at a time, submit, and review their result. Teachers create and publish quizzes, share individual quiz links, close quizzes, view attempts, edit historical paper grades, and copy summaries to WhatsApp.

Teacher navigation: Quizzes / Grades / Leaderboard / Funny answers. Students see only available quizzes. Visible quiz choices and action pages replace dropdowns. Quiz creation follows Details → Questions → Publish. Large text, explicit buttons, generous answer targets, no sidebar dashboard. Teacher functions require a private access link; students need no account.

## Architecture
Browser (React) → same-origin Vinext API (Cloudflare Worker) → Cloudflare D1 (SQLite).
Sites serves the website and provisions D1. Published quizzes and submitted answers live in the shared database, not browser localStorage. Reloading or changing devices reads the same records. Gemini is an optional server-side provider for teacher-requested drafting and captions. There is no automatic external messaging. Manual quizzes and grading work without a provider key.

## Roles and access
The public GET /api/data returns only published quizzes and their prompts/options. It strips answer keys, explanations, historical names, grades and submissions. The teacher cookie unlocks drafts, answer keys and results. Each mutation checks both teacher authorization and the same-origin Origin header, except student submission which is anonymous but still checks Origin. SQL statements are parameterized.

TEACHER_KEY is a random 256-bit secret stored as a secret runtime variable in Sites. A private teacher URL carries it in the URL fragment; the client immediately removes the fragment and exchanges it through POST /api/teacher for a Secure, HttpOnly, SameSite=Strict cookie (30 days). The teacher key never appears in a client bundle or database migration. The local development key is deliberately different and ignored by Git. DELETE /api/teacher clears the session. Keep/bookmark the original private teacher link; do not share it with students. This is one shared teacher capability, not per-teacher accounts or individual audit attribution. Key rotation requires updating the runtime secret and redeploying; this invalidates old cookies and links.

## Tables
quizzes(id PK, title, description, questions JSON, published integer, created_at).
questions JSON contains prompt, four options, correct option index, explanation and optional source evidence. Quiz validation permits 1–50 questions; all are worth one point.
submissions(id PK = random attempt UUID, quiz_id FK, name, answers JSON, score, max, created_at).
records(id PK, name, regular, bonus, max): original paper-quiz grades, visible only to teachers.
ai_usage(day PK, requests): an atomic daily counter for teacher AI tasks.
moments(id PK, name, question, chosen, correct, caption, created_at): teacher-reviewed funny answers.
Schema is owned by versioned Drizzle migrations. Seeding is a teacher-only API operation, not a migration side effect. INSERT OR IGNORE makes original-group loading repeatable without overwriting corrections.

## API
GET /api/data — public quiz library; teacher session adds drafts/results/history. Cache-Control: no-store.
POST /api/teacher — exchange teacher key for cookie; DELETE clears it.
POST /api/quizzes — validate and create a draft or published quiz (teacher only).
PATCH /api/quizzes — edit an unpublished draft with no submissions, or publish/close a quiz (teacher only).
POST /api/submit — validate a published quiz, name and complete answers; grade on server and save atomically in a single insert. Return result and answer review only after submission. Attempt UUID permits retry without recording another result.
POST /api/setup — seed original roster/grades and a three-question practice draft (teacher only).
PUT /api/records — add/edit one original paper grade (teacher only).
POST /api/records — validate all grades, then save together with an atomic D1 batch (teacher only).
POST /api/ai — kind=quiz drafts and checks a source-backed quiz; kind=highlight proposes a caption from real wrong answers. Teacher and same-origin required; unavailable with a clear 503 until GEMINI_API_KEY is set.
POST /api/moments and DELETE /api/moments — save/remove teacher-reviewed highlights.

## Quiz lifecycle
Create → save draft or publish → copy student link → students submit → teacher reviews → close when finished.
Draft question content can be edited while unpublished and unused. Published quizzes and quizzes with submissions reject question edits on the server; Make a copy creates a new edition so previous submissions keep their original question set. Closing rejects new submissions and preserves existing results. A teacher can preview a draft without recording a student result.

## Grading
Online quizzes: one point per correct answer, no negative points, immediate percentage and explanations. All questions require an answer. Historical quiz: 12 questions + written explanation = 13 regular points; poetry adds 0 or 1. Totals: Yaseen 11; Hassonah 10 including bonus; Adam 8; Hamza 8; Aymen 5; Mohamed Mahmoud 4. Historical average 59.0%. Bonus never changes the denominator. Rankings use percentage and competition ranks (ties share rank). Online result tables show every attempt; names are self-reported and not verified student identities. No invented attendance, dates or progress history.

## Data boundaries and limits
No student accounts, parent accounts, email invitations, attendance tracking or automatic WhatsApp sending. Student scores are shown at submission; reopening the quiz link starts a new attempt. Unsubmitted answers remain only in the open page and are lost if it reloads. Teacher navigation warns before discarding entered answers. Public quizzes allow repeat attempts; this is a formative learning tool, not a secure exam. Correct answers become visible in the review after submission. IP-based abuse limits, verified identities, cumulative term scoring, audit trails and automated backup exports are future hardening work. Teacher results return the latest 1,000 online submissions.

The final full corrected 12-question document was not available in this workspace. The original quiz is preserved as paper grades; the three-question practice quiz is a separate short exercise based on the user-supplied lesson, not a fabricated reconstruction of all 12 questions. Teacher reviews the practice draft before publication. Tamkeen FC membership overlap is unconfirmed and is not imported.

## Validation
TypeScript checks and production build. Local database migration. API integration checks verify anonymous privacy, stripped answer keys, blocked anonymous teacher mutations, rejected invalid teacher key, original six records, server-side scoring, repeat-submission idempotency and incomplete-answer rejection. The previous release had browser verification. This task-first refinement has no fresh screenshots: local browser preview authorization was declined. Do not reuse old captures as evidence. Provider-isolated AI checks cover malformed/unverifiable drafts, independent audit rejection, shuffled answer-key preservation, real-candidate matching, name minimization and quota rejection. Live Gemini quality remains untested without a provider key. Production read-only smoke checks run after deployment.

## League redesign and class moments
The UI now has a task-first quiz list, a private leaderboard with grouped tied ranks, a bulk grade sheet and a guided quiz builder. Manage quiz opens a list of named actions instead of a dropdown. Fonts are self-hosted; question movement and a finite completion burst respect reduced-motion settings.

The new moments table stores id, name, question, chosen answer, correct answer, caption and created_at. Authenticated teachers can create/remove moments at /api/moments. Public /api/data returns an empty moments list and still strips all group scores and answer keys. Teacher data includes submitted answer indices so the moment editor can start from an actual wrong answer. Moments are teacher-reviewed and separate from grades. Optional AI suggestions select a real wrong-answer candidate; they never save or share themselves.

Implemented Gemini features use pasted transcripts or detailed notes for Saturday core and optional Tuesday practice. Source validation, an independent quality pass, answer shuffling and explicit teacher review protect the draft flow. The provider secret is not configured. Personalization, short-answer AI grading, queues and unattended weekly generation remain future work; see AI_SYSTEM_DESIGN.md.
