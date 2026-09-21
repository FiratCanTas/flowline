import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteDeal, getDeals } from '../features/deals/api/deals';
import { Link, useNavigate, useParams } from 'react-router';
import Button from '../components/ui/Button';
import { getContacts } from '../features/contacts/api/contacts';
import { getActivities } from '../features/activities/api/activities';
import Badge from '../components/ui/Badge';
import { isTaskOverdue } from '../features/activities/utils';
import { format } from 'date-fns';

const DealDetail = () => {
  const { id: dealId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const {
    data: activities,
    isLoading: isActivitiesLoading,
    error: activitiesError,
  } = useQuery({
    queryKey: ['activities'],
    queryFn: getActivities,
  });

  const { mutate: deleteDealMutation, isPending } = useMutation({
    mutationKey: ['delete deal'],
    mutationFn: (id) => deleteDeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      navigate('/deals');
    },
  });

  const deal = deals?.find((deal) => deal.id === dealId);

  if (isDealsLoading || isContactsLoading || isActivitiesLoading) {
    return <span>Loading...</span>;
  } else if (dealsError || contactsError || activitiesError) {
    return <span>{dealsError?.message || contactsError?.message || activitiesError?.message}</span>;
  } else if (!deal) return <p>The deal has not found.</p>;

  const activitiesOfDeal = activities?.filter((activity) => activity?.dealId === dealId);

  const { title, value, stage } = deal;

  const contact = contacts?.find((contact) => contact.id === deal.contactId);

  const handleDeleteDeal = () => {
    const result = window.confirm('Do you want to delete the deal?');
    if (result) {
      deleteDealMutation(dealId);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-0.5">
        <p>{title}</p>
        <p>{contact?.name}</p>
        <p>${value.toLocaleString()}</p>
        <p>{stage}</p>
        <div className="flex gap-2">
          <Link
            className="bg-surface-1 text-text border-border hover:bg-surface-2 focus-visible:outline-focus-ring rounded-md border px-4 py-2 text-sm outline-offset-2"
            to={`./edit`}
          >
            Edit
          </Link>
          <Button variant="danger" disabled={isPending} onClick={handleDeleteDeal}>
            Delete
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold">Activities</h2>
        {activitiesOfDeal?.length ? (
          <div className="flex flex-col gap-2">
            {activitiesOfDeal.map(({ id, isCompleted, type, title, dueDate }) => (
              <div
                key={id}
                className={`border-border flex items-center justify-between gap-3 rounded-xl border px-3 py-4 ${isCompleted ? 'opacity-50' : ''}`}
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <Badge className="shrink-0 first-letter:uppercase">{type}</Badge>
                  <p
                    className={`min-w-0 truncate font-semibold ${isCompleted ? 'line-through' : ''}`}
                  >
                    {title}
                  </p>
                </div>
                {!isCompleted &&
                  type === 'task' &&
                  (isTaskOverdue({ type, dueDate, isCompleted }) ? (
                    <Badge variant="danger" className="shrink-0 text-nowrap">
                      Overdue
                    </Badge>
                  ) : (
                    <Badge className="shrink-0 text-nowrap">
                      {format(new Date(dueDate), 'd MMMM')}
                    </Badge>
                  ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-sm">No activities yet.</p>
        )}
      </div>
    </div>
  );
};

export default DealDetail;
