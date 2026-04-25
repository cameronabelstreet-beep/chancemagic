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
- **Styling:** **Tailwind CSS** is allowed, configured in [site/tailwind.config.ts](site/tailwind.config.ts) so `theme.colors` exposes **only** the Mystic Chrome tokens. Off-system color values are mechanically uncallable through Tailwind utilities — never reach for arbitrary hex or named colors. CSS custom properties on `:root` in [site/app/globals.css](site/app/globals.css) mirror the palette for non-Tailwind contexts (inline styles, SVG filters).

### Directory conventions

```
/site/                 → Next.js project (app/, components/, lib/, hooks/, public/)
/site/public/images/   → web-served imagery (mirror of /assets/images, web-friendly slugs)
/assets/images/        → original imagery source (reference before adding any <img>)
/references/animations → motion references (reference before writing any animation)
```

---

## 2. Design System — **Mystic Chrome**

### 2.1 Color tokens (exact — do not alter)

```yaml
colors:
  surface: '#131411'
  surface-dim: '#131411'
  surface-bright: '#3a3936'
  surface-container-lowest: '#0e0e0c'
  surface-container-low: '#1c1c19'
  surface-container: '#20201d'
  surface-container-high: '#2a2a27'
  surface-container-highest: '#353532'
  on-surface: '#e5e2dd'
  on-surface-variant: '#c4c7c7'
  outline: '#8e9192'
  outline-variant: '#444748'
  primary: '#c9c6c5'
  on-primary: '#313030'
  tertiary: '#ff8a82'
  on-tertiary: '#5a0005'
  tertiary-container: '#1a0001'
  on-tertiary-container: '#c9252d'
  background: '#131411'
  on-background: '#e5e2dd'
```

Expose these as CSS custom properties (`--surface`, `--on-surface`, etc.) on `:root`. Never hardcode hex values in component styles — always reference the token.

### 2.2 Semantic roles

| Role                 | Token                       | Usage                                                    |
| -------------------- | --------------------------- | -------------------------------------------------------- |
| Page background      | `--background` `#131411`    | Global canvas                                            |
| Card background      | `--surface-container-low`   | Elevated containers (`#1c1c19`-ish, see layering rule)   |
| Body text            | `--on-surface` `#e5e2dd`    | Off-white. **Never pure white.**                         |
| Muted text / labels  | `--on-surface-variant`      | Secondary copy                                           |
| Structural silver    | `--primary` `#c9c6c5`       | Borders, dividers, hairlines, secondary button outlines  |
| Crimson "revelation" | `--on-tertiary-container` `#c9252d` | Primary CTAs + rare accent moments **only** — saturated playing-card crimson |
| Crimson container    | `--tertiary-container` `#1a0001` | Deep crimson for subtle glows / backgrounds          |

### 2.3 Typography

**Noto Serif** — Display & Headlines
- `display`: 72px / weight 700
- `headline-xl`: 48px / weight 600
- `headline-lg`: 32px / weight 500

**Manrope** — Body & Labels
- `body-lg`: 18px / weight 400
- `body-md`: 16px / weight 400
- `label-sm`: 12px / weight 600 / `text-transform: uppercase` / tracked

Load both via `@font-face` or `<link>` with `display=swap`. Set `font-feature-settings` for ligatures on Noto Serif.

---

## 3. Aesthetic Rules — **Enforce Strictly**

### Philosophy
**"The Prestige."** Hushed anticipation. The user is in the front row of an elite private performance. Every surface whispers, nothing shouts.

### Style
**Minimalist-Tactile.** Dark space over whitespace. No clutter. Every element earns its place.

### Hard constraints — **never violate**

1. **No gold.** Ever.
2. **No gradients** except approved tonal layers (surface → surface-container steps).
3. **No pure white** (`#ffffff`) on any surface. Use `--on-surface` (`#e5e2dd`).
4. **No drop shadows** for depth. Use tonal layering instead:
   - Base: `#0a0a0a` / `--surface-container-lowest`
   - Cards: `#141414` / `--surface-container-low` with **1px silver border at 20% opacity** (`rgba(201,198,197,0.2)`)
   - Crimson glow: `box-shadow: 0 0 40px rgba(201,37,45,0.18)` — **only** behind primary buttons
5. **Crimson is used sparingly** — primary CTAs and "revelation" moments only. If you find yourself using crimson more than twice per viewport, stop and reconsider.
6. **Silver** (`#c9c6c5`) handles all structural and interactive affordances: borders, dividers, focus rings, secondary outlines.

### Depth & surfaces
- Depth comes from **tonal layering**, never shadows.
- Glassmorphism is reserved for the nav: `backdrop-filter: blur(16px)` over a dark translucent veil (`rgba(19,20,17,0.7)` or similar).

### Geometry
- **Border radius:** `8px` for buttons and inputs, `16px` for cards. Circles only for avatars and FABs. No other radii.
- **Spacing:** 4px baseline grid. `64px` safe margins on desktop. XL gaps between sections (96–128px).

### Dividers
Atmospheric only. Centered 1px silver line that fades to transparent on both ends:
```css
background: linear-gradient(90deg, transparent, var(--primary), transparent);
opacity: 0.3;
```

---

## 4. Component Rules

### Primary button
- Fill: crimson (`--on-tertiary-container`)
- Text: off-white (`--on-surface`)
- Radius: `8px`
- Aura: subtle crimson glow (`box-shadow: 0 0 40px rgba(201,37,45,0.18)`)
- Hover: slight brighten + glow intensifies to `0.15` opacity

### Secondary button
- Fill: transparent
- Border: **1px silver** (`--primary`)
- Text: off-white
- Radius: `8px`
- Hover: border thickens to **2px** silver (no color change, no glow)

### Cards
- Background: `#141414` (`--surface-container-low`)
- Border: **1px silver at 20% opacity**
- Radius: `16px`
- Headlines inside cards: Noto Serif
- Images: desaturated (`filter: saturate(0.7)` baseline — tune per asset)

### Inputs
- No box border. **Silver bottom border only** (1px).
- Focus: border switches to crimson with faint glow (`0 0 8px rgba(201,37,45,0.28)`).
- Placeholder text: `--on-surface-variant`.

### Navigation
- Glass: `backdrop-filter: blur(16px)`, dark translucent background.
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
| Tonal layering for depth                          | `box-shadow` for elevation                      |
| Off-white (`#e5e2dd`) for body text               | Pure white (`#ffffff`)                          |
| Crimson for primary CTA only                      | Crimson for links, borders, or accents          |
| 8px (buttons/inputs) / 16px (cards) radii         | 4px, 12px, 20px, or any other radius            |
| Verify each section via screenshot before moving on | Scaffold all sections then style at the end   |
| Reference `/references/animations` before motion  | Invent easing curves or motion patterns         |
| Reference `/assets/images` before imagery         | Generate or download new images unprompted      |

---

## 7. When in Doubt

- If a design decision isn't covered here, **ask the user** before inventing. The Mystic Chrome system is tight on purpose.
- If the user asks for something that contradicts a rule in this file, **surface the conflict** ("This breaks the 'no gradients' rule — confirm you want this?") before implementing.
- Keep this file current. If a new rule is decided in-session, update this document before ending the session.
