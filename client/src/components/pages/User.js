import React, { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const User = () => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  if (!user) return null;

  return (
    <div className='user-container'>
      <h2>Nome: {user.name}</h2>
      <h3>Bar: {user.bar}</h3>
      <h3>Hora: €{user.wageHour}</h3>
    </div>
  );
};

export default User;
