# html-deck

A [Claude Code](https://claude.com/claude-code) skill for building **executive-grade HTML slide decks** — keyboard-driven, print-ready, re-skinnable to any brand, and deployable behind a password. No framework, no build step. You write one HTML file; a small web component does the rest.

**▶ Live demo:** [cla1redonald.github.io/claude-html-deck/demo](https://cla1redonald.github.io/claude-html-deck/demo/) — and that demo deck was built *with* this skill, so it doubles as a worked example.

![A Claude Code skill — presentations from one folder](https://img.shields.io/badge/Claude%20Code-skill-2A5A52) ![No build step](https://img.shields.io/badge/build_step-none-3FA68F)

---

## What it is

A deck is a single `index.html` plus three support files you copy in and never touch:

| File | Role | You edit it? |
|------|------|--------------|
| `index.html` | Your slides — one `<section>` each | ✅ this is the one you write |
| `deck-stage.js` | The `<deck-stage>` web component: keyboard nav, slide rail, toolbar, full-screen, print/PDF | ❌ copy verbatim |
| `deck.css` | The slide-type component library (11 layouts) | ❌ copy verbatim |
| `colors_and_type.css` | Design tokens — colour, type scale, spacing, shadows | ❌ re-skin via overrides, never by editing |
| `middleware.js` *(optional)* | Vercel Edge basic-auth gate — real server-side auth, works on the free Hobby plan | set USER/PASS |
| `vercel.json` *(optional)* | `noindex` + no-cache headers | as-is |

Open `index.html` in a browser — that's the entire runtime. Press <kbd>→</kbd>/<kbd>←</kbd> to move, <kbd>Home</kbd>/<kbd>End</kbd> to jump, and use the toolbar pill for full-screen, the slide rail, or print-to-PDF. Each slide deep-links via the URL hash (`#7`).

---

## Install

Clone (or copy) this repo into your Claude Code skills directory:

```bash
git clone https://github.com/cla1redonald/claude-html-deck.git ~/.claude/skills/html-deck
```

Claude Code discovers it automatically. Invoke it by typing **`/html-deck`** in a session.

> The repo *is* the skill folder: `SKILL.md` at the root, engine + worked example in `assets/`, and the explainer presentation in `demo/`.

---

## Using it

Type `/html-deck` and describe what you need. The skill runs a short workflow:

1. **Brief** — it confirms audience, slot length, brand palette (hex values, or a named palette), and whether you want it deployed or local-only.
2. **Scaffold** — creates a deck folder and copies the three support files in.
3. **Build `index.html`** — starts from the worked example, one `<section data-label>` per slide, using the existing slide-type classes.
4. **Smoke test** — serves the deck locally and renders every slide to check for overflow or clipping *before* calling it done.
5. **Deploy (optional)** — adds the password gate, pushes to Vercel, and verifies the live URL.

You can also just hand it raw content ("turn these notes into a 10-slide deck in our brand green") and let it drive.

---

## The slide-type library

Eleven layouts ship in `deck.css`, each a `<section>` with a class:

`cover` · `section divider` · `content` (+ cards, icon/bullet lists, two-column) · `statement / quote` · `framework model` · `90-day timeline` · `KPI grid` · `agenda` · `on-a-page` · `about-me`

The [demo deck](https://cla1redonald.github.io/claude-html-deck/demo/) is built entirely from these.

---

## Re-skinning to your brand

You never edit the CSS files. Instead, drop a `<style>` block after the stylesheet links and remap the design tokens:

```html
<link rel="stylesheet" href="colors_and_type.css">
<link rel="stylesheet" href="deck.css">
<style>
  :root {
    --accent:     #2A5A52;   /* buttons, rules, chart fills   */
    --accent-ink: #1C3F39;   /* darker accent for text        */
    --slide-bg:   #FAF6F1;   /* the canvas behind every slide */
    --surface:    #FFFCF6;   /* warm paper cards, not white   */
  }
</style>
```

Because charts are drawn as inline SVG with `var(--token)` fills, **they re-skin with the palette automatically** — no per-chart edits.

---

## Visual-first by default

Slides should not be word-heavy. The skill defaults to a diagram, chart, or icon-led layout and treats prose as the fallback. It carries a small **chart vocabulary**, all hand-drawn inline SVG so they stay crisp and on-palette:

- **Range / gap bars** for "X vs Y" comparisons
- **Trend curves** for trajectories (endpoint labels, no axes)
- **Funnels** for constraint / bottleneck stories
- **Horizontal bars** for rates across categories
- **Layer stacks** for hierarchies and maturity models

Icons come from an inline Lucide-style sprite — never emoji.

---

## Deploying behind a password

For a shareable link that isn't public, copy `middleware.js` and `vercel.json` into the deck folder, set `USER` / `PASS` in `middleware.js`, then:

```bash
vercel link --yes --project my-deck   # once
vercel deploy --prod --yes            # every update
```

`middleware.js` is an Edge basic-auth gate — server-side, so it's not view-source bypassable, and it works on the free Hobby plan. `vercel.json` adds `noindex` headers. Verify live: a no-auth request returns **401**, with-auth returns **200**.

> ⚠️ The bundled `middleware.js` ships with `CHANGE_ME` credential placeholders — set real ones before you deploy.

---

## Repo layout

```
claude-html-deck/
├── SKILL.md                  # the skill definition Claude Code reads
├── README.md
├── assets/
│   ├── deck-stage.js         # the web component (copy verbatim)
│   ├── deck.css              # slide-type library (copy verbatim)
│   ├── colors_and_type.css   # design tokens (re-skin via overrides)
│   ├── example-reskin.html   # 13-slide worked example
│   ├── middleware.js         # optional password gate
│   └── vercel.json           # optional deploy headers
└── demo/
    └── index.html            # the explainer deck (live demo) — built with the skill
```

---

## Notes & conventions

- **UK spelling, sentence case, no em-dashes in slide copy.** One idea per slide; any number carries its source.
- **Never edit `deck-stage.js` or the two CSS files** — all customisation is token overrides plus your slide HTML.
- Identity comes from a presenter lockup (name / role), not a client's trademarked logo.
- One typeface (Hanken Grotesk), restrained motion (a built-in rise/fade), no gradients on content slides.

---

## Credits

Built as a personal Claude Code skill and shared as a starting point. Use it, fork it, re-skin it. The engine and CSS are yours to copy into any deck.
