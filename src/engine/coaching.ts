import type { CoachingCard, DiscType, SituationType } from './types.ts';

type CardMap = Record<string, CoachingCard>;

const cache = new Map<SituationType, CardMap>();

function cardKey(yourType: DiscType, theirType: DiscType): string {
  return `${yourType}-${theirType}`;
}

async function loadSituation(situation: SituationType): Promise<CardMap> {
  const cached = cache.get(situation);
  if (cached) return cached;

  const loaders: Record<SituationType, () => Promise<{ default: CoachingCard[] }>> = {
    feedback: () => import('../data/coaching-cards/feedback.ts'),
    request: () => import('../data/coaching-cards/request.ts'),
    conflict: () => import('../data/coaching-cards/conflict.ts'),
    pitch: () => import('../data/coaching-cards/pitch.ts'),
    difficult_news: () => import('../data/coaching-cards/difficult-news.ts'),
  };

  const cards = (await loaders[situation]()).default;

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
