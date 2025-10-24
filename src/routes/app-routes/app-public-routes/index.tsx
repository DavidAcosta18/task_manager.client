import { LoginPage } from '../../../modules/auth/login';
import { PublicRoute } from '../../components/public-route';
import { RootRedirect } from '../../components/root-route';
import { HOME_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from '../../routes';

export const AppPublicRoutes = [
  {
    path: HOME_ROUTE,
    element: <RootRedirect />,
  },
  {
    path: LOGIN_ROUTE,
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: SIGNUP_ROUTE,
    element: (
      <PublicRoute>
        <h1> Signup Page </h1>
      </PublicRoute>
    ),
  },
];
