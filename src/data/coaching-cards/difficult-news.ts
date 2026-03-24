import type { CoachingCard } from '../../engine/types.ts';

const cards: CoachingCard[] = [
  // D -> D
  {
    yourType: 'D',
    theirType: 'D',
    situation: 'difficult_news',
    approach: 'State the news directly. A D receiving difficult news wants the facts immediately - no softening, no buildup. What happened, what is the impact, and what is the plan. They will respect you for not wasting their time on cushioning.',
    openWith: [
      'Straight to it: X happened. Here is the impact and here is what I recommend we do.',
      'Bad news - X is off the table. Here is what I know and here is the path forward.',
      'I need to tell you something difficult. No sugarcoating: X. Here is our next move.',
    ],
    avoid: [
      'Building up to the news with lengthy context - rip the bandage',
      'Showing uncertainty about the path forward - bring a plan, even a rough one',
      'Apologizing excessively - one acknowledgment, then move to solutions',
    ],
    theirReaction: 'Expect a flash of frustration followed by rapid pivoting to action. They may bark a few questions. Stay calm and factual. Once they shift to problem-solving, you are through the hardest part.',
    ifGoesWrong: 'If they direct anger at you: "I understand the frustration. I am not the problem - the situation is. Let us focus on what we can control." Redirect to action without absorbing blame.',
    bodyLanguage: 'Stand or sit squarely. Shoulders back. Deliver the news with level eye contact. Do not look down. After stating it, pause briefly, then shift forward - your body language should signal "here is what we do next."',
  },
  // D -> I
  {
    yourType: 'D',
    theirType: 'I',
    situation: 'difficult_news',
    approach: 'Your instinct to be blunt will land like a punch with an I type. They process bad news emotionally first. Lead with empathy - "this is hard to share" - then deliver the facts. Give them a moment to react before jumping to solutions.',
    openWith: [
      'I need to share something that is not easy. X has happened, and I want to talk through it with you.',
      'This is tough news and I wanted you to hear it from me directly: X.',
      'I know this will be disappointing: X has changed. Let me tell you what I know.',
    ],
    avoid: [
      'Delivering the news and immediately pivoting to logistics - they need a human moment first',
      'Being so clinical that it feels callous - match the emotional weight of the message',
      'Telling them to not take it personally - they will, and that is valid',
    ],
    theirReaction: 'Visible emotional response - disappointment, frustration, maybe some processing out loud. Let them talk. They need to express before they can act. Once the wave passes, they will be ready to move forward.',
    ifGoesWrong: 'If they spiral emotionally: "I can see this hit hard. Take whatever time you need. When you are ready, I have some ideas for how we move forward. I am not going anywhere."',
    bodyLanguage: 'Sit at their level. Lean in slightly. Lower your voice from its usual pace. If they get upset, stay physically present - do not pull away. Hands visible, posture open.',
  },
  // D -> S
  {
    yourType: 'D',
    theirType: 'S',
    situation: 'difficult_news',
    approach: 'Maximum care required. S types internalize difficult news deeply and will not show how much it affects them. Deliver gently but clearly. Provide reassurance about what is NOT changing. Their biggest fear is losing stability - address it directly.',
    openWith: [
      'I have something difficult to share. Before I do - your role and our relationship are not changing. Here is what is.',
      'I want to give you a heads-up on X. It is a change, and I want to walk through what it means and what stays the same.',
      'This is not easy to say. X is happening. Here is what I want you to know: Y is still solid.',
    ],
    avoid: [
      'Dropping the news and leaving - they need presence, not just information',
      'Moving to action steps before they have absorbed the reality',
      'Assuming their calm exterior means they are handling it - check in explicitly',
    ],
    theirReaction: 'They will go very still. May nod quietly. The real impact shows later - in withdrawal, reduced engagement, or quiet worry. Check in 24 hours later. "How are you really processing this?"',
    ifGoesWrong: 'If they shut down: "I can see this is a lot. You do not have to respond right now. I will check in with you tomorrow. Just know that I am here and we will figure this out together."',
    bodyLanguage: 'Sit down. Lower your voice. Speak slowly. If appropriate, sit beside them rather than across. After delivering the news, stay physically present for at least 2 minutes. Do not rush out.',
  },
  // D -> C
  {
    yourType: 'D',
    theirType: 'C',
    situation: 'difficult_news',
    approach: 'C types handle difficult news by analyzing it. Give them the facts, the data, and the contributing factors. They do not need emotional support as much as they need to understand what happened and why. Be precise - ambiguity is worse than bad news.',
    openWith: [
      'Here are the facts: X happened because of Y. Here is the data and here is what I recommend.',
      'I need to share difficult news. I have prepared the details because I know you will want to understand the full picture.',
      'X has happened. Before we discuss next steps, let me walk through what we know and what we do not know.',
    ],
    avoid: [
      'Being vague about causes - they will spiral into worst-case analysis without data',
      'Oversimplifying the situation to soften it - they will see through it and lose trust',
      'Pushing for emotional processing when they want to analyze - let them cope their way',
    ],
    theirReaction: 'They will ask detailed questions: when, why, what data supports this. Answer what you know, be honest about what you do not. They will process through understanding, not through talking.',
    ifGoesWrong: 'If they withdraw into over-analysis: "I know you want to understand every factor. Right now, the priority is deciding on the next step. Can we align on that, then continue the analysis?" Bound the investigation.',
    bodyLanguage: 'Sit at a table. Have any relevant documents ready. Deliver the news with steady eye contact. When they start asking questions, shift to looking at the data together. Physical calm signals control of the situation.',
  },
  // I -> D
  {
    yourType: 'I',
    theirType: 'D',
    situation: 'difficult_news',
    approach: 'Your instinct is to ease into it. Do not. D types receiving bad news from an I type will get frustrated by preamble. State the news in the first sentence. You can be compassionate and direct at the same time - combine them.',
    openWith: [
      'No easy way to say this: X. Here is what I know and here is what I think we should do.',
      'I have difficult news. X has happened. I have thought about next steps.',
      'Heads up - X. It is not great. Let me share what I know.',
    ],
    avoid: [
      'Starting with "so, I have been thinking..." - they will lose patience before you get to the point',
      'Trying to make the news feel better than it is - Ds want accurate, not optimistic',
      'Getting emotional during delivery - save your processing for after, be steady now',
    ],
    theirReaction: 'They will ask two questions: what happened and what do we do. Have both answers ready. Their frustration is with the situation, not with you - do not absorb it personally.',
    ifGoesWrong: 'If they react with visible anger, stay grounded: "I get it - this is frustrating. Here is what is in our control." Point them toward action. Ds recover through doing, not discussing.',
    bodyLanguage: 'Stand still. Hands at your sides or on the table. Resist nervous laughter or fidgeting. Deliver the core message with a level gaze. Once it lands, shift your posture slightly forward to signal action mode.',
  },
  // I -> I
  {
    yourType: 'I',
    theirType: 'I',
    situation: 'difficult_news',
    approach: 'Two I types will want to process this together, which is fine - but make sure the actual news gets delivered clearly. Your shared tendency to optimize for emotions can mean the facts get softened to the point of distortion.',
    openWith: [
      'I need to tell you something hard, and I want to be honest because our relationship can handle it.',
      'This is not fun to share. X has happened, and I wanted you to hear it from me.',
      'Can we sit down? I have news that is going to be disappointing. X has changed.',
    ],
    avoid: [
      'Both of you minimizing the news to protect each other - face the full reality together',
      'Turning the conversation into a mutual support session before absorbing the facts',
      'Performing optimism before you have both actually processed the impact',
    ],
    theirReaction: 'They will have an emotional response and want to talk it through. That is healthy. Give them space to express, then gently steer: "Now that we have both said what we feel - what do we do about it?"',
    ifGoesWrong: 'If you are both stuck in the emotional loop: "I think we need to sit with this and come back to it with clearer heads. Let us meet again in the morning with ideas for next steps." Create a processing break.',
    bodyLanguage: 'Sit close. Maintain warm eye contact. Let your natural expressiveness show - it is okay to look affected. When transitioning to action, physically shift: straighten up, pull out a notepad. Signal the mode change with your body.',
  },
  // I -> S
  {
    yourType: 'I',
    theirType: 'S',
    situation: 'difficult_news',
    approach: 'You need to be gentler than usual and more direct than usual at the same time. S types need clear information wrapped in reassurance. Do not let your own emotional processing dominate - focus on making them feel secure while being honest.',
    openWith: [
      'I have something important to share with you. Our relationship is not changing - but X is.',
      'I want to be upfront with you about something. X has happened. What has not changed: Y.',
      'This is hard for me to share, and I think it will be hard to hear. X is happening. Here is what I know.',
    ],
    avoid: [
      'Getting so caught up in your own emotional reaction that they end up comforting you',
      'Being dramatically expressive about the news - it amplifies their anxiety',
      'Moving too fast to "the bright side" before they have processed the reality',
    ],
    theirReaction: 'They will be quiet and may seem stoic. They are processing deeply. Do not fill the silence with chatter. Let them sit with it. Ask one gentle question: "What are you thinking right now?"',
    ifGoesWrong: 'If they withdraw: "I can see this is a lot. I am here whenever you want to talk, today or tomorrow or next week. No pressure. You are not alone in this."',
    bodyLanguage: 'Sit beside them. Keep your energy at half your normal level. Speak slowly and warmly. If they go quiet, stay physically present. Resist the urge to touch their shoulder unless you know it is welcome.',
  },
  // I -> C
  {
    yourType: 'I',
    theirType: 'C',
    situation: 'difficult_news',
    approach: 'Your emotional delivery style will not land with a C type. They need facts first, feelings never. Prepare the key information - what happened, the data, the implications - and present it with minimal drama. Your empathy is good; just channel it through clarity.',
    openWith: [
      'I have difficult news. Here are the facts: X happened because of Y. Here is what we know so far.',
      'Something has changed and I want to give you the full picture. Here is the data.',
      'X happened. I have documented what we know and what is still uncertain. Let me walk you through it.',
    ],
    avoid: [
      'Leading with how you feel about the news - they want the information, not the emotion',
      'Being imprecise about details - they will lose confidence in the entire message',
      'Expecting them to share an emotional reaction - they process through analysis',
    ],
    theirReaction: 'They will ask systematic questions. Answer with whatever facts you have and be transparent about gaps. They may seem unaffected - they are not. They are processing by understanding.',
    ifGoesWrong: 'If they withdraw into silent analysis: "I can see you are processing. I have shared everything I know. When you have had time to review, I would value your analysis of next steps." Give them a productive channel.',
    bodyLanguage: 'Sit at a table. Have your information organized. Deliver the news with calm eye contact. When they start asking questions, shift to a collaborative posture - both looking at the same information.',
  },
  // S -> D
  {
    yourType: 'S',
    theirType: 'D',
    situation: 'difficult_news',
    approach: 'This is hard for you because D types react intensely to bad news, and you absorb other people\'s emotions. Prepare your message in advance. Deliver it clearly. Have next steps ready. Their anger is at the situation, not at you - remind yourself of this before walking in.',
    openWith: [
      'I need to tell you something directly: X has happened. Here is what I recommend as a next step.',
      'I have difficult news. X. I have already started thinking about solutions.',
      'Bad news: X. I want to be upfront with you and I have a plan for how we address it.',
    ],
    avoid: [
      'Burying the news in qualifiers - their frustration will be worse if they feel you were hiding it',
      'Apologizing repeatedly - once is enough, then pivot to solutions',
      'Taking their intense reaction as a personal attack - it is their processing style',
    ],
    theirReaction: 'Expect immediate intensity - sharp questions, possibly raised voice. This is normal D processing. Stay steady. Answer what you can. The storm passes fast with D types.',
    ifGoesWrong: 'If they direct anger at you: "I understand you are frustrated. I brought this to you because I trust us to fix it. Let us focus on what we do next." Redirect energy without absorbing blame.',
    bodyLanguage: 'Stand or sit with stability. Both feet on the floor. Hands visible. Keep your voice steady and at normal volume even if they raise theirs. Do not shrink. Breathe deliberately.',
  },
  // S -> I
  {
    yourType: 'S',
    theirType: 'I',
    situation: 'difficult_news',
    approach: 'A compassionate pairing for hard conversations. You both care about the relationship. Deliver the news honestly and let them process emotionally. Your steady presence is exactly what an I type needs when receiving difficult news.',
    openWith: [
      'I care about you, and that is why I want to be honest. X has happened.',
      'This is not easy news. X. I wanted to tell you in person because it matters.',
      'Something has changed and I want you to hear it from me: X.',
    ],
    avoid: [
      'Being so gentle that the news does not register - make sure they understand the full picture',
      'Getting pulled into their emotional processing before you have finished delivering the facts',
      'Minimizing the impact to protect their feelings - they need the real truth',
    ],
    theirReaction: 'Expect an emotional reaction. They may need to talk it through, possibly at length. Let them. Your calm listening is healing. Once they have expressed, gently shift: "What feels like the right next step for you?"',
    ifGoesWrong: 'If they are overwhelmed: "Take all the time you need. I am right here. We will figure this out together, but there is no rush right now." Be the anchor.',
    bodyLanguage: 'Sit close to them. Warm, steady eye contact. Keep your body still and grounded. If they cry or get upset, stay present - do not look away or pull back. Your physical steadiness is a gift.',
  },
  // S -> S
  {
    yourType: 'S',
    theirType: 'S',
    situation: 'difficult_news',
    approach: 'Two S types delivering and receiving hard news can result in the message being so softened it barely registers. Or both of you silently absorbing the pain without processing it. Be clear, be kind, and sit with the discomfort together.',
    openWith: [
      'I need to share something difficult. I have been putting this off because it is not easy, but you deserve to know: X.',
      'This is hard for both of us. X has happened. I wanted to tell you directly.',
      'I have been thinking about how to say this. The honest truth is: X.',
    ],
    avoid: [
      'Softening the news so much that the reality is obscured',
      'Both going quiet and absorbing without discussing - the silence becomes the problem',
      'Rushing to reassure each other before fully acknowledging what happened',
    ],
    theirReaction: 'They will be quiet and may not react visibly. This is deep processing. After a pause, ask: "What is going through your mind?" Open the door for honest dialogue. Be prepared to wait.',
    ifGoesWrong: 'If you are both stuck in silence: "I think we are both sitting with this. That is okay. But I do not want us to carry it alone. Can we talk about how we are each feeling about this?"',
    bodyLanguage: 'Sit side by side. Speak softly but clearly. Allow long silences. Keep your body open and still. If they reach out for physical reassurance, respond. Do not check your phone or fidget.',
  },
  // S -> C
  {
    yourType: 'S',
    theirType: 'C',
    situation: 'difficult_news',
    approach: 'Prepare the facts. C types handle difficult news best when they can analyze it. Your natural empathy is fine, but lead with information. What happened, what caused it, what the data shows. They process through understanding, not through feeling.',
    openWith: [
      'I have some difficult news. Here are the facts as I know them: X happened because of Y.',
      'Something has changed and I want to give you the complete picture. Here is what I know.',
      'I need to share difficult news. I have organized the details so we can review them together.',
    ],
    avoid: [
      'Leading with emotional framing - "this is really sad" does not help them process',
      'Being vague about the details - they need precision to cope',
      'Expecting them to share feelings - let them analyze first, emotions come later if at all',
    ],
    theirReaction: 'They will ask specific questions and may seem detached. This is not coldness - it is their processing mechanism. Answer what you know and be honest about what you do not.',
    ifGoesWrong: 'If they seem to dismiss the emotional weight: "I know you are focused on understanding the situation, and that is valuable. I also want to check - how are you doing with this?" Offer the opening once, then respect their approach.',
    bodyLanguage: 'Sit at a table with information available. Speak clearly at a measured pace. Have notes if it helps you stay factual. Maintain gentle eye contact. Let them look at documents if they prefer that to looking at you.',
  },
  // C -> D
  {
    yourType: 'C',
    theirType: 'D',
    situation: 'difficult_news',
    approach: 'Conclusion first. Your instinct is to explain the analysis that led to the bad news. Resist. A D needs the headline in sentence one and the plan in sentence two. Save the detailed analysis for when they ask - and they will, once they have processed the initial impact.',
    openWith: [
      'X has failed. Impact is Y. My recommendation: Z.',
      'Difficult news: X. I have analyzed the cause and have a recovery plan ready.',
      'I need to report that X happened. Here is the impact and here is what I think we do.',
    ],
    avoid: [
      'Walking through your analysis chronologically before revealing the conclusion',
      'Hedging the severity - state it accurately and let them decide how to react',
      'Providing options without a recommendation - they want your best answer under pressure',
    ],
    theirReaction: 'Immediate action mode. They will ask "how do we fix it" within seconds. Have your plan ready. If they are angry, it burns fast. Stay calm through it.',
    ifGoesWrong: 'If they shoot the messenger: "The analysis is solid and I stand by the recommendation. Let us channel this energy into the fix." Deflect from yourself to the solution without being defensive.',
    bodyLanguage: 'Square posture, direct eye contact. Deliver the headline standing if they are standing. Voice firm and measured. Keep your backup analysis accessible but not visible. After the initial impact, gesture toward a chair - signal the shift to planning.',
  },
  // C -> I
  {
    yourType: 'C',
    theirType: 'I',
    situation: 'difficult_news',
    approach: 'Your clinical delivery will feel cold to an I type receiving bad news. Add one human sentence before the facts. "This is hard to share" costs you nothing and tells them you care. Then be factual. The combination of warmth and precision is what they need.',
    openWith: [
      'This is hard to share, and I want to be honest with you. X has happened. Here is what I know.',
      'I have some difficult news. I care about how this lands - and I also want you to have the full picture.',
      'I wish I had better news. The reality is X. Let me walk through what it means.',
    ],
    avoid: [
      'Delivering the news like a data report - they need to feel that you recognize the human impact',
      'Getting impatient with their emotional reaction - it is valid and it will pass',
      'Trying to fix the emotional response with more data - let them feel first',
    ],
    theirReaction: 'Expect visible emotion. They may need to talk through it. Let them. After the emotional wave, they will start asking questions. That is when your analysis becomes valuable.',
    ifGoesWrong: 'If they shut down: "I can see this landed hard. I am not going anywhere. When you are ready, I have information that might help us figure out the path forward." Be present but patient.',
    bodyLanguage: 'Soften your typical posture. Sit at an angle. Lower your voice slightly. When they react emotionally, maintain gentle eye contact. Do not look at your notes while they are processing. Be a person first, an analyst second.',
  },
  // C -> S
  {
    yourType: 'C',
    theirType: 'S',
    situation: 'difficult_news',
    approach: 'Deliver with care and clarity. S types need to feel secure even while receiving difficult news. Lead with what is stable, then share what has changed. Your measured delivery style is actually well-suited here - just add warmth.',
    openWith: [
      'Something has changed and I want to be transparent with you. What has not changed: Y. What has: X.',
      'I have difficult news. I want to be clear and also let you know that Z remains solid.',
      'I need to share something. I have thought about how to present this so you have the full picture without unnecessary worry.',
    ],
    avoid: [
      'Being so analytical that the news feels impersonal - add a human layer',
      'Overwhelming them with worst-case analysis - present the facts, not the catastrophe model',
      'Expecting an immediate response - they need time to absorb',
    ],
    theirReaction: 'They will be quiet and may seem composed. They are not. Check in the next day: "I have been thinking about our conversation. How are you sitting with it?" The real reaction comes later.',
    ifGoesWrong: 'If they seem to shut down: "I realize that was a lot. You do not need to respond now. I am available whenever you want to talk, and I will have updated information as I get it."',
    bodyLanguage: 'Sit at their level. Speak softly and slowly. After delivering the news, stay still. Do not immediately pull out more data. Let the human moment exist. Maintain gentle eye contact.',
  },
  // C -> C
  {
    yourType: 'C',
    theirType: 'C',
    situation: 'difficult_news',
    approach: 'Two analysts will handle this through structured analysis, which is productive but can bypass the human element. Present the facts with full context. Acknowledge the difficulty once, then let the analysis begin. Set a boundary on analysis before action.',
    openWith: [
      'Difficult news. Here are the facts, the root cause analysis, and my recommended response.',
      'X has happened. I have the data on what went wrong and a proposed path forward. Let us review.',
      'I need to share something serious. I have documented everything I know. Let us go through it together.',
    ],
    avoid: [
      'Getting into an analysis loop where neither of you acknowledges the human impact',
      'Competing over who saw the risk first - that conversation helps nobody now',
      'Spending so long on root cause that the response is delayed',
    ],
    theirReaction: 'They will engage immediately with the analysis. This is productive and healthy for both of you. Let the shared analysis be the processing mechanism. But at some point, pause: "Before we go further - are we okay?"',
    ifGoesWrong: 'If you get stuck in analysis paralysis: "We have a thorough understanding of the problem. The priority now is deciding on the response. What is the single most important action for this week?" Force a decision point.',
    bodyLanguage: 'Sit at a table with all documentation accessible. Reference specific data points. Measured voice, deliberate gestures. When you check in on the human level, shift - put the data aside, make eye contact, and ask directly.',
  },
];

export default cards;
