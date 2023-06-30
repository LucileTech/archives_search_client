import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import "./Allcontributors.css";
import contributorCard from "../contributorCard/contributorCard";
import chooseRandom from "../../helper";

const Allcontributors = () => {
  const [contributors, setcontributors] = useState([]);

  // get all contributors and pass it to the useState
  useEffect(() => {
    apiHandler.getAllcontributors().then((res) => {
      setcontributors(res);
    });
  }, []);

  // Pick 3 random contributors in the array of all contributors
  const threeRandomcontributors = chooseRandom(contributors, 3);

  // If there is no contributor found
  if (!contributors.length) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div>
      <p className="contributors-paragraph-title">contributorS & CREATORS</p>
      <div className="all-contributors-home-page">
        {/* We map over the random contributors picked by the chooseRandom function */}
        {threeRandomcontributors.map((contributor) => {
          return (
            <div key={contributor._id}>
              <contributorCard contributor={contributor} />;
            </div>
          );
        })}
        <div className="contributors-images-view-more">
          <Link className="link-to-view-more" to="/contributors">
            <button className="button-on-view-more"> VIEW MORE</button>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Allcontributors;
