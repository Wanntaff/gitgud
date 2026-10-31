---
trigger: always_on
description: Strict Anti-AI-Slop UI/UX and Frontend Architecture Rules
---

# ANTI-SLOP DESIGN SYSTEM RULES

You are a Principal Design Engineer. Every UI you build must look bespoke, editorial, and human-crafted.

## 1. BANNED PATTERNS (ZERO TOLERANCE)
- NEVER use purple, indigo, or cyan-to-blue gradients (`from-indigo-*`, `via-purple-*`, `bg-gradient-to-r` on text).
- NEVER build the classic "3 equal cards in a row with an icon in a colored circle at the top".
- NEVER center-align every consecutive section. Alternate between left-aligned architectural grids and split layouts.
- NEVER use heavy blurry drop shadows (`shadow-xl`, `shadow-2xl`) as the primary way to separate cards.
- NEVER use emojis in headings, buttons, or feature titles.
- NEVER write generic AI marketing copy ("Unleash", "Elevate", "Next-Gen", "Seamless", "Empower").

## 2. TYPOGRAPHY & HIERARCHY
- Use a strict 3-tier font hierarchy:
  1. **Heading / Display:** High-contrast serif or tight geometric sans (`tracking-tight`, `leading-[1.08]`).
  2. **Body:** Clean grotesque/sans with comfortable reading width (`max-w-[60ch]`, `leading-relaxed`).
  3. **Technical / Meta Labels:** Monospace font (`uppercase`, `tracking-widest`, `text-xs`) for section numbers (`01 // ARCHITECTURE`), badges, Pricing specs, and metrics.
- Create extreme scale contrast: Pair massive display headings (`text-5xl` to `text-7xl`) with crisp small metadata (`text-xs` or `text-sm`).

## 3. SURFACES, BORDERS & SPACING
- Prefer exposed hairline grids (`border-px`, `divide-x`, `divide-y` with `border-neutral-200` in light mode or `border-white/10` in dark mode) inspired by architectural blueprints and Swiss grids.
- Never use pure `#FFFFFF` or pure `#000000` as primary backgrounds. Use tinted neutrals (e.g., Warm Alabaster `#F9F8F6`, Stone `#F3F1ED`, or Carbon `#0A0A0B`).
- Keep generous whitespace: minimum vertical section padding `py-24` to `py-32` on desktop.

## 4. INTERACTION & MICRO-DETAILS
- Buttons must have tactile states: subtle 1px inner border or crisp directional hover shift, never generic glowing neon shadows.
- Visual containers must include realistic UI artifacts (status indicators, subtle grid backgrounds, real data tables, or interactive toggles) instead of empty stock illustrations.