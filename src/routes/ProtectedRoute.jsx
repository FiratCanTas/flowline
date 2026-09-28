import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../features/auth/context/AuthContext';
import Loading from '../components/ui/Loading';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) return <Loading className="h-dvh" />;
  else if (!session) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
