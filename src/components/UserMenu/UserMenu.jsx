import { useLogOutMutation } from 'redux/services';
import { useSelector } from 'react-redux';
import { getUsername } from 'redux/selectors';
import Loader from 'components/Loader';
import s from './UserMenu.module.css';

export default function UserMenu() {
  const name = useSelector(getUsername);
  const [logOut, { isLoading }] = useLogOutMutation();

  return (
    <div className={s.container}>
      <img
        src={'https://cdn-icons-png.flaticon.com/512/2922/2922506.png'}
        alt=""
        width="32"
        className={s.avatar}
      />
      <span className={s.name}>Hello, {name}</span>
      <button type="button" onClick={() => logOut()} disabled={isLoading}>
        {isLoading && <Loader />}
        {isLoading ? 'Log outing...' : 'Log out'}
      </button>
    </div>
  );
}
