import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import authSchema from '../schema';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const LoginForm = ({ onSubmit, disabled }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit((formData) => onSubmit(formData))}>
      <Input
        label="Email"
        type="email"
        id="email"
        autoComplete="email"
        error={errors?.email?.message}
        {...register('email')}
      />
      <Input
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        error={errors?.password?.message}
        {...register('password')}
      />
      <Button className="w-full" disabled={disabled} type="submit">
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
