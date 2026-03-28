import { useState } from 'preact/hooks';
import { questions } from '../data/questions.ts';
import { scoreAssessment } from '../engine/assessment.ts';
import { DiscWheel } from './disc-wheel.tsx';
import { typeProfiles } from '../data/type-profiles.ts';
import { saveAssessment, updateUserProfile, getOrCreateUser } from '../db/queries.ts';
import type { DiscProfile } from '../engine/types.ts';

interface AssessmentProps {
  onComplete: (profile: DiscProfile) => void;
  onCancel: () => void;
}

export function Assessment({ onComplete, onCancel }: AssessmentProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'a' | 'b'>>({});
  const [result, setResult] = useState<DiscProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  const total = questions.length;
  const current = questions[step];
  const progress = step / total;

  function selectAnswer(choice: 'a' | 'b') {
    const updated = { ...answers, [current.id]: choice };
    setAnswers(updated);

    if (step < total - 1) {
      setStep(step + 1);
    } else {
      const profile = scoreAssessment(updated);
      setResult(profile);
    }
  }

  function goBack() {
    if (step > 0) setStep(step - 1);
  }

  async function handleSave() {
    if (!result || saving) return;
    setSaving(true);
    setSaveError(false);
    try {
      const user = await getOrCreateUser();
      await saveAssessment({
        userId: user.id,
        answers,
        result,
        takenAt: Date.now(),
      });
      await updateUserProfile(result);
      onComplete(result);
    } catch {
      setSaving(false);
      setSaveError(true);
    }
  }

  // Result screen
  if (result) {
    const primary = typeProfiles[result.primary];
    return (
      <div class="assessment-result">
        <h2>Your communication style</h2>
        <DiscWheel profile={result} />

        <div class="type-summary">
          <h3>{primary.label}: {primary.tagline}</h3>
          <p class="type-default">{primary.communicationDefault}</p>

          <h4>Strengths</h4>
          <ul>
            {primary.strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>

          <h4>Blind spots</h4>
          <ul>
            {primary.blindSpots.map((b, i) => <li key={i}>{b}</li>)}
          </ul>

          <h4>Growth areas</h4>
          <ul>
            {primary.growthAreas.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
        </div>

        {saveError && (
          <p class="error-inline" role="alert">
            Could not save your results. Check that your browser allows storage and try again.
          </p>
        )}

        <button class="btn-primary" type="button" onClick={handleSave} disabled={saving} aria-busy={saving}>
          <span aria-live="polite">{saving ? 'Saving...' : 'Save and continue'}</span>
        </button>
      </div>
    );
  }

  // Question screen
  return (
    <div class="assessment-wizard">
      <div class="assessment-header">
        <button
          class="assessment-back"
          type="button"
          onClick={step > 0 ? goBack : onCancel}
          aria-label={step > 0 ? 'Previous question' : 'Cancel assessment'}
        >
          <span aria-hidden="true">{step > 0 ? '\u2190' : '\u2715'}</span>
        </button>
        <div class="assessment-progress">
          <div class="assessment-progress-bar" style={{ width: `${progress * 100}%` }} />
        </div>
        <span class="assessment-count">{step + 1}/{total}</span>
      </div>

      <div class="assessment-question">
        <p class="assessment-prompt">Which sounds more like you?</p>

        <button
          class={`assessment-option${answers[current.id] === 'a' ? ' selected' : ''}`}
          type="button"
          onClick={() => selectAnswer('a')}
        >
          {current.optionA.text}
        </button>

        <button
          class={`assessment-option${answers[current.id] === 'b' ? ' selected' : ''}`}
          type="button"
          onClick={() => selectAnswer('b')}
        >
          {current.optionB.text}
        </button>
      </div>
    </div>
  );
}
