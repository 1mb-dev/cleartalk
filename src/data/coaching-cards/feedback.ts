import type { CoachingCard } from '../../engine/types.ts';

const cards: CoachingCard[] = [
  // D -> D
  {
    yourType: "D",
    theirType: "D",
    situation: "feedback",
    approach: "Name the result that's slipping and their part in it, plainly. Then ask for their fix before you offer yours. You both bristle at being told what to do, and people back the fix they came up with.",
    openWith: [
      "[The result] is slipping, and I think I know why. Can I show you the numbers?",
      "When you [what they did], [what it cost]. How would you fix it?",
    ],
    avoid: [
      "Starting with \"you need to.\" It turns into a contest.",
      "Circling before you get to it. They'll hear stalling.",
      "Winning the argument and leaving with nothing agreed.",
    ],
    theirReaction: "Pushback, usually straight away: they're testing whether your point holds. Answer it once, with the evidence, and keep your voice where it was. A one-word \"fine\" and a change of subject is a brush-off, so ask what they'll do differently.",
    ifGoesWrong: "When it turns into who wins: \"We're both trying to win this. What does winning look like for [the project]?\"",
    bodyLanguage: "Sit or stand at the same height. Steady eye contact. Hands still, no pointing.",
    onCall: "Look at the camera when you make the point, not at their face on the screen.",
  },
  // D -> I
  {
    yourType: "D",
    theirType: "I",
    situation: "feedback",
    approach: "Keep it warm and private, and say why you're raising it before you say what it is. Then name the issue plainly and what it's doing to the team. Your plain version will sound colder to them than it does to you.",
    openWith: [
      "Got a few minutes, just us? There's something I want to talk through with you.",
      "[What happened] is causing problems for the team, and I'd like to sort it out with you.",
    ],
    avoid: [
      "Doing it anywhere other people can hear.",
      "Going all facts and no warmth. They'll feel dismissed.",
      "Laughing along and leaving with nothing agreed. Settle one change and a day to check in.",
    ],
    theirReaction: "A joke or a story first, usually. Let them talk; they tend to come back to the point once they've had their say. If they don't, bring it back yourself: \"Back to [the issue] for a second.\"",
    ifGoesWrong: "If they go quiet, which isn't like them: \"That's not easy to hear. Tell me how it looks from your side.\"",
    bodyLanguage: "Sit at an angle rather than head-on. Arms uncrossed. Smile where it fits.",
    onCall: "Camera on, and let them see you react while they talk.",
  },
  // D -> S
  {
    yourType: "D",
    theirType: "S",
    situation: "feedback",
    approach: "Slow way down: your normal pace can land as an attack here. Say the point once, ask how they see it, then stop talking. They often know what would help and won't offer it unless you ask.",
    openWith: [
      "I noticed [what happened]. How did it look from your side?",
      "What would make [this] easier to get right?",
    ],
    avoid: [
      "Rattling through it. They'll go quiet and you'll think it went fine.",
      "Taking a nod as agreement.",
      "Springing it on them. When you ask for the time, say what it's about, and make it the same day.",
    ],
    theirReaction: "Usually silence, and it isn't agreement. Count to five in your head after your main point; if you fill the gap, you lose them. If they get upset or rush to \"sorry, I'll fix it,\" pause and leave the point where it is.",
    ifGoesWrong: "If they shut down: \"Let's stop there. Have a think, and we'll pick it up tomorrow at [time]. I'll send you an invite now.\"",
    bodyLanguage: "Sit down, and lean back a little. Voice down half a notch. Soft eye contact; don't hold the stare.",
    onCall: "Sit further back so your face doesn't fill their screen.",
  },
  // D -> C
  {
    yourType: "D",
    theirType: "C",
    situation: "feedback",
    approach: "Bring two or three specific examples, with dates. A verdict like \"this isn't good enough\" gives them nothing to fix. Show them, let them ask, and end by agreeing what good looks like in terms they can check.",
    openWith: [
      "I've looked at the last few [reports] and I see a pattern. Can I show you?",
      "Here are the cases I mean. Walk me through how you were thinking.",
    ],
    avoid: [
      "Jumping to your conclusion before they've looked at the examples.",
      "Treating their questions as overthinking.",
    ],
    theirReaction: "Detailed questions: which ones, when, how often. They're working out exactly what to fix. Answer each one, and if you don't know, say you'll check. They may want a day to look into it before they agree, so name the day.",
    ifGoesWrong: "When they dig in: \"I could be reading this wrong. Show me what I'm missing.\"",
    bodyLanguage: "Lay the examples out where they can read them. Keep your movements slow. When they ask about one, point to it.",
    onCall: "Share your screen with the examples so you're both looking at the same thing.",
  },
  // I -> D
  {
    yourType: "I",
    theirType: "D",
    situation: "feedback",
    approach: "Get to the point faster than feels polite: the headline, one example, then stop. Any warm-up can wait until after they've answered.",
    openWith: [
      "Bottom line: [this] isn't working, and I think we should [the change].",
      "Short version: [the report] missed [the deadline] twice this month.",
      "[This] is causing [the problem]. Can we change it?",
    ],
    avoid: [
      "Warming up with catch-up or a story.",
      "Apologizing for bringing it up.",
      "Taking the edge off when they push. Say it again, shorter.",
    ],
    theirReaction: "A fast answer, often a challenge to your example. Stay on that one example instead of piling on more. A one-word \"OK\" is a yes; take it and stop talking.",
    ifGoesWrong: "If they wave it off: \"I still think it's a problem. It's already cost us [what it cost].\"",
    bodyLanguage: "Shoulders square. Look at them for the headline. Hands and voice calmer than usual.",
    onCall: "Keep your hands out of frame and say the headline to the camera.",
  },
  // I -> I
  {
    yourType: "I",
    theirType: "I",
    situation: "feedback",
    approach: "Be the one who says the uncomfortable part. Left alone, you'll both keep it pleasant and the feedback won't land. Close by asking what they'll do differently, so the change is in their words.",
    openWith: [
      "I nearly didn't bring this up. That wouldn't have been fair to you.",
      "Can I tell you something I've been sitting on?",
      "[The demo] ran long again, and I don't think we can laugh that one off.",
    ],
    avoid: [
      "Burying the point in compliments.",
      "Drifting into stories before you've said it.",
    ],
    theirReaction: "Quick, warm agreement, usually, and that doesn't mean it sank in. If it stung, they may come back later wanting reassurance: give it, and don't take the point back. Either way, book a check-in two days out, and ask then how [the change] is going.",
    ifGoesWrong: "When you notice you're both reassuring each other: \"I think we're being too nice here. What needs to change?\"",
    bodyLanguage: "Sit facing them. Match their warmth, then go a notch quieter. Pause between points, and don't laugh the point away.",
    onCall: "Say it, then stop and let them answer first.",
  },
  // I -> S
  {
    yourType: "I",
    theirType: "S",
    situation: "feedback",
    approach: "Bring one point and say it quietly, slower than feels natural. Your enthusiasm can swamp a Steady person even when you mean it kindly, and they may agree just to end the conversation. Keep the warmth, and offer to pick it up again tomorrow once they've had time.",
    openWith: [
      "Can we talk about [this]? I want to mention it while it's fresh.",
      "I'd like ten quiet minutes about [the handoffs]. Is now OK?",
    ],
    avoid: [
      "Jumping to a second topic before the first has landed.",
      "Getting excited about the fix before they've taken in the problem.",
      "Letting your warmth carry the point. Say what you're asking for in one plain sentence, or they'll fill the gap with something worse.",
    ],
    theirReaction: "Close listening, and often a quick yes just to end the awkwardness. Ask, \"What's your honest take?\" Then wait. Their real answer may come tomorrow, so book the time before you leave.",
    ifGoesWrong: "If they look hurt, slow down: \"That's a lot at once. Take a minute, then tell me what you think.\"",
    bodyLanguage: "Sit beside them rather than across. Lean in when they talk, and sit back when you say the hard part.",
    onCall: "Leave a longer gap than feels natural before you reply. Lag makes it hard for a quiet person to get a word in.",
  },
  // I -> C
  {
    yourType: "I",
    theirType: "C",
    situation: "feedback",
    approach: "Leave the story out. Write two or three examples down before you go in, with dates, and read them rather than retell them, because retold examples grow. Once the facts are on the table, you can say how you feel about it.",
    openWith: [
      "I've got a couple of examples I'd like to go through with you.",
      "Can we look at [the March numbers] together first?",
    ],
    avoid: [
      "Leading with a general impression. They'll discount the rest.",
      "Rounding up. \"Every time\" had better mean every time.",
      "Filling their silences.",
    ],
    theirReaction: "Questions on every example, which can feel like cross-examination. Let them dig, and answer from your notes rather than from memory.",
    ifGoesWrong: "If they push back with their own data: \"Some of that's new to me. Given all of it, what would you change?\"",
    bodyLanguage: "Keep your hands quiet. Examples on paper between you. Look at them while you talk, and at the page while they think.",
    onCall: "Share the examples on screen and keep still in frame.",
  },
  // S -> D
  {
    yourType: "S",
    theirType: "D",
    situation: "feedback",
    approach: "Write your point down beforehand and say it in your first sentence. Your risk is hedging until the message never arrives. Ask for ten minutes rather than catching them between things; it tells them it matters before you've said a word.",
    openWith: [
      "Can I grab ten minutes today? There's something I want to raise.",
      "I'll be straight with you: [this] needs to change.",
      "I want to flag something: [the handoffs] keep slipping, and I think we need to change how we do them.",
    ],
    avoid: [
      "Hedging with \"maybe\" and \"sort of.\" They'll hear that it's optional.",
      "Waiting until it comes out with months of frustration attached.",
      "Softening it the second time you say it. Say it the same way.",
    ],
    theirReaction: "A fast reply, often an argument. Don't read it as anger, and don't apologize your way out of it. If you get \"Fine. Done.\" and they've moved on, take it and stop explaining.",
    ifGoesWrong: "When they talk over you: \"I hear you. Now I need you to hear me.\"",
    bodyLanguage: "Feet planted. Voice up and steady. Look at them when you say the key point; you can soften after.",
    onCall: "Keep your written point beside the screen and look at the camera to say it.",
  },
  // S -> I
  {
    yourType: "S",
    theirType: "I",
    situation: "feedback",
    approach: "Say plainly that this is feedback, then pin down exactly what changes before you finish. Between your gentleness and their quick, friendly yes, it's easy for nothing to land. Afterwards, put the agreed change in a short message.",
    openWith: [
      "I've got some feedback on [this], and I want to bring it up before it grows.",
      "In [Tuesday's meeting], [the numbers] went out before anyone checked them. Can we talk about that?",
    ],
    avoid: [
      "Following them onto a fun tangent before you've finished.",
      "Accepting \"totally, I'll fix it\" without agreeing on what \"fix it\" means.",
    ],
    theirReaction: "Warm and quick, often straight into ideas for fixing it. Before you go there, ask: \"What will you change first?\"",
    ifGoesWrong: "If the cheerfulness sounds forced: \"Did that sting? You can tell me if it did.\"",
    bodyLanguage: "Warm at the start. Nod while they talk. When you say the main point, hold still and say it clearly.",
    onCall: "Stop nodding while you say the main point, so it stands out.",
  },
  // S -> S
  {
    yourType: "S",
    theirType: "S",
    situation: "feedback",
    approach: "Name the awkwardness, then say it, because between the two of you it'll get buried under politeness. One of you has to go first. Today it's you.",
    openWith: [
      "This is hard for me to bring up, and I think you'd want to know.",
      "I didn't want to upset you, so I've waited. I shouldn't have.",
    ],
    avoid: [
      "Reassuring each other until it never gets said.",
      "Putting it off to another time. It won't come.",
      "Taking it back in the next breath. Say it once, plainly, and let it stand.",
    ],
    theirReaction: "Often a pause and a quiet \"thanks for telling me,\" which can also be a polite way to close the topic. Let the pause run, then ask, \"What do you make of it?\" The real reaction tends to show the next day, so set a time to check in before you leave.",
    ifGoesWrong: "If you both stall: \"This is awkward for both of us. I'd still rather say it than not.\"",
    bodyLanguage: "Sit side by side rather than facing. Voice warm but steady. Soft eye contact.",
    onCall: "Keep your camera on, even if off feels easier.",
  },
  // S -> C
  {
    yourType: "S",
    theirType: "C",
    situation: "feedback",
    approach: "Drop the cushioning and bring two or three specific examples, said plainly. Every \"sorry\" or \"it's probably nothing\" makes the evidence sound weaker to them. Before you finish, agree how you'd both know it's better.",
    openWith: [
      "I've kept notes on the last three [releases]. Can I show you what I'm seeing?",
      "I've been tracking [this], and I think we should change [what].",
    ],
    avoid: [
      "Relying on \"it doesn't feel right.\" Give them something to check.",
      "Taking their questions as a no. They're checking your examples before they agree.",
    ],
    theirReaction: "Clarifying questions, and they may want to check it themselves before they agree to change anything. Let them, and agree the day you'll pick it up again.",
    ifGoesWrong: "When they challenge your examples: \"That's what I've seen. What does it look like from your side?\"",
    bodyLanguage: "Notes out, turned so they can read them. Even pace, even volume. Give them room; don't crowd the page.",
    onCall: "Send the examples ahead so they can read first.",
  },
  // C -> D
  {
    yourType: "C",
    theirType: "D",
    situation: "feedback",
    approach: "Name what they did and what it cost in your first two sentences, and write those two sentences before you go in. Keep one example ready to say aloud, and the rest of your analysis in reserve until they ask.",
    openWith: [
      "When you [what they did], [what happened]. I'd like us to change that.",
      "Bottom line: [what they did] is costing us [what]. I think we should [the change] instead.",
    ],
    avoid: [
      "Opening with the analysis. You'll lose them before the point.",
      "Talking about \"the process\" when you mean them. Say what they did.",
      "Hedging with caveats. Say it and stand by it.",
    ],
    theirReaction: "A quick answer, often a challenge to the facts. Give one example, plainly, and leave the rest unless they ask. \"Fair enough\" means yes; take it.",
    ifGoesWrong: "If they call it overthinking: \"I get wanting to move fast. If we leave this, it costs us [what it costs].\"",
    bodyLanguage: "Sit or stand tall. Look at them for the main point. Notes within reach, and closed.",
    onCall: "Say the conclusion before you share anything on screen.",
  },
  // C -> I
  {
    yourType: "C",
    theirType: "I",
    situation: "feedback",
    approach: "Say the point in one plain sentence before you show anything, and say why you're raising it. Then go through the numbers side by side, so you're both looking at the work instead of at them. Your precision can sound like a grade, so the warmth has to come from your tone.",
    openWith: [
      "I want to talk through [the issue] with you. Can we look at it together?",
      "I've been in the numbers on [the launch], and [the sign-ups] are behind. Want to go through them with me?",
    ],
    avoid: [
      "Handing over a list of errors with no context.",
      "Steering back to the data before they've said how they feel.",
    ],
    theirReaction: "Feelings first, often out loud. Let them finish before you go back to the numbers; they'll take them in better then.",
    ifGoesWrong: "If they get defensive, or suddenly too cheerful: \"That came out like a report. I'm raising it because I want this to work for you.\"",
    bodyLanguage: "Sit at a slight angle, with the numbers between you. Look up from them often.",
    onCall: "Share the screen and scroll together instead of reading it out.",
  },
  // C -> S
  {
    yourType: "C",
    theirType: "S",
    situation: "feedback",
    approach: "Pick the one thing that matters most and leave the rest of the list at your desk. A full critique can feel to a Steady person like a verdict on all their work. Check how it's landing before you get to next steps.",
    openWith: [
      "I noticed something in [the last sprint] that I'd like to talk through with you.",
      "There's one thing in [the last piece of work] I'd change. Just the one. Can we look at it together?",
    ],
    avoid: [
      "Going through every flaw without stopping to ask how they're doing.",
      "Moving to action items before they've taken in the point.",
    ],
    theirReaction: "Usually quiet, with little on their face. Ask, \"What's your take?\" and wait longer than is comfortable. If they ask whether they're in trouble, or whether their work is OK overall, have an honest answer ready.",
    ifGoesWrong: "When they go quiet and stay there: \"I may have piled on the detail. The main thing is [the one thing]. Does that seem fair?\"",
    bodyLanguage: "Soft, even voice. Sit at their level. Have your notes, but don't read from them.",
    onCall: "Keep your notes off screen and your eyes on the camera.",
  },
  // C -> C
  {
    yourType: "C",
    theirType: "C",
    situation: "feedback",
    approach: "Settle what good looks like before either of you shows evidence. Without that, two careful people can trade findings all afternoon. Show yours, hear theirs, and leave with one change.",
    openWith: [
      "Before we start, what would good look like on [this]?",
      "Can we compare notes on [this]? I see a gap, and I want to check it against your read.",
      "I've written up what I found. Mark it up wherever you disagree.",
    ],
    avoid: [
      "Turning it into a data war, each of you digging up finer detail.",
      "Assuming your analysis is more careful than theirs.",
    ],
    theirReaction: "Questions that feel like challenges, usually. They're checking your work the way you'd check theirs.",
    ifGoesWrong: "When you're both still analyzing: \"We could go round on this forever. What's the one thing we change this week?\"",
    bodyLanguage: "Point at the data when you disagree. Nod when they make a good point, and say so.",
    onCall: "Both open the same document.",
  },
];

export default cards;
