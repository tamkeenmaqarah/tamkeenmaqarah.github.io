---
version: 1
slug: "teacher-quran-progress-tsx"
primary_target: "app/teacher-quran-progress.tsx"
related_targets: ["app/teacher-homework.tsx", "app/teacher-dashboard.tsx", "app/teacher.css", "app/quran-progress.ts", "app/api/quran-progress/route.ts", "app/assignments.ts", "db/schema.ts", "drizzle/0010_teacher_quran_progress.sql", "app/i18n.js"]
---

# Latest in-person Qur’an checks by student

Mode: Operate. Precise CRUD extension of the incumbent Najdi working room; preserve all tokens, assets and dependencies.

## Direction contract

THESIS: Let the teacher find each learner’s assigned passages, hear them in person and record useful feedback without confusing readiness with teacher evidence.
OWN-WORLD: Incumbent oxblood upholstery, warm ivory text, amber actions, clay inline editor, cream fields and burgundy form actions; Amiri/Lora/script pairing, RTL and a still private shell.
STORY: Overview Track Qur’an progress opens Homework’s third subtab. The cutoff filters assignment.week, not teacher-check date; included passages show their latest check rather than a historical as-of snapshot. Include active accounts and all typed Qur’an assignments through the inclusive Sunday cutoff; exclude withdrawn work and archived accounts. Search and All students / Needs attention lead to exact passage/date/goal, current readiness, latest teacher check and feedback. Record check requires instructions for Needs more practice, optional feedback for Mark reviewed. Count unique overlapping reviewed ayahs once; no mastery percentage or append-only all-attempt history. Assign homework for this student prefills student/range context for explicit teacher choice and publication.
FIRST VIEWPORT: One contextual h1; compact native Homework assigned through Sunday input. Desktop roster (280px), gap (28px), remaining detail; at (1050px) one column with roster list capped at (340px), selected detail scrolled and focused. Mobile retains three wrapping homework actions, (18px) roster padding and (22px 18px) clay editor. Explicitly scoped Remove homework / Remove for everyone and Undo removal remain close to the work.
FORM: Migration 0010 adds independent teacher_status/teacher_reviewed_at; backfill only dated known reviewed/repeat rows. Student ready/help changes retain teacher proof and feedback; teacher reviews write both old/new fields under the optimistic version guard. Actual-work edits reset progress; title edits preserve it. Withdrawal and restore retain marks; existing account deletion removes the progress rows. Teacher-only same-origin/no-store GET supports cutoff, roster and selected student; no new provider/key. Dirty/busy guards and failed-save draft retention remain. Error text on clay passed the reported 4.5:1 contrast check.
FINISH: Source-inspected docs only; no implementation checks rerun. Implementation reports synthetic teacher browser coverage at 1440/390px English and 320px Arabic for cutoff, feedback/503 retry, removal/Undo, prefilling and Edit removal; SQLite checks cover migration/backfill, teacher-proof preservation, overlap/cutoff/privacy, removal/Undo, material/title edit, stale versions, archive and teacher/origin access. Type checking/build passed before the last compact layout change; final release build is separate. No real records modified, physical iPhone/Safari or real pupil/teacher field study; publication is tracked separately.
