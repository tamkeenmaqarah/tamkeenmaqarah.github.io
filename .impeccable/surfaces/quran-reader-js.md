---
version: 1
slug: "quran-reader-js"
primary_target: "quran-reader.js"
related_targets: ["quran.js", "assignments.js", "app.js", "styles.css", "i18n.js"]
---

# Qur’an library and exact assigned recall

Mode: Operate. Owner-pinned reading composition within the existing Najdi world; no new identity, composition workshop or seed. Preserve incumbent frontmatter and primitives.

## Direction contract

THESIS: Make the whole Qur’an easy to find, read and hear, while preserving exact assigned rehearsal before teacher review.
OWN-WORLD: Deep oxblood Najdi rug, upholstered rails, Sadu seams, warm ivory text, clay forms, amber actions and Amiri/Lora/IBM Plex Sans Arabic. The public reading sheet alone uses ivory (#f6eedb), dark ink and a double green (#8b9a77) frame with continuous Amiri Quran and green inline ayah buttons. Authored cushions and bounded light remain outside reading and targets.
STORY: Search 114 surahs by normalized Arabic, English or number; choose a full chapter, optional range or previous/next chapter. Read continuously, listen to the passage or one numbered ayah, adjust text size and explicitly save/resume a place on this device. Homework locks the teacher’s exact range and retains hidden ayah → reveal → next → finish. Practice is private and never grades recitation or awards points.
FIRST VIEWPORT: Desktop uses a 250px surah sidebar plus 28px gap. Below 1000px the library becomes a native disclosure. At 750px the reading sheet is 22px 18px, the heading 32px and continuous text 90% of the selected 24–48px setting (initially 36px), with 2.7 line height. Text comes before audio; a visible Reciter & audio link reaches the controls below. Native playback floats only when audio is loaded, with 130px bottom allowance and safe-area positioning. Inline listening buttons remain 44px.
FORM: Attributed Al Quran Cloud quran-tajweed source; nested/untyped metadata becomes React text spans preserving Arabic characters and diacritics. Seventeen rule categories have a bilingual color key with darkened semantic hues. Muhammad Siddiq Al-Minshawi — Murattal is the built-in EveryAyah default; the native bilingual selector adds validated, deduplicated Al Quran Cloud Arabic verse-by-verse options. Exclude Mishary Alafasy and variants by owner preference, without implying a factual allegation. Device choice persists; unavailable/excluded choice falls back to Al-Minshawi. Catalog failure keeps the built-in default and a retry. Audio paths must match the selected edition and trusted host; reciter/range/mode/ayah changes cancel prior playback. Keep bounded fetches, cache, retry and separate text/audio attribution. No fixed printed-page claim, proprietary font, new asset or Foundation production enablement.
REFERENCE: /var/folders/d3/ck8861_106gfg6clhm12gb4m0000gn/T/codex-clipboard-912f3fe5-dafb-46dd-b596-52ed219df022.png pins continuous mushaf and green inline markers. The final audio pin is Muhammad Siddiq Al-Minshawi — Murattal.
FINISH: Documentation inspected quran-reader.js, quran.js and scoped CSS; no code, styles, tests, assets, teacher UI or backend deployment changed in this pass. Reported implementation evidence: 17 unit checks; desktop/mobile EN/AR browser scenarios at 1440/390/320/768px; exact glyph check of all 6,236 ayahs; live Chromium real Tajweed text and decoded EveryAyah audio advancing ayahs. App writes were intercepted. Physical iPhone/Safari and human recitation remain untested. Publication is tracked separately.
