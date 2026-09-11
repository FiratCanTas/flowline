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

export const isDealStale = (deal, activities, today = new Date()) => {
  const { stage, id } = deal;
  if (stage === 'won' || stage === 'lost') return false;
  const lastActivity = activities
    ?.filter((activity) => activity.dealId === id)
    ?.sort((firstActivity, secondActivity) =>
      firstActivity.createdAt.localeCompare(secondActivity.createdAt),
    )
    ?.pop();
  const dayDifference = differenceInDays(today, lastActivity?.createdAt || deal.createdAt);
  if (dayDifference >= STALE_THRESHOLD_DAYS[stage]) return true;
  else return false;
};

export const isActionlessDeal = (deal, activities) => {
  if (deal.stage === 'won' || deal.stage === 'lost') return false;
  else if (!activities || !activities.length) return true;

  const hasOpenTask = activities.some(
    (activity) => activity.dealId === deal.id && activity.type === 'task' && !activity.isCompleted,
  );

  return !hasOpenTask;
};
