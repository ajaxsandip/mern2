import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../Context/Auth/AuthContext';
import AlerContext from '../../Context/Alert/AlertContext';

const Login = props => {
  const authcontext = useContext(AuthContext);
  const alercontext = useContext(AlerContext);

  const { loginfun, isAuthenticated, errors, clearErrors } = authcontext;
  const { setAlert } = alercontext;
  const [user, setUser] = useState({
    email: '',

    password: ''
  });

  const { email, password } = user;

  useEffect(() => {
    console.log('peeeee', isAuthenticated);
    if (isAuthenticated) {
      console.log(props);
      props.history.push('/');
    }
    if (errors == 'User ALready Exists') {
      setAlert(errors, 'danger');
      clearErrors();
    }
  }, [isAuthenticated, props.history, errors]);

  const loginfunc = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please  Enter All Fields', 'danger');
    } else {
      loginfun({ email: email, password: password });
    }
  };

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' value={email} onChange={onChange} />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={onChange}
          />
        </div>

        <input
          type='submit'
          value='Login'
          className='btn btn-success btn-sm'
          onClick={loginfunc}
        />
      </form>
    </div>
  );
};

export default Login;
