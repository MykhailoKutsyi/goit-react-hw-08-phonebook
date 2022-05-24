import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
const Navigation = () => (
  <nav>
    <NavLink
      //   exact
      to="register"
      className={navData => (navData.isActive ? s.activeLink : s.link)}
    >
      Register
    </NavLink>
    <NavLink
      to="login"
      className={navData => (navData.isActive ? s.activeLink : s.link)}
    >
      Login
    </NavLink>
    <NavLink
      to="contacts"
      className={navData => (navData.isActive ? s.activeLink : s.link)}
    >
      Contacts
    </NavLink>
  </nav>
);
export default Navigation;
