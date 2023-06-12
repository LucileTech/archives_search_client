import React from "react";
import useAuth from "../../auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const IsArtistRoute = () => {
  // useAuth use UserContext that use createContext from react in order to obtain the current user informations
  const { currentUser } = useAuth();
  // if the currentUser has isArtist: true it can see the Outlet
  if (currentUser.isArtist) return <Outlet />;
  // if the currentUser has isArtist: false it is redirected
  return <Navigate to="/profile" />;
};

export default IsArtistRoute;
