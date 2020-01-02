import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);
  const [user, setUser] = useState({
    name: '',
    password: ''
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
      <h1>Alschedule</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          name='name'
          value={name}
          onChange={onChange}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={onChange}
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
