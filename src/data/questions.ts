import type { AssessmentQuestion } from '../engine/types.ts';

/**
 * 24 forced-choice questions, 4 per dimension pairing.
 * Each question pits two DISC dimensions against each other.
 * Questions describe observable behaviors in everyday situations.
 * Both options in a pair should cost something, so neither reads as the right answer.
 *
 * Pairings (4 questions each, 6 pairings = 24 total):
 *   D vs I, D vs S, D vs C, I vs S, I vs C, S vs C
 * Each dimension appears in 12 questions (3 pairings x 4 questions).
 */
export const questions: AssessmentQuestion[] = [
  // --- D vs I ---
  {
    id: "q01",
    optionA: { text: "In meetings, I push to get to a decision", dimension: "D", weight: 1 },
    optionB: { text: "In meetings, I make sure everyone's had their say before we decide", dimension: "I", weight: 1 },
  },
  {
    id: "q02",
    optionA: { text: "I'll risk some friction to win an argument I think matters", dimension: "D", weight: 1 },
    optionB: { text: "I'll let a point go to keep everyone's spirits up", dimension: "I", weight: 1 },
  },
  {
    id: "q03",
    optionA: { text: "When a project stalls, I take charge and hand out next steps", dimension: "D", weight: 1 },
    optionB: { text: "When a project stalls, I get people excited about it again", dimension: "I", weight: 1 },
  },
  {
    id: "q04",
    optionA: { text: "Small talk makes me impatient. I want to get to the point", dimension: "D", weight: 1 },
    optionB: { text: "I like the small talk. It's where relationships start", dimension: "I", weight: 1 },
  },

  // --- D vs S ---
  {
    id: "q05",
    optionA: { text: "I'd rather decide fast and fix it later", dimension: "D", weight: 1 },
    optionB: { text: "I'd rather take my time and get it right the first time", dimension: "S", weight: 1 },
  },
  {
    id: "q06",
    optionA: { text: "I don't mind being the one who shakes things up", dimension: "D", weight: 1 },
    optionB: { text: "I'd rather keep things stable, so people know what to expect", dimension: "S", weight: 1 },
  },
  {
    id: "q07",
    optionA: { text: "If something isn't working, I'd rather scrap it and start again", dimension: "D", weight: 1 },
    optionB: { text: "If something isn't working, I'd rather fix it a piece at a time", dimension: "S", weight: 1 },
  },
  {
    id: "q08",
    optionA: { text: "I set big targets, even ones other people think are out of reach", dimension: "D", weight: 1 },
    optionB: { text: "I set targets I know the team can hit, and hit again", dimension: "S", weight: 1 },
  },

  // --- D vs C ---
  {
    id: "q09",
    optionA: { text: "I trust my gut and move, even without the full picture", dimension: "D", weight: 1 },
    optionB: { text: "I want to see the numbers before I pick a direction", dimension: "C", weight: 1 },
  },
  {
    id: "q10",
    optionA: { text: "Good enough today beats perfect next month", dimension: "D", weight: 1 },
    optionB: { text: "I'd rather wait than put out something I know has flaws", dimension: "C", weight: 1 },
  },
  {
    id: "q11",
    optionA: { text: "I make the bold call and stand behind it", dimension: "D", weight: 1 },
    optionB: { text: "I lay out the options, pros and cons, and let the facts decide", dimension: "C", weight: 1 },
  },
  {
    id: "q12",
    optionA: { text: "I keep my eye on the big picture and trust others with the details", dimension: "D", weight: 1 },
    optionB: { text: "I want to understand the details before I sign off", dimension: "C", weight: 1 },
  },

  // --- I vs S ---
  {
    id: "q13",
    optionA: { text: "New people and new situations give me a boost", dimension: "I", weight: 1 },
    optionB: { text: "Time with people I already know well is what recharges me", dimension: "S", weight: 1 },
  },
  {
    id: "q14",
    optionA: { text: "I sign up for new things, even when nobody's sure where they'll go", dimension: "I", weight: 1 },
    optionB: { text: "I'd rather help with something already running, where I know what's expected", dimension: "S", weight: 1 },
  },
  {
    id: "q15",
    optionA: { text: "In a group, I'm often the one who gets the conversation going", dimension: "I", weight: 1 },
    optionB: { text: "In a group, I listen for a while and speak when I've got something specific to add", dimension: "S", weight: 1 },
  },
  {
    id: "q16",
    optionA: { text: "I like variety. Doing the same thing for too long makes me restless", dimension: "I", weight: 1 },
    optionB: { text: "I like a routine. Knowing how things will go puts me at ease", dimension: "S", weight: 1 },
  },

  // --- I vs C ---
  {
    id: "q17",
    optionA: { text: "The ideas keep coming, so I usually have several things on the go", dimension: "I", weight: 1 },
    optionB: { text: "I finish one thing before I start the next", dimension: "C", weight: 1 },
  },
  {
    id: "q18",
    optionA: { text: "I share an idea while I'm still excited about it, before it's all worked out", dimension: "I", weight: 1 },
    optionB: { text: "I keep an idea to myself until I've worked through the details", dimension: "C", weight: 1 },
  },
  {
    id: "q19",
    optionA: { text: "I win people over with stories and enthusiasm", dimension: "I", weight: 1 },
    optionB: { text: "I win people over with evidence and a careful argument", dimension: "C", weight: 1 },
  },
  {
    id: "q20",
    optionA: { text: "Give me a whiteboard and I'll fill it with possibilities", dimension: "I", weight: 1 },
    optionB: { text: "Give me a plan and I'll find the risks in it", dimension: "C", weight: 1 },
  },

  // --- S vs C ---
  {
    id: "q21",
    optionA: { text: "I'd pick a decision people can live with over the best one on paper", dimension: "S", weight: 1 },
    optionB: { text: "I'd pick the best decision on paper, even if some people are unhappy with it", dimension: "C", weight: 1 },
  },
  {
    id: "q22",
    optionA: { text: "I'll change how I do things to keep the team comfortable", dimension: "S", weight: 1 },
    optionB: { text: "I'll stick with the approach I think is right, even if it makes people uncomfortable", dimension: "C", weight: 1 },
  },
  {
    id: "q23",
    optionA: { text: "When I give feedback, I start with what went well", dimension: "S", weight: 1 },
    optionB: { text: "When I give feedback, I start with what needs fixing", dimension: "C", weight: 1 },
  },
  {
    id: "q24",
    optionA: { text: "I usually say yes to requests, even when my plate's full", dimension: "S", weight: 1 },
    optionB: { text: "I usually say no to requests unless I can see a good reason to say yes", dimension: "C", weight: 1 },
  },
];
