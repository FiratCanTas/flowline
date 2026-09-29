import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { getActivities, updateActivity } from '../features/activities/api/activities';
import ActivityForm from '../features/activities/components/ActivityForm';
import Loading from '../components/ui/Loading';
import ErrorMessage from '../components/ui/ErrorMessage';
import EmptyState from '../components/ui/EmptyState';

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

  if (isLoading) return <Loading className="h-full" />;
  else if (error)
    return (
      <ErrorMessage className="h-full">Something went wrong! Error: {error?.message}</ErrorMessage>
    );

  const activity = activities?.find((activity) => activity.id === activityId);

  if (!activity) return <EmptyState className="h-full">Activity not found.</EmptyState>;

  return (
    <ActivityForm
      onSubmit={(formData) => updateActivityMutation(formData)}
      defaultValues={activity}
      disabled={isPending}
    />
  );
};

export default ActivityEdit;
