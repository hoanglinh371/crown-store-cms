import { NavLink } from 'react-router-dom';

import CurrentUser from './current-user';
import { menuItems } from '../constants';

function Sidebar() {
  const user = {
    avatar:
      'https://i.pinimg.com/564x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
    email: 'adminadmin@gmail.com',
    name: 'admin',
  };

  return (
    <aside className="fixed bottom-0 top-20">
      <div className="h-full w-80 border-r bg-white">
        <CurrentUser {...user} />
        <ul className="menu menu-md">
          {menuItems.map((item) => (item.children ? (
            <li key={item.title}>
              <details open>
                <summary>{item.title}</summary>
                <ul>
                  {item.children.map((child) => (
                    <li key={child.title}>
                      <NavLink to={child.path}>{child.title}</NavLink>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ) : (
            <li key={item.title}>
              <NavLink to={item.path}>{item.title}</NavLink>
            </li>
          )))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
