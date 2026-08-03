import { Outlet } from 'react-router';
import NavItem from './NavItem';
import { useEffect, useState } from 'react';

const SunIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    className="h-5 w-5"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
    <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
    <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
  </svg>
);

const AppShell = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      html.classList.add('dark');
    } else {
      localStorage.setItem('theme', 'light');
      html.classList.remove('dark');
    }
  }, [isDark]);

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
          <button
            aria-label={`${isDark ? 'Switch to light mode' : 'Switch to dark mode'}`}
            type="button"
            className="hover:bg-surface-2 focus-visible:outline-focus-ring rounded-md p-2 outline-offset-2"
            onClick={() => setIsDark((prev) => !prev)}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default AppShell;
