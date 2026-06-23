# HANDOFF — claude-html-deck + showcase social cards

_Session: 2026-06-23_

## Session Summary

Took the personal `/html-deck` skill public and gave the whole GitHub showcase a consistent visual identity.

1. **Made the html-deck skill shareable.** Cleaned a copy of `~/.claude/skills/html-deck/`: removed the sensitive **Rightmove** example (`example-original.html`), genericised every "Claire" / "Rational Partners" reference in the kept Rational example, scrubbed live deploy credentials from `middleware.js` (now `CHANGE_ME`), and genericised SKILL.md + CSS comments. Original skill left untouched. A shareable `.zip` also sits at `~/Desktop/html-deck-shareable/`.
2. **Fixed a real layout bug** on the worked example's slide 11 ("The trajectory"): the title overlapped the chart cards because `.content-body` was vertically centred with over-tall content. Fixed in the example only (anchored to top + trimmed chart heights). Verified via headless-Chrome screenshot. **Claire's original deck was intentionally left unfixed, at her request.**
3. **Published `claude-html-deck`** (public): README, MIT LICENSE, SKILL.md, `assets/` (engine + worked example), and a `demo/` explainer deck **built with the skill it documents**. GitHub Pages live. All 11 demo slides smoke-tested for clipping.
4. **Social preview cards** for the whole showcase: a unified warm-turquoise system (1280×640) — html-deck plus all 6 pinned repos. Each committed to its repo at `assets/social-preview.png`; local copies + regenerable template in `~/code/showcase-social-cards/`.
5. **Repo topics** added across all 7 repos for discoverability.

## Current State

- **Repo:** `claude-html-deck`, branch `main`, clean working tree.
- **Last commit:** `3c5a67a Move social preview PNG to assets/ for easy access`.
- **Deploy:** GitHub Pages live + verified (demo + all `../assets/` return 200): https://cla1redonald.github.io/claude-html-deck/demo/
- **Tests/lint:** n/a (static HTML/CSS/JS, no build step).
- **All 7 repos** confirmed to have `assets/social-preview.png` committed and topics applied.
- **Email privacy note:** the first push was rejected by GitHub's email-privacy guard; commits are authored with the `71832440+cla1redonald@users.noreply.github.com` noreply address. Keep using it for this repo.

## Open Issues

- **⚠️ Social preview images NOT yet activated.** Committing the PNG to a repo does NOT set it as the GitHub social preview — that's a GUI-only step with no API/CLI. For each of the 7 repos: `Settings → Social preview → Edit → Upload an image`, pick the matching file from `~/code/showcase-social-cards/` (and `~/code/claude-html-deck/assets/social-preview.png` for html-deck). **This is the one outstanding manual task.**
- **html-deck not pinned** to the GitHub profile yet (the 6 carded repos are; html-deck is new). Pin it if you want it in the showcase.
- No known bugs introduced. The `--rm-*` CSS token prefix remains in the engine (documented override pattern); left as-is intentionally.

## Resume Prompt

```
Resuming the GitHub showcase polish (see ~/code/claude-html-deck/HANDOFF.md).
Everything is built, committed, and pushed; topics + social-preview PNGs are in all
7 repos. The ONLY outstanding task is activating the social preview images via each
repo's Settings → Social preview (GUI-only). Local cards are in
~/code/showcase-social-cards/. Help me either (a) walk through the 7 uploads, or
(b) drive them via the Chrome MCP. Also: decide whether to pin claude-html-deck to
the profile. Note: this repo commits use the noreply email
71832440+cla1redonald@users.noreply.github.com.
```
