---
version: 1
slug: "teacher-homework-tsx"
primary_target: "app/teacher-homework.tsx"
related_targets: ["app/teacher-dashboard.tsx", "app/teacher.css", "app/assignments.ts", "app/api/assignments/route.ts", "app/api/assignments/progress/route.ts", "app/api/learning/route.ts", "app/ai.ts", "app/i18n.js"]
---

# Teacher Sunday assignments

Mode: Operate. Extend the existing private Najdi dashboard and its sidebar; preserve all incumbent tokens and typography.

## Direction contract

THESIS: Assign the group’s next Sunday work or one student’s work, then inspect self-reported preparation separately from students’ own notes.
OWN-WORLD: Existing dark working room, warm ivory rows and amber actions. A narrow Sadu seam finishes the dark Sunday selector and clay inline editor; cream fields and burgundy form actions retain their established contrast. No ornamental motion.
STORY: Choose the Sunday, create a title and instructions for Everyone or a named account, optionally append the Tuesday playlist, then save. Edit or remove a row; inspect prepared names through native details. Editing resets marks. Removal confirms its scope and atomically removes marks. Revision guards reject stale edits, removal and preparation. Students’ shared practice notes remain separately labeled below assignments; preparation is not a grade.
FIRST VIEWPORT: Page title and Assign homework action, localized date between native week controls, then editor or assignment rows. Initial date is strictly next device-local Sunday; another weekday maps forward to Sunday. Preserve sidebar/mobile menu and RTL. At 750px, task headers stack and editor actions wrap; the editor keeps 34px top padding and 18px inline gutters.
FORM: Visible labels, native account recipient selector, 100-character title and 1,000-character instructions. Account recipients appear after sign-in. Show a literal isolated Qur’an reference example; Add Tuesday playlist appends PLJHIkqUYcGAA without fetching a transcript. Retain unsaved-draft guards, request busy locks, retry, errors and explicit success. Authenticated teacher writes and account-scoped student reads preserve private boundaries.
FINISH: Extracted from teacher-homework.tsx, teacher.css, assignments.ts and assignment/learning routes. Optional student Gemini support stays on explicit request, source-grounded and server-key-only. Deployment verification on 28 October 2026 confirmed the teacher server, assignment privacy projection, exact-excerpt English/Arabic cards and an Arabic 15-minute three-phase plan. This documentation pass performed no browser/detector runs or data writes.
