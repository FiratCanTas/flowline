import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteDeal, getDeals } from '../features/deals/api/deals';
import { Link, useNavigate, useParams } from 'react-router';
import Button from '../components/ui/Button';
import { getContacts } from '../features/contacts/api/contacts';

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

  const { mutate: deleteDealMutation, isPending } = useMutation({
    mutationKey: ['delete deal'],
    mutationFn: (id) => deleteDeal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      navigate('/deals');
    },
  });

  const deal = deals?.find((deal) => deal.id === dealId);

  if (isDealsLoading || isContactsLoading) {
    return <span>Loading...</span>;
  } else if (dealsError || contactsError) {
    return <span>{dealsError?.message || contactsError?.message}</span>;
  } else if (!deal) return <p>The deal has not found.</p>;

  const { title, value, stage } = deal;

  const contact = contacts?.find((contact) => contact.id === deal.contactId);

  const handleDeleteDeal = () => {
    const result = window.confirm('Do you want to delete the deal?');
    if (result) {
      deleteDealMutation(dealId);
    }
  };

  return (
    <div>
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
  );
};

export default DealDetail;
