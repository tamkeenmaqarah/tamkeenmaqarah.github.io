---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/teacher-dashboard.tsx", "app/teacher.css", "app/layout.tsx", "app/ui.tsx", "app/i18n.js", "app/globals.css"]
---

# Private teacher operating dashboard

Mode: Operate. Preserve the established private Najdi working composition and the public world’s pinned identity and tokens.

## Direction contract

THESIS: A calm private operating dashboard for quiz publishing, grade editing, source-backed AI drafts, Sunday homework and teacher-approved funny answers.
OWN-WORLD: The public circle’s dark burgundy Najdi rug, warm ivory ink, amber controls and local Amiri/Lora/IBM Plex Sans Arabic typography. Dark working ground and sidebar; clay editing forms with dark readable copy. A narrow Sadu seam marks the sidebar edge or mobile header. No ornamental animation.
STORY: Sign in with the private teacher access key, review actual published/draft/recent-submission counts, open recent quizzes or go directly to grades, homework or AI drafting. Preserve quiz management, answer keys, validation, explicit save/publish, teacher approval and privacy boundaries.
FIRST VIEWPORT: A 248px fixed logical-start sidebar beside Overview and Create a quiz. Three real totals lead into direct grade/homework/AI work links before up to five recent quizzes. At 1100px the sidebar becomes 220px. At 750px it becomes a sticky four-column grid with all seven destinations permanently visible, including AI tools; utilities remain visible and Arabic RTL mirrors the layout. Teacher entry remains a centered dark sheet with clay key form and student-site return link.
FORM: Native date input with a localized full Sunday date. Initial date is strictly next Sunday in device-local time; weekday choices map forward to Sunday and week controls move seven days. Homework retains loading, empty, error and retry states. All task labels and navigation are available in English and Arabic. Preserve 44px targets, focus, skip navigation, readable clay selection/help/source contexts and reduced motion.
FINISH: Source truth is teacher-dashboard.tsx, teacher-homework.tsx and final teacher.css loaded after globals.css. Existing palette/type primitives remain pinned; only navigation, work-link ordering and directly visible prepared-name patterns changed. Backend eca480b deployment workflow 40816548729 succeeded. Independent final discoverability review returned ship after both bounded fixes and regression checks; public frontend d46697a / Pages workflow 40817029584 published successfully; production EN/AR browser regressions passed with writes intercepted, and live public Home captures passed without writes; this documentation pass ran no browser/detector or data mutation.

## Evidence

Reviewed reference captures are in the public sibling project at `/Users/ibrahiimmuhamud/Documents/ChatGPT/Tent web app/.impeccable/review/`: `teacher-final-home-1440.png`, `teacher-final-teacher-1440.png`, `teacher-final-home-390-ar.png`, plus AI, builder, grades, homework, management and moments captures. These are reference evidence from the UI review; final bounded contrast/number-direction corrections were verified in source for this documentation pass. No browser session, detector, data mutation or UI edit was performed here.

## Motion thesis

Keep the private shell still. Existing short control hover/press feedback is sufficient; no lantern, cushion or other ornament loop belongs in the dashboard. Reduced motion disables transitions, animations and smooth scrolling. Navigation and task content start visible and usable.
