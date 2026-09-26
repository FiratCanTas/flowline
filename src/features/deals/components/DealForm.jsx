import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import dealSchema from '../schema';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import { getContacts } from '../../contacts/api/contacts';
import LinkButton from '../../../components/ui/LinkButton';
import Select from '../../../components/ui/Select';

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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input label="Title" id="title" error={errors?.title?.message} {...register('title')} />

      <Select
        label="Contacts"
        id="contactSelect"
        error={errors?.contactId?.message}
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
      </Select>

      <Input label="Value" id="value" error={errors?.value?.message} {...register('value')} />

      <Select label="Stages" id="stageSelect" error={errors?.stage?.message} {...register('stage')}>
        <option value="">Please choose a stage</option>
        <option value="lead">Lead</option>
        <option value="proposal">Proposal</option>
        <option value="qualified">Qualified</option>
        <option value="negotiation">Negotiation</option>
        <option value="won">Won</option>
        <option value="lost">Lost</option>
      </Select>

      <div className="flex gap-2">
        <LinkButton
          variant="secondary"
          to={`${defaultValues?.id ? `/deals/${defaultValues.id}` : '/deals'}`}
        >
          Cancel
        </LinkButton>
        <Button type="submit" disabled={disabled}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default DealForm;
