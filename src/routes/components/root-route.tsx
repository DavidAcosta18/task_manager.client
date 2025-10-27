import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LOGIN_ROUTE, PROJECTS_ROUTE } from '../routes';
import { useAuth } from '../../hooks/use-auth';

export function RootRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(PROJECTS_ROUTE, { replace: true });
    } else {
      navigate(LOGIN_ROUTE, { replace: true });
    }
  }, [user, navigate]);

  return null;
}
