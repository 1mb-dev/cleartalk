import { useState, useEffect } from 'preact/hooks';
import { useParams, useLocation } from 'wouter';
import { getContact, deleteContact, updateContact, getJournalForContact } from '../db/queries.ts';
import { sanitizeName } from '../lib/sanitize.ts';
import { SITUATION_LABELS } from '../engine/types.ts';
import { DiscWheel } from '../components/disc-wheel.tsx';
import { typeProfiles } from '../data/blind-spots.ts';
import type { Contact, JournalEntry, SituationType } from '../engine/types.ts';
import { navigate } from '../lib/transitions.ts';
import { formatRelativeDate } from '../lib/format.ts';

export function PersonDetail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [contact, setContact] = useState<Contact | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (id) loadPerson(id);
  }, [id]);

  async function loadPerson(personId: string) {
    setLoading(true);
    const [c, j] = await Promise.all([
      getContact(personId),
      getJournalForContact(personId),
    ]);
    setContact(c ?? null);
    setEntries(j);
    setLoading(false);
  }

  async function handleDelete() {
    if (!id) return;
    await deleteContact(id);
    navigate(() => setLocation('/people'));
  }

  if (loading) {
    return <div class="route-shell"><h1>Person</h1><p class="loading-text">Loading...</p></div>;
  }

  if (!contact) {
    return (
      <div class="route-shell">
        <button class="back-link" type="button" onClick={() => navigate(() => setLocation('/people'))}>
          {'\u2190'} People
        </button>
        <p class="empty-state">Person not found.</p>
      </div>
    );
  }

  const profile = typeProfiles[contact.discProfile.primary];

  return (
    <div class="route-shell">
      <button class="back-link" type="button" onClick={() => navigate(() => setLocation('/people'))}>
        {'\u2190'} People
      </button>

      {editingName ? (
        <form class="inline-edit" onSubmit={async (e) => {
          e.preventDefault();
          const clean = sanitizeName(nameInput);
          if (clean && id) {
            await updateContact(id, { name: clean });
            setContact(prev => prev ? { ...prev, name: clean } : prev);
            setEditingName(false);
          }
        }}>
          <input
            type="text"
            class="quicktag-name-input"
            value={nameInput}
            onInput={(e) => setNameInput((e.target as HTMLInputElement).value)}
            autoFocus
            maxLength={60}
          />
          <div class="inline-edit-actions">
            <button class="btn-primary btn-sm" type="submit" disabled={!nameInput.trim()}>Save</button>
            <button class="btn-secondary btn-sm" type="button" onClick={() => setEditingName(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div class="person-name-row">
          <h1>{contact.name}</h1>
          <button class="btn-ghost" type="button" onClick={() => { setNameInput(contact.name); setEditingName(true); }}>
            Edit
          </button>
        </div>
      )}
      <p class="coach-subtitle">
        {profile.label} type
        {contact.confidence !== 'high' && ` (${contact.confidence} confidence)`}
      </p>

      <DiscWheel profile={contact.discProfile} size={160} />

      <div class="type-summary compact">
        <p class="type-default">{profile.communicationDefault}</p>

        <h4>When talking to a {profile.label}</h4>
        <ul>
          <li>{profile.strengths[0]} -- lean into this</li>
          <li>{profile.blindSpots[0]} -- watch for this</li>
        </ul>
      </div>

      <div class="person-actions">
        <h3>Quick coach</h3>
        <div class="situation-grid compact">
          {(Object.entries(SITUATION_LABELS) as [SituationType, string][]).map(([key, label]) => (
            <button
              key={key}
              class="situation-btn-sm"
              type="button"
              onClick={() => navigate(() => setLocation(`/coach/${contact.id}/${key}`))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {entries.length > 0 && (
        <div class="person-history">
          <h3>Recent interactions</h3>
          <div class="journal-list">
            {entries.slice(0, 5).map(e => (
              <div key={e.id} class="journal-entry">
                <span class={`outcome-dot outcome-${e.outcome}`} aria-hidden="true" />
                <div class="journal-entry-content">
                  <span class="journal-situation">{SITUATION_LABELS[e.situationType]}</span>
                  {e.note && <span class="journal-note">{e.note}</span>}
                </div>
                <span class="journal-date">{formatRelativeDate(e.loggedAt)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div class="danger-zone">
        {confirmDelete ? (
          <div class="confirm-delete">
            <p>Remove {contact.name}? Their profile and all your conversation notes will be gone.</p>
            <div class="confirm-delete-actions">
              <button class="btn-danger" type="button" onClick={handleDelete}>Remove</button>
              <button class="btn-secondary btn-sm" type="button" onClick={() => setConfirmDelete(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <button class="btn-ghost-danger" type="button" onClick={() => setConfirmDelete(true)}>
            Remove {contact.name}
          </button>
        )}
      </div>
    </div>
  );
}

