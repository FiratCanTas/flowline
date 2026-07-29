import { Outlet } from 'react-router';
import NavItem from './NavItem';

const AppShell = () => {
  return (
    <div className="flex h-screen">
      <aside className="bg-surface-1 border-border w-60 border-r p-4">
        <p className="text-text mb-6 text-lg font-semibold">Flowline</p>
        <nav className="flex flex-col gap-1">
          <NavItem to="/">Dashboard</NavItem>
          <NavItem to="/contacts">Contacts</NavItem>
          <NavItem to="/activities">Activities</NavItem>
          <NavItem to="/deals">Deals</NavItem>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="bg-surface-1 border-border h-14 border-b px-6">Topbar</header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AppShell;
