# Tamkeen Youth — AI implementation and next steps

## Confirmed input and purpose
Regular Saturday halaqah; optional Tuesday halaqah. The teacher provides topics, teaching notes, or a pasted transcript. No YouTube integration or recording monitor is needed. The intended experience is recurring quiz drafting, reliable grading, personalized revision and teacher-controlled funny highlights.

The current release implements authenticated Gemini quiz drafting and funny-answer suggestions at POST /api/ai. It stores quizzes, grades MCQs deterministically and preserves historical paper grades. No Gemini API key is configured, so AI actions are disabled with setup guidance. Provider-isolated tests pass; live output quality is untested. The sections marked future describe work not shipped.

## Implemented now
- Teacher pastes 100–30,000 characters of transcript or detailed notes, supplies a title, chooses Saturday/core or Tuesday/optional and 5, 10 or 15 questions. A topic by itself is insufficient evidence.
- Gemini returns structured JSON with four plausible, parallel options, one keyed answer, explanation and an exact source excerpt for every question. The prompt asks for application and close distinctions, avoids giveaway options and forbids unsupported religious claims.
- Application validation checks schema, count, unique prompts/options and source excerpts. A second provider call independently checks evidence, ambiguity and distractors; any failed/missing check rejects the draft. This is a quality screen, not a guarantee of accuracy. Answer positions are shuffled while preserving the key.
- The generated draft opens in the question editor. Teacher reviews/edits the source excerpts and answers, saves it through the ordinary quiz API and confirms review before publication. Notes themselves stay in the open page; source excerpts persist with saved questions. Source notes and draft content are sent to Gemini only on explicit generation. A failed request preserves input in the current page.
- AI funny-answer selection considers actual wrong MCQ responses from the latest 100 submissions, capped at 40 candidate answers. The explicit learner name field is omitted from the provider payload and attached locally after validating its chosen candidate ID. The teacher reviews/edits then saves the suggestion; copy-to-WhatsApp never sends it automatically. Answer text may itself contain names, so this is data minimization rather than full anonymization.
- Teacher authentication and same-origin checks guard every AI request. GEMINI_API_KEY stays in a server secret. GEMINI_MODEL is configurable, default gemini-3.5-flash-lite. GEMINI_DAILY_LIMIT defaults to 20 logical AI tasks per UTC day, clamped to 1–100, with atomic D1 reservation. A quiz task makes two provider requests; a highlight makes one. Failed provider calls consume the reserved task. Each request times out after 55 seconds; there is no background retry.
- MCQ scores use the teacher-approved frozen key. Gemini never decides MCQ points. Optional Tuesday practice has its own per-quiz results, with no cumulative penalty or invented mastery score.

