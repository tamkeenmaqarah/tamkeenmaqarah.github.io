---
version: 1
slug: "teacher-homework-tsx"
primary_target: "app/teacher-homework.tsx"
related_targets: ["app/teacher-dashboard.tsx", "app/teacher.css", "app/assignments.ts", "app/api/assignments/route.ts", "app/api/assignments/progress/route.ts", "app/api/assignments/review/route.ts", "app/api/assignments/restore/route.ts", "public/assets/quran-surahs.json", "app/i18n.js", "drizzle/0009_sunday_workflow.sql"]
---

# Teacher assignment and in-person review

Mode: Operate. Ordinary workflow extension; preserve the pinned Najdi world and incumbent token primitives.

## Direction contract

THESIS: Assign concrete practice, correct mistakes safely and review students face to face.
OWN-WORLD: The pinned dark Najdi working room, warm ivory rows, amber actions, clay editors, cream fields and burgundy form actions. Narrow Sadu seams; Amiri/Lora/script pairing, RTL, 44px targets, focus and reduced motion. Keep the private shell still.
STORY: Choose Qur’an/halaqa/quiz/other; assign to everyone or an active account. Qur’an uses validated exact range/goal; halaqa uses supported video/playlist and optional published quiz, quiz requires published quiz, other requires instructions. Show student-action preview. Title-only corrections keep progress; material edits reset it. Withdraw exposes Undo and later restore with previous progress.
FIRST VIEWPORT: Date band and two visible Assigned work / Review in person actions precede rows. Review has an assignment selector, status filters and all assigned active students, including those without a digital check-in. Open a named review with private feedback, Practise again or Mark reviewed. Mobile kind choices become two columns and surah takes its own range row; date heading remains separate above input.
FORM: Title 100 characters, instructions 1000, feedback 500; native controls and 114-surah bundled Al Quran Cloud metadata. Idempotent creation, assignment revisions/progress versions, 15-second requests and draft-preserving failures. Readiness is not verified recitation or points. Source text is untouched; no generic student AI or paid voice.
FINISH: Source-grounded documentation of the current workflow; this pass changed no UI, test, asset or live data and ran no browser checks. Owner context and research are provisional research/persona inputs, not student interviews. Current implementation verification is synthetic; publication is tracked separately.
