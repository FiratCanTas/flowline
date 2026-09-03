import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import activitySchema from '../schema';
import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../../contacts/api/contacts';
import { getDeals } from '../../deals/api/deals';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ActivityForm = ({ defaultValues, onSubmit, disabled }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues,
  });

  const watchType = watch('type');

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

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <Input label="Title" id="title" error={errors?.title?.message} {...register('title')} />
      <div className="flex">
        <label htmlFor="contacts">Contact</label>
        <select
          id="contacts"
          className={`${errors?.contactId?.message ? 'border-danger' : 'border-border'} w-full`}
          disabled={isContactsLoading || contactsError}
          {...register('contactId')}
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
        </select>
        {errors?.contactId?.message && <p>{errors.contactId.message}</p>}
      </div>
      <div className="flex">
        <label htmlFor="deals">Deal</label>
        <select
          id="deals"
          className={`${errors?.dealId?.message ? 'border-danger' : 'border-border'} w-full`}
          disabled={isDealsLoading || dealsError}
          {...register('dealId')}
        >
          <option value="">
            {isDealsLoading
              ? 'Loading...'
              : dealsError
                ? dealsError?.message
                : 'Please choose a deal'}
          </option>
          {deals?.map((deal) => (
            <option key={deal.id} value={deal.id}>
              {deal.title}
            </option>
          ))}
        </select>
        {errors?.dealId?.message && <p>{errors.dealId.message}</p>}
      </div>
      <div>
        <fieldset>
          <legend>Select an activity type:</legend>
          <div className="flex gap-2">
            <div>
              <input type="radio" id="task" value="task" {...register('type')} />
              <label htmlFor="task">Task</label>
            </div>
            <div>
              <input type="radio" id="note" value="note" {...register('type')} />
              <label htmlFor="note">Note</label>
            </div>
          </div>
        </fieldset>
        {errors?.type?.message && <p>{errors.type.message}</p>}
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
      <Input id="completed" type="checkbox" label="Completed" {...register('isCompleted')} />
      <Button disabled={disabled} type="submit">
        Save
      </Button>
    </form>
  );
};

export default ActivityForm;
