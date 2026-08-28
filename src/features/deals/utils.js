import { differenceInDays } from 'date-fns';

const STAGE_PROBABILITY = {
  lead: 0.1,
  qualified: 0.25,
  proposal: 0.5,
  negotiation: 0.75,
  won: 1,
  lost: 0,
};

const STALE_THRESHOLD_DAYS = {
  lead: 3,
  qualified: 5,
  proposal: 7,
  negotiation: 5,
};

export const getWeightedValue = (deal) => {
  const weightedValue = deal.value * STAGE_PROBABILITY[deal.stage];

  return weightedValue;
};

export const getWeightedPipelineValue = (deals) => {
  if (!deals?.length) return 0;
  const pipelineValue = deals
    .filter((deal) => deal.stage !== 'won' && deal.stage !== 'lost')
    .reduce((acc, filteredDeal) => {
      const weightedValue = getWeightedValue(filteredDeal);

      return acc + weightedValue;
    }, 0);

  return pipelineValue;
};

export const isDealStale = (deal, today = new Date()) => {
  const { stage, createdAt } = deal;
  if (stage === 'won' || stage === 'lost') return false;
  const dayDifference = differenceInDays(today, createdAt);
  if (dayDifference >= STALE_THRESHOLD_DAYS[stage]) return true;
  else return false;
};
