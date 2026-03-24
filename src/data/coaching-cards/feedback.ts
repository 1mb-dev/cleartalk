import type { CoachingCard } from '../../engine/types.ts';

const cards: CoachingCard[] = [
  // D -> D
  {
    yourType: 'D',
    theirType: 'D',
    situation: 'feedback',
    approach: 'Two dominant styles means neither wants to be told what to do. Lead with results data, not authority. Frame it as a performance gap that affects shared goals - they respect outcomes, not opinions.',
    openWith: [
      'We are leaving 20% on the table because of X - let me show you the numbers.',
      'I want to talk about something that is slowing both of us down.',
      'Here is what I see - tell me what I am missing.',
    ],
    avoid: [
      'Starting with "you need to" - triggers a power struggle between two Ds',
      'Softening with lengthy preambles - they will see it as weakness or manipulation',
      'Making it personal instead of keeping it about measurable results',
    ],
    theirReaction: 'Expect immediate pushback or counter-arguments. This is not defensiveness - it is how Ds process. They are testing if your point holds up under pressure.',
    ifGoesWrong: 'If it becomes a dominance contest, pause and redirect: "We are both trying to win here. What does winning actually look like for the project?" Reset to shared objectives.',
    bodyLanguage: 'Stand or sit at equal height. Direct eye contact. Keep gestures contained - no pointing. Lean forward slightly to signal engagement, not aggression.',
  },
  // D -> I
  {
    yourType: 'D',
    theirType: 'I',
    situation: 'feedback',
    approach: 'Your instinct is to be blunt - resist it. I types take feedback personally because relationships matter to them. Start with genuine acknowledgment of their contribution, then connect the feedback to how it affects the team.',
    openWith: [
      'Your energy on this project has been great - I want to talk about one thing that could make the outcome even stronger.',
      'I have noticed something and I would rather bring it up now than let it become a bigger issue.',
      'The team responds well to you - here is one area where we can build on that.',
    ],
    avoid: [
      'Being cold or purely data-driven - they will feel dismissed as a person',
      'Giving feedback in front of others - public correction devastates I types',
      'Skipping acknowledgment and jumping straight to the problem',
    ],
    theirReaction: 'They may deflect with humor or redirect to a story. Let them process through talking. The real signal comes 5 minutes in when they circle back to the point.',
    ifGoesWrong: 'If they shut down or get visibly upset, say: "I brought this up because I value what you bring to the team. Can we figure this out together?" Reconnect on the relationship before the task.',
    bodyLanguage: 'Warm but not stiff. Smile when appropriate. Sit at an angle rather than head-on - reduces confrontation. Open posture, uncrossed arms.',
  },
  // D -> S
  {
    yourType: 'D',
    theirType: 'S',
    situation: 'feedback',
    approach: 'This is the pair most likely to go wrong. Your directness will feel like an attack to an S type. Slow way down. Provide safety and reassurance before the content - they need to know the relationship is not at risk.',
    openWith: [
      'I want to check in on something - this is not a big deal, but I think we can improve it together.',
      'Your consistency on this has been solid. There is one area I would like us to look at.',
      'I noticed X happening and I want to understand your perspective before I share mine.',
    ],
    avoid: [
      'Rapid-fire delivery - your natural pace will overwhelm them into silence',
      'Mistaking their quiet nod for agreement - they may be shutting down, not agreeing',
      'Springing feedback without warning - S types need time to prepare emotionally',
    ],
    theirReaction: 'They will go quiet. This is processing, not agreement and not resistance. Give them 5-10 seconds of silence after your main point. If you fill the gap, you lose them.',
    ifGoesWrong: 'If they withdraw completely, back off: "I can see this landed harder than I intended. I am on your side here. Want to think about it and come back to me tomorrow?" Give them an exit with a follow-up.',
    bodyLanguage: 'Lower your voice half a notch. Sit down if you are standing. Lean back slightly to reduce intensity. Gentle eye contact - do not lock on.',
  },
  // D -> C
  {
    yourType: 'D',
    theirType: 'C',
    situation: 'feedback',
    approach: 'C types respect precision and evidence. Your broad-strokes style will frustrate them unless you bring specifics. Prepare concrete examples before the conversation - "it feels off" will get you nowhere with a C.',
    openWith: [
      'I reviewed the last three deliverables and noticed a pattern I want to discuss.',
      'Here are the specific instances I am referring to - can you walk me through your reasoning?',
      'I have data on this I want to share, and I want to hear how you see it.',
    ],
    avoid: [
      'Vague feedback like "step it up" - C types need to know exactly what to change',
      'Rushing to a conclusion before they have examined the evidence',
      'Dismissing their questions as overthinking - those questions are how they process',
    ],
    theirReaction: 'They will ask detailed questions - what specifically, when, how many times. This is not deflection. They are building a mental model so they can fix it precisely. Answer patiently.',
    ifGoesWrong: 'If they retreat into defensiveness or over-analysis, say: "I am not questioning your competence. The pattern I see is X - help me understand if I am reading it wrong." Invite their analysis rather than fighting it.',
    bodyLanguage: 'Sit across a table if possible - they prefer some physical structure. Keep movements deliberate. Have your notes visible - it signals you prepared.',
  },
  // I -> D
  {
    yourType: 'I',
    theirType: 'D',
    situation: 'feedback',
    approach: 'Your natural warmth will read as stalling to a D type. Get to the point faster than feels comfortable. They want the headline first, context second. Skip the social warm-up - they know it is feedback, so deliver it.',
    openWith: [
      'Bottom line - X is not working and here is what I think needs to change.',
      'I will keep this short. The deliverable missed the mark on Y. Here is what I saw.',
      'Quick and direct: I need you to adjust X. Here is why it matters.',
    ],
    avoid: [
      'Starting with five minutes of relationship building - they will get impatient and disengage',
      'Using emotional language like "I feel" - frame everything in results terms',
      'Apologizing for giving the feedback - it undercuts your credibility with a D',
    ],
    theirReaction: 'They will respond fast and possibly challenge you. This is respect, not rejection. If they argue, it means they are taking you seriously enough to engage.',
    ifGoesWrong: 'If they dismiss you, hold your ground: "I hear you, and I still think this is a problem. Here is the impact I have seen." Ds respect people who do not fold under pressure.',
    bodyLanguage: 'Square your shoulders. Maintain steady eye contact. Keep your energy contained - enthusiasm is your default, but here you need calm authority.',
  },
  // I -> I
  {
    yourType: 'I',
    theirType: 'I',
    situation: 'feedback',
    approach: 'Two I types will naturally gravitate toward keeping things positive. The danger is the feedback never actually lands because you both collude to stay comfortable. Be the one who goes deeper.',
    openWith: [
      'I love working with you, and that is exactly why I want to be honest about something.',
      'Can I share something with you that I have been sitting on? I think it will help us both.',
      'I noticed something and I almost did not bring it up - but that would not be fair to you.',
    ],
    avoid: [
      'Sandwiching feedback so thick the point gets buried in compliments',
      'Letting the conversation drift into storytelling without landing the message',
      'Both agreeing everything is fine when it clearly is not',
    ],
    theirReaction: 'They will likely agree enthusiastically in the moment. Check in 48 hours later - the real processing happens after the conversation, not during it.',
    ifGoesWrong: 'If it turns into mutual reassurance without substance, name it: "I think we are both being too nice here. Can we talk about what actually needs to change?" Break the comfort pattern.',
    bodyLanguage: 'Match their energy but dial it back 20%. Sit facing them. Use natural gestures but avoid high-fiving the problem away. Pause deliberately between points.',
  },
  // I -> S
  {
    yourType: 'I',
    theirType: 'S',
    situation: 'feedback',
    approach: 'Your enthusiasm can overwhelm an S type even when your intentions are warm. They need steady, gentle delivery. Think of it as turning your volume knob from 8 to 4. The relationship safety you naturally offer is actually your superpower here.',
    openWith: [
      'I appreciate how reliable you are on this - there is one thing I would love for us to work on together.',
      'This is not urgent or alarming - I just want to share an observation while it is fresh.',
      'I have been thinking about how we can make your work even stronger. Can we talk about one area?',
    ],
    avoid: [
      'Rapid topic-jumping - S types need to fully process one point before the next',
      'Overloading with enthusiasm about the fix before they have absorbed the problem',
      'Assuming your warmth is enough - S types need explicit reassurance of stability',
    ],
    theirReaction: 'They will listen carefully and may agree too quickly to end the discomfort. Ask a follow-up: "What do you really think about this?" Give space for their honest reaction.',
    ifGoesWrong: 'If they seem wounded, slow down: "I realize that might have come out bigger than I meant it. This is a small thing. Your work overall is exactly what we need." Restore security first.',
    bodyLanguage: 'Lower your energy. Speak at half your normal pace. Sit beside them rather than across. Lean in when listening, lean back when delivering the feedback.',
  },
  // I -> C
  {
    yourType: 'I',
    theirType: 'C',
    situation: 'feedback',
    approach: 'Your biggest challenge: C types do not respond to enthusiasm or vision - they respond to evidence. Prepare specifics before the conversation. Your natural storytelling will not work here. Facts first, then feelings.',
    openWith: [
      'I pulled together three specific examples I want to walk through with you.',
      'I have been looking at the data on X and I see a pattern worth discussing.',
      'Before we talk, I want to share the specifics so we are working from the same information.',
    ],
    avoid: [
      'Leading with emotion or generalized impressions - they will discount the entire message',
      'Exaggerating the scope of the problem to make a point - C types will fact-check you',
      'Filling silence with chatter - let them think',
    ],
    theirReaction: 'They will want to examine every data point. Expect follow-up questions that feel like cross-examination. This is engagement, not resistance - let them drill in.',
    ifGoesWrong: 'If they shut down behind a wall of counterdata, pivot: "You clearly know this area better than I do. Given what you see, what would you change?" Let their analytical nature work for you, not against you.',
    bodyLanguage: 'Minimize animated gestures. Bring printed or screen-shared examples. Sit still. Make eye contact when speaking, look at the data when they are processing.',
  },
  // S -> D
  {
    yourType: 'S',
    theirType: 'D',
    situation: 'feedback',
    approach: 'This is uncomfortable for you - giving feedback to someone who might push back. Know this: D types actually respect directness. Your biggest risk is hedging so much that the message never arrives. Write down your key point beforehand and deliver it clearly.',
    openWith: [
      'I have something important to share. The current approach on X is causing Y, and I think we need to adjust.',
      'I want to flag something that is affecting the team - here is what I have observed.',
      'I have been thinking about this and I want to be straight with you: X needs to change.',
    ],
    avoid: [
      'Hedging with "maybe" and "sort of" - the D will dismiss the feedback entirely',
      'Waiting so long to give the feedback that it comes with months of built-up frustration',
      'Backing down at the first sign of pushback - expect it and hold steady',
    ],
    theirReaction: 'They will respond quickly and probably directly. Do not interpret fast responses as anger. A D who argues with your feedback is actually engaging with it.',
    ifGoesWrong: 'If they steamroll you, take a breath and say: "I hear your point, and I still need you to hear mine. This matters." You do not have to match their intensity - just do not retreat.',
    bodyLanguage: 'Plant your feet. Keep your voice steady, not quiet. Make eye contact when delivering the key point. You can soften after, but the core message needs physical confidence behind it.',
  },
  // S -> I
  {
    yourType: 'S',
    theirType: 'I',
    situation: 'feedback',
    approach: 'Good news: I types are naturally receptive and want to maintain the relationship. Your warmth is an asset here. The challenge is that they may perform agreement without actually absorbing the feedback. Be warm but pin down specifics.',
    openWith: [
      'I really value our working relationship, and there is something I want to bring up so it does not grow.',
      'I noticed something last week and I have been thinking about how to share it with you.',
      'Can we talk about X? I have an observation that I think could help.',
    ],
    avoid: [
      'Being so gentle that the I type does not realize it is feedback',
      'Letting them redirect the conversation to a fun tangent before you finish',
      'Accepting "totally, I will fix it" without agreeing on what "fix it" means',
    ],
    theirReaction: 'They will be warm and responsive. They may immediately brainstorm solutions. Make sure the core message landed before moving to action - ask them to repeat back what they heard.',
    ifGoesWrong: 'If they get hurt behind a cheerful mask, name what you see: "I want to make sure this landed okay. How are you actually feeling about this?" Give them permission to not be upbeat.',
    bodyLanguage: 'Warm smile at the start. Sit comfortably close. Nod when they speak. When delivering the feedback point, hold still and speak clearly - the physical shift signals importance.',
  },
  // S -> S
  {
    yourType: 'S',
    theirType: 'S',
    situation: 'feedback',
    approach: 'The harmony trap. Neither of you wants to rock the boat, so difficult feedback gets buried under politeness. Acknowledge the awkwardness directly - naming it breaks the pattern. One of you has to go first. Today it is you.',
    openWith: [
      'This is hard for me to bring up, and I think you would want to know rather than not.',
      'I have been avoiding saying this because I do not want to upset you - but I think that is worse.',
      'Can we have an honest conversation about X? I promise nothing changes between us.',
    ],
    avoid: [
      'Both of you reassuring each other so much that the feedback never gets said',
      'Deferring the conversation to "another time" - that time never comes between two S types',
      'Framing everything as "just a thought" - own it as real feedback',
    ],
    theirReaction: 'They will appreciate that you care enough to say it. Expect a pause and a quiet "thank you for telling me." Give them time to process - do not fill the silence with reassurance.',
    ifGoesWrong: 'If the conversation stalls in mutual discomfort, say: "I know this is uncomfortable for both of us. That actually tells me it matters. Can we push through it together?" Frame the discomfort as a shared challenge.',
    bodyLanguage: 'Sit side by side rather than facing. Keep your voice warm but steady. Place a hand briefly on the table or armrest - small grounding gesture. Maintain soft eye contact.',
  },
  // S -> C
  {
    yourType: 'S',
    theirType: 'C',
    situation: 'feedback',
    approach: 'You both prefer a measured approach, which is good - but you need to bring data, not just feelings. C types respond to specifics. Prepare examples before the conversation. Your calm delivery style actually works well here.',
    openWith: [
      'I have noticed a pattern in the last few iterations and I want to share what I see.',
      'I put together some specific observations I want to walk through with you.',
      'I have been tracking X and the data suggests we should adjust Y.',
    ],
    avoid: [
      'Relying on "it does not feel right" - C types need specifics to act on',
      'Over-apologizing for giving the feedback - it signals the data is weak',
      'Being so cautious that the urgency is lost',
    ],
    theirReaction: 'They will be receptive if you have evidence. Expect clarifying questions. They may want to go verify independently before committing to a change - that is healthy, not dismissive.',
    ifGoesWrong: 'If they challenge your data, do not take it personally. Say: "These are my observations - I may be missing context. What does the picture look like from your side?" Invite their analysis.',
    bodyLanguage: 'Sit at a table with your notes visible. Moderate pace, moderate volume. Make eye contact when sharing key points. Give them physical space - do not crowd.',
  },
  // C -> D
  {
    yourType: 'C',
    theirType: 'D',
    situation: 'feedback',
    approach: 'Your instinct is to present a thorough analysis. Resist. D types want the conclusion first and the evidence second. Lead with the impact, then offer the supporting data if they want it. Prepare a one-sentence summary before you start.',
    openWith: [
      'The current approach has a flaw that is costing us X. Here is the fix I recommend.',
      'I found a gap in the process. Bottom line: it is causing Y. Here is the data if you want it.',
      'Quick flag: X is off track. I have analyzed why and I have a recommendation.',
    ],
    avoid: [
      'Opening with a 10-minute analysis before reaching the point - you will lose them at minute two',
      'Presenting multiple options without a recommendation - Ds want your best answer',
      'Hedging your conclusion with too many caveats - commit to your assessment',
    ],
    theirReaction: 'They will decide quickly. If your analysis is solid, they will respect it and act. If they push back, it is on the conclusion, not the method - adjust your recommendation, not your evidence.',
    ifGoesWrong: 'If they dismiss your feedback as overthinking, say: "I understand the instinct to move fast. This specific issue will cost us Z if we do not address it." Anchor to consequences they care about.',
    bodyLanguage: 'Stand tall, speak with conviction. Deliver your key point with steady eye contact. Have your data ready but do not pull it out unless asked. Confident posture signals your analysis is solid.',
  },
  // C -> I
  {
    yourType: 'C',
    theirType: 'I',
    situation: 'feedback',
    approach: 'Your detailed, data-heavy style will feel like a clinical evaluation to an I type. Warm up the delivery without sacrificing accuracy. Acknowledge their contribution before presenting your analysis. They need to feel valued as a person, not assessed as a process.',
    openWith: [
      'Your initiative on this has been great - I have some specific observations that could sharpen the results.',
      'I want to share some analysis that could help. This builds on what you are already doing well.',
      'I have been looking at the numbers behind X, and I see something we can improve together.',
    ],
    avoid: [
      'Presenting a spreadsheet of errors without context - feels like a court case to an I type',
      'Being so precise that it sounds like you are grading them',
      'Ignoring their emotional response to focus purely on the data',
    ],
    theirReaction: 'They may respond emotionally first, analytically second. Let them talk through their feelings before steering back to specifics. The data will land once they feel heard.',
    ifGoesWrong: 'If they get defensive or performatively cheerful, pause: "I realize I may have come across as too clinical. I am bringing this up because I think you can do something great with it." Reconnect the data to their vision.',
    bodyLanguage: 'Soften your posture. Smile at natural points. Sit at a slight angle. When presenting data, place it between you - look at it together rather than presenting it at them.',
  },
  // C -> S
  {
    yourType: 'C',
    theirType: 'S',
    situation: 'feedback',
    approach: 'Both of you are introverted styles, so the conversation can easily become too quiet or tentative. Lead with reassurance about the relationship, then present your observations. Your natural precision is fine here - just wrap it in care.',
    openWith: [
      'Everything is solid overall - I have one area where I think a small adjustment would help.',
      'I noticed something in the last sprint I want to share. Nothing urgent, just worth a conversation.',
      'Your work on X has been consistent. I have a specific suggestion that could make it even better.',
    ],
    avoid: [
      'Delivering a thorough critique without checking in emotionally - S types take quality feedback as personal failure',
      'Being so detailed that one small issue feels like a systemic indictment',
      'Moving straight to action items without letting them absorb the observation',
    ],
    theirReaction: 'They will be quiet and may not react visibly. Ask gently: "What is your take on this?" They need an explicit invitation to share. Silence does not mean agreement.',
    ifGoesWrong: 'If they withdraw, say: "I want to make sure I did not overstate this. It is a small thing in the context of your overall work. How does it land for you?" Scale the feedback down explicitly.',
    bodyLanguage: 'Keep your voice soft and measured. Sit at their level. Have notes but do not read from them - reference them casually. Lean back to create space.',
  },
  // C -> C
  {
    yourType: 'C',
    theirType: 'C',
    situation: 'feedback',
    approach: 'Two analysts reviewing each other. The risk is not conflict - it is an endless loop of counter-analysis without resolution. Present your evidence, hear theirs, and agree on a concrete next step before leaving the room.',
    openWith: [
      'I have analyzed X and found a pattern worth examining. Here are my three data points.',
      'I want to compare notes on Y. My analysis shows a gap - I would like to see if yours aligns.',
      'I have specific evidence on X. Walk me through your side so we can reconcile the picture.',
    ],
    avoid: [
      'Getting into a data war where both sides present increasingly granular evidence without resolving anything',
      'Spending the entire conversation on analysis without deciding what changes',
      'Assuming your analysis is inherently more rigorous than theirs',
    ],
    theirReaction: 'They will engage deeply with your evidence. Expect questions that feel like challenges but are actually validation. They will respect well-prepared feedback and may even thank you for the rigor.',
    ifGoesWrong: 'If you get stuck in mutual analysis, name it: "We could analyze this forever. Based on what we both see, what is the one thing we should change this week?" Set a decision boundary.',
    bodyLanguage: 'Sit across a table with shared reference material. Gestures toward the data, not at each other. Measured pace. Nod when their points are valid - acknowledge good analysis explicitly.',
  },
];

export default cards;
