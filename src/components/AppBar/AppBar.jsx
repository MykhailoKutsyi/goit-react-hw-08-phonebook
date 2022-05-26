import Navigation from '../Navigation';
import AuthNav from '../AuthNav';
import UserMenu from '../UserMenu';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/selectors';
import s from './AppBar.module.css';

export default function AppBar() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  // console.log(isLoggedIn);
  return (
    <header className={s.header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
