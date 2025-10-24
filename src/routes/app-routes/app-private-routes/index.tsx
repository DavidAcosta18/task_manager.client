import { PrivateLayout } from '../../../components/layouts/private-layout';
import { CanRoute } from '../../../context/ability/can-route';
import { ActionsEnum } from '../../../types/actions.enum';
import { SubjectsEnum } from '../../../types/subjects.enum';
import { PrivateRoute } from '../../components/private-route';
import { ADMIN_ONLY_TEST_ROUTE, DASHBOARD_ROUTE } from '../../routes';
import { UserRoutes } from './user-routes';

export const AppPrivateRoutes = [
  {
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: DASHBOARD_ROUTE,
        element: (
          <CanRoute I={ActionsEnum.read} a={SubjectsEnum.Project}>
            <h1> Dashboard Page </h1>
          </CanRoute>
        ),
      },
      ...UserRoutes,
      {
        path: ADMIN_ONLY_TEST_ROUTE,
        element: (
          <CanRoute I={ActionsEnum.read} a={SubjectsEnum.all}>
            <div>Ruta de test solo para admins</div>
          </CanRoute>
        ),
      },
    ],
  },
];
