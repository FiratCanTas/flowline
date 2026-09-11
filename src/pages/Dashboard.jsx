import { useQuery } from '@tanstack/react-query';
import { getDeals } from '../features/deals/api/deals';
import { getStageDistribution } from '../features/dashboard/utils';
import { getWeightedPipelineValue, isDealStale } from '../features/deals/utils';
import { isTaskOverdue } from '../features/activities/utils';
import Badge from '../components/ui/Badge';
import { getActivities } from '../features/activities/api/activities';

const Dashboard = () => {
  const {
    data: deals,
    isLoading: isDealsLoading,
    error: dealsError,
  } = useQuery({
    queryKey: ['deals'],
    queryFn: getDeals,
  });

  const {
    data: activities,
    isLoading: isActivitiesLoading,
    error: activitiesError,
  } = useQuery({
    queryKey: ['activities'],
    queryFn: getActivities,
  });

  if (isDealsLoading || isActivitiesLoading) return <p>Loading...</p>;
  else if (dealsError || activitiesError)
    return <p>Something went wrong! Error: {dealsError.message || activitiesError.message}</p>;

  const distributedStages = getStageDistribution(deals);

  const weightedPipeline = getWeightedPipelineValue(deals);

  const maxCount = Math.max(...distributedStages.map((distributedStage) => distributedStage.count));

  let overdueTasks = [];
  if (activities.length) {
    overdueTasks = activities.filter((activity) => isTaskOverdue(activity));
  }

  let totalOpenDeals = 0;
  let atRiskDeals = [];
  if (deals.length) {
    deals.forEach((deal) => {
      const isItStale = isDealStale(deal, activities);
      if (deal.stage !== 'won' && deal.stage !== 'lost') {
        totalOpenDeals++;

        if (isItStale) {
          atRiskDeals.push(deal);
        }
      }
    });
  }

  return (
    <div>
      <div className="bg-surface-1 grid grid-cols-2 gap-4 rounded-xl px-3 py-4 md:grid-cols-4">
        <div className="bg-surface-2 rounded-xl p-4">
          <p className="text-text-muted text-xs font-semibold">Weighted pipeline</p>
          <p className="text-xl font-semibold">${weightedPipeline.toLocaleString()}</p>
        </div>
        <div className="bg-surface-2 rounded-xl p-4">
          <p className="text-text-muted text-xs font-semibold">Open deals</p>
          <p className="text-xl font-semibold">{totalOpenDeals}</p>
        </div>
        <div className="bg-surface-2 rounded-xl p-4">
          <p className="text-text-muted text-xs font-semibold">Overdue tasks</p>
          <p className="text-xl font-semibold">{overdueTasks.length}</p>
        </div>
        <div className="bg-surface-2 rounded-xl p-4">
          <p className="text-text-muted text-xs font-semibold">At-risk deals</p>
          <p className="text-xl font-semibold">{atRiskDeals.length}</p>
        </div>
        <div className="col-span-full">
          <p className="mb-2 text-sm font-semibold">Stage distribution</p>
          <div className="flex flex-col">
            {distributedStages?.map(({ stage, count }, index) => (
              <div
                key={stage}
                className={`flex items-center gap-2 ${index > 1 && 'hidden md:flex'}`}
              >
                <div className="text-text-muted w-22 text-sm font-semibold first-letter:uppercase">
                  {stage}
                </div>
                <div className="bg-border h-2 flex-1 overflow-hidden rounded-full">
                  <div
                    className="bg-accent h-full rounded-full"
                    style={{ width: `${maxCount ? (count / maxCount) * 100 : 0}%` }}
                  />
                </div>

                <div className="text-text-muted w-3 text-right text-sm font-semibold">{count}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <p className="mb-2 text-sm font-semibold">Overdue tasks</p>
          <div className="divide-border divide-y">
            {overdueTasks?.slice(0, 2).map((overdueTask, index) => (
              <div
                key={overdueTask.id}
                className={`flex items-center justify-between py-1 ${index > 0 && 'hidden md:flex'}`}
              >
                <p className="text-xs font-semibold">{overdueTask.title}</p>
                <Badge variant="danger">Overdue</Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <p className="mb-2 text-sm font-semibold">At-risk deals</p>
          <div className="md:divide-border md:divide-y">
            {atRiskDeals?.slice(0, 2).map((atRiskDeal, index) => (
              <div
                key={atRiskDeal.id}
                className={`flex items-center justify-between py-1 ${index > 0 && 'hidden md:flex'}`}
              >
                <p className="text-xs font-semibold">{atRiskDeal.title}</p>
                <Badge variant="danger">Stale</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
