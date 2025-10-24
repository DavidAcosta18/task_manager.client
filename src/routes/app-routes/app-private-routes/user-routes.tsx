import { CanRoute } from '../../../context/ability/can-route';
import { ActionsEnum } from '../../../types/actions.enum';
import { SubjectsEnum } from '../../../types/subjects.enum';
import { USERS_ROUTE } from '../../routes';

export const UserRoutes = [
  {
    path: USERS_ROUTE,
    element: (
      <CanRoute I={ActionsEnum.read} a={SubjectsEnum.User}>
        <h1> User List Page </h1>
      </CanRoute>
    ),
  },
];
