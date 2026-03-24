# ClearTalk Architecture

How the app is built. Start with the [README](../README.md) for what it does.

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Preact + wouter | ~6KB combined, React-compatible |
| Build | Vite + TypeScript (strict) | Zero `any` types across the codebase |
| Storage | Dexie.js (IndexedDB) | All data stays on device, no backend |
| PWA | vite-plugin-pwa | Works offline, installable |
| CSS | Vanilla custom properties | Design tokens, no framework |
| Host | Cloudflare Pages | Static SPA, edge-served |

Three runtime dependencies. Everything else is dev tooling.

## Structure

Code lives in `src/` across six directories: `routes/` (pages), `components/` (UI), `engine/` (logic), `data/` (content), `db/` (storage), `lib/` (utilities), `styles/` (CSS tokens + components).

The engine layer is pure functions with no UI - see `src/engine/` for scoring, typing, coaching card loading, and pattern analysis.

## Key Decisions

**Coach-first.** Users get coaching value in under 2 minutes. The self-assessment is opt-in - it personalizes two card sections. Everything else works without it.

**Lazy coaching cards.** Each situation file loads only when selected. The main bundle never includes coaching content.

**Insight pages are standalone.** `/insight/:pair/:situation` renders outside the app shell - shareable, pre-rendered at build time for social previews.

**No backend.** IndexedDB for everything. No accounts, no tracking.

## Data Model

Four tables: `User` (single default), `Assessment` (all attempts), `Contact` (people you communicate with), `JournalEntry` (conversation outcomes). See `src/db/schema.ts`.

## Content

80 coaching cards across 5 situations and 16 style pairs. 24 assessment questions, 8 observation questions, 4 style profiles. All in `src/data/`.

## Design

Tokens in `styles/tokens.css`. Four style colors (Drive, Influence, Steady, Clarity) with base, subtle, and text variants. Dark mode via system preference + manual toggle. Fraunces (display) and Source Sans 3 (UI) fonts, self-hosted.

## Testing

```
npm run check   - lint + test + build
npm run e2e     - build + playwright (chromium + webkit)
```

80 unit tests, 254 e2e tests, axe-core WCAG 2.1 AA scans, Lighthouse 99/100/100/100.
