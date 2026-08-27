import { useNavigate, useParams } from 'react-router';
import DealForm from '../features/deals/components/DealForm';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDeals, updateDeal } from '../features/deals/api/deals';

const DealEdit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id: dealId } = useParams();

  const {
    data: deals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['deals'],
    queryFn: getDeals,
  });

  const { mutate: updateDealMutation, isPending } = useMutation({
    mutationKey: ['update deal'],
    mutationFn: (data) => updateDeal(dealId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      navigate(`/deals/${dealId}`);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  else if (error) return <p>Someting went wrong... Error:{error.message}</p>;

  const deal = deals.find((deal) => deal.id === dealId);
  if (!deal) return <p>The deal is not found.</p>;
  return (
    <div>
      <DealForm
        defaultValues={deal}
        disabled={isPending}
        onSubmit={(formData) => updateDealMutation(formData)}
      />
    </div>
  );
};

export default DealEdit;
