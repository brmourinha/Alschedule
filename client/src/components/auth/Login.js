import React, { useState, useContext, useEffect } from 'react';
import Alerts from '../layouts/Alerts';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = props => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { login, isAuthenticated, error } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User does not exist!!' || error === 'Wrong Password') {
      setAlert('Invalid Credentials', 'danger');
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history, error]);
  const [user, setUser] = useState({
    name: 'John Doe',
    password: 'password'
  });

  const { name, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    login({
      name,
      password
    });
  };

  return (
    <div className='login-page'>
      <div className='img'></div>
      <h1>Alschedule</h1>
      <Alerts />
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={onChange}
          minLength='6'
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={onChange}
          minLength='6'
          required
        />
        <button type='submit' value='Login' className='btn'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
