---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/teacher-dashboard.tsx", "app/teacher.css", "app/layout.tsx", "app/ui.tsx", "app/i18n.js", "app/globals.css"]
---

# Private teacher operating dashboard

Mode: Replace the obsolete teacher visual contract with the explicitly requested dashboard overhaul. The public student world remains the visual authority; the private working composition is distinct.

## Direction contract

THESIS: A calm private operating dashboard for quiz publishing, grade editing, source-backed AI drafts, Sunday homework and teacher-approved funny answers.
OWN-WORLD: The public circle’s dark burgundy Najdi rug, warm ivory ink, amber controls and local Amiri/Lora/IBM Plex Sans Arabic typography. Dark working ground and sidebar; clay editing forms with dark readable copy. A narrow Sadu seam marks the sidebar edge or mobile header. No ornamental animation.
STORY: Sign in with the private teacher access key, review actual published/draft/recent-submission counts, open recent quizzes or go directly to grades, homework or AI drafting. Preserve quiz management, answer keys, validation, explicit save/publish, teacher approval and privacy boundaries.
FIRST VIEWPORT: A 248px fixed logical-start sidebar beside the overview and Create a quiz action. Three real totals, up to five recent quizzes and direct work rows. At 1100px the sidebar becomes 220px. At 750px it becomes a sticky menu with labeled toggle and a two-column destination grid; the layout mirrors for Arabic RTL. Teacher entry is a separate centered dark sheet with a clay key form and student-site return link.
FORM: Native date input with a localized full Sunday date. Initial date is strictly next Sunday in device-local time; weekday choices map forward to Sunday and week controls move seven days. Homework retains loading, empty, error and retry states. All task labels and navigation are available in English and Arabic. Preserve 44px targets, focus, skip navigation, readable clay selection/help/source contexts and reduced motion.
FINISH: Source truth is app/teacher.css loaded after globals.css, teacher-dashboard.tsx, page.tsx, layout.tsx and ui.tsx. DESIGN.md and schemaVersion 2 sidecar now describe the actual teacher contract rather than the obsolete cream/Reem Kufi/no-sidebar or League contract. Documentation alone does not assert deployed production behavior.

## Evidence

Reviewed reference captures are in the public sibling project at `/Users/ibrahiimmuhamud/Documents/ChatGPT/Tent web app/.impeccable/review/`: `teacher-final-home-1440.png`, `teacher-final-teacher-1440.png`, `teacher-final-home-390-ar.png`, plus AI, builder, grades, homework, management and moments captures. These are reference evidence from the UI review; final bounded contrast/number-direction corrections were verified in source for this documentation pass. No browser session, detector, data mutation or UI edit was performed here.

## Motion thesis

Keep the private shell still. Existing short control hover/press feedback is sufficient; no lantern, cushion or other ornament loop belongs in the dashboard. Reduced motion disables transitions, animations and smooth scrolling. Navigation and task content start visible and usable.
