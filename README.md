# ClearTalk

Know what to say before you say it.

ClearTalk coaches you for the person and the moment - what to say, what to avoid, how to read the room. 80 coaching cards across 5 common situations.

## How it works

1. **Tag someone** - answer 8 quick questions about how they communicate
2. **Pick a situation** - feedback, request, conflict, pitch, or difficult news
3. **Get coaching** - approach strategy, opener phrases, pitfalls to avoid, recovery moves
4. **Log the outcome** - track how conversations go over time
5. **Read your notes** - what worked and what you'd change collect on your Profile

The assessment is opt-in. Before your first card you pick which of four styles is closer to you; the 3-minute assessment replaces that pick once you take it.

Each card is also a public page at `/insight/{you}-to-{them}/{situation}/`.

## Stack

- **Preact** + **wouter** - ~6KB SPA framework
- **Dexie.js** - typed IndexedDB with schema versioning
- **Vite** + **TypeScript** - build, HMR, strict mode
- **vite-plugin-pwa** - offline-capable service worker
- **Cloudflare Pages** - static hosting

All data stays on your device. No accounts, no backend. Cloudflare Web Analytics counts anonymous page views.

## Development

```bash
npm install
npm run dev       # Start dev server
npm run check     # Type-check + test + build
npm run test      # Unit tests (vitest)
npm run e2e       # End-to-end tests (playwright)
npm run preview   # Preview production build
```

## License

MIT
