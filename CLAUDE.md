# Ray Chance — chancemagic.com Redesign

> **Project Bible.** This file is the source of truth for every Claude Code session on this project. Read it first. Follow it strictly. Do not deviate from the design system, aesthetic rules, or workflow rules without explicit user approval.

---

## 1. Project Overview

- **Client:** Ray Chance (professional magician)
- **Project:** Full visual redesign of [chancemagic.com](https://chancemagic.com)
- **Content source of truth:** chancemagic.com — copy is fixed, only design changes
- **Inspiration reference:** [themagicianonline.com](https://themagicianonline.com)
- **Working directory:** `c:\Users\camer\Desktop\AthleteOS\Web Design\Ray magic`

### Stack

- **Languages:** TypeScript, CSS
- **Framework:** **Next.js** (App Router) — required because the animation references depend on React + Framer Motion (`motion/react`) and GSAP. Source lives in [/site](site/).
- **Styling:** **Tailwind CSS** is allowed, configured in [site/tailwind.config.ts](site/tailwind.config.ts) so `theme.colors` exposes **only** the Navy Prestige tokens. Off-system color values are mechanically uncallable through Tailwind utilities — never reach for arbitrary hex or named colors. CSS custom properties on `:root` in [site/app/globals.css](site/app/globals.css) mirror the palette for non-Tailwind contexts (inline styles, SVG filters).

### Directory conventions

```
/site/                 → Next.js project (app/, components/, lib/, hooks/, public/)
/site/public/images/   → web-served imagery (mirror of /assets/images, web-friendly slugs)
/assets/images/        → original imagery source (reference before adding any <img>)
/references/animations → motion references (reference before writing any animation)
```

---

## 2. Design System — **Navy Prestige**

### 2.1 Color tokens (exact — do not alter)

```yaml
colors:
  background:    '#050B1E'
  surface:       '#193060'
  surface-mid:   '#315381'
  accent:        '#859FC0'
  accent-light:  '#CEE0F4'
  on-background: '#CEE0F4'
  on-surface:    '#859FC0'
  glow:          '#859FC0'
```

Expose these as CSS custom properties (`--background`, `--surface`, `--surface-mid`, `--accent`, `--accent-light`, `--on-background`, `--on-surface`, `--glow`) on `:root`. Never hardcode hex values in component styles — always reference the token.

### 2.2 Semantic roles

| Role                  | Token                       | Usage                                                       |
| --------------------- | --------------------------- | ----------------------------------------------------------- |
| Page background       | `--background` `#050B1E`    | Global canvas — deep navy                                   |
| Card / surface fill   | `--surface` `#193060`       | Elevated containers (cards, panels)                         |
| Structural mid        | `--surface-mid` `#315381`   | Card borders, dividers, primary button fill                 |
| Accent / interactive  | `--accent` `#859FC0`        | Secondary outlines, focus glow, atmospheric highlights      |
| Brightest text        | `--on-background` `#CEE0F4` | Hero titles, button labels, primary copy                    |
| Muted text / labels   | `--on-surface` `#859FC0`    | Taglines, nav links, secondary copy                         |
| Glow                  | `--glow` `#859FC0`          | Used inside `rgba(133, 159, 192, …)` for shadows/glows      |

### 2.3 Typography

**Boldonse** — Display & Headlines (replaces all prior serif usage)
- Loaded via `@font-face` from [site/public/fonts/Boldonse-Regular.ttf](site/public/fonts/Boldonse-Regular.ttf) (OFL license preserved alongside)
- **Single weight: 400.** Do not specify `font-weight`, `font-bold`, `font-semibold`, etc. — there is no other weight available
- **Always all-caps.** Apply `text-transform: uppercase` (or write the source already uppercase)
- **Letter-spacing: -0.02em** — tight tracking is part of the brand
- Tailwind class: `font-display`. The class itself auto-applies uppercase + tracking via [site/app/globals.css](site/app/globals.css), so `<h1 className="font-display text-display">RAY CHANCE</h1>` is sufficient
- Sizes:
  - `text-display`: 72px / line-height 1.05
  - `text-headline-xl`: 48px / line-height 1.1
  - `text-headline-lg`: 32px / line-height 1.15
- **Do not** use for body copy, navigation links, or anywhere readability matters at small sizes — Boldonse is a display face

**Manrope** — Body & Labels
- `body-lg`: 18px / weight 400
- `body-md`: 16px / weight 400
- `label-sm`: 12px / weight 600 / `text-transform: uppercase` / tracked
- Tailwind class: `font-sans`

Manrope loads via `next/font/google` with `display: swap` in [site/app/layout.tsx](site/app/layout.tsx). Boldonse loads via `@font-face` in [site/app/globals.css](site/app/globals.css).

---

## 3. Aesthetic Rules — **Enforce Strictly**

### Philosophy
**"The Prestige."** Hushed anticipation. The user is in the front row of an elite private performance. Every surface whispers, nothing shouts.

### Style
**Minimalist-Tactile.** Dark space over whitespace. No clutter. Every element earns its place.

### Hard constraints — **never violate**

1. **No gold.** Ever.
2. **No gradients** except approved tonal layers (background → surface → surface-mid steps) and the spotlight/atmospheric radial gradients defined below.
3. **No pure white** (`#ffffff`) on any surface. Use `--on-background` (`#CEE0F4`).
4. **No drop shadows** for depth. Use tonal layering instead:
   - Base: `--background` (`#050B1E`)
   - Cards: `--surface` (`#193060`) with **1px `--surface-mid` border** (`#315381`)
   - Accent glow: `box-shadow: 0 0 40px rgba(133, 159, 192, 0.12)` — **only** behind primary buttons
5. **Accent (`#859FC0`)** carries every interactive affordance: focus rings, secondary outlines, atmospheric highlights. **Surface-mid (`#315381`)** carries every structural affordance: card borders, dividers, primary button fill.
6. **Pale blue (`--on-background` `#CEE0F4`)** is the brightest text only — used for hero titles, button labels, and primary headlines. Body and secondary copy uses **polo blue (`--on-surface` `#859FC0`)**.

### Depth & surfaces
- Depth comes from **tonal layering**, never shadows.
- Glassmorphism is reserved for the nav: `backdrop-filter: blur(16px)` over a navy translucent veil — `background: rgba(5, 11, 30, 0.75)` with a `1px solid var(--surface-mid)` bottom border.

### Hero spotlight
The atmospheric halo behind the focal subject:
```css
background: radial-gradient(
  ellipse at 50% 60%,
  rgba(133, 159, 192, 0.18) 0%,
  transparent 70%
);
```

### Geometry
- **Border radius:** `8px` for buttons and inputs, `16px` for cards. Circles only for avatars and FABs. No other radii.
- **Spacing:** 4px baseline grid. `64px` safe margins on desktop. XL gaps between sections (96–128px).

### Dividers
Atmospheric only. Centered 1px `--surface-mid` line fading to transparent on both ends:
```css
background: linear-gradient(90deg, transparent, var(--surface-mid), transparent);
```

---

## 4. Component Rules

### Primary button
- Fill: `--surface-mid` (`#315381`)
- Text: `--on-background` (`#CEE0F4`)
- Radius: `8px`
- Aura: subtle accent glow (`box-shadow: 0 0 40px rgba(133, 159, 192, 0.12)`)
- Hover: fill darkens to `--surface` (`#193060`), 1px `--accent` border appears, glow intensifies

### Secondary button
- Fill: transparent
- Border: **1px `--accent`** (`#859FC0`)
- Text: `--on-background` (`#CEE0F4`)
- Radius: `8px`
- Hover: border thickens to **2px** `--accent` (no fill change, no glow)

### Cards
- Background: `--surface` (`#193060`)
- Border: **1px `--surface-mid`** (`#315381`)
- Radius: `16px`
- Headlines inside cards: Boldonse (`font-display`)
- Images: desaturated (`filter: saturate(0.7)` baseline — tune per asset)

### Inputs
- No box border. **`--accent` bottom border only** (1px).
- Focus: border thickens / brightens with faint polo blue glow (`box-shadow: 0 0 8px rgba(133, 159, 192, 0.28)`).
- Placeholder text: `--on-surface` (`#859FC0`).

### Navigation
- Glass: `backdrop-filter: blur(16px)`, `background: rgba(5, 11, 30, 0.75)`, `border-bottom: 1px solid var(--surface-mid)`.
- Fixed top, transparent over hero, solidifies on scroll.

---

## 5. Workflow Rules — **Non-Negotiable**

1. **Build one section at a time.** Do not scaffold the whole site, then style. Finish the hero before touching the next section.
2. **Do not move to the next section until the current one is verified via screenshot.** Pause and surface the work to the user for approval before continuing.
3. **Animations:** Always reference `/references/animations` first. **Do not invent new animations.** If a needed motion isn't in the reference folder, stop and ask.
4. **Imagery:** Always pull from `/assets/images`. Do not fetch or generate new imagery without explicit approval.
5. **Copy:** Content source of truth is [chancemagic.com](https://chancemagic.com). Do not rewrite, paraphrase, or "improve" copy. Design only.
6. **Inspiration:** [themagicianonline.com](https://themagicianonline.com) is a reference, not a template. Don't copy structure wholesale — extract the mood.

---

## 6. Do / Don't Quick Reference

| ✅ Do                                              | ❌ Don't                                        |
| ------------------------------------------------- | ----------------------------------------------- |
| Use CSS custom properties for every color         | Hardcode hex values in component styles         |
| Tonal layering for depth (background → surface → surface-mid) | `box-shadow` for elevation              |
| Pale blue (`#CEE0F4`) for headline / button text  | Pure white (`#ffffff`) anywhere                 |
| Polo blue (`#859FC0`) for body / muted copy       | Mixing pale blue and polo blue at the same hierarchy level |
| Boldonse (`font-display`) for all headlines, all-caps, no font-weight | `font-bold`, `font-semibold`, or any weight class on Boldonse |
| Surface-mid (`#315381`) for borders + dividers    | Borders in any other color                      |
| 8px (buttons/inputs) / 16px (cards) radii         | 4px, 12px, 20px, or any other radius            |
| Verify each section via screenshot before moving on | Scaffold all sections then style at the end   |
| Reference `/references/animations` before motion  | Invent easing curves or motion patterns         |
| Reference `/assets/images` before imagery         | Generate or download new images unprompted      |

---

## 7. When in Doubt

- If a design decision isn't covered here, **ask the user** before inventing. The Navy Prestige system is tight on purpose.
- If the user asks for something that contradicts a rule in this file, **surface the conflict** ("This breaks the 'no gradients' rule — confirm you want this?") before implementing.
- Keep this file current. If a new rule is decided in-session, update this document before ending the session.
