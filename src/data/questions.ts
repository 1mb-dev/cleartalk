import type { AssessmentQuestion } from '../engine/types.ts';

/**
 * 24 forced-choice questions, 6 per dimension pairing.
 * Each question pits two DISC dimensions against each other.
 * Questions describe observable behaviors in everyday situations.
 *
 * Pairings (4 questions each, 6 pairings = 24 total):
 *   D vs I, D vs S, D vs C, I vs S, I vs C, S vs C
 * Each dimension appears in 12 questions (3 pairings x 4 questions).
 */
export const questions: AssessmentQuestion[] = [
  // --- D vs I ---
  {
    id: 'q01',
    optionA: { text: 'In meetings, I push to reach a decision quickly', dimension: 'D', weight: 1 },
    optionB: { text: 'In meetings, I make sure everyone feels heard before deciding', dimension: 'I', weight: 1 },
  },
  {
    id: 'q02',
    optionA: { text: 'I would rather win the argument than keep the peace', dimension: 'D', weight: 1 },
    optionB: { text: 'I would rather keep spirits high than prove a point', dimension: 'I', weight: 1 },
  },
  {
    id: 'q03',
    optionA: { text: 'When a project stalls, I take charge and assign next steps', dimension: 'D', weight: 1 },
    optionB: { text: 'When a project stalls, I rally the team and rebuild momentum', dimension: 'I', weight: 1 },
  },
  {
    id: 'q04',
    optionA: { text: 'I get impatient when small talk delays the real conversation', dimension: 'D', weight: 1 },
    optionB: { text: 'I enjoy the small talk -- it is how real relationships start', dimension: 'I', weight: 1 },
  },

  // --- D vs S ---
  {
    id: 'q05',
    optionA: { text: 'I prefer to make a fast decision and correct course later', dimension: 'D', weight: 1 },
    optionB: { text: 'I prefer to take my time and get the decision right the first time', dimension: 'S', weight: 1 },
  },
  {
    id: 'q06',
    optionA: { text: 'I am comfortable being the one who disrupts the status quo', dimension: 'D', weight: 1 },
    optionB: { text: 'I find more value in keeping things stable and predictable', dimension: 'S', weight: 1 },
  },
  {
    id: 'q07',
    optionA: { text: 'If something is not working, I would rather scrap it and start over', dimension: 'D', weight: 1 },
    optionB: { text: 'If something is not working, I would rather fix it gradually', dimension: 'S', weight: 1 },
  },
  {
    id: 'q08',
    optionA: { text: 'I set ambitious targets even when others think they are unrealistic', dimension: 'D', weight: 1 },
    optionB: { text: 'I set achievable targets that the team can hit consistently', dimension: 'S', weight: 1 },
  },

  // --- D vs C ---
  {
    id: 'q09',
    optionA: { text: 'I trust my gut and move fast, even with incomplete information', dimension: 'D', weight: 1 },
    optionB: { text: 'I want to see the data before committing to a direction', dimension: 'C', weight: 1 },
  },
  {
    id: 'q10',
    optionA: { text: 'Good enough today beats perfect next month', dimension: 'D', weight: 1 },
    optionB: { text: 'I would rather delay than ship something with known flaws', dimension: 'C', weight: 1 },
  },
  {
    id: 'q11',
    optionA: { text: 'I make bold calls and stand behind them', dimension: 'D', weight: 1 },
    optionB: { text: 'I present options with pros and cons and let the facts decide', dimension: 'C', weight: 1 },
  },
  {
    id: 'q12',
    optionA: { text: 'I focus on the big picture and leave the details to others', dimension: 'D', weight: 1 },
    optionB: { text: 'I want to understand the details before signing off', dimension: 'C', weight: 1 },
  },

  // --- I vs S ---
  {
    id: 'q13',
    optionA: { text: 'I get energy from meeting new people and new situations', dimension: 'I', weight: 1 },
    optionB: { text: 'I get energy from spending time with people I already know well', dimension: 'S', weight: 1 },
  },
  {
    id: 'q14',
    optionA: { text: 'I volunteer for new initiatives even when the path is unclear', dimension: 'I', weight: 1 },
    optionB: { text: 'I prefer to support existing initiatives where I know the expectations', dimension: 'S', weight: 1 },
  },
  {
    id: 'q15',
    optionA: { text: 'I am often the one who speaks up first in a group', dimension: 'I', weight: 1 },
    optionB: { text: 'I listen carefully and speak when I have something specific to add', dimension: 'S', weight: 1 },
  },
  {
    id: 'q16',
    optionA: { text: 'I thrive on variety and get restless doing the same thing for too long', dimension: 'I', weight: 1 },
    optionB: { text: 'I find comfort in routines and consistent processes', dimension: 'S', weight: 1 },
  },

  // --- I vs C ---
  {
    id: 'q17',
    optionA: { text: 'I start many projects because the ideas keep coming', dimension: 'I', weight: 1 },
    optionB: { text: 'I finish what I start before taking on something new', dimension: 'C', weight: 1 },
  },
  {
    id: 'q18',
    optionA: { text: 'I share my excitement about an idea before fully thinking it through', dimension: 'I', weight: 1 },
    optionB: { text: 'I keep ideas to myself until I have worked through the details', dimension: 'C', weight: 1 },
  },
  {
    id: 'q19',
    optionA: { text: 'I convince people through stories and enthusiasm', dimension: 'I', weight: 1 },
    optionB: { text: 'I convince people through evidence and careful reasoning', dimension: 'C', weight: 1 },
  },
  {
    id: 'q20',
    optionA: { text: 'I would rather brainstorm possibilities than evaluate risks', dimension: 'I', weight: 1 },
    optionB: { text: 'I would rather evaluate risks than brainstorm possibilities', dimension: 'C', weight: 1 },
  },

  // --- S vs C ---
  {
    id: 'q21',
    optionA: { text: 'I prioritize how people feel about a decision over whether it is technically optimal', dimension: 'S', weight: 1 },
    optionB: { text: 'I prioritize whether a decision is technically sound over how people feel about it', dimension: 'C', weight: 1 },
  },
  {
    id: 'q22',
    optionA: { text: 'I adapt my approach to keep the team comfortable', dimension: 'S', weight: 1 },
    optionB: { text: 'I stick to the right approach even if it makes people uncomfortable', dimension: 'C', weight: 1 },
  },
  {
    id: 'q23',
    optionA: { text: 'When giving feedback, I focus on what they did well first', dimension: 'S', weight: 1 },
    optionB: { text: 'When giving feedback, I focus on what needs to be fixed first', dimension: 'C', weight: 1 },
  },
  {
    id: 'q24',
    optionA: { text: 'I find it hard to turn down requests, even when my plate is full', dimension: 'S', weight: 1 },
    optionB: { text: 'I say no to requests unless I see a clear reason to say yes', dimension: 'C', weight: 1 },
  },
];
