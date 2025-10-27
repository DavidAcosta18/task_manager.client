import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../routes';
import { useAuth } from '../../hooks/use-auth';

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to={LOGIN_ROUTE} replace />;
};
