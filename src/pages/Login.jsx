import { useMutation } from '@tanstack/react-query';
import LoginForm from '../features/auth/components/LoginForm';
import { signIn } from '../features/auth/api/auth';
import { useNavigate } from 'react-router';
import Loading from '../components/ui/Loading';
import Button from '../components/ui/Button';

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

  if (isPending) return <Loading className="h-dvh" />;
  return (
    <div className="bg-bg flex min-h-screen items-center justify-center px-4">
      <div className="bg-surface-1 border-border flex w-full max-w-sm flex-col gap-8 rounded-xl border p-6 md:p-8">
        <div className="text-center">
          <p className="text-lg font-semibold">Flowline</p>
          <p className="text-text-muted text-sm">Sign in to your account</p>
        </div>
        <div className="flex flex-col gap-4">
          {error && <p className="text-danger text-sm">{error.message}</p>}
          <LoginForm onSubmit={(formData) => signInMutation(formData)} disabled={isPending} />
          <Button
            variant="secondary"
            onClick={() => signInMutation({ email: 'demo@example.com', password: 'demo1example' })}
          >
            Sign in with demo account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
