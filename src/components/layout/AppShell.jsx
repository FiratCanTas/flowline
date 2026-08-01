import { Outlet } from 'react-router';
import NavItem from './NavItem';
import { useState } from 'react';

const AppShell = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-x-0 top-14 bottom-0 z-40 bg-black/60 md:hidden"
        />
      )}
      <aside
        className={`bg-surface-1 border-border ${isSidebarOpen ? 'block' : 'hidden'} fixed top-14 bottom-0 left-0 z-50 w-60 border-r p-4 shadow-lg md:static md:z-0 md:block`}
      >
        <p className="text-text mb-6 text-lg font-semibold">Flowline</p>
        <nav onClick={() => setIsSidebarOpen(false)} className="flex flex-col gap-1">
          <NavItem to="/">Dashboard</NavItem>
          <NavItem to="/contacts">Contacts</NavItem>
          <NavItem to="/activities">Activities</NavItem>
          <NavItem to="/deals">Deals</NavItem>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="bg-surface-1 border-border flex h-14 items-center gap-3 border-b px-6">
          <button
            aria-label="Open Menu"
            type="button"
            className="hover:bg-surface-2 flex flex-col gap-1 rounded-md p-2 md:hidden"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          >
            <span className="bg-text block h-0.5 w-5 rounded-full" />
            <span className="bg-text block h-0.5 w-5 rounded-full" />
            <span className="bg-text block h-0.5 w-5 rounded-full" />
          </button>
          <p className="min-w-0 flex-1 truncate">Dashboard Overview and Analytics</p>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AppShell;
