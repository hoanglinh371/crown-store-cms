import React, { Suspense } from 'react';

import { Spin } from 'antd';
import { Outlet } from 'react-router-dom';

import Header from '../components/header';
import Sidebar from '../components/sidebar';

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="ml-80 flex-1 bg-[#f5f5f5] p-12">
          <Suspense fallback={<Spin />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
