# Comfort and task flow review — 30 October 2026

This is expert PM/UX inspection and synthetic task verification, not interviews with children or evidence of learning gains. The existing owner-confirmed personas remain: a 10–12-year-old finding the next task, a 13–17-year-old revising an exact passage, and a teacher moving between pupils in the tent.

Priority 1 — reach the actual work:
- The student masthead and navigation occupied 178px on a 390px phone and remained over the task while scrolling. Let the masthead scroll away while keeping all six named destinations visible.
- Home showed noninteractive assignment summaries, requiring Open homework and then searching the task. Make the summary itself open and focus its task; preserve the general homework action.
- Qur’an homework forced reading before reaching practice. Add direct Practise assigned ayahs while preserving Open assigned ayahs as a secondary reading action. Range choice, Reveal and explicit readiness stay intact.
- Completed teacher-reviewed work repeated the full pending preparation flow. Default to unreviewed work, keep counted All homework available and auto-open it when a reviewed task is requested from Home. Feedback and revisiting remain available.

Priority 2 — recover and keep context:
- A help request could not be cancelled. Add Cancel help request, using existing pending status and server safeguards.
- Ready/reviewed states repeated instructions to prepare. Give them truthful state-specific instructions.
- Browsing Sundays had no direct return to the current gathering. Add Back to this Sunday only when away.
- Teacher Homework tabs did not update the URL; refresh could return to a different view. Preserve Assigned work / Review in person / Qur’an progress in the existing section parameter.

Priority 3 — remove avoidable chrome:
- All eight teacher destinations plus account utilities consumed roughly 269px on phones. Use an explicit Menu/Close menu, with Escape, correct expanded state and full navigation available. Desktop navigation is unchanged.
- A selected teacher progress detail left the entire roster above it on mobile. Show the chosen student as the current view and use Back to students to restore and focus search.
- Teacher assignment editing still showed the whole assignment list underneath. Keep the editor focused and guard Cancel against discarding a changed draft.
- Home offered missed-question practice before any missed questions existed. Show that shortcut when it has work; the Halaqas section remains available with its explanatory empty state.

Keep the approved Najdi materials, bilingual parity, audio/text sources, in-person checks, privacy and scoring. No new AI feature, provider, dependency, database migration or invented learning measurement is justified by these problems.

## Final disposition and evidence

The implementation addressed the task-flow changes above while preserving the approved Najdi materials and existing privacy/readiness boundaries. Final visual review identified two material corrections: overlap between the mobile teacher date input and week arrow, and reading/practice selection failing to follow the URL through assignment changes. The input now shrinks within its column with 6px inline padding; current reader mode is carried through assignment selection and URL refresh. The final review marked both resolved and returned a ship verdict.

The 30 October comfort implementation reports 19 passing unit checks; final synthetic comfort and Sunday browser scenarios at 1440px/390px English and 320px Arabic; teacher-progress scenarios covering mobile Menu/Escape, dirty Cancel, the hidden editing list and Homework view refresh; and an eight-case mobile viewport/language matrix. Final checks cover reading/practice mode changes through assignment selection and reload, plus the narrow RTL calendar’s separation from its arrows. Source type checking and build passed. The final visual review marked its two material corrections resolved and returned a ship verdict. These are implementation reports; this documentation pass inspected source and checked documentation consistency without rerunning application tests. No physical device or real student/teacher field study was performed, no learning gain is established, and publication is tracked separately.
