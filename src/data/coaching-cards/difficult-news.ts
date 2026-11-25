import type { CoachingCard } from '../../engine/types.ts';

const cards: CoachingCard[] = [
  // D -> D
  {
    yourType: "D",
    theirType: "D",
    situation: "difficult_news",
    approach: "News in your first sentence, plan in your second. If it was your call that went wrong, own it once and move on. Decide before you walk in that you won't argue back when they push.",
    openWith: [
      "Straight to it: [what happened]. What I'd do next is [your plan].",
      "Bad news: [what we've lost] is off the table. I've got a rough plan.",
      { line: "That one's on me. Here's how I'd fix it.", onlyIf: "it was your call" },
    ],
    avoid: [
      "Warming up with background before the news.",
      "Coming in without a next step. A rough one beats none.",
    ],
    theirReaction: "Usually a flash of frustration and a few sharp questions, then a fast turn to fixing it. Once they ask \"So what do we do?\", the worst is over.",
    ifGoesWrong: "When they aim it at you: \"Yeah, it's a bad one. Where do you want to start?\"",
    bodyLanguage: "Sit or stand square, shoulders back. Look at them when you say it. Pause once it's out, then lean in for the plan.",
    onCall: "Look at the camera for the headline, then put the plan on screen.",
  },
  // D -> I
  {
    yourType: "D",
    theirType: "I",
    situation: "difficult_news",
    approach: "Give them one human sentence before the news. Let them react out loud before you get to the fix.",
    openWith: [
      "I wanted you to hear this from me: [what happened].",
      "I'll know more by [when], and I'll tell you as soon as I do.",
    ],
    avoid: [
      "Jumping to logistics the moment the news is out.",
      "Delivering it like a status update.",
      "Telling them not to take it personally. They will.",
    ],
    theirReaction: "It shows on their face and out loud: disappointment, and often some thinking aloud. When they start asking what happens next, they're ready for your plan.",
    ifGoesWrong: "If it knocks them flat: \"That hit hard. Take a minute. When you're ready, I've got some ideas for what we do next.\"",
    bodyLanguage: "Sit at their level and lean in a little. Talk slower and a bit quieter than you usually do. If they get upset, stay put and keep your hands still.",
    onCall: "Keep your camera on and your eyes off other windows while they talk.",
  },
  // D -> S
  {
    yourType: "D",
    theirType: "S",
    situation: "difficult_news",
    approach: "Say it clearly and gently, then stay. A calm face often hides how hard it's landing. Say what isn't changing only if you know it for certain, and either way, tell them what happens next and when.",
    openWith: [
      "I've got hard news, and I've kept time free to talk it through. [What's happening].",
      { line: "Before anything else, your job isn't changing. [What is changing] is.", onlyIf: "you know for certain their job isn't changing" },
      "Here's what happens next, and when: [the next step].",
    ],
    avoid: [
      "Saying it and heading for the door.",
      "Rushing to the plan before it's sunk in.",
      "Taking their calm as a sign they're fine. Ask.",
    ],
    theirReaction: "Often they go very still and nod, and the real impact shows later as quiet worry or pulling back. They may ask whether they did something wrong; answer that one straight. Book a check-in for the next day before you leave the room.",
    ifGoesWrong: "If they shut down: \"It's a lot. You don't have to say anything now. I'll come and find you tomorrow at [time].\"",
    bodyLanguage: "Sit beside them rather than across, if that feels natural. Speak slower and quieter than you normally would. Once it's said, don't be the first to stand up.",
    onCall: "Let them be the one to hang up.",
  },
  // D -> C
  {
    yourType: "D",
    theirType: "C",
    situation: "difficult_news",
    approach: "Be exact, and say what you don't know yet: gaps get filled with the worst case. Let them get through their questions before you push for a decision.",
    openWith: [
      "[What happened], because [why]. I'll go through what we know and what we don't.",
      "I've got bad news, and I've brought the details. [What happened].",
      "I don't know [what's missing] yet. I'll have it by [when].",
    ],
    avoid: [
      "Being vague about the cause.",
      "Simplifying it to make it sound better. They'll notice.",
      "Cutting their questions short to get to the plan.",
    ],
    theirReaction: "Precise questions, often in a run: when, why, how do we know. Answer what you can and say which parts you're unsure of. Being quiet doesn't mean it hasn't hit them.",
    ifGoesWrong: "When the questions start going in circles: \"Can we agree on the next step first, then keep going on the why?\"",
    bodyLanguage: "Have the documents ready, but meet their eyes when you say it. Once the questions start, put the papers between you and go through them together.",
    onCall: "Have the document open, and share it when they ask.",
  },
  // I -> D
  {
    yourType: "I",
    theirType: "D",
    situation: "difficult_news",
    approach: "Go in with two answers ready: what happened, and what you'd do. Give the first in your opening sentence; ease in and they'll lose patience before you get there. Once you've said both, stop talking and let them ask.",
    openWith: [
      "No easy way to say this: [what happened]. I think we [your plan].",
      "Heads up, [what happened]. It's not good. Let me tell you what I know.",
    ],
    avoid: [
      "Opening with \"So, I've been thinking...\"",
      "Making it sound better than it is.",
      "Letting your own reaction take over while you say it. Keep it for afterwards.",
      "Filling the pause after the news with more explanation.",
    ],
    theirReaction: "Usually a burst of frustration and two quick questions: what happened, and what do we do. The frustration is about the news, even when it sounds like it's about you.",
    ifGoesWrong: "If they get angry, keep your voice level: \"It's frustrating. Here's what we can still control.\"",
    bodyLanguage: "Stand or sit still, hands on the table or at your sides. Skip the nervous laugh. Hold their eye for the headline, then lean in a little for the plan.",
    onCall: "Look at the camera when you say it, and keep still.",
  },
  // I -> I
  {
    yourType: "I",
    theirType: "I",
    situation: "difficult_news",
    approach: "Say the news plainly first, then talk it through. You'll both want to soften it, and the facts can bend until they're wrong. Write the facts down before you go in, and get them all said before either of you starts cheering the other up.",
    openWith: [
      "I've got something hard to tell you, and I'm going to say it straight. [What happened].",
      "[What happened]. I'm sorry, it's not good.",
    ],
    avoid: [
      "Shrinking the news, or putting on optimism, to protect each other.",
      "Turning it into a support session before the facts have landed.",
    ],
    theirReaction: "Usually a big reaction and a lot of talking it through. That's fine. When it starts to slow, steer: \"OK, we've both said how we feel. What do we do about it?\"",
    ifGoesWrong: "When you're both going round in circles and it can wait: \"Let's stop here, sleep on it, and meet at [time] tomorrow with ideas.\"",
    bodyLanguage: "Sit close. It's fine to look affected. When you're ready for next steps, sit up and get out a notepad.",
    onCall: "Say out loud that you're moving to next steps, because they won't catch the change in your posture.",
  },
  // I -> S
  {
    yourType: "I",
    theirType: "S",
    situation: "difficult_news",
    approach: "Be gentler than usual and clearer than usual at the same time. Keep your own reaction small so the conversation stays about them. Say plainly what's changing, what isn't if you know it for sure, and what happens next.",
    openWith: [
      "I want to be upfront with you about something. [What's happening].",
      "I'll tell you what I know for sure, and what I don't know yet.",
      "Here's what happens next, as far as I know: [the next step].",
    ],
    avoid: [
      "Letting your own reaction get big. They'll end up comforting you.",
      "Jumping to the bright side before it's sunk in.",
      "Filling their silence with chatter.",
    ],
    theirReaction: "Usually they go quiet and look composed. Let the silence sit, then ask one question: \"What's going through your head?\"",
    ifGoesWrong: "If they pull back: \"I'll leave it there for now. Can we put half an hour in for later this week?\"",
    bodyLanguage: "Sit beside them. Slower and quieter than your usual. If they go quiet, stay quiet with them.",
    onCall: "Keep your camera on, and leave longer pauses than feel natural.",
  },
  // I -> C
  {
    yourType: "I",
    theirType: "C",
    situation: "difficult_news",
    approach: "Give them the news before your feelings about it. Have ready what happened, why, and what happens next, and keep it calm. Your care shows in how clear you are.",
    openWith: [
      "I've got bad news. [What happened], because [why]. Here's what we know so far.",
      "[What happened]. I've written it all down, including the gaps. Want to go through it?",
    ],
    avoid: [
      "Getting details fuzzy, or guessing to fill a gap.",
      "Waiting for a visible reaction before you go on.",
    ],
    theirReaction: "Usually questions, one after another. Answer what you can, and say plainly what you don't know. They may look unaffected; don't take that to mean they are.",
    ifGoesWrong: "When they go quiet and start working it over: \"That's everything I know. It's a rough one. Once you've had time with it, I'd like your read on what we do next.\"",
    bodyLanguage: "Notes in order before you start. Look up from them when you say it. Once the questions start, move so you're both looking at the same page.",
    onCall: "Put your notes on screen once they start asking.",
  },
  // S -> D
  {
    yourType: "S",
    theirType: "D",
    situation: "difficult_news",
    approach: "Say the news and your next step before anything else, and write those two sentences down beforehand so nerves can't soften them. If they get loud, slow down and keep going.",
    openWith: [
      "I need to tell you something straight out: [what happened]. What I'd do next is [your plan].",
      "[What happened]. I wanted you to know right away, and I've got a first step.",
      { line: "That part was my mistake. Here's how I'm fixing it.", onlyIf: "it was your mistake" },
    ],
    avoid: [
      "Wrapping the news in qualifiers. It reads as hiding it.",
      "Apologizing until the news gets lost.",
      "Dropping your plan when they snap at it. Let them vent, then go back to it.",
    ],
    theirReaction: "Sharp questions straight away, maybe a raised voice. Answer what you can; it usually blows over faster than it feels like it will.",
    ifGoesWrong: "If they turn it on you, keep your voice where it was: \"OK. What do you want to tackle first?\"",
    bodyLanguage: "Both feet on the floor, hands still on the table. Keep your voice at its normal volume, even if theirs goes up. Breathe slowly.",
    onCall: "Sit up and keep looking at the camera when they get loud.",
  },
  // S -> I
  {
    yourType: "S",
    theirType: "I",
    situation: "difficult_news",
    approach: "Get the whole news out before you start listening. Listening comes easily to you, so the risk sits at the start: being so gentle that it never fully lands. Then let them talk as long as they need.",
    openWith: [
      "I'll just say it: [what happened].",
      "I'm sorry, this isn't good news: [what happened].",
    ],
    avoid: [
      "Getting pulled into their reaction before you've finished telling them.",
      "Playing down the impact to spare their feelings.",
    ],
    theirReaction: "Usually a visible reaction, and they may want to talk it through at length. When the talking slows, ask: \"What feels like the right next step for you?\" Before they go, put a time in for your next talk.",
    ifGoesWrong: "When it overwhelms them: \"Take your time. I'm not going anywhere.\"",
    bodyLanguage: "Sit near them and keep still. If they cry or get upset, stay where you are and let them look away. Have water or tissues to hand.",
    onCall: "Keep your camera on, and nod so they know you're still with them.",
  },
  // S -> S
  {
    yourType: "S",
    theirType: "S",
    situation: "difficult_news",
    approach: "Get the news out early, in plain words. Between the two of you it can get softened until it barely lands, or met with a silence neither of you breaks. Then stay with the awkward part together.",
    openWith: [
      "There's no soft way to say this: [what happened].",
      "What happens now is [the next step], and I'll tell you more when I know it.",
    ],
    avoid: [
      "Softening it so much that the news gets lost.",
      "Both going quiet and leaving it there.",
      "Reassuring each other before you've said what happened.",
    ],
    theirReaction: "Often they say very little and nod. After a pause, ask: \"What are you thinking?\" Be ready to wait for the answer, and set a time to talk again the next day before you part.",
    ifGoesWrong: "When the silence settles on both of you: \"We've both gone quiet. There's no rush. How are you doing with it?\"",
    bodyLanguage: "Sit side by side. Speak softly but clearly. Let long silences happen. Phone away, hands still.",
    onCall: "Close every other window before you start.",
  },
  // S -> C
  {
    yourType: "S",
    theirType: "C",
    situation: "difficult_news",
    approach: "Lead with what happened and why. Bring notes so the details stay exact when you feel the pull to soften them. Afterwards, send what you can in writing so they can go over it on their own.",
    openWith: [
      "I've got hard news. Here's what I know: [what happened], because [why].",
      "[What happened]. I've written up the details so we can go through them together.",
    ],
    avoid: [
      "Opening with how sad it is before you've given them the facts.",
      "Blurring the details to be kind. It makes it harder to take in.",
      "Pressing for feelings before they've made sense of it.",
    ],
    theirReaction: "Questions, usually specific and asked so calmly they can seem detached. Answer what you know, name what you don't, and say when you'll know more.",
    ifGoesWrong: "If they go straight to business and you can't tell whether it's landed, ask once: \"Before we go on, how are you doing with this?\"",
    bodyLanguage: "Speak clearly, at an even pace, with your notes in front of you. Let them look at the documents instead of at you if they'd rather.",
    onCall: "Have the documents open and offer to share your screen.",
  },
  // C -> D
  {
    yourType: "C",
    theirType: "D",
    situation: "difficult_news",
    approach: "Hold the analysis back. Give the headline in your first sentence and the plan in your second; they'll usually ask how you got there once the first hit has passed.",
    openWith: [
      "[What failed]. It costs us [the impact]. My recommendation is [your plan].",
      "I've got bad news and a plan. [What happened].",
    ],
    avoid: [
      "Hedging how bad it is. Say it straight and let them react.",
      "Laying out options with no recommendation. Give them your best answer.",
    ],
    theirReaction: "Within seconds, most likely: \"How do we fix it?\" Have the plan ready. If there's anger, it burns out fast; stay calm through it.",
    ifGoesWrong: "When they shoot the messenger, don't defend the analysis yet: \"I'll take you through how we got here whenever you want. For now, here's the fix.\"",
    bodyLanguage: "Somewhere private, even if it's quick. Square posture, eyes on them. Keep the backup analysis close but out of sight. When it's time to plan, sit down and ask them to join you.",
    onCall: "Keep the analysis off screen until they ask for it.",
  },
  // C -> I
  {
    yourType: "C",
    theirType: "I",
    situation: "difficult_news",
    approach: "Say that it's hard before you say what it is. One sentence does it, and it tells them you care. Hold the detailed analysis back until they're ready for it.",
    openWith: [
      "I don't like telling you this. [What happened].",
      "I wish I had better news. [What happened]. Let me tell you what it means.",
    ],
    avoid: [
      "Delivering it like a report, or answering their feelings with more data.",
      "Getting impatient with their reaction. It passes.",
    ],
    theirReaction: "It'll show, and they may want to talk it through before anything else. Questions usually come after that, and that's when your detail helps. Before you finish, say what happens next.",
    ifGoesWrong: "If they go quiet, which isn't like them: \"We don't have to do the details now. They'll keep.\"",
    bodyLanguage: "Sit at an angle rather than square on. Speak a little more softly than usual. Keep your notes down while they react.",
    onCall: "Close your notes before you say it; they'll see your eyes move to them.",
  },
  // C -> S
  {
    yourType: "C",
    theirType: "S",
    situation: "difficult_news",
    approach: "Lead with whatever answers their first worry: what's staying the same, if you're sure of it, or what happens next if nothing is. Keep your usual even pace, and let your voice be warmer than your notes. Don't volunteer worst cases you're unsure of; if they ask, answer straight.",
    openWith: [
      "I've got hard news. [What's changing]. Here's what happens next: [the next step].",
      { line: "[What's staying the same] isn't changing. I'll say that first, because the rest is harder.", onlyIf: "you're sure it's staying the same" },
      "Ask me anything. If I don't know, I'll tell you.",
    ],
    avoid: [
      "Making it so analytical that it feels impersonal.",
      "Filling the quiet with more detail.",
      "Expecting a response on the spot.",
    ],
    theirReaction: "Usually they go quiet and look composed, and the real reaction comes later, sometimes days later. Put a follow-up in the calendar before you part, and open it with: \"How have you been since we talked?\"",
    ifGoesWrong: "When they seem to close up: \"That was a lot. You don't need to answer now. I'll pass on more when I can.\"",
    bodyLanguage: "Sit at their level. Speak slowly and softly. Once you've said it, stay still and leave the notes where they are.",
    onCall: "Stay on after the news, even if nobody's talking for a bit.",
  },
  // C -> C
  {
    yourType: "C",
    theirType: "C",
    situation: "difficult_news",
    approach: "Lay out the facts with full context and say once that it's hard. Agree up front when you'll stop digging and decide, or split it: one of you on the cause, one on the fix.",
    openWith: [
      "I've got bad news. I'll give you the facts first, then what I'd do.",
      "[What happened]. I've written up what we know. Can we go through it together?",
    ],
    avoid: [
      "Analyzing so long that neither of you says how it feels.",
      "Arguing over who saw it coming.",
    ],
    theirReaction: "Most likely straight into the analysis, which helps you both. Somewhere along the way, stop and ask: \"Before we go further, are we OK?\"",
    ifGoesWrong: "If you get stuck in the analysis: \"I think we understand it well enough. Which of us takes the fix, and by when?\"",
    bodyLanguage: "Everything to hand before you start. When you check in on how they're doing, put the papers aside and look at them.",
    onCall: "Stop sharing your screen before you ask how they're doing.",
  },
];

export default cards;
