import { render } from 'preact';
import { ErrorBoundary } from './components/error-boundary.tsx';
import { App } from './app.tsx';
import { requestPersistentStorage } from './lib/offline-ready.ts';
import './styles/tokens.css';
import './styles/base.css';
import './styles/utilities.css';
import './styles/components.css';

// Restore saved theme preference
try {
  const saved = localStorage.getItem('cleartalk-theme');
  if (saved === 'light' || saved === 'dark') {
    document.documentElement.setAttribute('data-theme', saved);
  }
} catch { /* private browsing */ }

// Safety net for unhandled async errors (ErrorBoundary only catches sync render errors)
window.addEventListener('unhandledrejection', () => {
  // Intentionally swallowed -- per-route try/catch blocks handle user-visible errors.
  // This listener prevents the browser default (console noise in production).
});

// Request persistent storage once the service worker is ready, so precached
// assets survive eviction and the PWA opens reliably offline.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(() => requestPersistentStorage()).catch(() => { /* best-effort */ });
}

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('app')!,
);
