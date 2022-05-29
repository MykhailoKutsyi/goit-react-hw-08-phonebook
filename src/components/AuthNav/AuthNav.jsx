// import Navigation from '../Navigation';
import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.css';

export default function AuthNav() {
  return (
    <div>
      <NavLink
        to="signUp"
        className={navData => (navData.isActive ? s.activeLink : s.link)}
      >
        Sign Up
      </NavLink>
      <NavLink
        to="logIn"
        className={navData => (navData.isActive ? s.activeLink : s.link)}
      >
        Log In
      </NavLink>
    </div>
  );
}
