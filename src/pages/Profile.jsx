import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import "./Profile.css";
import useAuth from "../auth/useAuth";

const Profile = () => {
  const { currentUser } = useAuth();
  const [artists, setArtists] = useState([]);

  // Find the artist related to the user if there is one
  const artistPageExists = artists.filter((el) => el.user === currentUser._id);

  // To add the new artist to all artists
  useEffect(() => {
    apiHandler.getAllArtists().then((data) => {
      setArtists(data);
    });
  }, []);

  return (
    <div className="middle-div-min">
      <h3 className="welcome-profile">Welcome to your profile!</h3>

      <div className="buttons-on-profile">
        <button className="button-on-profile">
          {" "}
          <Link to="/profile/orders">Your orders</Link>{" "}
        </button>
        {/* If the user is an artist he can have access to the create and update artist profile page + add and update his creation but if the user is not an artist he has just access to his orders */}
        {!currentUser.isArtist ? (
          ""
        ) : artistPageExists.length ? (
          // If the artist user has already created his profile he has now only access to the update artist profile page
          <button className="button-on-profile">
            {" "}
            <Link to="/profile/artists/updateartistpage">
              Update creator page
            </Link>{" "}
          </button>
        ) : (
          <button className="button-on-profile">
            {" "}
            <Link to="/profile/artists/createartist">
              Create your creator page
            </Link>{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
