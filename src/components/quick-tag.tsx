import { useState } from 'preact/hooks';
import { observations } from '../data/observations.ts';
import { typeFromObservations } from '../engine/typing.ts';
import { addContact } from '../db/queries.ts';
import { DISC_LABELS } from '../engine/types.ts';
import type { DiscProfile, Contact } from '../engine/types.ts';

interface QuickTagProps {
  onComplete: (contact: { id: string; name: string; profile: DiscProfile; confidence: Contact['confidence'] }) => void;
  onCancel: () => void;
}

export function QuickTag({ onComplete, onCancel }: QuickTagProps) {
  const [name, setName] = useState('');
  const [step, setStep] = useState(-1); // -1 = name entry, 0-7 = observations
  const [answers, setAnswers] = useState<Record<string, 'a' | 'b'>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const total = observations.length;

  function submitName(e: Event) {
    e.preventDefault();
    if (name.trim()) setStep(0);
  }

  const [pendingResult, setPendingResult] = useState<{ profile: DiscProfile; confidence: Contact['confidence'] } | null>(null);

  function selectAnswer(choice: 'a' | 'b') {
    const obs = observations[step];
    const updated = { ...answers, [obs.id]: choice };
    setAnswers(updated);

    if (step < total - 1) {
      setStep(step + 1);
    } else {
      // Show confirmation instead of saving immediately
      setPendingResult(typeFromObservations(updated));
    }
  }

  async function finalize(finalAnswers: Record<string, 'a' | 'b'>) {
    if (saving) return;
    setSaving(true);
    setSaveError(false);
    const { profile, confidence } = typeFromObservations(finalAnswers);
    try {
      const id = await addContact({
        name: name.trim(),
        discProfile: profile,
        confidence,
        notes: '',
      });
      onComplete({ id, name: name.trim(), profile, confidence });
    } catch {
      setSaving(false);
      setSaveError(true);
    }
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
    else if (step === 0) setStep(-1);
  }

  // Name entry
  if (step === -1) {
    return (
      <div class="quicktag-wizard">
        <div class="assessment-header">
          <button class="assessment-back" type="button" onClick={onCancel} aria-label="Cancel">
            {'\u2715'}
          </button>
          <span class="assessment-prompt">Who are you thinking about?</span>
        </div>
        <form class="quicktag-name-form" onSubmit={submitName}>
          <input
            type="text"
            class="quicktag-name-input"
            placeholder="Their name"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
            autoFocus
            maxLength={60}
          />
          <button class="btn-primary" type="submit" disabled={!name.trim()}>
            Next
          </button>
        </form>
      </div>
    );
  }

  if (pendingResult && !saving && !saveError) {
    return (
      <div class="quicktag-wizard">
        <div class="assessment-header">
          <button class="assessment-back" type="button" onClick={() => { setPendingResult(null); setStep(total - 1); }} aria-label="Go back">
            {'\u2190'}
          </button>
          <span class="assessment-prompt">Does this look right?</span>
        </div>
        <div class="quicktag-confirm">
          <p class="quicktag-confirm-name">{name}</p>
          <p class="quicktag-confirm-type">
            Their style: <strong>{DISC_LABELS[pendingResult.profile.primary]}</strong>
          </p>
          <div class="quicktag-confirm-actions">
            <button class="btn-primary" type="button" onClick={() => finalize(answers)}>
              Save
            </button>
            <button class="btn-secondary" type="button" onClick={() => { setPendingResult(null); setAnswers({}); setStep(0); }}>
              Redo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (saving) {
    return (
      <div class="quicktag-wizard">
        <p class="assessment-prompt" aria-live="polite">Saving...</p>
      </div>
    );
  }

  if (saveError) {
    return (
      <div class="quicktag-wizard">
        <p class="assessment-prompt" role="alert">
          Could not save. Check that your browser allows storage and try again.
        </p>
        <button class="btn-primary" type="button" onClick={() => finalize(answers)}>
          Try again
        </button>
      </div>
    );
  }

  // Observation questions
  const obs = observations[step];
  const progress = (step + 1) / total;

  return (
    <div class="quicktag-wizard">
      <div class="assessment-header">
        <button class="assessment-back" type="button" onClick={goBack} aria-label="Previous question">
          {'\u2190'}
        </button>
        <div class="assessment-progress">
          <div class="assessment-progress-bar" style={{ width: `${progress * 100}%` }} />
        </div>
        <span class="assessment-count">{step + 1}/{total}</span>
      </div>

      <div class="assessment-question">
        <p class="assessment-prompt">
          Think about <strong>{name}</strong>:
        </p>
        <p class="observation-question">{obs.question}</p>

        <button
          class={`assessment-option${answers[obs.id] === 'a' ? ' selected' : ''}`}
          type="button"
          onClick={() => selectAnswer('a')}
        >
          {obs.optionA.text}
        </button>

        <button
          class={`assessment-option${answers[obs.id] === 'b' ? ' selected' : ''}`}
          type="button"
          onClick={() => selectAnswer('b')}
        >
          {obs.optionB.text}
        </button>
      </div>
    </div>
  );
}
