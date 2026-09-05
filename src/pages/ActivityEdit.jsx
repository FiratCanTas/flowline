import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { getActivities, updateActivity } from '../features/activities/api/activities';
import ActivityForm from '../features/activities/components/ActivityForm';

const ActivityEdit = () => {
  const { id: activityId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['activities'],
    queryFn: getActivities,
  });

  const { mutate: updateActivityMutation, isPending } = useMutation({
    mutationKey: ['update activity'],
    mutationFn: (data) => updateActivity(activityId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      navigate('/activities');
    },
  });

  if (isLoading) return <p>Loading...</p>;
  else if (error) return <p>Something went wrong! Error: {error?.message}</p>;

  const activity = activities?.find((activity) => activity.id === activityId);

  if (!activity) return <p>The activity is not found.</p>;

  return (
    <ActivityForm
      onSubmit={(formData) => updateActivityMutation(formData)}
      defaultValues={activity}
      disabled={isPending}
    />
  );
};

export default ActivityEdit;
