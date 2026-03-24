import type { CoachingCard } from '../../engine/types.ts';

const cards: CoachingCard[] = [
  // D -> D
  {
    yourType: 'D',
    theirType: 'D',
    situation: 'request',
    approach: 'Two Ds means a negotiation, not a request. Frame it as a mutual win with clear terms. Skip the preamble - state what you need, why it matters, and what is in it for them.',
    openWith: [
      'I need X by Friday. It unblocks Y, which gets us both to the target faster.',
      'Here is what I am asking for and here is what it gets us.',
      'Straightforward ask: can you take on X? It is the critical path right now.',
    ],
    avoid: [
      'Being indirect or hinting - a D will not pick up on subtle asks',
      'Framing it as a favor - position it as a strategic move',
      'Leaving the timeline open-ended - Ds need clear deadlines to prioritize',
    ],
    theirReaction: 'They will say yes or no quickly and may negotiate the terms. A fast "no" is not personal - it is information. Counter with adjusted scope or timeline.',
    ifGoesWrong: 'If they refuse outright, do not argue. Say: "What would need to change for this to work?" Shift from your ask to their constraints. Ds respect problem-solving over persuasion.',
    bodyLanguage: 'Stand or sit upright. Make the ask with direct eye contact. Brief handshake energy - firm, quick, purposeful. No fidgeting.',
  },
  // D -> I
  {
    yourType: 'D',
    theirType: 'I',
    situation: 'request',
    approach: 'Connect your request to people impact and recognition. I types are motivated by visibility and collaboration, not just outcomes. Paint the picture of how this helps the team or puts them in a good light.',
    openWith: [
      'I have a project that needs your people skills - the team would really benefit from your lead on X.',
      'This is something that would be great for you to own - high visibility and real impact.',
      'I need help with X, and honestly you are the person who can make it land with the team.',
    ],
    avoid: [
      'Making it sound like a boring task assignment - I types disengage from routine work',
      'Being so direct that it feels like an order rather than a collaboration',
      'Forgetting to mention the social or recognition element',
    ],
    theirReaction: 'They will likely say yes enthusiastically. The real work is pinning down specifics. Before leaving, agree on exact deliverable and deadline - their optimism can outrun their capacity.',
    ifGoesWrong: 'If they over-commit and under-deliver, circle back early: "I know you are juggling a lot. Let us scope this down to the one thing that matters most. What can you realistically own by Thursday?"',
    bodyLanguage: 'Smile when framing the ask. Use open, animated gestures. Sit at their level, not above. Energy should feel collaborative, not commanding.',
  },
  // D -> S
  {
    yourType: 'D',
    theirType: 'S',
    situation: 'request',
    approach: 'Slow down and provide context. S types need to understand how the request fits into the bigger picture and will not push back even if the ask is unreasonable. Build in a check: make sure they are genuinely okay, not just compliant.',
    openWith: [
      'I have something I would like your help with. Here is the context and here is what I need - does this timeline work for you?',
      'I am hoping you can take on X. I want to walk through what is involved so you can tell me if it is realistic.',
      'Would you be able to handle X? I do not want to overload you, so tell me honestly.',
    ],
    avoid: [
      'Dropping an urgent request without context - S types will say yes and quietly resent it',
      'Assuming silence means they are fine with the scope',
      'Stacking multiple requests in one conversation - handle one at a time',
    ],
    theirReaction: 'They will almost certainly agree. The question is whether they genuinely can do it. Watch for hesitation - even a half-second pause means they have concerns they are not voicing.',
    ifGoesWrong: 'If they agreed but seem stressed later, proactively check: "I want to revisit what I asked for. Is the timeline actually working, or should we adjust? No judgment either way." Give them a safe exit.',
    bodyLanguage: 'Sit down. Speak at a moderate pace. Lean back to reduce the sense of urgency. Ask the question, then physically wait - do not hover for an immediate answer.',
  },
  // D -> C
  {
    yourType: 'D',
    theirType: 'C',
    situation: 'request',
    approach: 'Provide specifications upfront. C types need to understand the requirements, quality bar, and constraints before committing. Your "just get it done" style clashes with their need for clarity. Invest 2 extra minutes in detail and save days of rework.',
    openWith: [
      'I need X done to this standard by this date. Here are the specs - what questions do you have?',
      'Here is the deliverable, the constraints, and the acceptance criteria. Can you commit to this scope?',
      'I have a request with clear parameters. Walk through this with me and tell me if anything is missing.',
    ],
    avoid: [
      'Giving vague instructions and expecting them to figure it out - they will either over-engineer or freeze',
      'Changing the requirements mid-stream without explanation - erodes trust fast',
      'Pressuring for speed over quality - C types cannot skip the rigor step',
    ],
    theirReaction: 'They will ask clarifying questions. This is not pushback - it is commitment preparation. Answer precisely. If you do not know, say so. They respect "I do not know" more than a guess.',
    ifGoesWrong: 'If they are stuck in analysis mode, provide a decision boundary: "Given what we know today, what is your best recommendation? We can iterate, but I need a first version by Wednesday."',
    bodyLanguage: 'Bring written specifications or share a screen. Sit across a table. Keep your energy measured - urgency reads as sloppiness to a C type.',
  },
  // I -> D
  {
    yourType: 'I',
    theirType: 'D',
    situation: 'request',
    approach: 'Cut the warm-up. State what you need and why it matters in business terms. Your storytelling instinct will lose a D - they want the ask in the first 30 seconds. Save the social energy for after they say yes.',
    openWith: [
      'I need a quick decision on X. Here is the situation and here is what I am asking.',
      'Can you commit to Y by next week? It is blocking the launch.',
      'Short version: I need your sign-off on X. Here is why it cannot wait.',
    ],
    avoid: [
      'Lengthy context-setting before the ask - D types will cut you off',
      'Making the ask sound optional when it is actually critical',
      'Using social pressure or guilt - Ds respond to logic, not emotion',
    ],
    theirReaction: 'They will decide fast. If yes, they mean it. If they push back on scope or timing, negotiate directly. Do not take a counter-offer personally - it means they are engaged.',
    ifGoesWrong: 'If they say no, do not try to charm your way in. Ask: "What would it take to make this work? I can adjust X or Y." Show you are flexible on method, firm on the need.',
    bodyLanguage: 'Keep your gestures controlled. Stand or sit at their eye level. Deliver the ask with a steady voice, not your usual animated tone. After asking, be quiet and let them respond.',
  },
  // I -> I
  {
    yourType: 'I',
    theirType: 'I',
    situation: 'request',
    approach: 'This will be fun and may produce zero results. Two I types will build excitement but struggle to commit to specifics. Your job is to enjoy the brainstorm AND pin down a concrete commitment before the conversation ends.',
    openWith: [
      'I have an idea for something we could team up on - hear me out and then let us figure out who does what.',
      'You would be amazing at X - can we talk about what it would look like for you to take it on?',
      'I need your help with something exciting. Let me share the vision, then let us nail down the details.',
    ],
    avoid: [
      'Getting so caught up in the excitement that nobody writes down the action items',
      'Both of you saying "yes!" without defining what "yes" actually means',
      'Assuming mutual enthusiasm equals mutual commitment',
    ],
    theirReaction: 'They will be enthusiastic and say yes immediately. Trust the intent but verify the follow-through. Send a brief recap within an hour. "Just to confirm - you are doing X by Y date, right?"',
    ifGoesWrong: 'If things slip, re-engage with the social angle: "Hey, I know we were both excited about this. Can we spend 10 minutes right now nailing down the next step so it actually happens?"',
    bodyLanguage: 'Match their energy. Lean in, use gestures, let the excitement flow. But when you reach the commitment point, physically pause - lower your voice and slow down to signal "this part is real."',
  },
  // I -> S
  {
    yourType: 'I',
    theirType: 'S',
    situation: 'request',
    approach: 'Your enthusiasm can accidentally pressure an S type into agreeing to things they cannot do. Dial your energy back. Explain the request, give them time to think, and explicitly say that "no" is an acceptable answer.',
    openWith: [
      'I would love your help with X, but only if it genuinely fits your bandwidth. No pressure at all.',
      'Here is what I am thinking - take a day to consider and let me know if it works for you.',
      'I have a request that I think plays to your strengths. Can I walk you through it?',
    ],
    avoid: [
      'Being so enthusiastic about the ask that they cannot find space to decline',
      'Interpreting their quiet agreement as genuine buy-in without checking',
      'Piling on excitement when what they need is calm clarity',
    ],
    theirReaction: 'They will default to yes. Ask: "Is there anything about this that gives you pause?" Silence means there is something. Wait for it.',
    ifGoesWrong: 'If they agreed but are struggling, go back gently: "I think I may have come on too strong with this ask. Let us honestly reassess - what is realistic for you right now?" Remove social pressure.',
    bodyLanguage: 'Lower your volume and slow your pace. Sit beside them. When asking, lean back and create space. Avoid bouncing or rapid gestures - they amplify pressure on an S type.',
  },
  // I -> C
  {
    yourType: 'I',
    theirType: 'C',
    situation: 'request',
    approach: 'Translate your vision into specifics before the conversation. A C type hearing "it will be amazing!" hears noise. They need scope, timeline, and standards. Prepare a short written brief - it shows respect for their process.',
    openWith: [
      'I have a request with clear parameters. Here is the scope, deadline, and quality bar.',
      'I have written up what I need - can you review and tell me if the specs make sense?',
      'I want to be precise about this ask because I know that matters to you. Here is the breakdown.',
    ],
    avoid: [
      'Selling the vision without specifying the deliverable - C types cannot work with "make it awesome"',
      'Changing requirements because you got a new idea halfway through',
      'Expecting them to fill in the gaps you did not think through',
    ],
    theirReaction: 'They will review your request carefully and may come back with scope questions or pushback on timeline. This is due diligence, not resistance. Answer their questions precisely.',
    ifGoesWrong: 'If they say the scope is unrealistic, resist the urge to charm. Instead: "Help me understand which parts do not work and what a realistic scope looks like. I trust your assessment."',
    bodyLanguage: 'Sit across a table with your brief visible. Keep gestures minimal. When they ask questions, pause before answering - do not riff. Thoughtful responses earn credibility with C types.',
  },
  // S -> D
  {
    yourType: 'S',
    theirType: 'D',
    situation: 'request',
    approach: 'The hardest ask for you - requesting something from someone who moves fast and might say no bluntly. Prepare your ask in one clear sentence before you start. Do not bury it in context. D types respect clarity even when they disagree.',
    openWith: [
      'I need X from you by Y. Here is why it is important.',
      'Can I get 5 minutes? I have a specific ask that affects the project timeline.',
      'Direct request: I need your decision on X. Here is the context in 30 seconds.',
    ],
    avoid: [
      'Over-explaining the background before making the ask - they will interrupt you',
      'Framing it as a question when it is actually a need - "Would you maybe consider..." weakens your position',
      'Taking a quick no as a final no - Ds often reconsider when you come back with adjusted terms',
    ],
    theirReaction: 'Expect a fast answer. If it is no, they will tell you why in 10 words or less. That directness is efficiency, not rudeness. If they say yes, they mean right now.',
    ifGoesWrong: 'If they brush you off, do not retreat permanently. Come back with: "I understand you are busy. This is blocking me and I need a decision - even a 2-minute call works." Persistence, not pleading.',
    bodyLanguage: 'Stand when asking if possible - it signals importance. Keep your shoulders square. Make eye contact when stating the ask. Hands at your sides or on the table, not clasped or fidgeting.',
  },
  // S -> I
  {
    yourType: 'S',
    theirType: 'I',
    situation: 'request',
    approach: 'Good pairing for requests. I types want to help and you are naturally considerate in asking. The risk is that they agree enthusiastically but do not follow through. Your job is to get a specific commitment, not just a "sure!"',
    openWith: [
      'I could use your help with something. Can I walk you through what I need?',
      'This would be great with your input. Here is exactly what I am hoping for.',
      'Would you be up for taking on X? I think it plays to your strengths.',
    ],
    avoid: [
      'Accepting vague enthusiasm as a commitment - pin down the what and when',
      'Being so accommodating that they do not realize how important the request is',
      'Letting the conversation wander into tangents before you get the yes',
    ],
    theirReaction: 'They will say yes with genuine excitement. Before you leave, confirm: "So you will have X ready by Thursday - does that work?" Write it down and send a recap.',
    ifGoesWrong: 'If they forget or deprioritize, follow up warmly: "Hey, just checking on X - I know you have a lot going on. Is the timeline still good or should we adjust?" Keep it light but clear.',
    bodyLanguage: 'Match their warmth. Smile, nod, sit comfortably. When confirming the specifics, shift your posture slightly - sit up straighter to signal the transition from chat to commitment.',
  },
  // S -> S
  {
    yourType: 'S',
    theirType: 'S',
    situation: 'request',
    approach: 'Two S types are so afraid of imposing that requests get buried in politeness. Be direct - not D-type direct, but clearer than your instinct. They want to help you and will appreciate knowing exactly what you need.',
    openWith: [
      'I have a genuine favor to ask, and I want to be upfront about it.',
      'Can I ask you for help with X? Here is specifically what I need and by when.',
      'I know you have a lot on your plate. I would not ask if it was not important to me - can you handle X?',
    ],
    avoid: [
      'Both of you deferring so much that the request never gets clearly stated',
      'Saying "only if you have time" when you actually need it done regardless',
      'Feeling guilty about asking - it prevents clear communication',
    ],
    theirReaction: 'They will genuinely want to help and will take the commitment seriously. S types who say yes follow through. The risk is they say yes when they should not - check in on capacity.',
    ifGoesWrong: 'If they agreed but are overwhelmed, acknowledge it directly: "I think I may have asked too much. What part can you realistically handle? I would rather adjust than have you stressed about it."',
    bodyLanguage: 'Sit facing them, relaxed posture. Keep your voice natural, not apologetic. When making the ask, maintain gentle eye contact. After asking, give them space to think - no rushing.',
  },
  // S -> C
  {
    yourType: 'S',
    theirType: 'C',
    situation: 'request',
    approach: 'Good compatibility. You are both measured and considerate. The key is specificity - C types need clear parameters. Write down what you need before the conversation. Your calm delivery style works perfectly here.',
    openWith: [
      'I have a request with specific requirements. Can I walk you through them?',
      'I need help with X. Here is the scope, deadline, and what good looks like.',
      'Would you be able to take on X? I have documented what is needed.',
    ],
    avoid: [
      'Being vague about requirements - a C type cannot act on "whatever you think is best"',
      'Changing scope after they have started - this erodes trust with C types',
      'Not providing enough context for them to do quality work',
    ],
    theirReaction: 'They will evaluate the request methodically. Expect them to come back with clarifying questions before starting. This thoroughness means the output will be high quality - let them be precise.',
    ifGoesWrong: 'If they flag that the timeline is too tight for the quality bar, listen: "You know this domain better than I do. What timeline would let you deliver at the standard you are comfortable with?" Trust their estimation.',
    bodyLanguage: 'Sit at a table with your notes. Speak at a measured pace. When they ask questions, answer calmly and completely. No rushing - this conversation at a steady pace builds mutual confidence.',
  },
  // C -> D
  {
    yourType: 'C',
    theirType: 'D',
    situation: 'request',
    approach: 'Lead with the ask, not the analysis. Your instinct is to explain why before explaining what. Flip it. One sentence on what you need, one on the business impact. Offer the supporting data only if they ask.',
    openWith: [
      'I need your approval on X. It reduces risk by Y percent. Details here if you want them.',
      'Quick ask: I need Z resources for this project. The ROI is clear - can I show you the numbers?',
      'I need a decision on X today. Here is my recommendation and the key tradeoff.',
    ],
    avoid: [
      'Leading with the methodology of how you arrived at the request',
      'Presenting three options when you have a clear recommendation - give them your best answer',
      'Burying the ask under so much context that they lose patience',
    ],
    theirReaction: 'They will decide in seconds. If they want more data, they will ask. If they say no, they will tell you why. A D who asks for your analysis means you have their attention - deliver it concisely.',
    ifGoesWrong: 'If they reject your request, do not retreat into analysis. Ask: "What would make this a yes? I can adjust the scope." Show you are solution-oriented, not just analytical.',
    bodyLanguage: 'Stand if they are standing. Deliver the ask with steady eye contact and a confident voice. Keep your hands still. Have backup data ready on a device but do not pull it out preemptively.',
  },
  // C -> I
  {
    yourType: 'C',
    theirType: 'I',
    situation: 'request',
    approach: 'Your detailed, precise style may feel heavy to an I type. Lead with the big picture and the people impact. They will say yes to the vision - then you need to ground the commitment in specifics before the conversation ends.',
    openWith: [
      'I have a project that needs someone who is great with people - here is the big picture.',
      'I think you would be perfect for X. Let me tell you why, and then we can nail down the details.',
      'I need help bringing X to life. You would be the face of it - interested?',
    ],
    avoid: [
      'Opening with a spec sheet - save the details for after they are bought in',
      'Being so thorough in your explanation that their eyes glaze over',
      'Forgetting to confirm specifics - an enthusiastic "yes!" needs to become a concrete plan',
    ],
    theirReaction: 'Expect immediate enthusiasm. Channel it: "Great that you are in. Let us spend 5 minutes on exactly what, when, and how so we are set up for success." Convert energy into commitment.',
    ifGoesWrong: 'If they agreed but are not delivering, reconnect: "I know this kind of detail work is not your favorite part. What if I handle the specs and you focus on the stakeholder piece?" Divide to their strengths.',
    bodyLanguage: 'Open posture, slight smile. Present the vision with more animation than your default. When transitioning to specifics, shift your posture - sit forward, pull out notes. The physical shift signals the mode change.',
  },
  // C -> S
  {
    yourType: 'C',
    theirType: 'S',
    situation: 'request',
    approach: 'Comfortable pairing. Both of you are thoughtful and measured. Provide clear requirements with a warm framing. S types want to help and will do quality work if they understand what is needed. Give them time to consider - do not expect an immediate yes.',
    openWith: [
      'I have a request I have been thinking through. Here is what I need and why it matters.',
      'Would you have capacity to take on X? I have documented the requirements so you can review.',
      'I would value your help on X. No rush on the answer - take a day to think about it.',
    ],
    avoid: [
      'Being so precise in your requirements that it feels like micromanagement',
      'Forgetting to explain the why behind the what - S types are motivated by purpose, not just specs',
      'Assuming their quiet consideration is reluctance',
    ],
    theirReaction: 'They will think about it carefully and likely come back with a yes. If they hesitate, it means they have a concern they are not voicing. Ask directly: "What part gives you pause?"',
    ifGoesWrong: 'If they are struggling with the work, check in: "Is there anything unclear about the requirements, or is it a capacity issue? Either way, let us figure it out together." Offer support, not judgment.',
    bodyLanguage: 'Sit beside them, not across. Speak in a warm, measured tone. Place written requirements between you. Give them time to read - do not talk over the document.',
  },
  // C -> C
  {
    yourType: 'C',
    theirType: 'C',
    situation: 'request',
    approach: 'Two detail-oriented people can either collaborate beautifully or get stuck negotiating specifications forever. Be thorough in your request but set a decision point. "Here is what I need, here are the specs. Can we agree on feasibility by end of day?"',
    openWith: [
      'I have a documented request with clear acceptance criteria. Can you review and confirm feasibility?',
      'Here is the scope, constraints, and quality bar for X. What is your honest assessment of the timeline?',
      'I need X delivered to this standard. I have written up the specs - where do you see gaps?',
    ],
    avoid: [
      'Getting into a specification spiral where you keep refining requirements without starting',
      'Both of you analyzing risks so thoroughly that the project never launches',
      'Assuming they need as much detail as you would - ask what they need to get started',
    ],
    theirReaction: 'They will engage with the specs seriously. Expect a thorough review and honest assessment. C-to-C requests tend to produce high-quality outcomes because both sides care about getting it right.',
    ifGoesWrong: 'If you are stuck in spec negotiation, propose: "Let us agree on the 80% and start. We can refine the remaining 20% after the first iteration." Give yourselves permission to iterate.',
    bodyLanguage: 'Sit at a table with shared documents. Point to specifics as you discuss them. Measured pace, measured tone. Nod when they make valid points about the requirements.',
  },
];

export default cards;
