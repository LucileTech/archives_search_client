import React from "react";
import "./NavBar.css";
import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import useAuth from "../../auth/useAuth";

const NavBar = () => {
  // useAuth use UserContext that use createContext from react in order to obtain the current user informations
  const { isLoggedIn, currentUser, removeUser } = useAuth();

  return (
    <>
      <div className="navbar-entire">
        {/* The logo redirects to homePage */}
        <div className="navbar-left">
          <Link to="/">
            <img
              className="logo-nav-bar"
              src="https://res.cloudinary.com/dsioshcio/image/upload/v1669835655/octopus-logo-blanc_kgg3pw.png"
              alt="logo-octopus"
            ></img>
          </Link>
        </div>

        {/* Redirection to "All artists" page and "All creations" pages */}
        <div className="nav-hamburger-responsive">
          <div id="navbar-center-responsive" className="navbar-center">
            <div className="artists-creations">
              <div className="link-navbar-responsive">
                <Link
                  to="/artists"
                  id="link-all-artists"
                  className="navbar-artist-creation-link"
                >
                  All Artists
                </Link>
              </div>
              <div className="link-navbar-responsive">
                <Link
                  to="/creations"
                  id="link-all-creations"
                  className="navbar-artist-creation-link"
                >
                  All Creations
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-right">
          {/* name of the user and Log out button if a user is logged in */}
          {isLoggedIn && (
            <div className="responsive-loggin">
              <div className="link-navbar-responsive">
                <NavLink
                  id="navbar-right-responsive"
                  className="navbar-login-register-link"
                  to="/profile"
                >
                  {currentUser && currentUser.name}
                </NavLink>
              </div>
              <div className="link-navbar-responsive">
                <button
                  className="navbar-right-responsive"
                  id="button-log-out-navbar"
                  onClick={removeUser}
                >
                  Log-Out
                </button>
              </div>
            </div>
          )}

          {/* Log in and register buttons if a no user is logged in */}
          {!isLoggedIn && (
            <div className="responsive-loggin">
              <div className="link-navbar-responsive">
                <NavLink
                  id="navbar-right-responsive"
                  className="navbar-login-register-link"
                  to="/signin"
                >
                  Log in
                </NavLink>
              </div>
              <div className="link-navbar-responsive">
                <NavLink
                  id="navbar-right-responsive"
                  className="navbar-login-register-link"
                  to="/signup"
                >
                  Register
                </NavLink>
              </div>
            </div>
          )}
          {/* Redirection to the Cart of the current user */}
          <Link to="/cart">
            <img
              className="card-logo-nav-bar"
              src="https://res.cloudinary.com/dsioshcio/image/upload/v1669836105/shopping-cart-white_fhx2z3.png"
              alt="logo-card"
            ></img>{" "}
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
