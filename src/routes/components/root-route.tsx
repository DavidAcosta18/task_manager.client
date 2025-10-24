import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_ROUTE, LOGIN_ROUTE } from '../routes';

export function RootRedirect() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(DASHBOARD_ROUTE, { replace: true });
    } else {
      navigate(LOGIN_ROUTE, { replace: true });
    }
  }, [user, navigate]);

  return null;
}
