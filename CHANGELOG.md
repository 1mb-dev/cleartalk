# Changelog

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
