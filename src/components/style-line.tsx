import type { Contact } from '../engine/types.ts';
import { DISC_LABELS } from '../engine/types.ts';
import { STYLE_LINES } from '../data/style-lines.ts';

const READ: Record<Contact['confidence'], string> = {
  high: '',
  medium: ' Your read on them is fair, not certain.',
  low: ' Your read on them is rough so far.',
};

/** How a person comes across, in words rather than a label, with how sure the reader's read is. */
export function StyleLine({ contact }: { contact: Contact }) {
  const t = contact.discProfile.primary;
  return (
    <p class="coach-subtitle">
      Mostly {DISC_LABELS[t]} - {STYLE_LINES[t].other}.{READ[contact.confidence]}
    </p>
  );
}
