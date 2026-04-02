# About Us Page — Implementation Plan

## Overview
Build a dedicated `/about` page matching the Figma design. The page features:
1. A full-width "ABOUT US" hero banner with blurred aurora/gradient background
2. A split section: binary matrix rain (left) + team intro text (right)
3. Four alternating team-member cards (text ↔ photo)

The project is **Next.js (App Router)** with **Tailwind CSS v4** and custom CSS classes in `globals.css`. Font: Plus Jakarta Sans. Design language: dark (`#0f0f0f` bg), `--seminar-blue: #215d99`, white text.

---

## File Structure

### New page
```
FinalProject/digitaltwin/app/about/page.tsx
```
Renders `Navbar` + the three About sections using the shared layout.

### New components (in `components/about/`)
| File | Purpose |
|---|---|
| `about-hero.tsx` | "ABOUT US" banner with blurred aurora bg image |
| `binary-matrix.tsx` | Canvas-based binary rain animation (client component) |
| `team-intro.tsx` | Split row: BinaryMatrix left + heading/description right |
| `member-card.tsx` | Reusable alternating card (name, role, desc, meet button, photo) |
| `members-section.tsx` | Renders the full list of member cards |

### CSS additions in `globals.css`
New classes:
- `.about-hero` — full-width section with bg image + blur overlay + centered text
- `.about-hero-title` — large "ABOUT US" display text
- `.about-split-panel` — 50/50 grid used by team-intro
- `.member-card` — the alternating photo/text card shell
- `.member-card-photo` — photo pane styles
- `.member-card-body` — text pane styles
- `.meet-btn` — "Meet X ↓" pill button (reuses `.outline-pill` base)

---

## Component Details

### `about-hero.tsx`
- Full-width `<section>` with dark bg
- Left half: `background: #215d99` (blue), overlaid with blurred aurora image (`/api/...` from Figma) using `backdrop-filter: blur`
- Right half: black
- Centered over both: "ABOUT US" heading in white, bold, large clamp font
- Responsive: collapses to single stacked block on mobile

### `binary-matrix.tsx`
- `"use client"` component
- Uses `useRef` + `useEffect` to draw on a `<canvas>`
- Renders falling `0`/`1` characters in a blue-tinted monospace font
- Fills entire parent container via `width: 100%; height: 100%`
- Stops/restarts animation with `ResizeObserver` cleanup

### `team-intro.tsx`
- Two-column grid on desktop, stacked on mobile
- Left: `<BinaryMatrix />` inside a fixed-height container
- Right: text block  
  - "Our Most" (white, 2xl)  
  - "Experienced Developer" (blue `#0072CD`, bold, 3xl)  
  - "Team Member" (white, 2xl)  
  - Body paragraph (white/72, sm)

### `member-card.tsx`
Props: `name`, `role`, `description`, `imageSrc`, `meetLabel`, `reversed?: boolean`
- Full-width, 50/50 grid
- Text pane: dark bg (`#0f0f0f`), vertically centered content, name (2xl bold), role (italic muted), desc (sm), meet-btn at bottom
- Photo pane: image fills `object-cover`
- `reversed` flips column order (CSS `order` property)
- "Meet X" button: small pill with label + chevron-down icon (SVG inline)

### `members-section.tsx`
- Iterates over `MEMBERS` data array
- Each item passes `reversed={index % 2 !== 0}` to `MemberCard`
- Members data:
  1. Châu Gia Anh — Leader / Fullstack & Designer — `/team_members/cga.png`
  2. Đào Thị Thanh Tâm — Member / Business Analyst & Tester — `/team_members/mun.jpeg`
  3. Dương Lê Khánh — Member / Fullstack — `/team_members/khanh.jpeg`
  4. Phan Thành Đại — Member / AI Engineer — `/team_members/D.jpeg`

---

## Navbar update
Change `href: "#about"` → `href: "/about"` (or keep both; `#about` stays for homepage scroll, add `/about` as separate link label). **Decision**: Keep navbar as-is on the homepage. The `/about` page reuses the `Navbar` component unchanged — the "About" link will still point to `#about` (homepage), which is acceptable for now.

---

## Responsive Behaviour
- **Mobile (< 640px)**: Hero stacks vertically; team-intro stacks (matrix on top, text below); member cards stack (photo top, text below regardless of `reversed`)
- **Tablet (640–1023px)**: Same stacking; binary matrix shown at reduced height
- **Desktop (≥ 1024px)**: Full 50/50 side-by-side layouts

---

## CSS Strategy
- All new semantic classes added to `globals.css` (matching existing naming convention)
- No inline styles in component code
- Reuse: `section-shell`, `outline-pill`, `section-copy`, `section-kicker`, CSS variables

---

## Implementation Order
1. Add CSS classes to `globals.css`
2. Create `binary-matrix.tsx`
3. Create `about-hero.tsx`
4. Create `team-intro.tsx`
5. Create `member-card.tsx`
6. Create `members-section.tsx`
7. Create `app/about/page.tsx`
