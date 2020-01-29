import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/schedule/scheduleContext';

const Footer = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = authContext;

  if (!isAuthenticated) return null;

  return (
    <div className='footer'>
      <ul className='footer-links'>
        <li>
          <Link to='/'>
            <i className='fas fa-calendar-alt'></i>
          </Link>
        </li>
        <li>
          <Link to='/user'>
            <i className='fas fa-user'></i>
          </Link>
        </li>
        <li>
          <Link to='/events'>
            <i className='fas fa-music'></i>
          </Link>
        </li>
        <li>
          <Link to='/about'>
            <i className='fas fa-info'></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
