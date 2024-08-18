import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element: Component, restricted, ...rest }) => {
  const isAuthenticated = Boolean(localStorage.getItem('Access')); 

  if (restricted && isAuthenticated) {
    return <Navigate to="/createcard" replace />; 
  }

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AuthRoute;
