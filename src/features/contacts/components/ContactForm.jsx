import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import contactSchema from '../schema';

const ContactForm = ({ defaultValues, onSubmit, disabled }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Name" id="name" error={errors?.name?.message} {...register('name')} />
      <Input label="Email" id="email" error={errors?.email?.message} {...register('email')} />
      <Input label="Phone" id="phone" error={errors?.phone?.message} {...register('phone')} />
      <Input
        label="Company"
        id="company"
        error={errors?.company?.message}
        {...register('company')}
      />
      <Input
        label="Position"
        id="position"
        error={errors?.position?.message}
        {...register('position')}
      />
      <Button type="submit" disabled={disabled}>
        Save
      </Button>
    </form>
  );
};

export default ContactForm;
