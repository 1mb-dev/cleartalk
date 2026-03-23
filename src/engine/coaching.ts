import type { CoachingCard, DiscType, SituationType } from './types.ts';

type CardMap = Record<string, CoachingCard>;

const cache = new Map<SituationType, CardMap>();

function cardKey(yourType: DiscType, theirType: DiscType): string {
  return `${yourType}-${theirType}`;
}

async function loadSituation(situation: SituationType): Promise<CardMap> {
  const cached = cache.get(situation);
  if (cached) return cached;

  let cards: CoachingCard[];
  switch (situation) {
    case 'feedback':
      cards = (await import('../data/coaching-cards/feedback.ts')).default;
      break;
    case 'request':
      cards = (await import('../data/coaching-cards/request.ts')).default;
      break;
    case 'conflict':
      cards = (await import('../data/coaching-cards/conflict.ts')).default;
      break;
    case 'pitch':
      cards = (await import('../data/coaching-cards/pitch.ts')).default;
      break;
    case 'difficult_news':
      cards = (await import('../data/coaching-cards/difficult-news.ts')).default;
      break;
  }

  const map: CardMap = {};
  for (const card of cards) {
    map[cardKey(card.yourType, card.theirType)] = card;
  }
  cache.set(situation, map);
  return map;
}

export async function getCoachingCard(
  yourType: DiscType,
  theirType: DiscType,
  situation: SituationType,
): Promise<CoachingCard | null> {
  const map = await loadSituation(situation);
  return map[cardKey(yourType, theirType)] ?? null;
}
