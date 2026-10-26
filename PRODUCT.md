# Ashab Al Khaimah

<!-- impeccable:product-schema 1 -->

## Platform
web

## Users
A dedicated subset of Tamkeen Youth, gathering every Sunday after Fajr in a warm Najdi tent.

## Product Purpose
Support Qur’an memorization review, review of Saturday and Tuesday halaqas, weekly quizzes and a shared leaderboard.

## Operating Context
The Sunday gathering takes place in a Najdi tent with heaters and warm lighting. Members use the website to take quizzes and see standings. Teachers manage quizzes and grades on the existing Tamkeen server.

## Capabilities and Constraints
Preserve the deployed application's public API, quiz links, scoring, teacher access, privacy boundaries and approved funny answers. GitHub Pages serves static files. The repository contains a bundled React application rather than its original source workspace. The user confirmed a fully bilingual English and Arabic interface, including RTL. Upstream commit d87e721 adds saved quiz progress and private missed-question practice on the current device; preserve these behaviors and keep practice out of the shared leaderboard.

## Brand Commitments
أصحاب الخيمة / Ashab Al Khaimah, a circle inside Tamkeen. مقرأة تمكين remains the parent group identity. User references establish Najdi tent warmth, red/black/ivory Sadu weaving, and natural Arabic typography. Avoid generic AI-styled dashboards and generic pan-Islamic decoration. Sacred text is content, never decoration. Reference photos guide material and detail but must not appear in the UI. The user requested intricate Najdi detail, glowing interactive orange lanterns and other restrained app animations, with no unnecessary promotional prose. The latest refinement explicitly replaces the light beige ground with darker red and asks for more welcoming, roomy spacing.

## Evidence on Hand
Existing public app and live server; four user-supplied tent, Sadu textile and majlis reference images. Do not invent scores, members, dates, quiz content or venue photographs.

## Product Principles
- Make the weekly review and quiz easy to reach.
- Honor the actual gathering and its Najdi setting.
- Give Arabic equal functionality and typographic care.
- Preserve the existing data and security model.

Latest refinement: Use separate hand-drawn pixel-art Sadu cushions (floor mattress, long backrest, square pillow and cylindrical armrest) around public screens, not a complete seating scene. Generated illustrations were rejected and are not shipped. Gentle decorative movement follows the shared pause, offscreen/hidden and reduced-motion rules. Preserve upstream 499c84f remembered-name/password tent door and password recovery; localize and style it consistently. User explicitly requested publishing the completed site.

Homework: show the current student’s saved entry alongside the group. Shared save failures retain a device copy for explicit retry; phone-only notes remain visible when shared storage returns. Default to the strictly next Sunday in device-local time, including on Sundays. A native date picker selects that date’s Sunday (or the following Sunday for another weekday), with previous/next week controls and a full localized date. Homework is stored separately by student and Sunday.

Qur’an integration: the user chose both a reading tab and a Homework picker. Fetch the 114-surah index and Arabic Uthmani text directly from Al Quran Cloud, preserving the returned text and diacritics. A selected range adds an explicit reference to the homework draft without removing existing notes or saving automatically. Explicit saved references open the reader; do not guess legacy free-text/page assignments. Use an attributed source, dedicated self-hosted Amiri Quran font, bounded requests, successful-response caching, readable errors and retry.
