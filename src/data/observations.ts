import type { ObservationQuestion } from '../engine/types.ts';

/**
 * 8 behavioral observation questions for typing another person.
 * Each question maps to 1-2 DISC dimensions via signal weights.
 * Binary choice per question. Takes about 60 seconds.
 */
export const observations: ObservationQuestion[] = [
  {
    id: 'obs01',
    question: 'How quickly do they make decisions?',
    optionA: { text: 'Fast - they decide and move on', signals: { D: 2, I: 1 } },
    optionB: { text: 'Deliberate - they take their time', signals: { S: 1, C: 2 } },
  },
  {
    id: 'obs02',
    question: 'Where do they get their energy?',
    optionA: { text: 'Groups - they light up around people', signals: { I: 2, D: 1 } },
    optionB: { text: 'One-on-one or alone - they recharge quietly', signals: { S: 1, C: 1 } },
  },
  {
    id: 'obs03',
    question: 'How do they respond to change?',
    optionA: { text: 'They embrace it - even seek it out', signals: { D: 1, I: 1 } },
    optionB: { text: 'They resist or need time to adjust', signals: { S: 2, C: 1 } },
  },
  {
    id: 'obs04',
    question: 'When there is disagreement, what do they do?',
    optionA: { text: 'They confront it directly', signals: { D: 2 } },
    optionB: { text: 'They avoid it or smooth things over', signals: { S: 2, I: 1 } },
  },
  {
    id: 'obs05',
    question: 'How do they communicate?',
    optionA: { text: 'Brief and to the point', signals: { D: 2, C: 1 } },
    optionB: { text: 'Detailed and thorough', signals: { C: 2, S: 1 } },
  },
  {
    id: 'obs06',
    question: 'What do they prioritize?',
    optionA: { text: 'Results and outcomes', signals: { D: 2, C: 1 } },
    optionB: { text: 'Relationships and harmony', signals: { S: 2, I: 1 } },
  },
  {
    id: 'obs07',
    question: 'How do they handle risk?',
    optionA: { text: 'They take bold chances', signals: { D: 1, I: 2 } },
    optionB: { text: 'They play it safe and calculate', signals: { C: 2, S: 1 } },
  },
  {
    id: 'obs08',
    question: 'How do they prefer to receive feedback?',
    optionA: { text: 'Straight - no sugarcoating', signals: { D: 2, C: 1 } },
    optionB: { text: 'Gently - with encouragement around it', signals: { S: 2, I: 1 } },
  },
];
