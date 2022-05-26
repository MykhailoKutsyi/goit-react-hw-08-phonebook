import { useLogoutMutation } from 'redux/services';
import { useSelector } from 'react-redux';
import { getUsername } from 'redux/selectors';
// import s from './UserMenu.module.css';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 4,
  },
  name: {
    fontWeight: 700,
    marginRight: 12,
  },
};

export default function UserMenu() {
  const name = useSelector(getUsername);
  const [logout] = useLogoutMutation();
  return (
    <div style={styles.container}>
      <img
        src={'https://cdn-icons-png.flaticon.com/512/2922/2922506.png'}
        alt=""
        width="32"
        style={styles.avatar}
      />
      <span style={styles.name}>Hello, {name}</span>
      <button type="button" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
