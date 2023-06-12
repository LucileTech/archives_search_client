import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./AllCreations.css";
import CreationCard from "../CreationCard/CreationCard";
import chooseRandom from "../../helper";

const AllCreations = () => {
  const [creations, setCreations] = useState([]);

  // get all creations and pass it to the useState
  useEffect(() => {
    apiHandler.getAllCreations().then((res) => {
      setCreations(res);
    });
  }, []);

  // Pick 5 random creations in the array of all creations
  const fiveRandomCreations = chooseRandom(creations, 5);

  // If there is no creation found
  if (!creations.length) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div>
      <p className="creation-paragraph-title">CREATIONS</p>
      <div className="all-creations-home-page">
        {/* We map over the random creations picked by the chooseRandom function */}
        {fiveRandomCreations.map((creation) => {
          return (
            <div key={creation._id}>
              <CreationCard creation={creation} />
            </div>
          );
        })}
        <div className="creations-images-view-more">
          <Link className="link-to-view-more" to="/creations">
            <button className="button-on-view-more">VIEW MORE</button>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default AllCreations;
