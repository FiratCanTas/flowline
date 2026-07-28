import { Link, Outlet } from 'react-router';

const AppShell = () => {
  return (
    <div className="flex h-screen">
      <aside className="bg-surface-1 border-border w-60 border-r p-4">
        <p className="text-text mb-6 text-lg font-semibold">Flowline</p>
        <nav className="flex flex-col gap-1">
          <Link
            to={'/'}
            className="text-text-muted hover:bg-surface-2 hover:text-text rounded-md px-3 py-2"
          >
            Dashboard
          </Link>
          <Link
            to={'/contacts'}
            className="text-text-muted hover:bg-surface-2 hover:text-text rounded-md px-3 py-2"
          >
            Contacts
          </Link>
          <Link
            to={'/activities'}
            className="text-text-muted hover:bg-surface-2 hover:text-text rounded-md px-3 py-2"
          >
            Activities
          </Link>
          <Link
            to={'/deals'}
            className="text-text-muted hover:bg-surface-2 hover:text-text rounded-md px-3 py-2"
          >
            Deals
          </Link>
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
