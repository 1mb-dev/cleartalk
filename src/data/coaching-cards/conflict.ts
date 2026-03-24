import type { CoachingCard } from '../../engine/types.ts';

const cards: CoachingCard[] = [
  // D -> D
  {
    yourType: 'D',
    theirType: 'D',
    situation: 'conflict',
    approach: 'Two dominants in conflict is a collision, not a conversation. Neither will back down by instinct. Reframe from "I am right" to "what does the evidence say?" Make the problem the opponent, not each other.',
    openWith: [
      'We clearly disagree. Let us lay out both positions and see which one holds up against the data.',
      'I do not think either of us is going to back down, so let us look at this objectively.',
      'We are both fighting for the best outcome. Let us figure out what that actually is.',
    ],
    avoid: [
      'Trying to dominate through volume or authority - another D will escalate, not yield',
      'Making it personal - attack the idea, never the person',
      'Refusing to concede any point - Ds respect strength, but stubbornness costs credibility',
    ],
    theirReaction: 'Expect intense pushback. They are not angry at you - they are competing with the problem. If they start conceding points, you are winning their respect, not defeating them.',
    ifGoesWrong: 'If it escalates into a power struggle, call a timeout: "We are both dug in. Let us take 30 minutes, write down our positions, and come back with evidence. Whoever has the stronger case wins." Formalize the contest.',
    bodyLanguage: 'Stand your ground physically but do not advance. Arms at sides, not crossed. Voice firm but not raised. Direct eye contact without staring. Equal posture - do not tower or slouch.',
  },
  // D -> I
  {
    yourType: 'D',
    theirType: 'I',
    situation: 'conflict',
    approach: 'Your directness will feel like a personal attack to an I type. They experience conflict through the relationship lens, not the task lens. Separate the issue from the person explicitly. Acknowledge the relationship before addressing the disagreement.',
    openWith: [
      'This is about the approach, not about you. I value working with you and I disagree on this specific thing.',
      'I know we see this differently. I want to work it out - here is where I am coming from.',
      'I want to be honest with you because I respect you. Here is where I think we are misaligned.',
    ],
    avoid: [
      'Being blunt without warmth - the I type will shut down emotionally and you will lose the conversation',
      'Dismissing their feelings as irrelevant to the issue - for them, feelings are the issue',
      'Pushing for resolution before they have processed the emotional impact',
    ],
    theirReaction: 'They may get visibly upset or withdraw their usual warmth. This is their version of pushback. Give them space to express how the conflict feels, then steer back to the substance.',
    ifGoesWrong: 'If they disengage, pause: "I think I came across harder than I meant to. The relationship matters to me. Can we reset and tackle this together?" Repair the connection before re-entering the debate.',
    bodyLanguage: 'Soften your posture. Sit down if you were standing. Lower your voice. Open palms on the table. Lean back slightly to create breathing room.',
  },
  // D -> S
  {
    yourType: 'D',
    theirType: 'S',
    situation: 'conflict',
    approach: 'The most asymmetric conflict pair. You push, they retreat - and you may not even realize there IS conflict because S types do not fight back visibly. You need to actively draw them out and create genuine safety for disagreement.',
    openWith: [
      'I know I come on strong. I want to hear your honest take on this, even if it disagrees with mine.',
      'I think we see this differently, and I need your perspective to make a good decision.',
      'I would rather hear your real opinion now than find out later we were not aligned.',
    ],
    avoid: [
      'Interpreting their silence as agreement - it is almost certainly not',
      'Speaking faster or louder when they go quiet - you are triggering withdrawal',
      'Winning the argument and losing the relationship - the S will remember and disengage',
    ],
    theirReaction: 'They will go quiet or agree on the surface. Ask: "What would you do if this were entirely your call?" Give them permission to disagree by removing the power dynamic.',
    ifGoesWrong: 'If they have shut down, stop the conversation: "I pushed too hard. I am genuinely asking - what do you think? I will listen without interrupting." Then actually do it. Sit in the silence.',
    bodyLanguage: 'Sit down. Bring your energy level to a 3 out of 10. Speak slowly. Leave pauses after questions - count to 5 in your head. Do not fill the space.',
  },
  // D -> C
  {
    yourType: 'D',
    theirType: 'C',
    situation: 'conflict',
    approach: 'You want speed, they want correctness. The conflict is often about pace, not substance. Acknowledge their concern for quality and show that your urgency does not mean cutting corners. Meet on shared ground: both of you want the right outcome.',
    openWith: [
      'I know we are approaching this differently. You are focused on getting it right, I am focused on getting it done. Let us find the overlap.',
      'Walk me through your concerns. I want to understand what I might be missing.',
      'What specific risk are you flagging? I want the detail so I can make a better call.',
    ],
    avoid: [
      'Dismissing their analysis as overthinking - it erodes trust permanently',
      'Forcing a decision before they have examined the evidence - they will resist or comply resentfully',
      'Using "good enough" as an argument - that phrase breaks trust with C types',
    ],
    theirReaction: 'They will present detailed counter-arguments. This is not obstruction - it is due diligence. Listen to the specifics. If their concern has merit, acknowledge it explicitly.',
    ifGoesWrong: 'If they retreat behind a wall of data, shift: "I hear the analysis. What is the single biggest risk? Let us address that one and move forward." Narrow the scope of disagreement.',
    bodyLanguage: 'Sit at the table. Have a notepad or device out - take notes on their points visibly. Controlled gestures. When they present data, look at the data, not at them.',
  },
  // I -> D
  {
    yourType: 'I',
    theirType: 'D',
    situation: 'conflict',
    approach: 'Your instinct is to smooth things over and restore harmony. With a D, that reads as avoidance. Face the conflict directly - state your position clearly and back it with facts. They will respect you more for standing firm than for being agreeable.',
    openWith: [
      'I disagree with this approach, and here is why.',
      'I have a different read on this. Let me make my case.',
      'I know you have strong views here - so do I. Let us put both on the table.',
    ],
    avoid: [
      'Trying to joke your way through the conflict - Ds will see it as deflection',
      'Over-explaining your feelings about the situation - stick to the position',
      'Giving in just to end the discomfort - you will resent it and they will lose respect',
    ],
    theirReaction: 'They will argue back hard and fast. This is engagement, not hostility. If you hold your position with evidence, they will adjust. If you fold, they will steamroll.',
    ifGoesWrong: 'If you are getting overwhelmed, name it: "I need to slow this down. You are making good points but I need a moment to respond properly. Give me 30 seconds." Buying time is strength, not weakness.',
    bodyLanguage: 'Ground yourself before speaking. Both feet on the floor. Hands on the table. Make eye contact when stating your position. Resist the urge to smile through discomfort - keep your face neutral.',
  },
  // I -> I
  {
    yourType: 'I',
    theirType: 'I',
    situation: 'conflict',
    approach: 'Two I types in conflict will either escalate emotionally or paper over the real issue with forced positivity. Neither helps. Name the actual disagreement out loud. It is okay to not be upbeat - this conversation needs honesty, not energy.',
    openWith: [
      'I think we are both avoiding the real issue here. Can we just say it out loud?',
      'We are usually so aligned - the fact that we disagree means this matters. Let us talk about it honestly.',
      'I do not want to pretend everything is fine when it is not. Here is what is bothering me.',
    ],
    avoid: [
      'Both of you performing agreement while privately frustrated',
      'Turning the conflict into a social event with witnesses - handle it one-on-one',
      'Competing for who can be more understanding without actually resolving anything',
    ],
    theirReaction: 'They may match your emotional energy, up or down. If the conversation gets loud, it will resolve fast. If it stays surface-level, the conflict will fester. Push for depth.',
    ifGoesWrong: 'If you are both performing reconciliation without resolving anything: "Wait - did we actually solve this, or did we just agree to not feel bad about it? What specifically changes going forward?"',
    bodyLanguage: 'Sit facing them. Keep your energy present but controlled. When the conversation gets emotional, slow your breathing visibly. Use pauses between points. Touch base physically - a hand on the table, grounding.',
  },
  // I -> S
  {
    yourType: 'I',
    theirType: 'S',
    situation: 'conflict',
    approach: 'Your expressive conflict style can overwhelm an S type. They will not fight back - they will absorb the hit and go quiet. You need to create the space for them to disagree, because they will not take it on their own.',
    openWith: [
      'I think we might see this differently. I want to hear your honest take - not just what you think I want to hear.',
      'I have been thinking about this and I want to clear the air. Can you tell me how you see it?',
      'I know I can come on strong. I am intentionally going to slow down here. What is your real view?',
    ],
    avoid: [
      'Expressing your frustration with full I-type intensity - it will silence them completely',
      'Interpreting their compliance as resolution - they are managing you, not agreeing with you',
      'Moving on too quickly after they give a quiet response - stay and dig deeper',
    ],
    theirReaction: 'They will be measured and quiet. Watch for micro-signals: a sigh, a look away, a slight hesitation. These are their version of pushback. Acknowledge what you see: "It seems like there is more. I am listening."',
    ifGoesWrong: 'If they have gone silent, lower your volume and say: "I realize I may have taken up all the space. This conversation only works if you tell me what you really think. I can handle it."',
    bodyLanguage: 'Lower your voice significantly. Sit beside them, not across. Minimize hand gestures. Leave 3-5 seconds of silence after they speak before you respond. Physical stillness signals safety.',
  },
  // I -> C
  {
    yourType: 'I',
    theirType: 'C',
    situation: 'conflict',
    approach: 'You argue with stories and emotion. They argue with data and logic. Neither will feel heard unless you bridge the gap. Bring evidence for your position. Let them present theirs. The resolution lives in the overlap between your vision and their analysis.',
    openWith: [
      'I know we are coming at this from different angles. Let me share my reasoning, then I want to hear yours.',
      'I have thought about this from the data side too. Here is what I see - where does your analysis differ?',
      'I want to find where we actually agree and work outward from there.',
    ],
    avoid: [
      'Dismissing their detailed objections as negativity - they are trying to prevent a mistake',
      'Escalating emotional energy when they stay calm - the mismatch widens the gap',
      'Treating the conflict as a personality difference instead of a substantive disagreement',
    ],
    theirReaction: 'They will stay calm and present their case methodically. Do not mistake low emotion for low investment. They care deeply - they just express it through precision.',
    ifGoesWrong: 'If you feel dismissed by their clinical approach: "I know I am more expressive than you, but my point is just as considered. Can we focus on the merits of both positions?"',
    bodyLanguage: 'Match their calm. Sit at the table. Lower your gestures to 30% of normal. Speak in full sentences, not rapid-fire points. Make notes - it shows you are taking their analysis seriously.',
  },
  // S -> D
  {
    yourType: 'S',
    theirType: 'D',
    situation: 'conflict',
    approach: 'You avoid conflict. They charge into it. The worst outcome is you staying silent and letting resentment build. The conversation will be uncomfortable, but your voice matters. Prepare your position in writing beforehand so you do not lose it under pressure.',
    openWith: [
      'I have something I need to say, and I am asking you to hear me out before responding.',
      'We disagree on this and I have been putting off saying so. Here is my position.',
      'This is hard for me to bring up, but it is too important to leave unsaid.',
    ],
    avoid: [
      'Hoping the conflict resolves itself - it will not, and the D probably does not even know it exists',
      'Sending an email instead of having the conversation - Ds read avoidance in written conflict',
      'Caving at the first pushback - expect it, breathe through it, hold your ground',
    ],
    theirReaction: 'They will respond immediately and firmly. Prepare for the intensity and do not retreat. A D who hears a clear position will engage with it. A D who senses weakness will push harder.',
    ifGoesWrong: 'If they steamroll you, use a reset phrase: "I hear you. Now I need you to hear me. This is important." Repeat as needed. You are not being aggressive - you are being clear.',
    bodyLanguage: 'Plant your feet shoulder-width apart. Keep your head level, not tilted. Hands on the table or at your sides. Speak at a volume that surprises you slightly - louder than your comfort zone.',
  },
  // S -> I
  {
    yourType: 'S',
    theirType: 'I',
    situation: 'conflict',
    approach: 'I types process conflict through emotion and expression. Your quiet approach may frustrate them - they want engagement, not withdrawal. Meet them halfway: share what you are feeling, not just what you are thinking.',
    openWith: [
      'I have been uncomfortable about X and I want to clear the air.',
      'I think there is something between us that we need to address. Here is what I have noticed.',
      'I care about our working relationship, and something has been off. Can we talk about it?',
    ],
    avoid: [
      'Going silent when they get emotional - they will interpret silence as rejection',
      'Being so measured that they cannot tell how you actually feel',
      'Avoiding the conversation because it feels too intense - the I type is waiting for you to engage',
    ],
    theirReaction: 'They will be relieved you brought it up. Expect them to talk through it with energy. Let them express, then share your perspective calmly. The combination of their expression and your stability creates resolution.',
    ifGoesWrong: 'If they overwhelm you with emotion, hold steady: "I hear you, and I need a moment to process before I respond. Let me think for a second." Taking space is not retreating.',
    bodyLanguage: 'Face them directly. Maintain warm eye contact. Keep your body still but open. Nod when they speak to show you are tracking. When you speak, lean forward slightly.',
  },
  // S -> S
  {
    yourType: 'S',
    theirType: 'S',
    situation: 'conflict',
    approach: 'The silent conflict. Both of you would rather endure discomfort than risk confrontation. But unspoken conflict between two S types corrodes trust slowly. One of you must name it. Being uncomfortable for 15 minutes is better than months of quiet tension.',
    openWith: [
      'Neither of us wants to have this conversation, and I think that is exactly why we need to.',
      'I have been holding back because I did not want to make things awkward. But the silence is worse.',
      'I think there is something we are both dancing around. Can we just put it on the table?',
    ],
    avoid: [
      'Both deferring so much that the actual issue never surfaces',
      'Turning the conversation into mutual reassurance without addressing the conflict',
      'Agreeing to disagree prematurely - that is avoidance disguised as resolution',
    ],
    theirReaction: 'Expect a long pause. They are deciding whether to be honest. Wait it out. If you fill the silence, they will retreat back into safety.',
    ifGoesWrong: 'If you both retreat into politeness: "I notice we are being very careful with each other right now. What would you say if there were zero consequences?" Remove the social risk.',
    bodyLanguage: 'Sit side by side. Keep your voice warm but intentional. When there is silence, breathe normally and wait. Place both hands on the table - visible, open. No crossing arms or looking away.',
  },
  // S -> C
  {
    yourType: 'S',
    theirType: 'C',
    situation: 'conflict',
    approach: 'Relatively calm conflict. Neither of you is explosive. The challenge is that your feeling-based concern may not register with their analysis-based worldview. Translate your discomfort into specific observations they can engage with.',
    openWith: [
      'I have noticed a pattern that concerns me. Here are the specifics.',
      'I have been thinking about our disagreement on X and I have some observations I want to share.',
      'I want to talk about where we differ on X. I have tried to organize my thoughts so we can work through it methodically.',
    ],
    avoid: [
      'Leading with "I feel" without supporting specifics - they cannot engage with feelings alone',
      'Backing down because their counter-argument sounds more logical - your instincts have data too',
      'Allowing their precision to make you feel like your perspective is less valid',
    ],
    theirReaction: 'They will engage analytically and may not acknowledge the emotional dimension. That is okay. If your evidence is solid, they will respect it. They may need time to process before changing their position.',
    ifGoesWrong: 'If they dismiss your concern as unsubstantiated: "I understand you want data. Here is what I have observed. Help me understand how you see it differently." Invite analysis instead of fighting it.',
    bodyLanguage: 'Sit at a table with your observations written down. Speak steadily. Reference your notes naturally. Maintain open posture. When they present counterpoints, nod and take notes - show you are genuinely considering.',
  },
  // C -> D
  {
    yourType: 'C',
    theirType: 'D',
    situation: 'conflict',
    approach: 'They want a quick resolution. You want a thorough one. Bridge the gap by leading with your conclusion, then offering the analysis. Do not make them sit through the full reasoning to understand your position. Headlines first.',
    openWith: [
      'Here is where I disagree and here is the biggest risk I see.',
      'My analysis says the current approach will fail at X. Here is why.',
      'I have a fundamental concern. Let me give you the bottom line, then the evidence.',
    ],
    avoid: [
      'Presenting a 20-minute analysis when they need a 2-minute summary',
      'Getting drawn into a speed contest - stick to your pace but front-load the key point',
      'Withdrawing into passive non-cooperation when they dismiss your concerns',
    ],
    theirReaction: 'They will challenge your conclusion directly. Good. Be ready to defend it concisely. If they poke holes, address each one without getting defensive. Your evidence is your strength.',
    ifGoesWrong: 'If they override your analysis, try once more: "I understand the urgency. I am asking for 24 hours to validate. If the data confirms your approach, I will fully support it." Offer a bounded compromise.',
    bodyLanguage: 'Stand at their level. Square posture. Speak with authority - your analysis earned that. Do not look at your notes when stating the key point. Eye contact signals conviction.',
  },
  // C -> I
  {
    yourType: 'C',
    theirType: 'I',
    situation: 'conflict',
    approach: 'They argue with passion, you argue with precision. The conflict will feel like two different conversations unless you bridge the styles. Acknowledge the human dimension of their concern, then present your analysis. Both lenses have value.',
    openWith: [
      'I can see this matters to you, and it matters to me too - for different reasons. Let me share my perspective.',
      'I hear your concern. Let me add the data side so we have the full picture.',
      'I think we are looking at the same problem from two valid angles. Here is what I see.',
    ],
    avoid: [
      'Treating their emotional argument as irrational - it may contain insights your data misses',
      'Getting colder and more clinical as they get more animated - the gap widens',
      'Winning the argument on facts while losing their trust and cooperation',
    ],
    theirReaction: 'They will be expressive and may seem to argue from feeling rather than fact. Underneath the energy, there is usually a real concern. Ask: "What specifically worries you most?" Extract the substance from the style.',
    ifGoesWrong: 'If the style gap becomes the conflict: "I realize my approach might seem cold. I actually care about this - I just show it differently. Can we focus on finding a solution we both believe in?"',
    bodyLanguage: 'Warm your expression slightly. Lean forward when they speak. Nod to show you are listening, even when you disagree. When presenting your data, slow down and make it conversational, not clinical.',
  },
  // C -> S
  {
    yourType: 'C',
    theirType: 'S',
    situation: 'conflict',
    approach: 'You may not realize there is a conflict - S types express disagreement through withdrawal, not words. If they have been quieter than usual or less engaged, there is likely an issue. Create a low-pressure space for honest conversation.',
    openWith: [
      'I have sensed some tension and I want to check in. Is there something we should talk about?',
      'I may have missed something. How are you feeling about how things are going between us?',
      'I want to make sure we are genuinely aligned, not just on the surface. Are we good?',
    ],
    avoid: [
      'Demanding evidence of their discomfort - they may not have articulated it yet',
      'Pushing for immediate resolution - S types need time to formulate their honest response',
      'Analyzing the conflict so thoroughly that you miss the emotional reality of it',
    ],
    theirReaction: 'They may initially say everything is fine. Stay gently persistent: "I appreciate that, but I have noticed X. I want to hear your real take." Give them permission to be honest.',
    ifGoesWrong: 'If they will not open up in person, try: "If it is easier, send me a message about it. I genuinely want to understand your perspective and I can wait for it." Offer a lower-pressure channel.',
    bodyLanguage: 'Sit at their level, slightly angled. Speak softly and slowly. Leave long pauses after your questions. Do not fill silence. Relax your face - no analytical frown.',
  },
  // C -> C
  {
    yourType: 'C',
    theirType: 'C',
    situation: 'conflict',
    approach: 'Two analysts in conflict will build competing spreadsheets. The danger is not intensity - it is duration. You could debate forever. Set a decision framework upfront: what evidence would change each of your minds? This prevents infinite recursion.',
    openWith: [
      'We disagree on this. Before we dig in, what evidence would change your position? Here is what would change mine.',
      'I have my analysis and you have yours. Let us compare the assumptions, not just the conclusions.',
      'Rather than debating conclusions, can we align on the criteria for deciding?',
    ],
    avoid: [
      'Competing over who has more rigorous methodology - it devolves into meta-analysis',
      'Using data volume as a weapon - more spreadsheets do not win arguments',
      'Refusing to decide until every data point is resolved - set a threshold and commit',
    ],
    theirReaction: 'They will engage methodically and may present counter-evidence. This is a structured dialogue, not a fight. Respect the process but enforce a decision boundary.',
    ifGoesWrong: 'If you are stuck in analysis deadlock: "We both have solid evidence supporting different conclusions. Let us agree on one test - run it this week - and let the result decide." Outsource the decision to an experiment.',
    bodyLanguage: 'Sit at a table with both analyses visible. Point to specific data when discussing. Measured voice, measured gestures. When they make a valid point, nod and say "good point" explicitly - it builds trust between analytical minds.',
  },
];

export default cards;
