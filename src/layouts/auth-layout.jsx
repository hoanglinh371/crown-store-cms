import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f7]">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
