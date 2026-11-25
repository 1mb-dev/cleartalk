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
              ? 'ClearTalk can\'t use this browser\'s storage right now. Your data is safe. In a private window, open ClearTalk in a regular one instead. If your device is nearly full, free some space and refresh.'
              : 'ClearTalk hit an unexpected error. Your data is safe - refresh the page to carry on.'}
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
