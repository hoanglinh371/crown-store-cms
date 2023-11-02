import React from 'react';

import { Menu } from 'antd';

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
        <Menu items={menuItems} mode="inline" />
      </div>
    </aside>
  );
}

export default Sidebar;
