interface OutcomeInputProps {
  value: number | null;
  onChange: (value: 1 | 2 | 3 | 4 | 5) => void;
}

const labels = ['Rough', 'Difficult', 'Okay', 'Good', 'Great'];

export function OutcomeInput({ value, onChange }: OutcomeInputProps) {
  return (
    <fieldset class="outcome-input" role="radiogroup" aria-label="How did it go?">
      <legend class="outcome-legend">How did it go?</legend>
      <div class="outcome-options">
        {([1, 2, 3, 4, 5] as const).map(n => (
          <label key={n} class={`outcome-option${value === n ? ' selected' : ''}`}>
            <input
              type="radio"
              name="outcome"
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              class="sr-only"
            />
            <span class={`outcome-circle outcome-${n}`}>{n}</span>
            <span class="outcome-label">{labels[n - 1]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
