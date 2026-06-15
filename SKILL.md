---
name: html-deck
description: Build an executive-grade HTML slide deck (1280×720, keyboard-driven, print-ready) from any content, re-skinned to any brand palette, optionally deployed to Vercel behind a password. Use when asked for a presentation, slides, or a deck.
user-invocable: true
---

# HTML deck builder

Builds a presentation from a self-contained deck system. One folder: `index.html` + three support files. No build step, no framework. (A 13-slide worked example is included in `assets/example-reskin.html`.)

## Assets (in `assets/`, copy into the new deck folder)
- `deck-stage.js` — the `<deck-stage>` web component: keyboard nav (arrows/Home/End), URL hash per slide, slide rail, toolbar pill with **full-screen and rail-toggle buttons**, print/PDF support. Copy verbatim, never edit.
- `colors_and_type.css` — design tokens: colour, type scale (authored for a 1280×720 canvas), spacing, radii, shadows. Copy verbatim; re-skin via overrides (below), never by editing this file.
- `deck.css` — the slide-type component library: cover, section divider, content (+cards, blist/iconlist, cols-2), statement/quote, framework model, 90-day timeline, KPI grid, agenda, on-a-page, about-me. Copy verbatim.
- `example-reskin.html` — 13-slide worked example showing two key patterns: (a) the **palette-override pattern**, a `<style>` block after the CSS links that remaps the `--rm-*` brand tokens to a new palette (also used here to warm the card surfaces: `--surface: #FFFCF6`, never stark white); (b) the **inline-SVG chart pattern** — gap/range bar charts, a pipeline-constraint diagram, horizontal bar charts, trend curves, and a stacked-layer funnel, all drawn as inline `<svg class="chart" viewBox="...">` using `var(--token)` fills so they re-skin with the palette. Copy and adapt these.
- `middleware.js` — Vercel Edge basic-auth gate (works on Hobby plan, not view-source bypassable). Set USER/PASS per deck.
- `vercel.json` — noindex + must-revalidate headers.

## Workflow
1. **Brief.** Confirm: audience, duration (slide count ≈ minutes × 0.7 for talk-with-discussion; ×1 for pitch), brand palette (hex values or "use Roami river/cream": river `#2A5A52` family + cream `#FAF6F1`), deploy or local-only.
2. **Scaffold.** Create a `deck/` folder next to the source content; copy `deck-stage.js`, `deck.css`, `colors_and_type.css` in.
3. **Build `index.html`.** Start from the worked example (`example-reskin.html`). Keep: the icon sprite (Lucide-style inline SVG, never emoji), `<deck-stage width="1280" height="720">`, one `<section data-label>` per slide, the existing slide-type classes. Re-skin only via the token-override `<style>` block.
4. **Content rules** (house conventions): UK spelling, sentence case, **no em-dashes in slide copy** (commas/colons instead), one idea per slide, numbers carry sources, vendor-reported figures flagged as such. Dark `statement` slides for the opener and the close.
5. **Visual-first rule — slides must not be word-heavy.** Default to a diagram, chart, or icon-led layout; prose is the fallback, not the default. Targets: body text under ~40 words per slide; every list item gets a leading icon (sprite, never emoji); any quantitative claim that CAN be a chart SHOULD be a chart. Chart vocabulary (all inline SVG, token colours, worked examples in `example-reskin.html`): range/gap bar chart for "X vs Y" comparisons; pipeline/flow diagram with box sizes and arrow weights showing where a constraint sits; horizontal bar chart for rates across categories; simple trend curves for trajectories (no axes needed, just endpoint labels); stacked-layer funnel for hierarchies/maturity models. Warm theme is the default: cream slide bg + warm paper card surfaces (`--surface: #FFFCF6`), never `crisp`/white unless explicitly asked.
6. **Smoke test before done.** `python3 -m http.server 8742` in the deck folder (background), drive it with Playwright MCP (`http://localhost:8742`), screenshot the cover plus every dense slide, check for overflow/clipping. Kill the server after. A favicon 404 in console is expected noise.
7. **Deploy (if wanted).** Copy `middleware.js` (set fresh USER/PASS) + `vercel.json` into the deck folder. Then:
   `vercel link --yes --project <url-slug>` → `vercel deploy --prod --yes` (auto-aliases `<url-slug>.vercel.app`).
   Verify live: curl no-auth → 401, with-auth → 200, assets 200, `x-robots-tag` header present. Report URL + credentials.
