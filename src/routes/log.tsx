import { useState, useEffect } from 'preact/hooks';
import { useLocation } from 'wouter';
import { OutcomeInput } from '../components/outcome-input.tsx';
import { getContacts, addJournalEntry, getJournalEntries } from '../db/queries.ts';
import { DISC_LABELS, SITUATION_LABELS } from '../engine/types.ts';
import type { Contact, JournalEntry, SituationType } from '../engine/types.ts';
import { formatRelativeDate } from '../lib/format.ts';
import { navigate } from '../lib/transitions.ts';

export function Log() {
  const [, setLocation] = useLocation();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill from URL params (coach-to-log bridge)
  const urlParams = new URLSearchParams(window.location.search);
  const prefillContact = urlParams.get('contact') ?? '';
  const prefillSituation = urlParams.get('situation') ?? '';

  // Form state
  const [contactId, setContactId] = useState(prefillContact);
  const [situation, setSituation] = useState<SituationType | ''>(
    prefillSituation in SITUATION_LABELS ? prefillSituation as SituationType : '',
  );
  const [outcome, setOutcome] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [c, e] = await Promise.all([getContacts(), getJournalEntries()]);
      setContacts(c);
      setEntries(e);
    } catch {
      setError('Something went wrong. Your data is safe - try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!contactId || !situation || !outcome || saving) return;
    setSaving(true);
    setError(null);
    try {
      await addJournalEntry({
        contactId,
        situationType: situation as SituationType,
        outcome,
        note: note.trim(),
        loggedAt: Date.now(),
      });
      // Reset form
      setContactId('');
      setSituation('');
      setOutcome(null);
      setNote('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      // Reload entries
      const updated = await getJournalEntries();
      setEntries(updated);
    } catch {
      setError('Could not save your entry. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  const canSubmit = contactId && situation && outcome && !saving;

  if (loading) {
    return <div class="route-shell"><div class="page-header"><h1>Log</h1></div><p class="loading-text" aria-live="polite">Loading...</p></div>;
  }

  if (error && contacts.length === 0) {
    return (
      <div class="route-shell centered">
        <div class="welcome-block">
          <p class="welcome-text">{error}</p>
          <button class="btn-primary" type="button" onClick={() => loadData()}>Try again</button>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div class="route-shell centered">
        <div class="page-header"><h1>Log</h1></div>
        <div class="welcome-block">
          <p class="welcome-text">
            After a conversation, take ten seconds to note how it went.
            Small observations add up - you will see your own patterns
            within a week.
          </p>
          <button class="btn-secondary" type="button" onClick={() => navigate(() => setLocation('/'))}>
            Add someone to get started
          </button>
        </div>
        <div class="preview-hint">
          <div class="preview-entry" aria-hidden="true">
            <span class="outcome-dot outcome-4" />
            <div>
              <span class="preview-name">Your teammate</span>
              <span class="preview-type">Give Feedback</span>
            </div>
            <span class="preview-date">Today</span>
          </div>
          <p class="preview-caption">Each entry tracks who, what situation, and how it went</p>
        </div>
      </div>
    );
  }

  return (
    <div class="route-shell">
      <div class="page-header"><h1>Log</h1></div>

      <form class="log-form" onSubmit={handleSubmit}>
        <div class="log-field">
          <label class="log-label" for="log-contact">Person</label>
          <select
            id="log-contact"
            class="log-select"
            value={contactId}
            onChange={(e) => setContactId((e.target as HTMLSelectElement).value)}
          >
            <option value="">Choose someone</option>
            {contacts.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div class="log-field">
          <label class="log-label" for="log-situation">Situation</label>
          <select
            id="log-situation"
            class="log-select"
            value={situation}
            onChange={(e) => setSituation((e.target as HTMLSelectElement).value as SituationType | '')}
          >
            <option value="">What kind of conversation?</option>
            {(Object.entries(SITUATION_LABELS) as [SituationType, string][]).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <OutcomeInput value={outcome} onChange={setOutcome} />

        <div class="log-field">
          <label class="log-label" for="log-note">Note <span class="optional">(optional)</span></label>
          <textarea
            id="log-note"
            class="log-textarea"
            placeholder="What happened? What would you do differently?"
            value={note}
            onInput={(e) => setNote((e.target as HTMLTextAreaElement).value)}
            maxLength={280}
            rows={3}
          />
          {note.length > 0 && (
            <span class="log-char-count">{note.length}/280</span>
          )}
        </div>

        {error && <p class="error-inline" role="alert">{error}</p>}

        <button class="btn-primary" type="submit" disabled={!canSubmit} aria-busy={saving}>
          <span aria-live="polite">{saving ? 'Saving...' : saved ? 'Saved!' : 'Log it'}</span>
        </button>
      </form>

      {entries.length > 0 && (
        <div class="log-history">
          <h2>History</h2>
          <div class="journal-list">
            {entries.map(e => {
              const contact = contacts.find(c => c.id === e.contactId);
              return (
                <div key={e.id} class="journal-entry">
                  <span class={`outcome-dot outcome-${e.outcome}`} aria-hidden="true" />
                  <div class="journal-entry-content">
                    <span class="journal-person">
                      {contact?.name ?? 'Unknown'}
                      {contact && (
                        <span class={`type-badge-sm disc-${contact.discProfile.primary.toLowerCase()}`}>
                          {DISC_LABELS[contact.discProfile.primary]}
                        </span>
                      )}
                    </span>
                    <span class="journal-situation">{SITUATION_LABELS[e.situationType]}</span>
                    {e.note && <span class="journal-note">{e.note}</span>}
                  </div>
                  <span class="journal-date">{formatRelativeDate(e.loggedAt)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

