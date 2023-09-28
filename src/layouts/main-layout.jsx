import { Outlet } from 'react-router-dom';

import Header from '../components/header';
import Sidebar from '../components/sidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
