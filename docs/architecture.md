# ClearTalk Architecture

Developer context for the ClearTalk codebase. Start with the [README](../README.md) for what the app does.

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Preact (~4KB) | React-compatible, keeps bundle under 62KB gzip |
| Router | wouter (~2KB) | Hook-based, history API, nothing more |
| Build | Vite + TypeScript (strict) | Fast HMR, tree-shaking, zero `any` types |
| Storage | Dexie.js (IndexedDB) | Typed queries, schema versioning, transactions |
| PWA | vite-plugin-pwa (Workbox) | Precaching, offline fallback, silent updates |
| CSS | Vanilla custom properties | Design tokens in `tokens.css`, no framework |
| Host | Cloudflare Pages | Static SPA, edge-served |

Three runtime dependencies. Everything else is dev tooling.

## Project Structure

```
src/
  app.tsx              - Router; insight route sits outside Layout
  main.tsx             - Entry point, ErrorBoundary, theme restore
  routes/
    coach.tsx          - Main flow: pick person, pick situation, see card
    people.tsx         - Contact list
    person.tsx         - Contact detail with quick-coach shortcuts
    log.tsx            - Journal form + history
    profile.tsx        - Assessment, insights, settings, about
    insight.tsx        - Shareable coaching card (no tab bar)
  components/
    layout.tsx         - App shell with tab bar navigation
    coaching-card.tsx  - Card renderer with universal + gated sections
    quick-tag.tsx      - 8-question wizard to tag a new contact
    assessment.tsx     - 24-question self-assessment
    disc-wheel.tsx     - SVG style visualization (scores + labels)
    outcome-input.tsx  - 1-5 outcome scale
    error-boundary.tsx - Catches storage failures, detects private browsing
    logo.tsx           - Four-circle motif
  engine/              - Pure logic, no UI, fully tested
    types.ts           - TypeScript types + label constants
    assessment.ts      - Score 24 questions into a style profile
    typing.ts          - Score 8 observations into a style profile
    coaching.ts        - Lazy-load coaching cards with in-memory cache
    insights.ts        - Pattern analysis from journal entries
  data/
    questions.ts       - 24 forced-choice questions (4 per dimension pair)
    observations.ts    - 8 behavioral questions for typing others
    type-profiles.ts   - 4 style descriptions (strengths, blind spots, stress, growth)
    coaching-cards/    - 5 lazy-loaded files, 16 cards each (80 total)
  db/
    schema.ts          - Dexie schema with compound indices
    queries.ts         - Typed CRUD, cascade deletes in transactions
  lib/
    transitions.ts     - View transitions + focus management
    storage.ts         - Export, import, clear all data
    install-prompt.ts  - PWA install prompt handling
    sanitize.ts        - Input sanitization
    format.ts          - Relative date formatting
    parse-pair.ts      - URL pair validation for insight routes
    id.ts              - ID generation
  styles/
    tokens.css         - Colors, spacing, type, dark mode
    base.css           - Reset, fonts, scrollbar, focus styles
    components.css     - All component styles
    utilities.css      - Helpers (sr-only)
```

## Architecture Decisions

### Coach-first, not assess-first
A new user gets coaching value in under 2 minutes. The self-assessment is opt-in - it personalizes two card sections (openers and pitfalls). Everything else works without it.

### Lazy-loaded coaching cards
Each situation file (~8KB gzip) loads via `import()` only when selected. An in-memory `Map` cache prevents redundant loads. The main bundle never includes coaching content.

### Universal vs gated sections
Without the assessment, users see: approach, reaction, recovery, body language. With it, they also see: personalized openers and pitfalls. Gated sections show a hint explaining what the assessment unlocks.

### Insight pages live outside the app shell
`/insight/:pair/:situation` renders without the tab bar - a standalone shareable page with branding and a CTA back to the app. 80 HTML files are pre-rendered at build time so social previews have correct per-page meta tags.

### Everything in IndexedDB
No backend, no accounts. One default user. Dexie transactions handle cascade deletes. The ErrorBoundary detects storage failures and specifically identifies private browsing mode.

## Data Model

```
User           - Single default user; style profile is nullable (coach-first)
Assessment     - Every attempt stored, latest displayed
Contact        - People you communicate with; style profile + confidence level
JournalEntry   - Outcome (1-5) per conversation, tied to contact + situation
```

Compound indices on journal: `[userId+contactId]`, `[userId+loggedAt]`, `[userId+contactId+loggedAt]`.

Deleting a contact cascades to their journal entries in a single transaction.

## Content

| What | Count | Where |
|------|-------|-------|
| Assessment questions | 24 | `data/questions.ts` |
| Observation questions | 8 | `data/observations.ts` |
| Style profiles | 4 | `data/type-profiles.ts` |
| Coaching cards | 80 | `data/coaching-cards/` (5 situations x 16 pairs) |

The insights engine (`engine/insights.ts`) surfaces per-style averages, trends, friction patterns, and growth tips from journal entries. Needs 5+ entries to produce meaningful output.

## Design System

Tokens live in `styles/tokens.css`. All spacing, color, and type decisions flow from there.

**Style colors:** Drive (coral `#e8614d`), Influence (amber `#d4a017`), Steady (teal `#2d9f83`), Clarity (slate blue `#5b7fa6`). Each has three variants: base, subtle, and text.

**Dark mode:** System preference via `prefers-color-scheme`, overridable with `data-theme` attribute. Preference persisted in localStorage.

**Typography:** Fraunces (display) and Source Sans 3 (UI). Self-hosted variable woff2, preloaded.

## Copy and Voice

ClearTalk has a specific copy philosophy documented in full in the project memory. The essentials:

- **Types are a lens, not a label.** The four styles (Drive, Influence, Steady, Clarity) are ClearTalk's vocabulary. Never reference the underlying behavioral framework by name.
- **Single hyphen** `-` in user-facing copy. `--` only in code comments.
- **No emoji** in code or copy. Situation icons in coach.tsx are the one exception.
- **Warm, not clinical.** "How they communicate" not "personality type." "Patterns you don't notice" not "behavioral tendencies."
- **Mobile-first.** 44px touch targets, `safe-area-inset-bottom`, `prefers-reduced-motion` respected.
- **CSP locked down.** `default-src 'self'`, no inline scripts.

## Testing

80 unit tests (Vitest) cover all engine logic. 254 e2e tests (Playwright) run on Chromium and WebKit:

- Critical user flows, accessibility (axe-core, WCAG 2.1 AA), performance, SEO, offline, security
- 4-persona parallel simulation: power user, new user, returning user, sharer
- Lighthouse: 99 / 100 / 100 / 100

## Build

```
npm run check   - lint + test + build
npm run build   - tsc, vite build, generate 80 pre-rendered insight pages
npm run e2e     - build + playwright on chromium + webkit
```

The build step generates static HTML for every insight route so social previews show per-page titles and descriptions instead of the generic app meta tags.
