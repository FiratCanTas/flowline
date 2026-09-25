import { useMutation } from '@tanstack/react-query';
import LoginForm from '../features/auth/components/LoginForm';
import { signIn } from '../features/auth/api/auth';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  const {
    mutate: signInMutation,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['login'],
    mutationFn: (data) => signIn(data.email, data.password),
    onSuccess: () => {
      navigate('/');
    },
  });
  return (
    <div className="bg-bg flex min-h-screen items-center justify-center px-4">
      <div className="bg-surface-1 border-border flex w-full max-w-sm flex-col gap-8 rounded-xl border p-6 md:p-8">
        <div className="text-center">
          <p className="text-lg font-semibold">Flowline</p>
          <p className="text-text-muted text-sm">Sign in to your account</p>
        </div>
        {error && <p className="text-danger text-sm">{error.message}</p>}
        <LoginForm onSubmit={(formData) => signInMutation(formData)} disabled={isPending} />
      </div>
    </div>
  );
};

export default Login;
