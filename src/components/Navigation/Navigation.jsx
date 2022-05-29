import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/selectors';
import s from './Navigation.module.css';

const Navigation = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <nav>
      <NavLink
        to="/"
        className={navData => (navData.isActive ? s.activeLink : s.link)}
      >
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="contacts"
          className={navData => (navData.isActive ? s.activeLink : s.link)}
        >
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
export default Navigation;
