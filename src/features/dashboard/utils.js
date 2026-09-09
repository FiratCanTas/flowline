const STAGES = ['lead', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];

export const getStageDistribution = (deals) => {
  const distributedStages = STAGES.map((stage) => ({
    stage,
    count: deals?.filter((deal) => deal.stage === stage).length ?? 0,
  }));

  return distributedStages;
};
