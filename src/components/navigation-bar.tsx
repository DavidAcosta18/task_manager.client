import { HOME_ROUTE, PROJECTS_ROUTE, USERS_ROUTE } from '../routes/routes';
import { HomeFilled, IdcardFilled } from '@ant-design/icons';
import { NavigationLink } from './navigation-link';
import { useLocation } from 'react-router-dom';

const navigationLinkClasses =
  'flex items-center px-5 py-0.5 rounded hover:bg-gray-700 transition-colors duration-200 gap-6';

export function NavigationBar() {
  const { pathname } = useLocation();
  return (
    <nav className="bg-gray-800 text-white font-semibold p-4 w-56">
      <div className="flex flex-col space-y-2">
        <NavigationLink
          className={navigationLinkClasses}
          to={PROJECTS_ROUTE}
          isActive={pathname === HOME_ROUTE || pathname === PROJECTS_ROUTE}
        >
          <HomeFilled />
          <span>Projects</span>
        </NavigationLink>
        <NavigationLink
          className={navigationLinkClasses}
          to={USERS_ROUTE}
          isActive={pathname === USERS_ROUTE}
        >
          <IdcardFilled />
          <span>users</span>
        </NavigationLink>
      </div>
    </nav>
  );
}
