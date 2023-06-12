import React from "react";
import useAuth from "../../auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // useAuth use UserContext that use createContext from react in order to obtain the current user informations
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) return <p>Loading...</p>;
  if (!isLoggedIn) return <Navigate to="/signin" />;
  // autorization to see the page
  else return <Outlet />;
};

export default PrivateRoute;
