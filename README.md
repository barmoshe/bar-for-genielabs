# bar-for-genielabs

An ad-hoc, personalized job-application page Bar Moshe built for the **Full Stack
Engineer** role at **GenieLabs** (Tel Aviv), in GenieLabs' real visual language,
read live off genielabs.tech: a gray-gradient hero with giant Big Shoulders
weight-800 uppercase type, DM Sans body, hot pink (#FF1C74) pill CTAs with a soft
glow, a pastel-clouds band carrying their signature white pill tab bar, a flat
pink band, a pink-to-lime close, and a cream footer.

The signature section reframes GenieLabs' "content calendar" motif: their pill
tab bar (AI Agents / Dev Tools / Pipelines / Full Stack / Creative) over
asset-style cards, holding Bar's live-linked work instead of game assets.

The page presents Bar as a marketing site for himself: a full-stack engineer
whose portfolio center is AI creative tooling (MIDI Agent, Biome Synth, MDP on
npm with an MCP server), with Temporal pipelines on Code Exchange and a day job
inside a cloud video editor. The site serves a dedicated CV PDF that carries the
deployed link, since LinkedIn Easy Apply only accepts a file.

Not affiliated with GenieLabs. `robots: noindex` — a private, shareable link.
Standalone sibling repo matching the `bar-for-*` application-site pattern.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Plain CSS (scoped under `.gl-root`) + GSAP (ScrollTrigger, reveals only)
- `next/og` share card (`app/opengraph-image.tsx`)
- Motion is CSS + SVG, gated on `prefers-reduced-motion`; legible with no JS

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint    # eslint (jsx-a11y gate)
```
