import { useState, useEffect } from 'preact/hooks';
import { useLocation } from 'wouter';
import { QuickTag } from '../components/quick-tag.tsx';
import { getContacts } from '../db/queries.ts';
import { DISC_LABELS } from '../engine/types.ts';
import type { Contact } from '../engine/types.ts';
import { navigate } from '../lib/transitions.ts';

export function People() {
  const [, setLocation] = useLocation();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showQuickTag, setShowQuickTag] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => { loadContacts(); }, []);

  async function loadContacts() {
    setLoading(true);
    setError(false);
    try {
      const all = await getContacts();
      setContacts(all);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function handleQuickTagComplete() {
    setShowQuickTag(false);
    loadContacts();
  }

  if (showQuickTag) {
    return (
      <div class="route-shell">
        <QuickTag
          onComplete={handleQuickTagComplete}
          onCancel={() => setShowQuickTag(false)}
        />
      </div>
    );
  }

  if (loading) {
    return <div class="route-shell"><h1>People</h1><p class="loading-text" aria-live="polite">Loading...</p></div>;
  }

  if (error) {
    return (
      <div class="route-shell">
        <h1>People</h1>
        <div class="welcome-block">
          <p class="welcome-text">Something went wrong loading your contacts. Your data is safe - try again.</p>
          <button class="btn-primary" type="button" onClick={() => loadContacts()}>Try again</button>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div class="route-shell">
        <h1>People</h1>
        <div class="welcome-block">
          <p class="welcome-text">
            Start with one person - the one you wish
            you understood a little better.
          </p>
          <button class="btn-secondary" type="button" onClick={() => setShowQuickTag(true)}>
            Add someone
          </button>
        </div>
        <div class="preview-hint">
          <div class="preview-card" aria-hidden="true">
            <span class="type-dot disc-s" />
            <span class="preview-name">Your manager</span>
            <span class="preview-type">Steady</span>
          </div>
          <p class="preview-caption">Each person shows their communication style so you know how to approach them</p>
        </div>
      </div>
    );
  }

  return (
    <div class="route-shell">
      <div class="people-header">
        <h1>People</h1>
        <button class="btn-secondary btn-sm" type="button" onClick={() => setShowQuickTag(true)}>
          + Add
        </button>
      </div>
      <div class="people-grid">
        {contacts.map(c => (
          <button
            key={c.id}
            class="people-card"
            type="button"
            onClick={() => navigate(() => setLocation(`/people/${c.id}`))}
          >
            <div class="people-card-top">
              <span class={`type-dot disc-${c.discProfile.primary.toLowerCase()}`} aria-hidden="true" />
              <span class="people-card-name">{c.name}</span>
            </div>
            <div class="people-card-meta">
              <span class={`type-badge-sm disc-${c.discProfile.primary.toLowerCase()}`}>
                {DISC_LABELS[c.discProfile.primary]}
              </span>
              {c.confidence !== 'high' && (
                <span class="confidence-badge">{c.confidence}</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
