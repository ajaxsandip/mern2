import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/Auth/AuthContext';
const Navbar = props => {
  const authcontext = useContext(AuthContext);

  const { isAuthenticated, user, logout } = authcontext;

  // useEffect(() => {
  //   if (isAuthenticated === null) {
  //     props.history.push('/login');
  //   }
  // }, [isAuthenticated]);

  const logouts = () => {
    logout();
  };
  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name} </li>

      <li>
        {' '}
        <Link to='/login' onClick={logouts}>
          {' '}
          Logout
        </Link>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/'> Home</Link>
      </li>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <li>
        {' '}
        <Link to='/about'> About</Link>
      </li>
      <li>
        {' '}
        <Link to='/register'> Register</Link>
      </li>
      <li>
        {' '}
        <Link to='/login'> Login</Link>
      </li>
    </Fragment>
  );
  return (
    <nav className='navbar bg-success'>
      ContactFinder
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
};

export default Navbar;
