# ClearTalk Architecture

Developer context for the ClearTalk codebase. Read the [README](../README.md) first for what the app does.

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Preact (~4KB) | Lightweight React-compatible; keeps bundle under 62KB gzip |
| Router | wouter (~2KB) | Minimal, hook-based, history API |
| Build | Vite + TypeScript (strict mode) | Fast HMR, tree-shaking, zero `any` types |
| Storage | Dexie.js (IndexedDB) | Typed queries, schema versioning, transaction support |
| PWA | vite-plugin-pwa (Workbox) | Precaching, offline fallback, auto-update |
| CSS | Vanilla CSS custom properties | No framework, design tokens in `tokens.css` |
| Host | Cloudflare Pages | Static SPA, edge-served, free tier |

Three runtime dependencies. Everything else is devDependencies.

## Project Structure

```
src/
  app.tsx              - Router, insight route outside Layout
  main.tsx             - Entry, ErrorBoundary, theme restore
  routes/              - Page components
    coach.tsx          - Main coaching flow (3-step wizard)
    people.tsx         - Contact list
    person.tsx         - Contact detail + quick coach
    log.tsx            - Journal entry form + history
    profile.tsx        - Assessment, insights, settings
    insight.tsx        - Public shareable coaching cards
  components/          - Reusable UI
    layout.tsx         - App shell with tab bar
    coaching-card.tsx  - Card renderer (universal + gated sections)
    quick-tag.tsx      - 8-question contact wizard with confirmation
    assessment.tsx     - 24-question self-assessment
    disc-wheel.tsx     - SVG visualization of communication style
    outcome-input.tsx  - 1-5 outcome scale
    error-boundary.tsx - Storage-aware error handling
    logo.tsx           - DISC motif SVG
  engine/              - Pure business logic (no UI, fully tested)
    types.ts           - All TypeScript types + label constants
    assessment.ts      - Score 24-question assessment to profile
    typing.ts          - Score 8-observation quick-tag to profile
    coaching.ts        - Lazy-load coaching cards with cache
    insights.ts        - Pattern analysis from journal entries
  data/                - Static content
    questions.ts       - 24 forced-choice assessment questions
    observations.ts    - 8 behavioral observation questions
    type-profiles.ts   - 4 type descriptions (strengths, blind spots, stress, growth)
    coaching-cards/    - 5 lazy-loaded files, 16 cards each (80 total)
  db/                  - Data layer
    schema.ts          - Dexie schema, single version, compound indices
    queries.ts         - Typed CRUD operations, cascade deletes
  lib/                 - Utilities
    transitions.ts     - View transitions with focus management
    storage.ts         - Export, import, clear all data
    install-prompt.ts  - PWA beforeinstallprompt handling
    sanitize.ts        - Input sanitization (names, notes)
    format.ts          - Relative date formatting
    parse-pair.ts      - URL pair parsing for insight routes
    id.ts              - ID generation
  styles/
    tokens.css         - Design tokens (colors, spacing, typography, dark mode)
    base.css           - Reset, fonts, scrollbar, focus indicators
    components.css     - All component styles
    utilities.css      - Helpers (sr-only)
```

## Key Architecture Decisions

### Coach-first, not assess-first
Users get coaching value in under 2 minutes. The self-assessment is opt-in depth that personalizes two sections (openers and pitfalls). Everything else works immediately.

### Coaching cards lazy-load
Each situation file (~8KB gzip) loads via dynamic `import()` only when selected. A `Map<SituationType, CardMap>` cache prevents redundant loads. Main bundle stays ~62KB gzip.

### Universal vs gated card sections
Pre-assessment users see: approach, reaction, recovery, body language. Post-assessment users also see: openers (tailored to their style) and pitfalls. Gated sections show a hint explaining why the assessment unlocks them.

### Insight route outside Layout
`/insight/:pair/:situation` renders without the tab bar. It's a public shareable page with its own branding and CTA. Pre-rendered at build time (80 HTML files) for social sharing meta tags.

### All data in IndexedDB
No backend, no accounts. Single `default` user ID. Dexie transactions for cascade deletes. ErrorBoundary detects storage failures (private browsing) with specific messaging.

## Data Model

```
User           1 default user, discProfile nullable (coach-first)
Assessment     All attempts stored, latest displayed
Contact        People the user communicates with, profile + confidence
JournalEntry   Outcome 1-5 per conversation, tied to contact + situation
```

Compound indices: `[userId+contactId]`, `[userId+loggedAt]`, `[userId+contactId+loggedAt]` for efficient queries.

`deleteContact` cascades to journal entries in a Dexie transaction.

## Content Engine

| Content | Count | Source | Notes |
|---------|-------|--------|-------|
| Assessment questions | 24 | `data/questions.ts` | Forced-choice, 4 per dimension pairing |
| Observation questions | 8 | `data/observations.ts` | For typing other people |
| Type profiles | 4 | `data/type-profiles.ts` | Strengths, blind spots, stress, growth |
| Coaching cards | 80 | `data/coaching-cards/` | 5 situations x 16 type-pairs |

The insights engine (`engine/insights.ts`) computes per-type averages, trends, friction flags, and growth tips from journal entries. Requires 5+ entries to produce meaningful patterns.

## Design System

CSS custom properties in `styles/tokens.css`.

**Communication style colors:**
- Drive: coral `#e8614d`
- Influence: amber `#d4a017`
- Steady: teal `#2d9f83`
- Clarity: slate blue `#5b7fa6`

Each has three variants: base (fills), subtle (backgrounds), text (readable on bg).

**Dark mode:** System preference (`prefers-color-scheme`) + explicit toggle via `data-theme` attribute. Theme preference stored in localStorage.

**Typography:** Fraunces (display/headings), Source Sans 3 (UI/body). Self-hosted variable woff2.

## Style Rules

- No em dashes. Single `-` in user-facing copy, `--` in code comments only
- No emoji in code or copy (situation icons in coach.tsx are the one exception)
- Mobile-first, 44px touch targets, `safe-area-inset-bottom`
- Warm copy, not clinical. Types are a lens, not a label
- `prefers-reduced-motion` respected everywhere
- CSP locked down: `default-src 'self'`, no inline scripts

## Testing

- **80 unit tests** (Vitest) covering all engine logic
- **254 e2e tests** (Playwright) across Chromium + WebKit
  - Critical user flows, accessibility (axe-core WCAG 2.1 AA), performance, SEO, offline, security
  - 4-persona multi-user simulation (parallel)
- **Lighthouse:** 99/100/100/100 (performance/accessibility/best practices/SEO)

## Build Pipeline

```
npm run check    = lint + test + build
npm run build    = tsc + vite build + generate 80 insight HTML pages
npm run e2e      = build + playwright (chromium + webkit)
```

The build generates pre-rendered HTML for each `/insight/:pair/:situation` route with per-page OG meta tags for social sharing.
