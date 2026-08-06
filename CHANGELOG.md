# Changelog

## 0.3.2 (2026-08-06)

### Fixed

- Tagged releases now reach production. Every release from 0.1.0 through 0.3.1 was published as a Cloudflare Pages preview instead of production, so cleartalk.1mb.dev served the 2026-03-24 build for four months and the fixes in 0.3.0 and 0.3.1 reached nobody
- Content Security Policy no longer blocks Cloudflare's bot-detection script, which was logging an error on every page load
- Page views are no longer counted twice. The app carried its own analytics tag alongside the one Cloudflare injects into every response

## 0.3.1 (2026-04-05)

### Fixed

- Installed PWA now requests persistent storage so Chrome cannot evict Cache Storage between uses - fixes cold offline launch showing "You're offline" page after periods of inactivity
- Profile surfaces an unobtrusive "Offline mode may be unreliable" note when persistent storage was denied

## 0.3.0 (2026-03-28)

### Fixed

- "a Influence" grammar bug on coaching cards, insight pages, and share titles
- Screen readers no longer announce decorative Unicode arrows in back buttons
- Outcome dots in journal entries now have screen reader text ("Outcome: 4 of 5")
- DiscWheel aria-label no longer says "Your" when viewing someone else's profile
- Import validation rejects malformed export files instead of silently corrupting data
- `URL.revokeObjectURL` timing in download helper prevents empty downloads in Safari
- `replaceAll` used for underscore replacement in share titles (was `replace`)
- Duplicate "Open in ClearTalk" CTA removed from insight pages
- Empty `openWith`/`avoid` arrays no longer render undefined on insight pages

### Features

- Per-route page titles and canonical URLs via `useDocumentTitle` hook
- Privacy disclosure section in Profile (local data, Cloudflare Web Analytics)
- `llms.txt` for LLM/AI agent discoverability
- JSON-LD `HowTo` structured data on all 80 pre-rendered insight pages
- Screenshot utility script for announcement assets

### Changed

- "Tap a name" copy replaced with device-neutral "Pick a name"
- "DISC Communication Style Profile" replaced with "Communication Style Profile" in SVG
- Quick-tag name input now has `aria-label` for screen readers
- Nav bar `aria-label` updated to "Main navigation"

## 0.2.0 (2026-03-25)

### Features

- 16 per-pair OG images for insight routes - shared links now show the specific type pair
- Runtime caching for coaching card chunks via Workbox StaleWhileRevalidate (saves ~40KB gzip on initial load)

### Changed

- OG image tagline aligned with ClearTalk voice ("Know what to say before you say it")
- Pinned wrangler-action to v3.14.1 with Wrangler CLI v4

## 0.1.0 (2026-03-24)

Know what to say before you say it. First release.

### Features

- 24-question communication style assessment (own vocabulary: Drive, Influence, Steady, Clarity)
- 8-question quick-tag wizard for typing other people, with confirmation step
- 80 handcrafted coaching cards across 5 situations (feedback, request, conflict, pitch, difficult news)
- Coach-first flow: value in under 2 minutes, assessment is opt-in
- People management with style wheel visualization and confidence indicators
- Journal with 1-5 outcome tracking and optional notes
- Adaptation insights with per-style trends, friction detection, and growth tips
- Shareable insight cards via public URLs with pre-rendered OG tags
- Offline-capable PWA with IndexedDB persistence
- Dark mode (auto / light / dark with system preference)
- Data export and import (JSON)
- Clear all data option
- PWA install prompt (coach banner + profile settings)
- Web Share API with clipboard fallback
- Mobile-first design with 44px touch targets and safe-area support
- Lighthouse: 99 / 100 / 100 / 100 (performance / accessibility / best practices / SEO)
- axe-core WCAG 2.1 AA compliance across all routes
- 80 unit tests, 254 e2e tests (Chromium + WebKit)
