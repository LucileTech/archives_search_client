import React from "react";
import useAuth from "../../auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const IscontributorRoute = () => {
  // useAuth use UserContext that use createContext from react in order to obtain the current user informations
  const { currentUser } = useAuth();
  // if the currentUser has iscontributor: true it can see the Outlet
  if (currentUser.iscontributor) return <Outlet />;
  // if the currentUser has iscontributor: false it is redirected
  return <Navigate to="/profile" />;
};

export default IscontributorRoute;
