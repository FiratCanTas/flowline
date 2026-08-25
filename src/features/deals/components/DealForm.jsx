import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import dealSchema from '../schema';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../../contacts/api/contacts';

const DealForm = ({ defaultValues, onSubmit, disabled }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(dealSchema),
    defaultValues: defaultValues,
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ['contacts'],
    queryFn: getContacts,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Title" id="title" error={errors?.title?.message} {...register('title')} />
      <div>
        <label htmlFor="contactSelect">Contacts:</label>
        <select
          id="contactSelect"
          className={`${errors?.contactId?.message ? 'border-danger' : 'border-border'}`}
          disabled={isLoading || error}
          {...register('contactId')}
        >
          <option value="">
            {isLoading ? 'Loading...' : error ? error?.message : 'Please choose a contact'}
          </option>
          {data?.map((contact) => (
            <option key={contact.id} value={contact.id}>
              {contact.name}
            </option>
          ))}
        </select>
        {errors?.contactId?.message && <p>{errors.contactId.message}</p>}
      </div>
      <Input label="Value" id="value" error={errors?.value?.message} {...register('value')} />
      <div>
        <label htmlFor="stageSelect">Stages:</label>
        <select
          id="stageSelect"
          className={`${errors?.stage?.message ? 'border-danger' : 'border-border'}`}
          {...register('stage')}
        >
          <option value="">Please choose a stage</option>
          <option value="lead">Lead</option>
          <option value="proposal">Proposal</option>
          <option value="qualified">Qualified</option>
          <option value="negotiation">Negotiation</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
        {errors?.stage?.message && <p>{errors.stage.message}</p>}
      </div>
      <Button type="submit" disabled={disabled}>
        Save
      </Button>
    </form>
  );
};

export default DealForm;
