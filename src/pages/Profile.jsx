import React, { useState, useEffect } from "react";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";
import "./Profile.css";
import useAuth from "../auth/useAuth";

const Profile = () => {
  const { currentUser } = useAuth();
  const [contributors, setcontributors] = useState([]);

  // Find the contributor related to the user if there is one
  const contributorPageExists = contributors.filter(
    (el) => el.user === currentUser._id
  );

  // To add the new contributor to all contributors
  useEffect(() => {
    apiHandler.getAllcontributors().then((data) => {
      setcontributors(data);
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
        {/* If the user is an contributor he can have access to the create and update contributor profile page + add and update his archive but if the user is not an contributor he has just access to his orders */}
        {!currentUser.iscontributor ? (
          ""
        ) : contributorPageExists.length ? (
          // If the contributor user has already created his profile he has now only access to the update contributor profile page
          <button className="button-on-profile">
            {" "}
            <Link to="/profile/contributors/updatecontributorpage">
              Update creator page
            </Link>{" "}
          </button>
        ) : (
          <button className="button-on-profile">
            {" "}
            <Link to="/profile/contributors/createcontributor">
              Create your creator page
            </Link>{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
