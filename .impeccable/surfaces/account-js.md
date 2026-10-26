---
version: 1
slug: "account-js"
primary_target: "account.js"
related_targets: ["components.js", "styles.css", "profile.js", "i18n.js", "app.js"]
---

# Account photo and identity

Mode: Extend the approved public Najdi world. Preserve its rug, upholstered rails, Amiri/Lora pairing, warm ivory reading and amber controls.

## Direction contract

THESIS: Let a signed-in student recognize and manage their own identity with a real Google photo, an uploaded photo or initials, surrounded by bounded warm light.
OWN-WORLD: Existing dark burgundy Najdi ground and quiet red settings sheet. Circular portrait at 136px, with fine warm rings and a local amber glow; shared 28px portraits keep the same treatment. One small Sadu seam below the identity. No replacement world or new decorative asset.
STORY: Inspect the current identity, select a photo source, review its preview, then explicitly Save photo or Cancel. Google linking/refresh is separate and waits until a pending photo draft is saved or canceled. Keep password and sign-out actions available.
FIRST VIEWPORT: Desktop identity column beside a dark settings sheet; at 750px they stack. Forms wrap at narrow widths and remain usable in Arabic RTL. The shared masthead and account disclosure remain intact.
FORM: Real Google provider control and real signed-in profile API. JPG/PNG/WebP sources up to 8 MB become a center-cropped 384px JPEG. Preserve loading, preparation, success, retry and error feedback. Unsaved choice never implies cloud persistence. Failed images use initials. All interface copy is bilingual.
FINISH: Account reference captures are `.impeccable/review/account-1440.png`, `account-390.png` and `account-320-ar.png`. Documentation was extracted from account.js, profile.js, Avatar and the final profile styles; this documentation pass did not rerun browser checks or perform account writes.

## Motion thesis

Only outer-ring opacity breathes over five seconds. It uses the existing ambient-motion hook, global pause, viewport/document visibility and static reduced-motion path. The portrait, text and hit targets stay still; light cannot hide a photo or label.
