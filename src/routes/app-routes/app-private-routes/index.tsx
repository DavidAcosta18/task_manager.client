import { PrivateLayout } from '../../../components/layouts/private-layout';
import { CanRoute } from '../../../context/ability/can-route';
import ProjectPage from '../../../modules/projects/listProjects/pages/list-projects.page';
import KanbanBoard from '../../../modules/tasks/pages/view-tasks.page';
import { ActionsEnum } from '../../../types/actions.enum';
import { SubjectsEnum } from '../../../types/subjects.enum';
import { PrivateRoute } from '../../components/private-route';
import { PROJECTS_ROUTE, VIEW_TASKS_ROUTE } from '../../routes';
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
        path: PROJECTS_ROUTE,
        element: (
          <CanRoute I={ActionsEnum.create} a={SubjectsEnum.Project}>
            <ProjectPage />
          </CanRoute>
        ),
      },
      {
        path: VIEW_TASKS_ROUTE,
        element: (
          <CanRoute I={ActionsEnum.create} a={SubjectsEnum.Project}>
            <KanbanBoard />
          </CanRoute>
        ),
      },
      ...UserRoutes,
    ],
  },
];
