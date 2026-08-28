const STAGE_PROBABILITY = {
  lead: 0.1,
  qualified: 0.25,
  proposal: 0.5,
  negotiation: 0.75,
  won: 1,
  lost: 0,
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
