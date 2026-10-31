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
STORY: Choose Qur’an/halaqa/quiz/other; assign to everyone or an active account. Qur’an uses validated exact range/goal; halaqa uses supported video/playlist and optional published quiz, quiz requires published quiz, other requires instructions. Show student-action preview. Title-only corrections keep progress; material edits reset it. Remove homework in the list and Remove this homework inside Edit withdraw work, with Undo removal and Removed homework · restore a mistake retaining previous progress.
FIRST VIEWPORT: Date band and three visible Assigned work / Review in person / Qur’an progress actions precede rows; selection persists through the existing section URL parameter. Back to this Sunday appears when away. An open assignment editor hides the underlying list and Cancel checks changed drafts before closing. Review has an assignment selector, status filters and all assigned active students, including those without a digital check-in. Open a named review with private feedback, Practise again or Mark reviewed. Mobile kind choices become two columns and surah takes its own range row; date heading remains separate above input. Zero minimum width and 6px inline padding keep the native date between the 44px arrows at narrow RTL widths.
FORM: Title 100 characters, instructions 1000, feedback 500; native controls and 114-surah bundled Al Quran Cloud metadata. Idempotent creation, assignment revisions/progress versions, 15-second requests and draft-preserving failures. Readiness is not verified recitation or points. Source text is untouched; no generic student AI or paid voice.
FINISH: Source-grounded documentation of the current workflow; this pass changed no UI, test, asset or live data and ran no browser checks. Owner context and research are provisional research/persona inputs, not student interviews. Current implementation verification is synthetic; publication is tracked separately.

The third progress view uses its own compact Homework assigned through Sunday cutoff, latest teacher check separate from readiness, and the student-prefilled assignment editor; see teacher-quran-progress-tsx.md.

Comfort verification report (30 October): 19 passing unit checks; final synthetic comfort and Sunday browser scenarios at 1440px/390px English and 320px Arabic; teacher-progress scenarios covering mobile Menu/Escape, dirty Cancel, the hidden editing list and Homework view refresh; and an eight-case mobile viewport/language matrix. Final checks cover reading/practice mode changes through assignment selection and reload, plus the narrow RTL calendar’s separation from its arrows. Source type checking and build passed. The final visual review marked its two material corrections resolved and returned a ship verdict. This docs pass inspected source only and did not rerun application tests. No physical device or real student/teacher field study was performed, no learning gain is established, and publication is tracked separately.
