# Northstar Technology — website

Marketing site built from `../Northstar Technologies design language/design_handoff_northstar_website/`.

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript. Every route is
statically prerendered.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Routes

| Route       | Source design file      |
| ----------- | ----------------------- |
| `/`         | `Home.dc.html`          |
| `/products` | `Products.dc.html`      |
| `/company`  | `Company.dc.html`       |
| `/press`    | `Press.dc.html`         |
| `/contact`  | `Contact.dc.html`       |
| `/brand`    | `LogoAndMotion.dc.html` |

`/brand` is an internal reference page — it's linked only from the footer and is
marked `noindex`.

## One decision worth flagging to the design owner

The handoff notes that Products / Company / Contact / Press were an earlier
**dark-theme** iteration, superseded by Home's light "lattice" theme, and
recommends rebuilding them before shipping. **That is what's built here** — all
four use Home's `#eeede9` page, white cards, card radii, and spacing, with copy
and structure carried over unchanged. The dark palette survives only where the
design still calls for it: the Home mission panel, the "on dark" lockups, and
the progressive-reveal demo on `/brand`.

If the dark theme was meant to stay on those four pages, that's a palette swap
in `globals.css` plus per-page class changes — the structure doesn't move.

## Design tokens

Defined once in `src/app/globals.css`:

- `@theme` — colors (`page` `surface` `well` `ink` `accent` `accent-soft`),
  radii, shadows. Available as Tailwind utilities: `bg-page`, `text-ink/55`,
  `shadow-card`, `rounded-panel`.
- `@theme inline` — the three font families. **Must** be `inline`: the
  `next/font` variables live on `<body>`, so a non-inline `@theme` would try to
  resolve them at `:root` and drop the declaration.
- Plain `:root` — `--ease-house` and `--shadow-card-hover`. These are only read
  by hand-written CSS, and Tailwind tree-shakes `@theme` variables it can't see
  used by a utility.

Motion (entrance stagger, card lift, arrow slide, orbital drift, line draw) is
CSS-only and lives in the same file, wrapped by a `prefers-reduced-motion` guard.
Stagger delays are passed per element via `--fu-delay`.

## Images

There is no photography yet. Every slot renders `<ImageSlot>`, a muted
placeholder well carrying the slot's intent. Pass `src` to swap in a real asset —
the placeholder disappears and `next/image` takes over:

```tsx
<ImageSlot src="/hero.png" alt="FOLIO" style={{ height: 440 }} />
```

Slots to fill: hero (440px), supporting image on Home (340px), six product cards
(150px), Company team photo (16:7), and the five press wordmarks in the "as
featured in" row (currently set as text). Product images can be wired centrally
via the `image` field in `src/lib/content.ts`.

## Structure

```
src/
  app/            one directory per route
  components/     nav-bar, site-footer, star-mark, mission-panel, image-slot, arrow
  lib/content.ts  all copy and product data
```

`StarMark` / `StarMarkAnimated` take `size`, `color`, `ring`; the animated one
also takes `animate`. Both keep the 48×48 viewBox and the 4.6 / 2.4 / 1.5 radii
from the brand spec.