## Activate and verify
Add GEMINI_API_KEY as a secret runtime variable in Sites and redeploy. Never paste it into a student-facing form or committed file. Run a teacher-reviewed 5-question sample from known notes before relying on live drafts. Check that distractors are plausible, exactly one answer follows the source and explanations are accurate. Application quotas do not replace provider billing limits. Current REST implementation follows [Google’s structured-output documentation](https://ai.google.dev/gemini-api/docs/generate-content/structured-output).

Run node verify-ai.mjs for provider-isolated behavior and python3 verify-workflow.py against the local server for access/lifecycle checks. No real API key, provider billing, or live quality evaluation is involved in those tests.

## Future expanded teacher flow
1. Select Saturday (core) or Tuesday (optional), enter the lesson date/title, then paste a transcript or enter topics plus key teaching points.
2. Choose quiz size, language and difficulty appropriate to the actual group. The group’s age range is unknown and must not be invented.
3. Generate a draft. Review each question alongside its supporting transcript excerpt or supplied source, correct answer, explanation and topic tag.
4. Edit and publish the common core quiz. Optional Tuesday practice is labeled optional and does not subtract points from the core leaderboard.
5. Review completion, common misconceptions, suggested personal practice and proposed class moments.

## Future source organization
Transcripts are split into numbered passages. The generator produces a lesson outline and source-backed question bank. Every question stores source passage IDs and exact supporting excerpts. Topic-only mode can generate a proposed structure but must request the teacher’s intended answer or supporting material for religious claims; it must not invent quotations, hadith grades, scholarly agreement, citations or facts supposedly taught in class.

An independent verification pass checks that the keyed answer follows the cited material, that alternatives are distinguishable, that only one option is correct, and that the explanation does not add unsupported claims. This catches errors; it does not establish religious authority. Questions without sufficient evidence stay flagged and cannot auto-publish. The teacher’s approved answer key is authoritative for grading.

## Future queued architecture
React teacher form → authenticated POST /api/ai/quiz-drafts → queued job → Gemini structured JSON response → schema/evidence validation → stored draft → teacher review → normal publish route.

Keep the API key in the Sites secret runtime variable GEMINI_API_KEY, never in a public form bundle. Select the model by configuration rather than hardcoding a changing model name into the schema. Google’s structured-output feature supports JSON-schema responses; business rules and source references still require application validation. See https://ai.google.dev/gemini-api/docs/structured-output.

Jobs have queued, processing, needs_review, ready and failed states. A key derived from lesson ID, source version and generation settings prevents duplicate generation on retries. Cache the transcript analysis and bank once per source version. Cap lesson size, generation length, concurrency and per-lesson retries. Require teacher authentication and same-origin checks. Expose failures and retry buttons without losing pasted notes. Record usage and configure a spend limit before unattended generation.

## Future proposed records
- lessons: id, title, date, session_kind (saturday_core/tuesday_optional), source_kind, source_text, source_version, teacher_notes.
- lesson_passages: lesson_id, passage_id, text, optional teacher-added timestamp.
- learning_objectives: lesson_id, topic, objective, evidence_passage_ids.
- question_bank: lesson_id, prompt, options, correct_index, explanation, topic, objective, difficulty, evidence_passage_ids, source_excerpt, generator_version, review_status.
- generation_jobs: lesson_id, source_version, settings_hash, state, attempts, error, usage, created_at.
- members: stable id, display name, credential/invite identity reference.
- assignments: member_id, quiz_id, purpose (core/practice), due date if selected, version.
- topic_mastery: member_id, topic, evidence_count, last_practiced, measured result summary.
- suggested_moments: submission_id, question_id, selected_answer, correct_answer, suggested_caption, teacher_status.

Do not infer a learner profile from a spelling of their name. The current public name field is not identity verification. Use revocable member invitations or accounts before producing private cross-session personalization. Establish a membership roster first; do not guess whether Hassuna and Hassonah are aliases.

## Future fair personalization
Keep the leaderboard on the same approved core quiz for everyone. Separately assign personal revision questions for topics missed, in a configurable easy/medium/challenge mix. Practice results inform revision, not the common competition score. No history means balanced general practice, not an invented mastery estimate. Missing optional Tuesday practice does not count as an incorrect attempt. Avoid cumulative raw-point rankings across quizzes with different lengths without choosing and documenting a policy.

## Grading
Multiple choice: application code compares the submitted index with the frozen approved key; Gemini is unnecessary. This is already implemented.

Future written responses: store an approved rubric and acceptable variants. Normalize harmless Arabic diacritics and transliteration variants where appropriate, while preserving meaning. Ask AI for earned points per criterion, response evidence, missing concepts and a short explanation. Bounds-check all points. Teacher review handles ambiguous responses; the model does not resolve an unsupported religious claim. Students can request a correction, and any changed grade keeps an audit record.

## Funniest mix-up
Detect candidates only from actual wrong answers attached to a submission and a question. Send the question, selected answer and approved answer to Gemini without the student name. Generate an affectionate caption about the mix-up, never a claim about intelligence or mental health. The application attaches the display name locally. Teacher approves a highlight before sharing; preserve the original answer and allow withdrawal.

The implemented validator requires a real candidate ID and copies its question and answer fields locally; it validates caption type and length. Semantic accuracy of free-form captions still needs teacher review. A future factual validator should reject invented claims inside a caption. Do not label the lowest scorer the funniest. Rare distractor selection can nominate candidates, but humor quality is not a measurable intelligence ranking. Class-moment sharing remains explicit and teacher-controlled. The current Hassuna/ar-Ruman example is a teacher-provided anecdote, separate from original paper score records.

## Other useful AI features
- Personalized review cards linked to the exact supporting lesson passage.
- A teacher recap of the two or three topics with the most wrong answers.
- Arabic/English phrasing variants reviewed against the same approved meaning.
- A short weekly recap and copy-ready WhatsApp announcement.
- A question-quality report: duplicates, ambiguous wording, unequal distractors and suspiciously hard questions.
- Spaced revision suggestions based on real prior answers, without fabricated streaks.

## Future implementation order
First: one pasted transcript → evidence-linked draft → teacher approval → current deterministic grading. Measure quality on a teacher-reviewed sample before unattended drafting. Next: stable member identities and topic tags → personal practice. Then: richer caption fact checks and optional written-response rubric grading. Finally: recurring draft preparation only if the teacher explicitly requests scheduling; a weekly cadence alone is not permission to create a scheduled automation.

## Future acceptance checks
A generation failure preserves input. Every publishable generated question has supporting material. Invalid JSON or out-of-range keys cannot enter a published quiz. No secret appears in browser assets. Common-core ranks remain comparable. Optional practice never penalizes absences. Every funny candidate reproduces a real submitted answer or is explicitly teacher-authored. Repeated jobs do not create duplicate drafts. Provider usage is visible and bounded. Existing manual quizzes remain usable without the AI provider.
