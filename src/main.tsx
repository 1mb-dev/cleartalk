import { render } from 'preact';
import { App } from './app.tsx';
import './styles/tokens.css';
import './styles/base.css';
import './styles/utilities.css';
import './styles/components.css';

render(<App />, document.getElementById('app')!);
