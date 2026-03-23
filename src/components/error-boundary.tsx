import { Component } from 'preact';
import type { ComponentChildren } from 'preact';

interface Props {
  children: ComponentChildren;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      const isStorage = this.state.error.name === 'DatabaseClosedError'
        || this.state.error.message.includes('IndexedDB')
        || this.state.error.message.includes('storage')
        || this.state.error.message.includes('QuotaExceededError');

      return (
        <div class="error-boundary">
          <h1>{isStorage ? 'Storage unavailable' : 'Something went wrong'}</h1>
          <p class="welcome-text">
            {isStorage
              ? 'Your browser is blocking local storage. This usually happens in private browsing mode. ClearTalk needs storage to save your data -- try opening it in a regular browser window.'
              : 'ClearTalk hit an unexpected error. Try refreshing the page.'}
          </p>
          <button
            class="btn-primary"
            type="button"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
          {!isStorage && (
            <details class="error-details">
              <summary>Technical details</summary>
              <pre>{this.state.error.message}</pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
