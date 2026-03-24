import type { CoachingCard } from '../../engine/types.ts';

const cards: CoachingCard[] = [
  // D -> D
  {
    yourType: 'D',
    theirType: 'D',
    situation: 'pitch',
    approach: 'Pitching to another D means cutting to the ROI immediately. They do not want a journey - they want the destination. Lead with the impact, state what you need from them, and be ready for rapid-fire challenges.',
    openWith: [
      'This will save us X hours and Y dollars. Here is what I need to make it happen.',
      'I have a proposal that solves the bottleneck on Z. Thirty seconds on the idea, then your questions.',
      'Bottom line: I want to do X because it gets us Y. Here is my plan.',
    ],
    avoid: [
      'Building up to the ask slowly - another D will cut you off before you get there',
      'Overselling - state the impact factually and let them evaluate',
      'Being vague about what you need from them - Ds want clarity on their role',
    ],
    theirReaction: 'They will decide fast. If they challenge you, it means they are interested. If they are silent, they are already moving on. Make your strongest case in the first 60 seconds.',
    ifGoesWrong: 'If they shoot it down, do not argue. Ask: "What would make this worth your time?" Their objection contains the key to reframing your pitch.',
    bodyLanguage: 'Stand if they are standing. Deliver the pitch with steady eye contact. Controlled gestures. Keep your hands visible. Project confidence without arrogance - measured voice, square posture.',
  },
  // D -> I
  {
    yourType: 'D',
    theirType: 'I',
    situation: 'pitch',
    approach: 'I types buy the vision before they buy the details. Paint the picture of what success looks like - who benefits, who notices, what changes. Your facts-first style needs a story layer for this audience.',
    openWith: [
      'Imagine if the team could do X without worrying about Y. Here is how we get there.',
      'This idea could change how people see what we do. Let me show you the big picture.',
      'Picture this working - the team loves it, the results speak for themselves. Here is the plan.',
    ],
    avoid: [
      'Leading with spreadsheets and ROI - their eyes will glaze before you finish the first row',
      'Presenting it as a solo initiative - I types want to be part of the story',
      'Being so focused on execution that you kill the energy before they buy in',
    ],
    theirReaction: 'They will light up if the vision resonates. Their enthusiasm is real but check: "Are you in? Great - let us nail down your specific part." Convert excitement to commitment.',
    ifGoesWrong: 'If they are lukewarm, the vision did not land. Ask: "What would make this exciting to you?" Let them reshape the pitch. An I who co-creates the vision will champion it.',
    bodyLanguage: 'Smile naturally. Use broader gestures than your default. Sit at a slight angle for collaboration energy. Match their enthusiasm once they engage - mirror their energy upward.',
  },
  // D -> S
  {
    yourType: 'D',
    theirType: 'S',
    situation: 'pitch',
    approach: 'S types need to feel safe before they can evaluate an idea. Your urgency will trigger defensiveness. Slow down, explain how this fits into what already works, and emphasize stability - this is evolution, not revolution.',
    openWith: [
      'I want to build on what is already working and add one thing that could make it even better.',
      'This is not a big overhaul. Here is a small change with a meaningful impact - let me walk you through it.',
      'I have been thinking about how to improve X without disrupting what is already solid.',
    ],
    avoid: [
      'Framing the pitch as disruption or a big change - S types resist upheaval',
      'Pushing for an immediate decision - they need time to sit with new ideas',
      'Dismissing the current approach to make your idea look better - they built that current approach',
    ],
    theirReaction: 'They will listen carefully and probably not commit right away. This is processing, not rejection. Ask: "Want to think about it and we can talk again tomorrow?" Giving them time earns trust.',
    ifGoesWrong: 'If they resist, do not push harder. Say: "I hear you. What would need to be true for you to feel comfortable trying this?" Surface their real concern - it is usually about stability, not the idea itself.',
    bodyLanguage: 'Sit down. Speak at 70% of your usual pace. Keep your energy calm and steady. Lean back to reduce pressure. Let silence happen after you make a point.',
  },
  // D -> C
  {
    yourType: 'D',
    theirType: 'C',
    situation: 'pitch',
    approach: 'Bring your homework. C types will evaluate your pitch on the quality of your preparation, not the boldness of your vision. Specifics, evidence, and a clear risk assessment will earn their buy-in faster than any amount of conviction.',
    openWith: [
      'I have a proposal with supporting data. Here is the analysis - I want your honest evaluation.',
      'I have modeled this out. Here are the numbers, the risks, and the mitigation plan.',
      'Here is what I want to do, why it works, and what could go wrong. Poke holes - I want this to be solid.',
    ],
    avoid: [
      'Winging it with broad strokes - they will notice every gap in your reasoning',
      'Getting impatient with their questions - each question is a buying signal',
      'Presenting certainty when there is legitimate uncertainty - they will distrust the whole pitch',
    ],
    theirReaction: 'Expect a thorough cross-examination. They are not trying to kill the idea - they are stress-testing it. If your answers hold up, they will become a strong advocate because they trust the analysis.',
    ifGoesWrong: 'If they find a flaw: "Good catch. Let me address that and come back with an updated proposal." Do not bluff. Fix it and return - they will respect the rigor more than the original pitch.',
    bodyLanguage: 'Sit at a table with your data visible. Reference materials calmly. When they question something, pause and look at the relevant data before answering. Measured movements, deliberate tone.',
  },
  // I -> D
  {
    yourType: 'I',
    theirType: 'D',
    situation: 'pitch',
    approach: 'Strip your natural narrative down to the skeleton. D types want: what is the idea, what is the impact, what do you need. You get 90 seconds before they decide. Put the punchline first.',
    openWith: [
      'Here is the idea in one sentence: we do X, it gets us Y. Can I have 2 minutes on the details?',
      'I want to propose X. The impact: Y. The cost: Z. That is the pitch - questions?',
      'One big idea: X. It solves the problem you flagged last week. Here is how.',
    ],
    avoid: [
      'Starting with a 5-minute story to set the scene - they are already gone at minute 2',
      'Relying on charisma over substance - Ds buy results, not enthusiasm',
      'Presenting without a clear ask - what specifically do you want from them?',
    ],
    theirReaction: 'If they lean in or start asking "how" questions, you have them. If they check their watch or give monosyllabic responses, pivot: "Let me cut to the numbers. Here is the ROI."',
    ifGoesWrong: 'If they reject it, resist the urge to re-pitch with more energy. Ask: "What would the idea need to look like for you to say yes?" Their answer rewrites your pitch for you.',
    bodyLanguage: 'Stand still. Resist pacing or animated gestures. Deliver key points with eye contact. Keep your voice at a lower register than normal. Physical control signals that the idea has substance, not just sparkle.',
  },
  // I -> I
  {
    yourType: 'I',
    theirType: 'I',
    situation: 'pitch',
    approach: 'Two visionaries can create incredible energy - or a beautiful plan that never ships. Ride the excitement for the first 5 minutes, then force the conversation into specifics. Who does what? By when? What does done look like?',
    openWith: [
      'I have been thinking about something that could be huge. Let me share the vision, then let us figure out the plan.',
      'You are going to love this idea. Here is the concept - and I want us to leave this conversation with actual next steps.',
      'What if we could do X? I think we can, and here is a rough plan.',
    ],
    avoid: [
      'Getting so excited together that you never define the deliverable',
      'Both of you adding scope until the idea is too big to execute',
      'Leaving the conversation on a high without a single action item',
    ],
    theirReaction: 'They will match your enthusiasm instantly. Use that energy as fuel but channel it: "Okay, we are both in. Before we leave, let us write down the three things that happen this week."',
    ifGoesWrong: 'If it becomes all vision and no action: "I love where this is going. Let us be real for a minute - what is the first concrete thing we can do by Friday to test if this works?"',
    bodyLanguage: 'Let the energy flow naturally - gestures, movement, excitement. When it is time to pin down specifics, physically sit down, pull out a notepad, and shift your tone. The body language shift signals "now we execute."',
  },
  // I -> S
  {
    yourType: 'I',
    theirType: 'S',
    situation: 'pitch',
    approach: 'Your high energy may overwhelm an S type into passive agreement. Scale back to 60%. Explain how the idea builds on what exists, emphasize team benefit, and give them explicit time to think before asking for buy-in.',
    openWith: [
      'I have an idea I want to share - it builds on what we are already doing well.',
      'No big disruption here - just an evolution. Let me walk you through it at a pace that works for you.',
      'I think there is a way to improve X that the team would appreciate. Want to hear it?',
    ],
    avoid: [
      'Overwhelming them with big-picture enthusiasm before grounding it in the familiar',
      'Mistaking their nodding for buy-in - it might be politeness',
      'Asking for commitment on the spot - S types decide after reflecting',
    ],
    theirReaction: 'They will listen patiently. Their buy-in comes later, often via message or a quiet "I have been thinking about your idea." Give them that runway.',
    ifGoesWrong: 'If they seem hesitant: "I do not need a yes right now. Think about it, and if anything concerns you, just tell me. I would rather adjust than push something that does not feel right to you."',
    bodyLanguage: 'Sit at their level. Speak slower than your instinct. Moderate your hand movements. Lean back when you finish the pitch. Create physical space for their processing.',
  },
  // I -> C
  {
    yourType: 'I',
    theirType: 'C',
    situation: 'pitch',
    approach: 'This is your toughest audience. Your vision-first style meets their evidence-first filter. Prepare. Have data, examples, and a risk assessment ready. Open with the vision to hook them, then immediately back it with substance.',
    openWith: [
      'I have an idea and I have done the homework. Here is the vision in 30 seconds, then the supporting analysis.',
      'Before you ask - yes, I have the numbers. Let me start with why this matters, then walk through the data.',
      'I want to propose X. I know you will want evidence, so I prepared three data points that support it.',
    ],
    avoid: [
      'Pitching purely on enthusiasm - it triggers skepticism in C types',
      'Getting defensive when they ask hard questions - every question is progress',
      'Overpromising results you cannot quantify - undermine your credibility permanently',
    ],
    theirReaction: 'They will be cautiously interested if your data holds. They may not show enthusiasm but will engage with specifics. If they start asking implementation questions, they are buying in.',
    ifGoesWrong: 'If they pick your data apart: "You are right, that part needs more work. Let me strengthen it and come back. What specifically would you need to see?" Turn their critique into your roadmap.',
    bodyLanguage: 'Sit at a table. Have your data on screen or printed. Keep gestures minimal. When presenting numbers, point to them rather than waving in the air. Slow your speaking pace by 30%.',
  },
  // S -> D
  {
    yourType: 'S',
    theirType: 'D',
    situation: 'pitch',
    approach: 'You naturally undersell and a D will not dig for the gold you are sitting on. Push yourself to lead with the impact. Write your pitch headline before the meeting and say it first, even if it feels boastful. It is not bragging - it is clarity.',
    openWith: [
      'I have a solution to the X problem. It saves Y and I can have it running by Z.',
      'Here is something I have been working on. The results speak for themselves - let me show you.',
      'I want to propose X. It directly addresses the issue you raised last week. Here is the plan.',
    ],
    avoid: [
      'Burying the impact in qualifications - "it might help a little" kills a pitch to a D',
      'Waiting for them to ask questions instead of proactively selling the value',
      'Presenting it as an option rather than a recommendation - own your proposal',
    ],
    theirReaction: 'If the impact is clear, they will give you a fast yes. If they challenge, it means they are testing the idea - defend it with data. Do not retreat to "it was just a thought."',
    ifGoesWrong: 'If they dismiss it: "I may have undersold this. The actual impact is X. Can I have 60 more seconds to make the case?" Ask for a second chance directly. Ds respect persistence.',
    bodyLanguage: 'Stand up straight. Deliver the key point with your chin level, not tilted down. Speak at a higher volume than comfortable. Make eye contact when stating the impact. Do not hedge with your body.',
  },
  // S -> I
  {
    yourType: 'S',
    theirType: 'I',
    situation: 'pitch',
    approach: 'Great audience for you. I types are naturally receptive to new ideas and your grounded delivery provides the stability their enthusiasm needs. Share the idea with warmth and let their energy amplify it. Just make sure you capture commitments.',
    openWith: [
      'I have been thinking about something I think you will find interesting.',
      'I have an idea that could make a real difference for the team. Want to hear it?',
      'You know how we have been struggling with X? I think I have found an approach that works.',
    ],
    avoid: [
      'Being so understated that they do not realize it is a pitch',
      'Letting their excitement carry the conversation away from your core proposal',
      'Failing to ask for their specific support - define what you need from them',
    ],
    theirReaction: 'They will be enthusiastic and may start adding ideas. Welcome it, but anchor: "I love that addition. Let us make sure the base plan is solid first." Channel their energy into your framework.',
    ifGoesWrong: 'If they love it but nothing happens: "You were excited about this and so was I. Can we commit to one concrete step this week? I do not want this to fade." Name the drift before it settles.',
    bodyLanguage: 'Lean forward when sharing the idea. Smile naturally. Allow more gesture than your default. When they get excited, match their energy at about 70%. When pinning down next steps, slow down and get grounded.',
  },
  // S -> S
  {
    yourType: 'S',
    theirType: 'S',
    situation: 'pitch',
    approach: 'Neither of you pushes hard, which means good ideas can die quietly. Pitch with gentle conviction. You do not need to be aggressive - but you do need to clearly state why this matters and ask for their support directly.',
    openWith: [
      'I have an idea I believe in and I want to share it with you.',
      'I have been working on something I think could help the team. Can I walk you through it?',
      'This might feel like a change, but I think it is a good one. Here is what I am proposing.',
    ],
    avoid: [
      'Both of you being so polite that the pitch dissolves into "whatever you think"',
      'Underselling because you do not want to seem pushy - state the value clearly',
      'Waiting for them to bring the enthusiasm - bring your own quiet conviction',
    ],
    theirReaction: 'They will listen thoughtfully and may need time. But S types who buy in become your most reliable supporters. Ask: "Does this resonate? I would love your honest take."',
    ifGoesWrong: 'If the conversation stalls in mutual niceness: "I want to be direct - I think this is worth doing and I am hoping for your support. What would you need to feel good about moving forward?"',
    bodyLanguage: 'Sit facing them. Speak clearly - not loudly, but with conviction. Lean slightly forward when making your key point. Nod when they ask questions. Keep your hands open on the table.',
  },
  // S -> C
  {
    yourType: 'S',
    theirType: 'C',
    situation: 'pitch',
    approach: 'Prepare specifics. Your intuitive sense that this is the right thing needs supporting evidence for a C audience. Write down three concrete data points before the conversation. Your calm, steady delivery is actually perfect for C types - just add substance.',
    openWith: [
      'I have a proposal backed by data. Here is the idea and the three reasons I think it works.',
      'I have been analyzing X and I think there is an opportunity. Here are the numbers.',
      'I want to walk you through a proposal. I have prepared the details so you can evaluate it properly.',
    ],
    avoid: [
      'Relying on "it feels right" as justification - C types need to see the evidence',
      'Being vague about timelines or expected outcomes',
      'Backing off your proposal when they ask hard questions - stand by your preparation',
    ],
    theirReaction: 'They will evaluate methodically. Expect specific questions. If they start suggesting refinements, they are buying in - they would not invest in fixing something they planned to reject.',
    ifGoesWrong: 'If they reject it on data grounds: "Thank you for the honest assessment. Would you be willing to help me strengthen the weak points? Your analysis would make this much better." Recruit their skills.',
    bodyLanguage: 'Sit at a table with materials ready. Refer to notes naturally. Measured pace. When they ask questions, pause and consider before answering - rushed answers lose credibility with C types.',
  },
  // C -> D
  {
    yourType: 'C',
    theirType: 'D',
    situation: 'pitch',
    approach: 'You have done extensive analysis. They want the 30-second version. Lead with your recommendation and the key impact metric. Keep your full analysis as backup. If they want details, they will ask. If they do not ask, they trust your assessment.',
    openWith: [
      'Recommendation: do X. Expected impact: Y. I have the full analysis if you want it.',
      'I have found an opportunity worth Z. Here is my proposal in three bullet points.',
      'Quick pitch: we should do X because the data shows Y. I am confident in this one.',
    ],
    avoid: [
      'Walking through your entire methodology before revealing the conclusion',
      'Presenting options without a clear recommendation - they want your best answer',
      'Undermining yourself with excessive caveats - state your position and defend it',
    ],
    theirReaction: 'Fast decision. If they say yes, execute immediately. If they push back, it is on the conclusion not the method. Adjust the recommendation, keep the evidence.',
    ifGoesWrong: 'If they reject it: "Understood. What outcome would you need to see to say yes? I can re-analyze against those criteria." Show adaptability without abandoning rigor.',
    bodyLanguage: 'Stand or sit with confidence. Deliver the recommendation with direct eye contact. Keep your body still. Have your backup data on a device, ready but not visible unless requested.',
  },
  // C -> I
  {
    yourType: 'C',
    theirType: 'I',
    situation: 'pitch',
    approach: 'Your detailed analysis needs a story wrapper. I types engage with the "what if" before the "how exactly." Open with the possibility, let them react, then bring the rigor. Their enthusiasm plus your precision makes a powerful combination.',
    openWith: [
      'What if we could achieve X? I have done the analysis and it is actually feasible. Here is the vision.',
      'I found something exciting in the data - it points to an opportunity I think you will see potential in.',
      'I have a well-researched proposal that could have a big impact on the team. Let me paint the picture.',
    ],
    avoid: [
      'Starting with a spreadsheet - lead with the human impact',
      'Being so thorough that you drain the energy before they can get excited',
      'Dismissing their additions as unrealistic - integrate what you can, park the rest',
    ],
    theirReaction: 'They will get excited and start building on your idea. Let them. Capture their additions, then gently organize: "I love those additions. Let me map them onto the plan and we can see what fits this phase."',
    ifGoesWrong: 'If they lose interest: "I think I led too much with the details. Here is the real story: X changes Y for the team. The numbers just confirm it works." Re-anchor to the human impact.',
    bodyLanguage: 'Open your posture wider than default. Smile when presenting the vision. Use your hands to draw pictures in the air - unusually expressive for you, but it connects. When shifting to data, bring out materials and settle into structure.',
  },
  // C -> S
  {
    yourType: 'C',
    theirType: 'S',
    situation: 'pitch',
    approach: 'Good audience for your style. S types appreciate thoroughness and respond well to a calm, evidence-based pitch. Emphasize how the proposal maintains stability while improving outcomes. They do not want revolution - show them evolution backed by data.',
    openWith: [
      'I have a proposal that strengthens what we already do well. Here is the analysis.',
      'This is a measured improvement, not a big change. Let me walk you through why I think it works.',
      'I have done the research on improving X. The approach is low-risk and the data supports it.',
    ],
    avoid: [
      'Presenting the proposal as a major transformation - frame it as an incremental improvement',
      'Rushing them to a decision - let them absorb at their pace',
      'Being so focused on the data that you forget to address how it affects people',
    ],
    theirReaction: 'They will listen carefully and may not respond immediately. Follow up the next day: "I wanted to check in on my proposal. Any thoughts or concerns?" Give them the space they need.',
    ifGoesWrong: 'If they seem uncertain: "I do not need a decision now. Take the analysis, review it at your pace, and let me know what questions come up. I am confident in the data but I want you to be too."',
    bodyLanguage: 'Sit beside them. Speak at their pace. Share documents so you can look at them together. Keep your body relaxed. When they go quiet, wait - do not fill the space with more data.',
  },
  // C -> C
  {
    yourType: 'C',
    theirType: 'C',
    situation: 'pitch',
    approach: 'You are pitching to your own kind. They will scrutinize your methodology as much as your conclusion. Make your analysis airtight, acknowledge limitations honestly, and present the strongest version of your case. Intellectual honesty is your best persuasion tool.',
    openWith: [
      'I have a proposal I have stress-tested. Here is the analysis, the limitations, and my recommendation.',
      'I want to walk you through my research on X. I have the data, the methodology, and the edge cases.',
      'Here is my analysis. I have tried to break it myself - here is where it held up and where I see risk.',
    ],
    avoid: [
      'Overstating certainty - they will find the gaps and lose trust in the entire pitch',
      'Getting competitive about analytical rigor - you are on the same team',
      'Spending so long on methodology that you never get to the recommendation',
    ],
    theirReaction: 'They will engage deeply and ask precise questions. If they find a flaw, they will point it out directly. Thank them - it improves the proposal. If they suggest refinements, they are collaborating, not criticizing.',
    ifGoesWrong: 'If they reject the analysis: "I respect the critique. Can we identify which specific assumptions you disagree with? I would rather refine than restart." Narrow the disagreement to specific points.',
    bodyLanguage: 'Sit at a table with shared materials. Reference specific data points with your pen or cursor. Measured voice. When they challenge something, look at the relevant data together rather than debating from memory.',
  },
];

export default cards;
