import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../features/auth/context/AuthContext';

const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  else if (!session) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
