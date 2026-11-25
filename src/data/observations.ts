import type { ObservationQuestion } from '../engine/types.ts';

/**
 * 8 behavioral observation questions for typing another person.
 * Each question maps to 1-2 DISC dimensions via signal weights.
 * Binary choice per question. Takes about 60 seconds.
 * Renders under "Think about [name]:", so options read as a reply about them.
 */
export const observations: ObservationQuestion[] = [
  {
    id: "obs01",
    question: "How fast do they make decisions?",
    optionA: { text: "Fast. They decide and move on", signals: { D: 2, I: 1 } },
    optionB: { text: "They take their time and think it through", signals: { S: 1, C: 2 } },
  },
  {
    id: "obs02",
    question: "What seems to recharge them?",
    optionA: { text: "Being around people. They light up in a group", signals: { I: 2, D: 1 } },
    optionB: { text: "Quiet time, alone or with one person", signals: { S: 1, C: 1 } },
  },
  {
    id: "obs03",
    question: "How do they handle change?",
    optionA: { text: "They welcome it, and sometimes go looking for it", signals: { D: 1, I: 1 } },
    optionB: { text: "They push back, or need time to adjust", signals: { S: 2, C: 1 } },
  },
  {
    id: "obs04",
    question: "When there's a disagreement, what do they do?",
    optionA: { text: "They raise it head-on", signals: { D: 2 } },
    optionB: { text: "They steer around it or smooth it over", signals: { S: 2, I: 1 } },
  },
  {
    id: "obs05",
    question: "How do they usually talk or write?",
    optionA: { text: "Short and to the point", signals: { D: 2, C: 1 } },
    optionB: { text: "In detail, covering everything", signals: { C: 2, S: 1 } },
  },
  {
    id: "obs06",
    question: "What do they care about most?",
    optionA: { text: "Getting results", signals: { D: 2, C: 1 } },
    optionB: { text: "Keeping people on good terms", signals: { S: 2, I: 1 } },
  },
  {
    id: "obs07",
    question: "How do they handle risk?",
    optionA: { text: "They take bold chances", signals: { D: 1, I: 2 } },
    optionB: { text: "They play it safe and weigh things up first", signals: { C: 2, S: 1 } },
  },
  {
    id: "obs08",
    question: "How do they like to hear feedback?",
    optionA: { text: "Straight, no sugarcoating", signals: { D: 2, C: 1 } },
    optionB: { text: "Gently, with some encouragement around it", signals: { S: 2, I: 1 } },
  },
];
