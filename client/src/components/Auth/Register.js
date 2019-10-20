import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../Context/Alert/AlertContext';
import AuthContext from '../../Context/Auth/AuthContext';

const Register = props => {
  const alertcontext = useContext(AlertContext);
  const authcontext = useContext(AuthContext);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const { setAlert } = alertcontext;
  const { register, errors, clearErrors, isAuthenticated } = authcontext;

  const { name, email, password, cpassword } = user;

  useEffect(() => {
    console.log('peeeee');
    if (isAuthenticated) {
      props.history.push('/login');
    }
    if (errors == 'User ALready Exists') {
      setAlert(errors, 'danger');
      clearErrors();
    }
  }, [errors, isAuthenticated, props.history]);
  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const registerfun = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please  Enter All Fields', 'danger');
    } else if (password !== cpassword) {
      setAlert('Passwords Do Not Match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  return (
    <div>
      <h1>Account Register</h1>
      <form>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
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
        <div className='form-group'>
          <label htmlFor='cpassword'>ConFirm password</label>
          <input
            type='password'
            name='cpassword'
            value={cpassword}
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-success btn-sm'
          onClick={registerfun}
        />
      </form>
    </div>
  );
};

export default Register;
