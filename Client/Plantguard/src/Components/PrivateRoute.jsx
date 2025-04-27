import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

// import AuthContext from '../context/authContext';

const PrivateRoute = ({ children }) => {
  //const { user, loading } = useContext(AuthContext);
   const user = JSON.parse(localStorage.getItem('user'));
   console.log(user);
   // Or a loading spinner

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Return the child component if authenticated
};

export default PrivateRoute;
