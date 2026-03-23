# ClearTalk

A tool that helps you talk to people better.

Understand how people communicate, get coaching for specific conversations, and track your adaptation over time. Built on DISC behavioral science (public domain, Marston 1928), with 80 handcrafted coaching cards across 5 common situations.

## How it works

1. **Tag someone** -- answer 8 quick questions about how they communicate
2. **Pick a situation** -- feedback, request, conflict, pitch, or difficult news
3. **Get coaching** -- approach strategy, opener phrases, pitfalls to avoid, recovery moves
4. **Log the outcome** -- track how conversations go over time
5. **See patterns** -- adaptation insights surface what's working and what isn't

The assessment is opt-in -- you get coaching advice immediately. Taking the 3-minute assessment personalizes the openers and pitfalls to your communication style.

## Stack

- **Preact** + **wouter** -- ~6KB SPA framework
- **Dexie.js** -- typed IndexedDB with schema versioning
- **Vite** -- build + HMR
- **vite-plugin-pwa** -- offline-capable service worker
- **Cloudflare Pages** -- static hosting

All data stays on your device. No accounts, no tracking, no backend.

## Development

```bash
npm install
npm run dev       # Start dev server
npm run check     # Type-check + build
npm run preview   # Preview production build
```

## License

MIT
