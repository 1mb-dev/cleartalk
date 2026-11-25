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

// strengths[0] and blindSpots[0] render on the person page followed by " - lean into this" /
// " - watch for this": keep them free of end punctuation and of " - ".
// communicationDefault, strengths and blindSpots describe the reader on their own profile and
// another person on that person's page, so they stay subject-less.
export const typeProfiles: Record<DiscType, TypeProfile> = {
  D: {
    type: "D",
    label: "Drive",
    tagline: "Wants the decision made and the work moving.",
    strengths: [
      "Makes a call and stands behind it",
      "Cuts to what matters when things get muddy",
      "Will have the hard conversation other people put off",
    ],
    blindSpots: [
      "Can steamroll quieter people without noticing",
      "Gives the what without the why, so people feel left out of it",
      "Impatience comes across as dismissive to people who need time to think",
      "Sounds blunt to people who don't know them yet",
    ],
    underStress: "Takes over. Sentences get shorter. Makes the call alone and tells people afterward. Starts reading hesitation as incompetence.",
    communicationDefault: "Starts with the conclusion and keeps it short. Would rather leave with action items than keep talking. Gets restless when a conversation wanders.",
    growthAreas: [
      "Before you decide, ask one question.",
      "Give the reason along with the decision.",
      "After you ask a question, let the quiet sit. Don't fill it.",
    ],
  },
  I: {
    type: "I",
    label: "Influence",
    tagline: "Wants people in the room and ideas in the air.",
    strengths: [
      "Lifts the mood of a room",
      "Introduces people who wouldn't otherwise meet",
      "Finds the angle nobody else saw",
      "Makes hard topics easier to bring up",
    ],
    blindSpots: [
      "Excitement can run ahead of the follow-through",
      "Thinks out loud, and people hear a promise where there was only an idea",
      "Can do most of the talking and miss that the quiet ones have checked out",
      "Puts off hard feedback to protect the relationship",
    ],
    underStress: "Gets scattered. Starts something new rather than face what's stuck. Talks more and listens less. Looks for reassurance and calls it collaboration.",
    communicationDefault: "Starts with a story. Thinks out loud. Would rather talk face to face than write it down. Expects a warm response and takes a neutral face as a bad sign.",
    growthAreas: [
      "Write down what you agreed to and send it the same day.",
      "Ask \"What do you think?\" and wait for the whole answer.",
      "Give the hard feedback while it's still fresh.",
    ],
  },
  S: {
    type: "S",
    label: "Steady",
    tagline: "Wants people looked after and things on track.",
    strengths: [
      "Listens closely and remembers what matters to people",
      "Does what they said they'd do",
      "Holds a team together when things get rough",
      "Makes it feel safe to speak up, without trying",
    ],
    blindSpots: [
      "Says \"yes\" when they mean \"I'm not comfortable, but I won't say so\"",
      "Lets conflict build until it comes out sideways",
      "Agrees to a change, then quietly keeps doing it the old way",
      "Takes on other people's stress and keeps their own needs quiet",
    ],
    underStress: "Goes quiet. Agrees to things they won't do. Vents to someone they trust instead of the person involved. Digs in without saying so.",
    communicationDefault: "Starts by listening and asks how the other person is doing. Rarely interrupts. Prefers one-on-one to a group. Won't bring up a disagreement unless someone asks.",
    growthAreas: [
      "Try \"Let me think about that\" instead of \"Sure.\"",
      "Say what you think before anyone asks. When you stay quiet, people can't tell where you stand.",
      "Name the discomfort early: \"This is hard for me to say, but I'm going to say it.\"",
    ],
  },
  C: {
    type: "C",
    label: "Clarity",
    tagline: "Wants it right before it's called done.",
    strengths: [
      "Catches problems other people miss",
      "Asks the question that heads off an expensive mistake",
      "Does the homework, so decisions hold up when questioned",
    ],
    blindSpots: [
      "Can keep analyzing past the point where it helps",
      "Points out problems without a way forward, which wears people down",
      "Keeps feelings out of it, and people read that as cold or judging",
      "Holds on to finished work, waiting for it to be perfect",
    ],
    underStress: "Pulls back. Gets more critical and says less. Asks for more data to put off committing. Finds a flaw in every option without offering one of their own.",
    communicationDefault: "Starts with the facts. Would rather read it than hear it. Asks exact questions and gets uneasy when the answers are vague. Expects people to come prepared.",
    growthAreas: [
      "When you spot a problem, bring one possible fix with it.",
      "Share your thinking earlier. People can't answer a concern they haven't heard.",
      "Pick a deadline and keep it, even if the work isn't perfect yet.",
    ],
  },
};
