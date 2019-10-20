import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../Context/Auth/AuthContext';

const Privateroute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, token } = authContext;

  return (
    <Route
      {...rest}
      render={props =>
        !token ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export default Privateroute;
