import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { AppPublicRoutes } from './app-routes/app-public-routes';
import { AppPrivateRoutes } from './app-routes/app-private-routes';
import { AppCommonRoutes } from './app-routes/app-common-routes';
import { AppProviders } from '../providers/app-providers';

const router = createBrowserRouter([
  {
    element: (
      <AppProviders>
        <Outlet />
      </AppProviders>
    ),
    children: [...AppPublicRoutes, ...AppPrivateRoutes, ...AppCommonRoutes],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
