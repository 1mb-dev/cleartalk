import type { CoachingCard } from '../../engine/types.ts';

const cards: CoachingCard[] = [
  // D -> D
  {
    yourType: "D",
    theirType: "D",
    situation: "request",
    approach: "Treat it as a deal, and put your terms on the table first: what you need, by when, and what it gets them. You'll both want to win it, so decide before you go in what you'd trade and where you'd walk away.",
    openWith: [
      "I need [this] by [day]. It unblocks [what], and that gets us both there faster.",
      "Straight ask: can you take on [this]? It's holding up [what].",
      "If you take [this], I'll take [what you can give] off your plate.",
    ],
    avoid: [
      "Hinting.",
      "Calling it a favor. Say what it gets them.",
      "Leaving the deadline open. Without a date it slides down their list.",
    ],
    theirReaction: "A fast yes or no, usually with a counter on scope or timing. A counter means they're in, so trade on it. Push back on a no once, with smaller terms. A second no is the answer.",
    ifGoesWrong: "If they say no flat out, don't argue the reasons. Make your one counter: \"Fair. What could you do by [day]?\"",
    bodyLanguage: "Sit or stand upright. Look at them when you make the ask. Keep still while they weigh it up.",
    onCall: "Make the ask before anyone shares a screen.",
  },
  // D -> I
  {
    yourType: "D",
    theirType: "I",
    situation: "request",
    approach: "Ask rather than assign: your usual directness can land as an order. Tell them who it helps and who they'd be working with, then get a date on it.",
    openWith: [
      "Would you be up for leading [this]? You'd be working with [who].",
      "Would you take [this] on? It'd help [who] a lot.",
      "When could I see a first bit?",
    ],
    avoid: [
      "Handing it over like a ticket. Say why it matters and who it's for.",
      "Leaving with \"sounds fun!\" and no date.",
    ],
    theirReaction: "A quick, happy yes, usually. Their yes can run ahead of their calendar, and a date they name holds better than one you hand them. Ask them for it before you leave.",
    ifGoesWrong: "When it starts slipping, go back early: \"You've got a lot on. What's the one part you can have done by [day]?\"",
    bodyLanguage: "Smile when you make the ask. Sit at their level. Let your hands move a little more than usual.",
    onCall: "Put the date they named in the chat before you hang up.",
  },
  // D -> S
  {
    yourType: "D",
    theirType: "S",
    situation: "request",
    approach: "Give the context before the ask: why this, why now, and how it fits with what's already on their plate. At your usual pace it can sound like there's only one answer, so slow down and check whether they're on board or just going along.",
    openWith: [
      "I'd like your help with [this]. Can I give you the background first?",
      "Could you take [this] on? What would you have to move to make room for it?",
      "Does [the date] work for you, or is that tight?",
    ],
    avoid: [
      "Dropping an urgent ask with no context. They may say yes and resent it quietly.",
      "Taking silence as agreement to the scope.",
      "Stacking several asks into one conversation.",
    ],
    theirReaction: "Usually a yes. Whether they can do it is a separate question. Watch for a pause before the yes, and treat \"I'll try\" as a maybe.",
    ifGoesWrong: "When the yes starts to look stretched, raise it yourself, because they probably won't: \"I want to check on what I asked for. Is the timeline working, or should we change something?\"",
    bodyLanguage: "Sit down. Speak at an easy pace and lean back. Ask, then wait without hovering.",
    onCall: "Mute after you ask so you don't fill the pause.",
  },
  // D -> C
  {
    yourType: "D",
    theirType: "C",
    situation: "request",
    approach: "Spell out the detail with the ask: what you need, to what standard, by when, and what it's for. \"Just get it done\" leaves them guessing, and knowing what it feeds tells them where to be exact and where good enough will do.",
    openWith: [
      "I need [this] by [date], and it has to [pass the audit]. What questions do you have?",
      "It feeds [the budget call] on [day], so [the totals] need to be exact. The rest can be rough.",
      "Can you walk through it with me and tell me what's missing?",
    ],
    avoid: [
      "Giving a loose brief and expecting them to fill it in. They'll overbuild it or stall.",
      "Changing the requirements partway without saying why.",
      "Pushing for speed without saying which parts can be rough.",
    ],
    theirReaction: "Questions first, and plenty of them. That's usually how they get to yes. Answer precisely, and if you don't know, say so instead of guessing.",
    ifGoesWrong: "When the questions keep coming and nothing has started: \"Given what we know today, what's your best call? We can refine it, but I need a first version by [day].\"",
    bodyLanguage: "Bring it written down. Sit across a table. Keep your pace even, because hurry looks like you haven't thought it through.",
    onCall: "Send the brief ahead so they've read it by the time you dial in.",
  },
  // I -> D
  {
    yourType: "I",
    theirType: "D",
    situation: "request",
    approach: "Put the ask in your first sentence and the reason in your second. The story you'd normally open with can wait until after they've answered, and once you have a yes, you're done.",
    openWith: [
      "I need a quick decision: can we [move the launch to the 14th]?",
      "Can you commit to [this] by [day]? It's blocking [what].",
      "Short version: I need your sign-off on [this], and it can't wait because [why].",
    ],
    avoid: [
      "Setting up context before the ask.",
      "Making it sound optional when it isn't.",
      "Leaning on the relationship to get the yes. Give the reason.",
      "Talking past the yes. Say thanks and go.",
    ],
    theirReaction: "A fast decision, and a yes is usually firm. A counter on scope or timing means they're in, so negotiate it straight.",
    ifGoesWrong: "If they say no, skip the charm: \"What would it take to make this work? I can move on [the date].\"",
    bodyLanguage: "Keep your hands quieter than usual. Sit or stand at their eye level. Make the ask in a steady voice, then stop.",
    onCall: "Say the ask and don't add a second sentence.",
  },
  // I -> I
  {
    yourType: "I",
    theirType: "I",
    situation: "request",
    approach: "This will be fun and may produce zero results. You'll both get excited and both say yes. Enjoy the ideas, then before you finish, agree who does what by when, and which of you sends the recap.",
    openWith: [
      "I've got an idea we could team up on. Hear me out, then let's split it up.",
      "I need your help with [this]. Got twenty minutes to sketch it out?",
      "Before we run off: you're doing [what], I'm doing [what], and I'll send the recap.",
    ],
    avoid: [
      "Getting so carried away that nobody writes anything down.",
      "Both of you saying \"yes!\" without saying what the yes covers.",
    ],
    theirReaction: "An instant, happy yes. Trust the intent and check the follow-through with a short recap within the hour: \"Just confirming: you're doing [this] by [day], right?\"",
    ifGoesWrong: "When it slips, go back to it warmly: \"We got a bit carried away last time. Ten minutes now on the next step?\"",
    bodyLanguage: "Match their pace. Lean in, talk with your hands. When you get to who does what, slow down and lower your voice.",
    onCall: "Type the next steps in the chat while you're both still on.",
  },
  // I -> S
  {
    yourType: "I",
    theirType: "S",
    situation: "request",
    approach: "Ask once, plainly, then give them time to answer. Your enthusiasm can carry them into a yes they can't deliver. If no is a real option, say so; if it isn't, say that too, and ask what it would push out.",
    openWith: [
      "I'd love your help with [this]. If it doesn't fit with everything else, tell me. I'd rather know now.",
      "I need [this] by [day]. What would have to move to make room for it?",
      "Have a think, and tell me by [day] if it works for you.",
    ],
    avoid: [
      "Being so excited about it that there's no room to say no.",
      "Taking a quiet yes as buy-in without checking.",
    ],
    theirReaction: "Expect a yes, whatever they think of it. Ask, \"What would make this hard for you?\" If they go quiet, there's usually something. Wait for it.",
    ifGoesWrong: "If they agreed but are struggling, go back gently: \"I think I came on too strong with this. What's realistic for you right now?\"",
    bodyLanguage: "Lower your volume and slow down. Sit beside them. Keep your hands still and lean back when you ask.",
    onCall: "Send the details afterwards so they can think it over without you on the line.",
  },
  // I -> C
  {
    yourType: "I",
    theirType: "C",
    situation: "request",
    approach: "Turn the idea into specifics before you go in: scope, deadline, and the standard it has to meet. Write it up as a short brief. \"It'll be amazing\" gives them nothing to work with.",
    openWith: [
      "I've written up what I need. Can you read it and tell me if it makes sense?",
      "If I think of more, I'll send it as a separate note. This is the brief.",
    ],
    avoid: [
      "Selling the idea without saying what you need delivered.",
      "Changing the brief because you had a new idea halfway through.",
      "Leaving them to fill gaps you skipped.",
    ],
    theirReaction: "Often a careful read, then questions on scope or a push on the date. Answer precisely, and skip the pep talk.",
    ifGoesWrong: "When they say the scope isn't realistic, don't sell harder: \"Which parts don't work, and what would a realistic version look like?\"",
    bodyLanguage: "Sit across a table with the brief between you. Keep your gestures small. When they ask something, pause before you answer instead of riffing.",
    onCall: "Share the brief on screen and let them read before you talk.",
  },
  // S -> D
  {
    yourType: "S",
    theirType: "D",
    situation: "request",
    approach: "Say the ask first, in one sentence you wrote down beforehand. Give the context only if they ask for it.",
    openWith: [
      "I need [this] from you by [day]. It matters because [why].",
      "Got five minutes? I've got a specific ask that affects [the timeline].",
      "I need your decision on [this]. I can give you the background in half a minute.",
    ],
    avoid: [
      "Explaining the background before the ask. They'll cut in.",
      "Turning a need into a question. \"Would you maybe consider\" tells them it's optional.",
      "Taking a quick no as final. Come back once, with different terms.",
    ],
    theirReaction: "A fast answer, and a no usually comes with a short reason. A yes means they'll want it moving today, so know your first step.",
    ifGoesWrong: "If they brush you off with \"later\", pin it down: \"When's good? This is blocking me, and two minutes will do it.\"",
    bodyLanguage: "Match their posture: stand if they're standing. Shoulders square, hands still. Say the ask to their face.",
    onCall: "Say the ask before any small talk.",
  },
  // S -> I
  {
    yourType: "S",
    theirType: "I",
    situation: "request",
    approach: "Ask plainly and say why it matters, because a gentle ask can sound optional to them. The yes comes easily and the plan doesn't, so ask what they'll do first.",
    openWith: [
      "I need your help with [this], and it matters because [why].",
      "Can you have [this] by [day]? I'm counting on it for [what].",
      "Great. What's the first thing you'll do on it?",
    ],
    avoid: [
      "Taking a cheerful \"sure!\" as a commitment.",
      "Letting it drift into other topics before you've got the yes.",
    ],
    theirReaction: "A warm yes, often on the spot. Confirm it before you leave, and send it in writing after: \"So you'll have [this] by [day]. Does that work?\"",
    ifGoesWrong: "If it slips, check in early and lightly: \"Just checking on [this]. Is [day] still good, or do we need to change something?\"",
    bodyLanguage: "Smile, nod, sit comfortably. When you get to the details, sit up a little.",
    onCall: "Read the date back to them before you hang up.",
  },
  // S -> S
  {
    yourType: "S",
    theirType: "S",
    situation: "request",
    approach: "Say exactly what you need, more plainly than feels polite. When neither of you likes imposing, the ask can disappear into the courtesy. Say which parts are fixed and which can bend, or they'll stretch to meet all of it.",
    openWith: [
      "I need to ask you for something, and I'll be straight about it: [what], by [day].",
      "The fixed part is [the date]. [How you get there] is up to you.",
    ],
    avoid: [
      "Both of you being so polite that the ask never gets said.",
      "Saying \"only if you have time\" when you need it done regardless.",
      "Apologizing for asking. It makes the ask harder to hear.",
    ],
    theirReaction: "A sincere yes, and they'll take it seriously. Listen for \"I'll try\" or a yes that comes too fast, and ask what else is on their plate.",
    ifGoesWrong: "If they agreed but are swamped, say it: \"I think I asked too much. Which part can you handle? Let's work out the rest.\"",
    bodyLanguage: "Sit facing them, relaxed. Keep your voice even, with no apology in it. Look at them when you ask, then give them room to think.",
    onCall: "Wait out the pause after the ask.",
  },
  // S -> C
  {
    yourType: "S",
    theirType: "C",
    situation: "request",
    approach: "Write it down before you go in: what you need, why, and what \"done\" looks like. Every gap you leave comes back later as a question, or gets filled with a guess.",
    openWith: [
      "I need help with [this]. I've written down what's involved and what done looks like.",
      "Could you take on [this]? The details are in here; tell me what's unclear.",
    ],
    avoid: [
      "Leaving it open. \"Whatever you think is best\" gives them nothing to work with.",
      "Changing the scope after they've started.",
      "Skipping the why. They need it to make good calls along the way.",
    ],
    theirReaction: "Expect a careful look and some clarifying questions before they start. If they ask the same thing twice, your write-up has a gap. Fix it on the page as well as out loud.",
    ifGoesWrong: "When they say the deadline is too tight for the standard: \"What would it take to do this properly: more time, or a smaller scope?\"",
    bodyLanguage: "Sit at a table with your notes. Keep an even pace, and let them read without narrating.",
    onCall: "Send the notes ahead so they can read before you talk.",
  },
  // C -> D
  {
    yourType: "C",
    theirType: "D",
    situation: "request",
    approach: "Ask first, then say what it saves or fixes, one sentence each. Keep the reasoning ready and bring it out only if they ask. If there's a deadline, say it: a clear clock gets you a fast call.",
    openWith: [
      "I need your approval on [this]. It saves us [two weeks]. I've got the details if you want them.",
      "Quick ask: can I have [what] for [the project]? It gets [the release] out on time.",
      "I need a decision on [this] today. I'd go with [option], and the tradeoff is [what].",
    ],
    avoid: [
      "Opening with how you got to the request.",
      "Laying out three options when you have a recommendation. Give them your pick.",
    ],
    theirReaction: "A decision, fast. A no usually comes with the reason. If they ask for the data, you've got their attention, so keep it short.",
    ifGoesWrong: "If they turn you down, don't reopen the analysis. Ask: \"Is it the cost or the timing?\"",
    bodyLanguage: "Stand if they're standing. Steady voice, hands still. Backup data on hand, out of sight.",
    onCall: "Make the ask before you share anything.",
  },
  // C -> I
  {
    yourType: "C",
    theirType: "I",
    situation: "request",
    approach: "Give them the big picture and who it helps first, and hold the detail until they're in. Your thoroughness is what turns their yes into something real, so bring it out once they've said it.",
    openWith: [
      "I'd like your help with something that could [make onboarding a lot easier].",
      "Would you come in on [this]? Let me tell you why first, then we'll get to the details.",
    ],
    avoid: [
      "Opening with the detailed plan.",
      "Leaving without turning the yes into a plan.",
    ],
    theirReaction: "Usually an instant yes. Use it straight away: \"Great. Can we take five minutes on exactly what, when and how, and when we'll check in?\"",
    ifGoesWrong: "When it stalls on the detail work, ask about the stuck part instead of taking it over: \"Which part's stuck? Let's sort that bit now.\"",
    bodyLanguage: "Open posture, a bit of a smile. More animated than usual for the big picture. When you get to the details, sit forward and get your notes out.",
    onCall: "Share the plan on screen only once you reach the details.",
  },
  // C -> S
  {
    yourType: "C",
    theirType: "S",
    situation: "request",
    approach: "Say why it matters before you get to the requirements. Your detail helps, but on its own it can read like a checklist handed down. If the answer can wait, say so and give them a day.",
    openWith: [
      "This matters because [why], and I'd like your help with it.",
      "Do you have room for [this]? I've written up what's involved so you can look it over.",
      "How would you go about it? You might see something I've missed.",
      "When could you let me know? I'd need it by [day] at the latest.",
    ],
    avoid: [
      "Spelling out every detail until it feels like micromanaging.",
      "Reading their quiet as reluctance. They may just be thinking it through.",
    ],
    theirReaction: "A careful think, then usually a yes. If they hesitate, ask: \"What part gives you pause?\"",
    ifGoesWrong: "If they're struggling with the work: \"Is anything unclear in what I asked, or is it too much on top of everything else? Either way, let's sort it out together.\"",
    bodyLanguage: "Sit beside them. Warm, even tone. Put the written requirements between you and let them read without talking over it.",
    onCall: "Send the write-up first, and start talking once they've read it.",
  },
  // C -> C
  {
    yourType: "C",
    theirType: "C",
    situation: "request",
    approach: "Be thorough, then set a time to decide, and agree what \"good enough to start\" looks like before either of you edits the brief. Left alone, the two of you could polish this request for a week.",
    openWith: [
      "I've written up the request and what done looks like. Can you check it's doable?",
      "What's your honest read on the timeline for [this]?",
      "Can we know by end of day whether this is doable?",
    ],
    avoid: [
      "Refining the requirements again and again instead of starting.",
      "Assuming they need as much detail as you would. Ask what they need to get started.",
    ],
    theirReaction: "A careful review and a straight answer on whether it's doable, often as a marked-up copy or a list of questions.",
    ifGoesWrong: "When the third round of edits starts: \"Let's lock what we agree on and start. We'll sort out the rest after the first version.\"",
    bodyLanguage: "Sit at a table with the document between you. Point to the line you're talking about. Nod when they make a fair point.",
    onCall: "Work from one shared document, both of you in it.",
  },
];

export default cards;
