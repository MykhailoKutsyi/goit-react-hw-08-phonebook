import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from 'redux/selectors';

const redirectTo = 'login';

export function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return <>{isLoggedIn ? children : <Navigate to={redirectTo} />}</>;
}

export function PublicRoute({ children, restricted = false }) {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const shouldRedirect = isLoggedIn && restricted;
  return <>{shouldRedirect ? <Navigate to={redirectTo} /> : children}</>;
}

export function CustomRoute() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return <>{isLoggedIn ? <Navigate to="/" /> : <Navigate to={redirectTo} />}</>;
}
