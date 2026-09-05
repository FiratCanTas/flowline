import { useMutation, useQueryClient } from '@tanstack/react-query';
import ActivityForm from '../features/activities/components/ActivityForm';
import { addActivity } from '../features/activities/api/activities';
import { useNavigate } from 'react-router';

const ActivityNew = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigate();

  const { mutate: addActivityMutation, isPending } = useMutation({
    mutationKey: ['add activity'],
    mutationFn: (activity) => addActivity(activity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      navigation('/activities');
    },
  });

  return <ActivityForm onSubmit={(data) => addActivityMutation(data)} disabled={isPending} />;
};

export default ActivityNew;
