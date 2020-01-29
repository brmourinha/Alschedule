import React, { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/schedule/scheduleContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearSchedule } = contactContext;

  const onLogout = () => {
    logout();
    clearSchedule();
  };

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/user'>{user && user.name}</Link>
      </li>
      <li>
        <Link to='/login' onClick={onLogout}>
          Logout
        </Link>
      </li>
    </Fragment>
  );

  if (!isAuthenticated) return null;

  return (
    <div className='nav'>
      <h1>Alschedule</h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

export default Navbar;
