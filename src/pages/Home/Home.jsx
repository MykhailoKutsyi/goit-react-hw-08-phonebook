import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/selectors';
import s from './Home.module.css';
import { Link } from 'react-router-dom';
const Home = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <div className="container">
      <div className="flex">
        <img
          src="https://img.icons8.com/color/48/undefined/story-book.png"
          alt="Story book"
          width="40"
          height="40"
        />
        <div className="margin">
          <h1 className="title__home">
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
          </h1>
        </div>
      </div>
      {!isLoggedIn ? (
        <>
          <div className="flex">
            <img
              src="https://img.icons8.com/stickers/100/undefined/add-user-male.png"
              alt="Add user"
              width="40"
              height="40"
            />
            <div className="margin">
              <p className="link">
                Don't have an account? Not problem{' '}
                <Link to="signUp">
                  <span className={s.auth}>Sign up</span>
                </Link>{' '}
                and then try it.
              </p>
              <p className={s.text}>
                Remember, we don't use email validation, so you can enter
                fictional email.
              </p>
            </div>
          </div>
          <div className="flex">
            <img
              src="https://img.icons8.com/stickers/100/undefined/name.png"
              alt="LogIn"
              width="40"
              height="40"
            />
            <p className="link margin">
              Already have an account -{' '}
              <Link to="logIn">
                <span className={s.auth}>Log In</span>{' '}
              </Link>
              and enter your login information (e-mail and password).
            </p>
          </div>
        </>
      ) : (
        <div className="flex">
          <img
            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/undefined/external-check-online-education-flaticons-lineal-color-flat-icons.png"
            alt="LogIn"
            width="40"
            height="40"
          />
          <p className="link margin">Let's check your contacts.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
