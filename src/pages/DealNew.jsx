import { useMutation, useQueryClient } from '@tanstack/react-query';
import DealForm from '../features/deals/components/DealForm';
import { addDeal } from '../features/deals/api/deals';
import { useNavigate } from 'react-router';

const DealNew = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: addDealMutation, isPending } = useMutation({
    mutationKey: ['add deal'],
    mutationFn: (data) => addDeal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      navigate('/deals');
    },
  });

  return (
    <div>
      <DealForm onSubmit={(data) => addDealMutation(data)} disabled={isPending} />
    </div>
  );
};

export default DealNew;
