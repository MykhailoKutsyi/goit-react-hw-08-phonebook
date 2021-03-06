import { useLogOutMutation } from 'redux/services';
import { useSelector, useDispatch } from 'react-redux';
import { getUsername } from 'redux/selectors';
import { changeFilter } from 'redux/actions';
import s from './UserMenu.module.css';

export default function UserMenu() {
  const name = useSelector(getUsername);
  const dispatch = useDispatch();
  const [logOut, { isLoading }] = useLogOutMutation();

  function exit() {
    dispatch(changeFilter(''));
    logOut();
  }

  return (
    <div className={s.container}>
      <img
        src={
          'https://img.icons8.com/stickers/100/undefined/gender-neutral-user.png'
        }
        alt=""
        width="40"
        className={s.avatar}
      />
      <span className={s.name}>Hello, {name}</span>
      <button type="button" onClick={() => exit()} disabled={isLoading}>
        {isLoading ? 'Log outing...' : 'Log out'}
      </button>
    </div>
  );
}
