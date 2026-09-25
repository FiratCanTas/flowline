import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDeals } from '../features/deals/api/deals';
import { getContacts } from '../features/contacts/api/contacts';
import { deleteActivity, getActivities } from '../features/activities/api/activities';
import Badge from '../components/ui/Badge';
import { format } from 'date-fns';
import { isTaskOverdue } from '../features/activities/utils';
import { Link } from 'react-router';
import LinkButton from '../components/ui/LinkButton';

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

const PencilIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-text-muted h-4 w-4"
  >
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    <path d="m15 5 4 4" />
  </svg>
);

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-text-muted h-4 w-4"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const Activities = () => {
  const queryClient = useQueryClient();

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

  const { mutate: deleteActivityMutation, isPending } = useMutation({
    mutationKey: ['delete activity'],
    mutationFn: (id) => deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  const handleDeleteActivity = (id) => {
    const result = window.confirm('Do you want to delete the activity?');
    if (result) deleteActivityMutation(id);
  };

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
    <div className="flex flex-col gap-6">
      <LinkButton to="./new" className="ms-auto self-center">
        Add New Activity
      </LinkButton>
      <div className="flex flex-col gap-2">
        {activities?.map(
          ({ id, createdAt, isCompleted, type, title, dealId, contactId, dueDate }) => (
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
                    <span>{contacts?.find((contact) => contact.id === contactId)?.name}</span> ·{' '}
                    <span>{format(new Date(createdAt), 'd MMMM')}</span>
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
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
                <Link to={`./${id}/edit`}>
                  <PencilIcon />
                </Link>
                <button onClick={() => handleDeleteActivity(id)} disabled={isPending}>
                  <TrashIcon />
                </button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
export default Activities;
