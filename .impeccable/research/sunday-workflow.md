# Sunday workflow research and priorities

This brief uses the owner's answers, an expert walkthrough of the implementation, published research, and synthetic task tests. It is not a claim that students or teachers were interviewed or observed.

Confirmed context: ages 10–17; mostly Sunday use, also weekday revision; recitation is checked face to face; pupils should practise, take a short check where assigned, and report readiness. Teachers need assign/edit/withdraw/undo, an in-person review queue, and archive/restore/permanent account removal.

Provisional personas to validate with the group:
- Younger pupil (10–12): arrives in the tent with a phone, needs one obvious next action, little typing, and an easy way to ask for help.
- Older pupil (13–17): revises during the week, wants the exact passage/video/check and useful feedback without duplicate busywork.
- Sunday teacher: moves between learners, needs to correct assignments, see who needs help, review someone who never used a digital checkbox, and manage the roster safely.

Research implications (inferences for this setting, not evidence about this group):
- NN/G teen research favors goal-oriented, concise interfaces and useful interaction over pointless multimedia: https://www.nngroup.com/articles/usability-of-websites-for-teenagers/
- NN/G child research distinguishes younger age groups and emphasizes clear familiar cues: https://www.nngroup.com/articles/childrens-websites-usability-issues/
- IES recommends spaced review and retrieval/quizzing. Apply this to hide/reveal passage recall and assigned lesson checks, with teacher feedback: https://ies.ed.gov/ncee/wwc/PracticeGuide/1
- EEF notes classroom evidence limitations and the need to monitor retrieval difficulty. No claim of automatic recitation accuracy or a promised learning gain: https://educationendowmentfoundation.org.uk/education-evidence/evidence-reviews/cognitive-Science-approaches-in-the-classroom

Priority 0: real weekly work
1. Structured Qur’an/halaqa/quiz assignments, exact ranges and published quiz attachments; optional teacher instructions.
2. Read/listen/recall the assigned passage; open assigned lesson; complete its short check. No student transcription or note-taking requirement.
3. Private ready/help/repeat/reviewed states; teacher feedback; teacher can review in-person learners without a digital check-in.
4. Withdraw mistaken homework with undo; title-only corrections preserve progress, changed work resets it with disclosure.
5. Archive revokes sessions and blocks writes under that name; restore permits new sign-in; permanent deletion requires archived state, exact name and an atomic record-count preview guard.
6. Sunday defaults to today, so today's work does not vanish a week forward.

Priority 1: useful support
- Teacher AI quiz drafting/checking stays source-grounded and review-required.
- Student AI explains an actual teacher quiz note on demand. Generic plans, student notes and notes-chat are removed from the main interface.
- Six student destinations; lesson quizzes remain explicit actions on Home/Halaqas/Homework, social highlights remain secondary.

Scenarios to verify: new/no account, assigned vs group work, wrong ayah bounds/video/quiz, title-only vs material edit, stale tabs, withdrawal/undo, failed saves, help request, classroom review without check-in, unavailable quiz, audio failure, Sunday/year boundary, archive/restore, stale deletion preview, wrong confirmation name, unrelated records preserved, EN/AR320/390/1440 and keyboard/reduced motion.

Linked Reveal refinement (29 October 2026): the owner explicitly retained Reveal ayah and requested better memorisation support for teenagers. The implemented range choice, source-exact first-word hint, reveal/self-check and flagged-ayah repeat rounds apply the general retrieval/re-exposure rationale above. These are within-session repetitions, not a persisted spacing schedule; no Qur’an-specific retention benefit or result for this group has been established. Keep teacher review in person and readiness explicit.
