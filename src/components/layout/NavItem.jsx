import { NavLink } from 'react-router';

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isActive ? 'bg-surface-2 text-text' : 'text-text-muted'} hover:bg-surface-2 hover:text-text rounded-md px-3 py-2`
      }
    >
      {children}
    </NavLink>
  );
};
export default NavItem;
