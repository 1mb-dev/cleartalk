import type { CoachingCard } from '../../engine/types.ts';

const cards: CoachingCard[] = [
  // D -> D
  {
    yourType: "D",
    theirType: "D",
    situation: "pitch",
    approach: "Put the payoff and your ask in your first two sentences. Then raise the biggest objection yourself, with your answer, before they can. Answer each challenge once and move on.",
    openWith: [
      "This saves us [time or money]. To make it happen, I need [what you need].",
      "I've got a fix for [the bottleneck]. Thirty seconds on the idea, then your questions.",
      "The obvious objection is [this one], and I've got an answer for it.",
    ],
    avoid: [
      "Building up to the ask. They'll cut you off before you get there.",
      "Overselling. Give the impact plainly and let them weigh it.",
    ],
    theirReaction: "Usually a fast decision, and a sharp challenge means they're interested. If the answers get short or they glance at the clock, skip to your strongest point.",
    ifGoesWrong: "If they shoot it down, don't argue. Ask: \"What would make this worth your time?\"",
    bodyLanguage: "Stand if they're standing. Look at them, hands still and in view. An even voice.",
    onCall: "Look into the camera, not at their face, when you make the ask.",
  },
  // D -> I
  {
    yourType: "D",
    theirType: "I",
    situation: "pitch",
    approach: "Paint what it looks like when it works: who it helps and what changes for the team. Ask what they'd add while it's still rough, and bring your numbers after.",
    openWith: [
      "Picture the team doing [this] without [the headache]. What would you add?",
      "Can I run an idea past you? I want your take before it's finished.",
    ],
    avoid: [
      "Leading with the spreadsheet. You'll lose them before the first row's done.",
      "Pitching it as yours alone.",
      "Jumping to the execution plan before they've bought in.",
    ],
    theirReaction: "When it clicks you'll see it: they start adding ideas of their own. Pin it down there and then: \"You're in? Great. Let's work out who does what.\" A yes can fade by the end of the week, so follow up in writing the next day.",
    ifGoesWrong: "If they're lukewarm, let them reshape it: \"Which part would you change first?\"",
    bodyLanguage: "Smile, and let your hands move more than usual. Sit at an angle to them. When they warm up, warm up with them.",
    onCall: "Sit a little closer to the camera than you normally would.",
  },
  // D -> S
  {
    yourType: "D",
    theirType: "S",
    situation: "pitch",
    approach: "Show how this builds on what already works, and offer a trial you can undo. Your urgency can feel like pressure, and pressure makes people guard what they have. Ask for the decision after they've had a day or two with it.",
    openWith: [
      "Can I show you what would change, and what would stay the same?",
      "Could we try it on [one small piece] for a couple of weeks, then look at it together?",
      { line: "It's one change to how we do [this]. The rest stays as it is.", onlyIf: "it really is one change" },
    ],
    avoid: [
      "Calling it a shake-up.",
      "Knocking the current way to make yours look better. They may have built it.",
    ],
    theirReaction: "Usually they listen closely and don't commit in the room. That's them thinking it over. Give them the time, and book the follow-up: \"Take a day or two with it. Can we pick it up on [Thursday]?\"",
    ifGoesWrong: "When they push back, don't push harder. Ask: \"What's the part you'd want to keep?\"",
    bodyLanguage: "Sit down, and talk at their pace rather than yours. Sit back after you make a point and let the quiet run.",
    onCall: "Let the pauses run here too. They feel longer on a call than they are.",
  },
  // D -> C
  {
    yourType: "D",
    theirType: "C",
    situation: "pitch",
    approach: "Send the numbers the day before, so they can check them on their own time. They'll judge the pitch by how well it's prepared, and conviction won't cover the gaps. Bring what could go wrong and what you'd do about each.",
    openWith: [
      "I've modeled this out, including where it could break.",
      "I want to do [this], because [why]. Poke holes in it. I'd rather find the gaps now.",
    ],
    avoid: [
      "Getting short with their questions.",
      "Sounding surer than you are, or rounding the numbers in your favor.",
    ],
    theirReaction: "A close cross-examination, often on the number you thought was minor. If your answers hold, they tend to back it firmly.",
    ifGoesWrong: "When they find a flaw, don't bluff: \"Good catch. Let me fix that and get back to you by [day].\"",
    bodyLanguage: "When they question something, look at the figure before you answer. Slow, deliberate movements.",
    onCall: "Share the document and stop on each number they ask about.",
  },
  // I -> D
  {
    yourType: "I",
    theirType: "D",
    situation: "pitch",
    approach: "Cut your story down to the idea, what it gets them, and what you need. Say the punchline first, and know your ask before you walk in: a yes, a budget, an hour of someone's time. The story can come later if they ask for it.",
    openWith: [
      "I'm proposing [this]. It gets us [result] and costs [what]. That's the pitch. Questions?",
      "One idea: [the idea]. It fixes [the problem they raised].",
    ],
    avoid: [
      "Opening with the backstory.",
      "Leaning on enthusiasm to carry it. Bring the result.",
      "Finishing without a clear ask.",
    ],
    theirReaction: "If they lean in and start asking how, you have them. If the answers get short or they glance at the clock, skip ahead: \"Let me get to the numbers.\"",
    ifGoesWrong: "If they turn it down, don't re-pitch louder. Ask: \"What's the deal-breaker?\"",
    bodyLanguage: "Stand still. Keep your hands quiet and your voice a little lower than usual. Look at them when you say the result.",
    onCall: "Sit back from the camera so your hands stay out of frame.",
  },
  // I -> I
  {
    yourType: "I",
    theirType: "I",
    situation: "pitch",
    approach: "Let them add to it, then shrink it back to something you can start this week. Between the two of you, a plan can grow with every idea and never ship. Decide who owns it, because each of you may assume the other does.",
    openWith: [
      "What if we could [do this]? I think we can, and I've got a rough plan.",
      "I've got an idea, and I want us to leave with real next steps.",
    ],
    avoid: [
      "Getting so excited together that nobody pins down what you're making.",
      "Leaving without deciding what's not in the first version.",
    ],
    theirReaction: "Usually they match your excitement right away and start adding to it. Use it, then rein it in: \"OK, we're both in. Before we go, who's taking this, and what happens this week?\"",
    ifGoesWrong: "When it's all vision and no plan: \"I love where this is going. What's one thing we can do by Friday to test it?\"",
    bodyLanguage: "Move and gesture as much as you like while you dream it up. When it's time for specifics, sit down, get out a notepad, and bring your tone down.",
    onCall: "Open a shared doc and type the next steps where they can see them.",
  },
  // I -> S
  {
    yourType: "I",
    theirType: "S",
    situation: "pitch",
    approach: "Tell them who it helps, then ask who it might be harder on: they usually know where a change will land. Give them time before you ask for a yes. Asked on the spot, they'll often give a polite one they don't mean.",
    openWith: [
      "I think there's a way to make [this] easier for the team. Can I run it past you?",
      "I'm excited about this, so tell me if I'm getting ahead of myself.",
      "Who do you think this would affect most?",
    ],
    avoid: [
      "Taking their nodding as a yes. It may just be politeness.",
      "Filling every pause with another reason.",
    ],
    theirReaction: "Often they listen patiently and say little. The real answer tends to come later, by message or a quiet \"I've been thinking about your idea.\"",
    ifGoesWrong: "If they seem hesitant and there's no deadline: \"I don't need a yes today. Think it over, and if anything bothers you, tell me. I'd rather change it than push it through.\"",
    bodyLanguage: "Sit at their level. Talk slower than you want to, and keep your hands calmer. Sit back when you've finished.",
    onCall: "Wait a beat after they stop before you speak. The lag makes it easy to talk over them.",
  },
  // I -> C
  {
    yourType: "I",
    theirType: "C",
    situation: "pitch",
    approach: "Say the idea in a sentence or two, then go straight to the evidence: the numbers, an example or two, and what could go wrong. Point out the weakest part yourself before they find it.",
    openWith: [
      "I've got an idea, and I've done the homework. The idea first, then the numbers.",
      "I'd like to propose [this]. I'll show you the weakest part, too.",
    ],
    avoid: [
      "Pitching on enthusiasm alone. It makes them more skeptical.",
      "Promising results you can't back up.",
      "Conceding a number before you've checked it.",
    ],
    theirReaction: "Interest usually looks quiet: not much reaction, lots of specific questions. When they start asking how it would be done, they're coming round.",
    ifGoesWrong: "When they pick your numbers apart: \"Which one worries you most? Let's check it together.\"",
    bodyLanguage: "Numbers on paper or on screen, in front of you both. Keep your hands still and point at a figure instead of waving at it.",
    onCall: "Share the document and let them read before you explain it.",
  },
  // S -> D
  {
    yourType: "S",
    theirType: "D",
    situation: "pitch",
    approach: "Say the result in your first sentence, even if it feels like boasting. They won't dig for what you leave out. Practice that sentence out loud once before you go in.",
    openWith: [
      "I've got a fix for [the problem]. It saves [what], and I can have it running by [a date you can hit].",
      "I'm proposing [this]. It deals with the problem you raised [when].",
    ],
    avoid: [
      "Burying the result under qualifiers. \"It might help a little\" sinks it.",
      "Offering it as an option. Recommend it.",
      "Waiting for them to ask instead of making the case.",
    ],
    theirReaction: "If the result is clear, a quick yes is common. A challenge usually means they're testing it, so answer with the facts and don't fall back on \"it was just a thought.\"",
    ifGoesWrong: "When they brush it off: \"I undersold that. The real impact is [the result]. Can I have one more minute?\"",
    bodyLanguage: "Stand up straight, chin level. Speak a bit louder than feels comfortable. Look at them when you say the result.",
    onCall: "Say the result before you share any slides.",
  },
  // S -> I
  {
    yourType: "S",
    theirType: "I",
    situation: "pitch",
    approach: "Tell them up front that you're pitching, and what you want from them: a yes, an introduction, a word in the right meeting. Your risk is being so low-key they don't realize it's a pitch. Let their enthusiasm build on it, then pin down when they'll do their part.",
    openWith: [
      "I want to pitch you something, and I'll need your help with [one thing].",
      "You know how we've been struggling with [this]? I think I've found something that works.",
    ],
    avoid: [
      "Being so understated they miss that it's a pitch.",
      "Letting their ideas pull you off your own proposal.",
    ],
    theirReaction: "Often they get excited and start adding ideas. Take the good ones and hold your line: \"I like that. Let's get the base plan solid first.\"",
    ifGoesWrong: "When it went well in the room and nothing has happened since: \"You liked [the idea] last week. Can we agree on one step for this week before it fades?\"",
    bodyLanguage: "Lean in when you share the idea, and let it show that you like it. When it's time for next steps, slow down.",
    onCall: "Put the next steps in the chat and ask them to add the date.",
  },
  // S -> S
  {
    yourType: "S",
    theirType: "S",
    situation: "pitch",
    approach: "Ask for their support in so many words, and tie it to a date. Neither of you will push, so good ideas can die politely between you. You don't need to be forceful, just clear about why it matters and what you want them to back.",
    openWith: [
      "I've got an idea I believe in, and I'd like your support.",
      "This is a change, and I think it's a good one. Can I walk you through it?",
      "Will you back this when it comes up on [day]?",
    ],
    avoid: [
      "Being so polite to each other that it ends in \"whatever you think.\"",
      "Underselling so you don't seem pushy.",
      "Waiting for them to bring the enthusiasm.",
    ],
    theirReaction: "Usually they listen closely and want time before they answer. Once they back something, they tend to stay behind it. Ask for the real view: \"Be straight with me: what don't you like about it?\"",
    ifGoesWrong: "When it stalls in politeness: \"Let me be direct. I think this is worth doing, and I'd like your support. Is anything stopping you?\"",
    bodyLanguage: "Sit facing them. Speak clearly, with a bit more weight than usual. Lean forward a little when you make the main point.",
    onCall: "Keep your camera on and look into it when you ask for their support.",
  },
  // S -> C
  {
    yourType: "S",
    theirType: "C",
    situation: "pitch",
    approach: "Back the idea with your two or three strongest facts, and say plainly where you're least sure. Your sense that it's right is where you start, but they'll want what's under it. Naming the weak spot yourself makes the rest easier for them to believe.",
    openWith: [
      "I've got a proposal, and I've brought the numbers behind it.",
      "I've been looking at [this], and I think there's an opportunity. Here's what I found.",
      "The part I'm least sure of is [this one].",
    ],
    avoid: [
      "Leaning on \"it feels right.\" Show them what it's based on.",
      "Backing down when the questions get hard. Stand by your work.",
    ],
    theirReaction: "Usually careful, specific questions, one after another. If they start suggesting fixes, they're buying in.",
    ifGoesWrong: "If they turn it down on the evidence: \"Thanks for being straight with me. Would you help me fix the weak spots?\"",
    bodyLanguage: "Keep your notes in front of you and use them. Pause before you answer a question. A rushed answer costs more than a quiet moment.",
    onCall: "Keep your notes beside the call window so you're not looking away to find them.",
  },
  // C -> D
  {
    yourType: "C",
    theirType: "D",
    situation: "pitch",
    approach: "Pick one option and recommend it, with the one number that matters. Keep the full analysis in your back pocket. If they don't ask for it, check once before you finish: \"Want the numbers, or is that enough to decide?\"",
    openWith: [
      "I recommend [this]. It gets us [result]. I've got the full analysis if you want it.",
      "We should do [this], because the numbers show [result].",
    ],
    avoid: [
      "Walking through the method before the conclusion.",
      "Laying out options with no pick.",
      "Hedging with caveats. Say where you stand and back it.",
    ],
    theirReaction: "A fast decision, usually. If they push back, it'll be on the recommendation. Answer at that level, because going back into the method loses them.",
    ifGoesWrong: "If they turn it down: \"Understood. What would you need to see to say yes? I can rerun it against that.\"",
    bodyLanguage: "Look at them when you give the recommendation. Keep still. Have the backup on your laptop, closed until they ask.",
    onCall: "Share one slide with the number on it and nothing else.",
  },
  // C -> I
  {
    yourType: "C",
    theirType: "I",
    situation: "pitch",
    approach: "Wrap the analysis in a story. Open with what becomes possible and who it helps, by name if you can, then bring the numbers. Expect them to add ideas, and take the ones you can.",
    openWith: [
      "I think we can [do this], and the numbers say it's doable.",
      "Something in the data surprised me. Want to see what it could mean for the team?",
      "This would mean [name] doesn't have to [the chore] anymore.",
    ],
    avoid: [
      "Opening with the method. Start with what changes for people.",
      "Going so deep on detail that the excitement dies before it starts.",
      "Waving off their additions as unrealistic. Use what fits and park the rest.",
    ],
    theirReaction: "Usually they get excited and start building on it. Let them, then sort it: \"I like those. Let me map them onto the plan and see what fits now.\"",
    ifGoesWrong: "When their attention drifts: \"I led with too much detail. Here's the point: [this] changes [what] for the team.\"",
    bodyLanguage: "Open up your posture and smile when you describe the idea. Use your hands more than you normally would. When you get to the numbers, bring out the material and settle.",
    onCall: "Show one picture or chart before any table.",
  },
  // C -> S
  {
    yourType: "C",
    theirType: "S",
    situation: "pitch",
    approach: "Start with what it changes for the people doing the work, then bring the data. Ask what would worry them, because they'll often spot what the analysis missed. Give them time to decide.",
    openWith: [
      "I've got a proposal for [this]. I'd like to start with what it changes day to day.",
      "What would worry the people doing this every day?",
      { line: "It's a small change, and the risk is low. Let me show you why.", onlyIf: "your numbers back that up" },
    ],
    avoid: [
      "Calling it a transformation.",
      "Getting so deep in the data that you skip how it affects people.",
    ],
    theirReaction: "Often they listen closely and say little at first. Book the next conversation: \"Can we go through your questions on [Thursday]?\"",
    ifGoesWrong: "When they seem unsure: \"Take the analysis with you and go through it at your own pace. What questions should I be ready for?\"",
    bodyLanguage: "Sit beside them and go through the documents together. Match their pace. When they go quiet, wait, and don't fill it with more data.",
    onCall: "Share your screen and stop talking while they read.",
  },
  // C -> C
  {
    yourType: "C",
    theirType: "C",
    situation: "pitch",
    approach: "Name the analysis's limits before they find them, and still finish with a clear recommendation. They'll check your method as hard as your conclusion, so ask early what result would change their mind.",
    openWith: [
      "My recommendation is [this]. The weakest assumption is [this one], and I'd like you to push on it.",
      "I tried to break this myself. It held up on [this], and I still see risk in [that].",
      "What result would change your mind either way?",
    ],
    avoid: [
      "Overstating how sure you are.",
      "Turning it into a contest over who's more rigorous.",
      "Spending so long on method that you never reach the recommendation.",
    ],
    theirReaction: "Precise questions, and if they find a flaw they'll usually say so straight out. Thank them and fix it. Suggested refinements mean they're working on it with you.",
    ifGoesWrong: "If they reject the analysis: \"Which assumptions do you disagree with? I'd rather fix those than start over.\"",
    bodyLanguage: "Have the source material open between you. When they challenge something, look up the figure together instead of arguing from memory.",
    onCall: "Share the source file instead of a screenshot so you can both check it.",
  },
];

export default cards;
