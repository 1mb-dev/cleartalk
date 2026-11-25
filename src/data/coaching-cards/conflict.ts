import type { CoachingCard } from '../../engine/types.ts';

const cards: CoachingCard[] = [
  // D -> D
  {
    yourType: "D",
    theirType: "D",
    situation: "conflict",
    approach: "Put the goal on the table before the positions. Between the two of you, a disagreement turns into a contest fast, and then winning matters more than the answer. Agree what you're both after, say their case back before you make yours, then hold each one up against the goal.",
    openWith: [
      "We clearly disagree. Before we argue it, what are we both trying to get?",
      "Let me say your case back first. Tell me if I've got it.",
    ],
    avoid: [
      "Making your case before you've said theirs back. They'll keep repeating it until they're sure you've heard it.",
      "Raising your voice or pulling rank. Another Drive person pushes back harder.",
      "Refusing to give any ground. Conceding a fair point costs you less than it feels like it will.",
    ],
    theirReaction: "Hard, fast pushback, usually at the idea more than at you. The tell that it's working: they start conceding small points. Take them without gloating.",
    ifGoesWrong: "When it turns into a power struggle, call a break: \"We're both dug in. Let's take half an hour, each write down where we stand, and check both against [the goal].\"",
    bodyLanguage: "Hold your ground, but don't step in. Arms loose, voice firm and not raised. Sit if they sit, stand if they stand.",
    onCall: "Sit back from the camera and keep your voice level.",
  },
  // D -> I
  {
    yourType: "D",
    theirType: "I",
    situation: "conflict",
    approach: "Start with what you both want, then name the one specific thing you disagree on. Keep every sentence about that thing, and they'll hear that it isn't about them without you having to say so. Leave room for how they feel before you push for an answer.",
    openWith: [
      "We both want [the goal]. I see [the approach] differently, and I'd like to talk it through.",
      "I'd rather tell you straight than let it sit. I don't agree with [the approach], and I want to sort it out.",
    ],
    avoid: [
      "Telling them it isn't personal. Saying it makes them wonder whether it is.",
      "Being blunt with no warmth at all. They'll stop listening, and you won't get them back today.",
      "Rushing past their feelings to get to a decision. Here, how it feels is part of the problem.",
    ],
    theirReaction: "Often they get visibly upset, or go cool on you, which is their way of pushing back. Let them say how it feels, then bring it back to the one thing you disagree on.",
    ifGoesWrong: "When they go flat and stop joking: \"Let me start again. I came in too hard.\"",
    bodyLanguage: "Sit down if you're standing. Lower your voice. Hands open on the table, and lean back a little.",
    onCall: "Let your face soften, and don't lean in toward the camera.",
  },
  // D -> S
  {
    yourType: "D",
    theirType: "S",
    situation: "conflict",
    approach: "Draw them out, because they won't fight back where you can see it. You push, they go quiet, and you can leave thinking there was no disagreement at all. Ask, then wait longer than feels comfortable.",
    openWith: [
      "I know I can push hard. I want your honest take, even if it's the opposite of mine.",
      "I'd rather hear it now than find out later we weren't on the same page.",
    ],
    avoid: [
      "Taking their silence as a yes. Quiet usually means they haven't said it yet.",
      "Speeding up or getting louder when they go quiet. It pushes them further back.",
      "Winning the point and losing them. They may go along, then quietly pull back.",
    ],
    theirReaction: "Often a quick \"sure\" with nothing after it. That's the tell that you're getting the surface. Ask: \"If this were entirely your call, what would you do?\" If that gets nothing either, offer time and fix it there and then: \"Think it over. Can we pick this up [tomorrow at ten]?\"",
    ifGoesWrong: "If they've shut down, stop and say: \"I pushed too hard. I want to hear what you think, and I won't interrupt.\"",
    bodyLanguage: "Sit down. Slow your voice. After a question, sit in the silence: count to five in your head before you speak.",
    onCall: "A pause can feel like a dropped call, so say \"Take your time\" and then wait.",
  },
  // D -> C
  {
    yourType: "D",
    theirType: "C",
    situation: "conflict",
    approach: "Ask what they're worried about, and write it down. Often this is about pace more than substance: you want it done, they want it right. Before you go ahead, name what you'll check and when.",
    openWith: [
      "Walk me through your concerns. What might I be missing?",
      "What's the specific risk you see? I want the detail before we decide.",
      "What would you need to see to be OK going ahead?",
    ],
    avoid: [
      "Calling their analysis overthinking. It costs you their trust, and that's slow to come back.",
      "Forcing a decision before they've looked at the evidence.",
      "Using \"good enough\" as an argument. It sounds like you've stopped caring whether it works.",
    ],
    theirReaction: "A detailed counter-argument usually comes back, point by point. Listen to the specifics. If one of their concerns is right, say so plainly.",
    ifGoesWrong: "When they dig in behind more and more detail: \"That's a lot of risks. Which one worries you most? Let's deal with that one first.\"",
    bodyLanguage: "Take notes on their points where they can see you do it. When they show you data, look at the data.",
    onCall: "Share the document, and type their points into it where they can watch.",
  },
  // I -> D
  {
    yourType: "I",
    theirType: "D",
    situation: "conflict",
    approach: "Decide your position before you go in, and say it in one sentence. You tend to find your view by talking it through, and a Drive person reads the thinking aloud, the smoothing over and the jokes as dodging. Back it with a fact or two, and hold it when they push.",
    openWith: [
      "I disagree with this, and here's why.",
      "I see it differently: [your position]. The main reason is [the fact].",
    ],
    avoid: [
      "Joking your way through it.",
      "Explaining at length how you feel about it. Say it once, then make your case.",
      "Giving in to end the discomfort. You'll resent it, and next time they'll push harder.",
    ],
    theirReaction: "Pushback comes fast and hard. Hold your position with a fact and they usually adjust. Fold, and they'll take the ground.",
    ifGoesWrong: "If you're getting overwhelmed: \"I need to slow this down. Give me thirty seconds to answer properly.\"",
    bodyLanguage: "Both feet on the floor, hands on the table. Look at them when you state your position. Keep a neutral face instead of smiling through it.",
    onCall: "Take a breath before you unmute, and say your position first.",
  },
  // I -> I
  {
    yourType: "I",
    theirType: "I",
    situation: "conflict",
    approach: "Name the disagreement out loud, and don't leave until you've said what changes and who does it. Between the two of you, it either heats up or gets papered over with cheerfulness, and neither settles anything. You don't have to be upbeat for this one.",
    openWith: [
      "I think we're both dancing around the real issue. Can we just say it?",
      "I don't want to pretend everything's fine when it isn't. What's bothering me is [this].",
    ],
    avoid: [
      "Both of you performing agreement while you're each still annoyed.",
      "Having it in front of other people.",
      "Competing to be the more understanding one while nothing gets decided.",
    ],
    theirReaction: "They tend to match your mood, up or down. Loud usually clears fast. Polite and light means it's still there, so push for the specific thing.",
    ifGoesWrong: "If you're both making up without solving anything: \"Wait. Did we actually solve this, or did we just agree to not feel bad about it? What changes from here?\"",
    bodyLanguage: "Sit facing them. When it gets heated, slow your breathing and leave a gap between points.",
    onCall: "Turn off your self-view, so you're watching them and not yourself.",
  },
  // I -> S
  {
    yourType: "I",
    theirType: "S",
    situation: "conflict",
    approach: "Make room for them to disagree, because they won't take it on their own. You think out loud, and a Steady person can hear each half-formed point as your final word and quietly give way. Say your view once, ask for theirs, then stop talking.",
    openWith: [
      "Before I say anything else, what's your view on [this]?",
      "I think you might see [this] differently. How does it look from your side?",
    ],
    avoid: [
      "Thinking out loud at them. Work out your view before you go in.",
      "Letting your frustration out at full volume.",
      "Taking a quiet yes as settled. They may just be keeping the peace.",
    ],
    theirReaction: "Calm and quiet, mostly. The pushback is small: a sigh, a look away, a pause before \"fine\". When you see it, say: \"Seems like there's more. I'm listening.\"",
    ifGoesWrong: "If they've gone silent, lower your voice: \"I've taken up all the room. What do you think? If it's easier tomorrow, let's pick a time now.\"",
    bodyLanguage: "Lower your voice. Sit beside them, or at a corner of the table. Keep your hands still, and count to three after they speak before you answer.",
    onCall: "Drop the gestures, and let a silence sit before you jump in.",
  },
  // I -> C
  {
    yourType: "I",
    theirType: "C",
    situation: "conflict",
    approach: "Let them lay out their whole case before you answer, then put your evidence next to it. You argue with stories and they argue with data, and neither of you feels heard until you're arguing about the same thing. Find where the two cases overlap and work out from there.",
    openWith: [
      "Walk me through your reasoning first. Then I'll show you mine.",
      "Here's what I'm seeing in [the numbers]. Where does your read differ?",
      "Where do we already agree? Let's start there.",
    ],
    avoid: [
      "Cutting in before they've finished. They'll often go back and start the case again.",
      "Writing off their objections as negativity. They're trying to stop a mistake.",
      "Getting louder or more animated when they stay calm. The gap gets wider.",
    ],
    theirReaction: "Usually calm, with their case laid out in order. Low emotion doesn't mean they care less. Take their points one at a time.",
    ifGoesWrong: "When you feel brushed off as too emotional: \"Let me show you what my view's based on. Then tell me what would change your mind.\"",
    bodyLanguage: "Keep your hands still. Finish your sentences instead of firing off points, and make notes while they talk.",
    onCall: "Have your evidence open and ready to share.",
  },
  // S -> D
  {
    yourType: "S",
    theirType: "D",
    situation: "conflict",
    approach: "Raise it yourself, and don't wait for a better moment. You avoid conflict and they charge into it, so a disagreement you keep to yourself is one they may not know exists. Put your position in one sentence on paper first, so you still have it when they push.",
    openWith: [
      "I need to say something. Hear me out before you answer.",
      "We disagree on [this]. I think [your position].",
      "This is hard for me to say, but it matters too much to leave.",
    ],
    avoid: [
      "Waiting for it to blow over. It won't.",
      "Sending an email instead. A Drive person reads that as dodging.",
      "Caving at the first pushback. It's coming. Breathe, and stay put.",
      "Taking it back afterwards in a message. If you meant it in the room, let it stand.",
    ],
    theirReaction: "A fast, hard answer, usually. A clear position gets an argument. A wobbly one gets pushed.",
    ifGoesWrong: "If they steamroll you: \"I hear you. Now I need you to hear me.\" If they talk over you again: \"I'm not finished. Give me one minute.\"",
    bodyLanguage: "Feet planted, head level. Hands on the table or at your sides. Speak at a volume that surprises you a little.",
    onCall: "Raise the camera to eye level, and look into it while you say where you stand.",
  },
  // S -> I
  {
    yourType: "S",
    theirType: "I",
    situation: "conflict",
    approach: "Tell them how you feel about it, as well as what you think. Your calm can read as distance to an Influence person, who usually wants to talk it through. Before the relief carries you both out of the room, agree one thing that changes.",
    openWith: [
      "I've been uncomfortable about [what happened], and I want to clear the air.",
      "Something's been off between us, and I'd like to sort it out. Can we talk?",
    ],
    avoid: [
      "Going silent when they get emotional. It can read as rejection.",
      "Putting it off because it feels like too much.",
    ],
    theirReaction: "Often relief that you raised it, then a lot of talking. Let them get it out, then give your side calmly.",
    ifGoesWrong: "When it gets to be too much: \"Hang on, I want to answer that properly. Give me a minute.\"",
    bodyLanguage: "Face them. Nod while they talk so they know you're with them. Lean in a little when it's your turn.",
    onCall: "Let your face move. A still face on a screen looks frozen.",
  },
  // S -> S
  {
    yourType: "S",
    theirType: "S",
    situation: "conflict",
    approach: "Bring one specific moment and start with it. The two of you could go months being careful with each other, and \"something's off\" is easy for you both to wave away. A real moment with a day attached isn't.",
    openWith: [
      "Neither of us likes doing this, so I'll go first.",
      "When [what happened] on [the day], I didn't say anything. I'd like to now.",
    ],
    avoid: [
      "Turning it into mutual reassurance and calling that settled.",
      "Agreeing to disagree too early. It's avoidance with a nicer name.",
    ],
    theirReaction: "Often a long pause while they decide whether to be straight with you. Wait it out. If you fill it, they'll back off into politeness.",
    ifGoesWrong: "When you both slide back into politeness: \"We're being very careful with each other. What's the part you haven't said yet?\"",
    bodyLanguage: "Sit side by side, or at a corner of the table. Keep your voice warm and even. When it goes quiet, breathe and wait.",
    onCall: "Keep your camera on, and when they pause, say \"No rush.\"",
  },
  // S -> C
  {
    yourType: "S",
    theirType: "C",
    situation: "conflict",
    approach: "Expect your point to land after the conversation, so leave them something to come back to: what happened, when, and what it cost, on one page. Neither of you is likely to blow up; the risk is that your concern doesn't register in the room. Say how it sits with you too, then hand them the page.",
    openWith: [
      "I've noticed a pattern that worries me. Here's what I've seen.",
      "I've been thinking about where we differ on [this], and I've written down a few points.",
      "Can I leave this with you? I'd like your read once you've been through it.",
    ],
    avoid: [
      "Saying how you feel and stopping there.",
      "Backing down because their argument sounds tighter. What you've noticed counts as evidence too.",
    ],
    theirReaction: "Questions about your examples are likely, and maybe nothing about how you feel. That's fine. If your points hold up, they'll often come back to you later, once they've reread the page.",
    ifGoesWrong: "If they say you haven't got enough to go on: \"It's what I've seen, and it's real. How do you read it?\"",
    bodyLanguage: "Have your points written down, and glance at them when you need to. Keep your voice steady. When they push back, nod and write it down.",
    onCall: "Tape your notes beside the camera so you can read them without looking away.",
  },
  // C -> D
  {
    yourType: "C",
    theirType: "D",
    situation: "conflict",
    approach: "Say you disagree while you're in the room, and lead with the one risk that worries you most. A Drive person wants it settled quickly, so give them your conclusion first and keep the reasoning for when they ask.",
    openWith: [
      "I disagree, mainly because of one risk: [the risk].",
      "I think this fails at [the weak point]. I can take you through why.",
    ],
    avoid: [
      "Getting pulled into their pace. Keep yours, just put the main point first.",
      "Going along in the room and dragging your feet after. If you can't back it, say so now.",
    ],
    theirReaction: "They'll usually go straight at your conclusion. Answer each point in a sentence, without getting defensive.",
    ifGoesWrong: "If they push to decide now, ask once more: \"I get the urgency. Give me until [tomorrow] to check it. If it holds up, I'll back it.\" If it goes ahead anyway: \"OK. Can we note the risk so we're both watching for it?\"",
    bodyLanguage: "Stand if they're standing, sit if they're sitting. Say the key point without looking at your notes, and look at them while you say it.",
    onCall: "Look at the camera for your main point, then go back to your notes.",
  },
  // C -> I
  {
    yourType: "C",
    theirType: "I",
    situation: "conflict",
    approach: "Ask what worries them before you bring in your analysis. They argue with feeling and you argue with detail, and starting with their concern keeps that from turning into two separate conversations.",
    openWith: [
      "Before I give you my side, what worries you most about this?",
      "So your worry is [their concern]. Have I got that right?",
    ],
    avoid: [
      "Treating their argument as irrational because it's emotional. It may catch something your data misses.",
      "Getting cooler and flatter as they get more animated.",
      "Winning on the facts and losing them for the work that follows.",
    ],
    theirReaction: "It'll often sound like feeling more than fact. There's usually a concrete concern underneath. Keep asking until you could say it back to them.",
    ifGoesWrong: "When it turns into a fight about tone: \"I care about this as much as you do. I just show it in the detail. Where do we already agree?\"",
    bodyLanguage: "Let your face show some warmth. Lean in and nod while they talk, even when you disagree. Talk through your figures instead of reading them out.",
    onCall: "Keep your face in view, and react while they're still talking.",
  },
  // C -> S
  {
    yourType: "C",
    theirType: "S",
    situation: "conflict",
    approach: "Check whether there's a conflict at all. A Steady person often disagrees by going quiet or pulling back instead of saying so, and it's easy to miss. If they've been quieter than usual, ask gently and make it easy to answer.",
    openWith: [
      "Things have felt a bit off between us. Is something bothering you?",
      "Is there something I could be doing differently that would help?",
    ],
    avoid: [
      "Asking them to prove there's a problem. They may not have put it into words yet.",
      "Pushing for an answer on the spot. Offer another time, and put it in the calendar.",
      "Analyzing it so closely that you miss how it feels to them.",
    ],
    theirReaction: "Often \"it's fine\" at first. Stay with it, gently: \"Thanks. I've noticed [what you've noticed], though, and I'd still like to hear about it.\"",
    ifGoesWrong: "If they won't open up face to face: \"If it's easier, send me a message. I'd like to understand, and I can wait.\"",
    bodyLanguage: "Sit at their level, angled rather than square on. Leave long pauses after your questions, and let them run. Relax your face; a thinking frown can read as judgment.",
    onCall: "Close your other windows so you're not glancing away while they talk.",
  },
  // C -> C
  {
    yourType: "C",
    theirType: "C",
    situation: "conflict",
    approach: "Agree up front on what would settle it. Left to it, you could each build a better case for weeks. Ask what evidence would change each of your minds, and set a date to decide.",
    openWith: [
      "Before we dig in: what would change your mind? Here's what would change mine.",
      "Can we check we're starting from the same assumptions?",
      "If we can't settle it today, when do we decide?",
    ],
    avoid: [
      "Arguing about whose method is more rigorous.",
      "Piling on more data to win. More spreadsheets don't settle it.",
      "Holding out until every question is answered. Agree what's enough, then decide.",
    ],
    theirReaction: "A methodical answer, often with counter-evidence. Take it seriously, and keep an eye on the date you agreed.",
    ifGoesWrong: "When you're stuck: \"We've both got solid evidence for different answers. Can we agree on one test, and who calls it if the result's unclear?\"",
    bodyLanguage: "Both analyses open where you can both see them. Point to the specific figure you mean. When they make a good point, say so out loud.",
    onCall: "Share one screen and work from the same document.",
  },
];

export default cards;
