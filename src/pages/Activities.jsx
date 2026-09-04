import { useQuery } from '@tanstack/react-query';
import { getDeals } from '../features/deals/api/deals';
import { getContacts } from '../features/contacts/api/contacts';
import { getActivities } from '../features/activities/api/activities';
import Badge from '../components/ui/Badge';
import { format } from 'date-fns';
import { isTaskOverdue } from '../features/activities/utils';
import { Link } from 'react-router';

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-text-muted h-4 w-4"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Activities = () => {
  const {
    data: activities,
    isLoading: isActivitiesLoading,
    error: activitiesError,
  } = useQuery({
    queryKey: ['activities'],
    queryFn: getActivities,
  });

  const {
    data: deals,
    isLoading: isDealsLoading,
    error: dealsError,
  } = useQuery({
    queryKey: ['deals'],
    queryFn: getDeals,
  });

  const {
    data: contacts,
    isLoading: isContactsLoading,
    error: contactsError,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  if (isActivitiesLoading || isDealsLoading || isContactsLoading) return <p>Loading...</p>;
  else if (activitiesError || dealsError || contactsError)
    return (
      <p>
        Something went wrong! Error:
        {activitiesError.message || dealsError.message || contactsError.message}
      </p>
    );
  else if (!activities.length) return <p>No activity has found!</p>;

  return (
    <div className="flex flex-col gap-2">
      <Link
        to="./new"
        className="bg-accent text-accent-foreground hover:bg-accent-hover focus-visible:outline-focus-ring ms-auto block max-w-max rounded-md px-4 py-2 text-sm outline-offset-2"
      >
        Add new activity
      </Link>
      <div className="flex flex-col gap-2">
        {activities?.map(({ id, isCompleted, type, title, dealId, contactId, dueDate }) => (
          <div
            key={id}
            className={`border-border flex items-start justify-between rounded-xl border px-3 py-4 md:items-center ${isCompleted && 'opacity-50'}`}
          >
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1 md:flex-row md:items-center md:gap-3">
              <Badge className="first-letter:uppercase">{type}</Badge>
              <div className="w-full min-w-0 md:flex-1">
                <p className={`font-semibold ${isCompleted && 'line-through'}`}>{title}</p>
                <p className="text-text-muted truncate">
                  <span>{deals?.find((deal) => deal.id === dealId)?.title}</span> ·{' '}
                  <span>{contacts?.find((contact) => contact.id === contactId)?.name}</span>
                </p>
              </div>
            </div>
            {isCompleted ? (
              <CheckIcon />
            ) : type === 'task' ? (
              isTaskOverdue({ type, dueDate, isCompleted }) ? (
                <Badge variant="danger" className="max-w-max flex-1 text-nowrap">
                  Overdue
                </Badge>
              ) : (
                <Badge className="max-w-max flex-1 text-nowrap">
                  {format(new Date(dueDate), 'd MMMM')}
                </Badge>
              )
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Activities;
