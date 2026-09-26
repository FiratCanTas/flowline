import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import activitySchema from '../schema';
import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../../contacts/api/contacts';
import { getDeals } from '../../deals/api/deals';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import LinkButton from '../../../components/ui/LinkButton';
import Select from '../../../components/ui/Select';

const ActivityForm = ({ defaultValues, onSubmit, disabled }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues,
  });

  const watchType = watch('type');
  const watchContactId = watch('contactId');

  const {
    data: contacts,
    isLoading: isContactsLoading,
    error: contactsError,
  } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });
  const {
    data: deals,
    isLoading: isDealsLoading,
    error: dealsError,
  } = useQuery({
    queryKey: ['deals'],
    queryFn: getDeals,
  });

  const handleSave = (formData) => {
    if (watchType === 'note') {
      formData.dueDate = null;
    }

    onSubmit(formData);
  };

  const filteredDeals = deals?.filter((deal) => deal.contactId === watchContactId);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleSave)}>
      <Input label="Title" id="title" error={errors?.title?.message} {...register('title')} />

      <Select
        id="contacts"
        label="Contact"
        error={errors?.contactId?.message}
        disabled={isContactsLoading || contactsError}
        {...register('contactId', {
          onChange: () => setValue('dealId', ''),
        })}
      >
        <option value="">
          {isContactsLoading
            ? 'Loading...'
            : contactsError
              ? contactsError?.message
              : 'Please choose a contact'}
        </option>
        {contacts?.map((contact) => (
          <option key={contact.id} value={contact.id}>
            {contact.name}
          </option>
        ))}
      </Select>

      <Select
        id="deals"
        label="Deal"
        error={errors?.dealId?.message}
        disabled={isDealsLoading || dealsError || !watchContactId}
        {...register('dealId')}
      >
        <option value="">
          {isDealsLoading
            ? 'Loading...'
            : dealsError
              ? dealsError?.message
              : !watchContactId
                ? 'Choose a contact first'
                : filteredDeals?.length
                  ? 'Please choose a deal'
                  : 'No deals for this contact'}
        </option>
        {filteredDeals?.map((deal) => (
          <option key={deal.id} value={deal.id}>
            {deal.title}
          </option>
        ))}
      </Select>

      <div className="flex flex-col gap-1">
        <fieldset>
          <legend className="mb-1 text-sm font-medium">Activity type</legend>
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <label className="text-sm" htmlFor="task">
                Task
              </label>
              <input type="radio" id="task" value="task" {...register('type')} />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm" htmlFor="note">
                Note
              </label>
              <input type="radio" id="note" value="note" {...register('type')} />
            </div>
          </div>
        </fieldset>
        {errors?.type?.message && <p className="text-danger text-xs">{errors.type.message}</p>}
      </div>
      <div>
        {watchType === 'task' && (
          <Input
            id="dueDate"
            type="date"
            label="Due date"
            error={errors?.dueDate?.message}
            {...register('dueDate')}
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <label htmlFor="completed" className="text-sm font-medium">
            Completed
          </label>
          <input id="completed" type="checkbox" {...register('isCompleted')} />
        </div>
        {errors?.isCompleted?.message && (
          <p className="text-danger text-xs">{errors.isCompleted.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <LinkButton variant="secondary" to="/activities">
          Cancel
        </LinkButton>
        <Button disabled={disabled} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ActivityForm;