8. **Record.** Note the live URL, credentials, and redeploy command wherever the project keeps its index/handoff.

## Design heuristics (learned from real feedback rounds — apply BEFORE they have to be said)
- **Every slide must pass the "what is this slide trying to say?" test.** If a reader could ask that (a reviewer did, of a questions-list slide), it's a content bug: add the consequence/so-what column that makes the purpose explicit (e.g. question list became "ASK THIS / WALK AWAY WHEN").
- **Study or survey claims → error-bar (CI) chart.** Plotting the famous numbers with their confidence intervals against a "no effect" line is the visual form of provenance. Wide CIs are the argument.
- **Constraint/flow stories → a literal funnel** (wide intake tapering through the constraint to a thin output), not boxes-and-arrows. Avoid decorative elements (queue dots etc.) near arrows; they collide at render.
- **Opposing-pairs content (myth/fact, before/after, claim/reality) → paired two-column rows** with a connecting arrow per row. Breaks up word-walls and makes the contrast structural.
- **Stat cards: icon ABOVE the label,** centred, in a tinted tile, not inline beside text.
- **Any chart showing change over time needs its timeframe** on the endpoints (dates/years), or it reads as decoration.
- **Every data series on a chart carries its named source on the slide** (author/study + year as the row sub-label), not just the standout one. A chart where only one row is attributed invites "and where are the others from?"
- **Diagram labels get the same accuracy bar as the prose.** "No change" is punchier than "single digits to ~20%, system-dependent" but overstates the evidence — and the presenter pays for it in the room. Label outputs with the honest range, never the dramatic zero.
- **A "fact" opposite a "myth" must be specific evidence,** not a verdict: what the cited source actually contains, the real number with its date, where the fake number traces to. "Not supported" is a verdict; "the cited whitepaper contains no such figure; failed 3-0 on source-check" is a fact.
- **Hierarchy/layer diagrams: put the real items (metrics, examples) IN the layers as pills,** and visually emphasise the layer that matters (dark fill + shadow on the payoff layer).
- **A slide of hard truths must end on agency.** Add a "THE SO WHAT" accent card: what to do about it. Never leave the room disheartened.
- **Discussion-question slides: questions must be concrete and self-contained** — a specific ask the reader can answer, not an abstract theme.
- **Expect a slide-by-slide feedback round after v1.** Present screenshots, take the notes, and fold any generalisable lesson back into this section.
- **Every "what" deck needs a "why" layer** — the mechanism slide (the technical reasoning behind the pattern) is what separates a briefing from expertise. But mechanisms drafted from first principles must be verified for published support BEFORE they ship, and labelled by evidence class (published research / practitioner-published / canonical theory applied by us). Plausible reasoning that isn't sourced is the exact failure the content usually warns about.

## Non-negotiables
- Never edit `deck-stage.js` or the two CSS files; all customisation is token overrides + slide HTML.
- Identity comes from the presenter lockup (name/role), not any client's trademarked logo or product UI.
- Restrained motion only (the built-in rise/fade). No gradients on content slides. One font (Hanken Grotesk; flag if the brand wants a paid face).
- Decks containing client or personal content stay out of git unless explicitly approved for commit.

## If invoked with no brief
Ask: what's the content source (file/notes), who's the audience, how long is the slot, what palette, deploy or local? Then build.
