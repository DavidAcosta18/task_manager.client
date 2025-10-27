import { useCallback, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './auth-context';
import { LOGIN_ROUTE, PROJECTS_ROUTE } from '../../routes/routes';
import { apiAxiosInstance } from '../../api/config';
import type { IAuthResponse } from './auth-context.interfaces';

import type { IUser } from '../../types/user.interfaces';
import { useStorage } from '../../hooks/use-storage';
import { usePendingRedirect } from '../../hooks/use-pending-redirect';
import {
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
  REDIRECT_TO_LOCAL_STORAGE_KEY,
} from '../../constants';
import { useVerifyToken } from '../../hooks/use-verify-token';
import { useUnauthorizedHandler } from '../../hooks/use-unauthorized-handler';
import { LoadingScreen } from '../../components/loading-screen';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const { getItem, setItem, removeItem } = useStorage();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [user, setUser] = useState<IUser | null>(null);
  const { pendingRedirect, setPendingRedirect } = usePendingRedirect();
  const updateLoggedUser = useCallback(
    (user: IUser | null) => {
      setUser(user);
      if (user) {
        setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
      } else {
        removeItem(LOCAL_STORAGE_USER);
      }
    },
    [setItem, removeItem],
  );

  const { isVerifyingToken } = useVerifyToken(updateLoggedUser);

  const logout = useCallback(() => {
    setUser(null);
    removeItem(LOCAL_STORAGE_USER);
    removeItem(LOCAL_STORAGE_TOKEN);
    navigate(LOGIN_ROUTE, { replace: true });
  }, [navigate, removeItem, setUser]);

  useUnauthorizedHandler(logout);

  const login = async ({ email, password }: any) => {
    try {
      setIsLoggingIn(true);
      const { data } = await apiAxiosInstance.post<IAuthResponse>('/users/sign-in', {
        email,
        password,
      });
      const { token, user } = data;
      setUser(user);
      setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
      setItem(LOCAL_STORAGE_TOKEN, token);
      const redirectTo = getItem(REDIRECT_TO_LOCAL_STORAGE_KEY);
      if (redirectTo) {
        setPendingRedirect(redirectTo);
      } else {
        navigate(PROJECTS_ROUTE, { replace: true });
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isVerifyingToken) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateLoggedUser,
        isLoggingIn,
        pendingRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
