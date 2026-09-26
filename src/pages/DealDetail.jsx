import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteDeal, getDeals } from '../features/deals/api/deals';
import { useNavigate, useParams } from 'react-router';
import Button from '../components/ui/Button';
import { getContacts } from '../features/contacts/api/contacts';
import { getActivities } from '../features/activities/api/activities';
import Badge from '../components/ui/Badge';
import { isTaskOverdue } from '../features/activities/utils';
import { format } from 'date-fns';
import LinkButton from '../components/ui/LinkButton';

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
      <div className="bg-surface-1 border-border flex flex-col gap-5 rounded-xl border p-6">
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xl font-semibold">{title}</p>
            <p className="text-text-muted text-sm">{contact?.name}</p>
          </div>
          <div className="border-border flex flex-col gap-0.5 border-t pt-5">
            <p className="text-text-muted text-xs font-medium uppercase">value</p>
            <p className="text-sm">${value.toLocaleString()}</p>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-text-muted text-xs font-medium uppercase">stage</p>
            <p className="text-sm first-letter:uppercase">{stage}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <LinkButton to="./edit" variant="secondary">
            Edit
          </LinkButton>
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
