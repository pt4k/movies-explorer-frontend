import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {console.log(props.isLoggedIn)}
      {() =>
        props.isLoggedIn ? <Component {...props} /> : <Redirect to='/' />
      }
    </Route>
  );
};

export default ProtectedRoute;
