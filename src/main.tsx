import { render } from 'preact';
import { App } from './app.tsx';
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

render(<App />, document.getElementById('app')!);
