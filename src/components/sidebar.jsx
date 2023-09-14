import { NavLink } from 'react-router-dom';

import CurrentUser from './current-user';
import { menuItems } from '../constants';

const Sidebar = () => {
  const user = {
    avatar:
      'https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
    email: 'adminadmin@gmail.com',
    name: 'admin',
  };

  return (
    <aside>
      <div className="h-full w-80 border-r">
        <CurrentUser {...user} />
        <ul className="menu menu-lg">
          {menuItems.map(({ path, title }) => (
            <li key={path}>
              <NavLink to={path}>{title}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
