import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { PROJECTS_ROUTE } from '../routes';
import { useAuth } from '../../hooks/use-auth';

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user, pendingRedirect } = useAuth();
  if (user && !pendingRedirect) {
    return <Navigate to={PROJECTS_ROUTE} replace />;
  }
  return <>{children}</>;
};
