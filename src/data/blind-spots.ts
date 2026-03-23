import type { DiscType } from '../engine/types.ts';

export interface TypeProfile {
  type: DiscType;
  label: string;
  tagline: string;
  strengths: string[];
  blindSpots: string[];
  underStress: string;
  communicationDefault: string;
  growthAreas: string[];
}

export const typeProfiles: Record<DiscType, TypeProfile> = {
  D: {
    type: 'D',
    label: 'Drive',
    tagline: 'Results-first. Direct. Decisive.',
    strengths: [
      'Makes decisions quickly and stands behind them',
      'Cuts through ambiguity to focus on what matters',
      'Willing to have difficult conversations others avoid',
      'Keeps momentum when others hesitate',
    ],
    blindSpots: [
      'Can steamroll quieter voices without realizing it',
      'Skips the "why" and jumps to the "what" -- people feel uninvolved',
      'Impatience reads as dismissal to people who process slowly',
      'Directness lands as bluntness when the relationship is new',
    ],
    underStress: 'Becomes more controlling. Shortens sentences. Makes unilateral decisions and tells people after. Interprets hesitation as incompetence.',
    communicationDefault: 'Leads with the conclusion, keeps it brief, expects others to keep up. Prefers action items over discussion. Gets visibly restless during open-ended exploration.',
    growthAreas: [
      'Pause before deciding -- ask one question first',
      'State the reason behind the decision, not just the decision',
      'Let silence exist after asking a question -- do not fill it',
    ],
  },
  I: {
    type: 'I',
    label: 'Influence',
    tagline: 'Enthusiastic. Optimistic. People-first.',
    strengths: [
      'Builds energy and excitement in a room',
      'Connects people who would not otherwise meet',
      'Finds creative angles others miss',
      'Makes difficult topics feel approachable',
    ],
    blindSpots: [
      'Enthusiasm can overshadow follow-through',
      'Talks through ideas aloud -- listeners may hear commitment where there is only exploration',
      'Dominates conversations without noticing the quiet ones checked out',
      'Avoids difficult feedback because it threatens the relationship',
    ],
    underStress: 'Becomes scattered. Starts new initiatives to avoid the stuck ones. Talks more, listens less. Seeks reassurance disguised as collaboration.',
    communicationDefault: 'Leads with stories and energy. Thinks out loud. Prefers face-to-face over written. Expects positive reception and reads neutrality as negativity.',
    growthAreas: [
      'Write down commitments in the moment -- spoken agreements evaporate',
      'Ask "what do you think?" and wait for the full answer',
      'Deliver the hard feedback -- the relationship survives honesty better than avoidance',
    ],
  },
  S: {
    type: 'S',
    label: 'Steady',
    tagline: 'Patient. Supportive. Consistent.',
    strengths: [
      'Holds teams together during turbulence',
      'Listens deeply and remembers what matters to people',
      'Follows through reliably -- the person everyone counts on',
      'Creates psychological safety without trying',
    ],
    blindSpots: [
      'Says "yes" when meaning "I am not comfortable but will not say so"',
      'Avoids conflict until it becomes unavoidable -- then it comes out sideways',
      'Resistance to change looks like agreement followed by quiet non-compliance',
      'Absorbs others\' stress without surfacing their own needs',
    ],
    underStress: 'Goes quiet. Agrees to things they will not do. Complains to a trusted third party instead of addressing the source. Becomes passively resistant.',
    communicationDefault: 'Leads by listening. Asks about the other person first. Avoids interrupting. Prefers one-on-one over group settings. Will not volunteer disagreement unless directly asked.',
    growthAreas: [
      'Practice saying "I need to think about that" instead of "sure"',
      'Share your opinion before being asked -- your silence is not neutrality, it is invisible',
      'Name the discomfort early: "This is hard for me, but I need to say..."',
    ],
  },
  C: {
    type: 'C',
    label: 'Clarity',
    tagline: 'Analytical. Precise. Quality-focused.',
    strengths: [
      'Catches problems others miss',
      'Builds systems that work reliably over time',
      'Asks the questions that prevent expensive mistakes',
      'Decisions are well-researched and defensible',
    ],
    blindSpots: [
      'Analysis can delay action past the point of usefulness',
      'Points out problems without offering solutions -- drags morale',
      'Emotional distance reads as coldness or judgment',
      'Perfectionism prevents shipping -- the 95% version never leaves the desk',
    ],
    underStress: 'Withdraws. Becomes more critical and less communicative. Requests more data to avoid committing. Finds flaws in every option without proposing alternatives.',
    communicationDefault: 'Leads with facts and evidence. Prefers written over verbal. Asks precise questions. Uncomfortable with ambiguity. Expects others to come prepared.',
    growthAreas: [
      'When you spot a problem, pair it with one possible solution',
      'Share your reasoning earlier -- people cannot address concerns they do not know about',
      'Good enough and shipped beats perfect and stuck. Pick a deadline and honor it.',
    ],
  },
};
