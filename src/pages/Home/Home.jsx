import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/selectors';
import s from './Home.module.css';
import { Link } from 'react-router-dom';
const Home = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <div className={s.container}>
      <h1 className={s.title}>
        Phone Book App is a contact management service developed by{' '}
        <a
          className={s.githubLink}
          href="https://github.com/MykhailoKutsyi"
          noopener="true"
          noreferrer="true"
          rel="noreferrer"
          target="_blank"
        >
          Mykhailo Kutsyi
        </a>
        . It is available as a web app.{' '}
        <span role="img" aria-label="Иконка приветствия">
          💁‍♀️
        </span>{' '}
      </h1>
      {!isLoggedIn ? (
        <>
          <p className={s.link}>
            <Link to="logIn" className={s.link}>
              <span className={s.auth}> Log In </span>and try it.
            </Link>
          </p>
          <p className={s.link}>
            <Link to="signUp" className={s.link}>
              <span className={s.auth}> Sign up</span> for Phone Book App.
            </Link>
          </p>
        </>
      ) : (
        'Something else'
      )}
    </div>
  );
};

export default Home;
