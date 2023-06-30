import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "./Allarchives.css";
import archiveCard from "../archiveCard/archiveCard";
import chooseRandom from "../../helper";

const Allarchives = () => {
  const [archives, setarchives] = useState([]);

  // get all archives and pass it to the useState
  useEffect(() => {
    apiHandler.getAllarchives().then((res) => {
      setarchives(res);
    });
  }, []);

  // Pick 5 random archives in the array of all archives
  const fiveRandomarchives = chooseRandom(archives, 5);

  // If there is no archive found
  if (!archives.length) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div>
      <p className="archive-paragraph-title">archiveS</p>
      <div className="all-archives-home-page">
        {/* We map over the random archives picked by the chooseRandom function */}
        {fiveRandomarchives.map((archive) => {
          return (
            <div key={archive._id}>
              <archiveCard archive={archive} />
            </div>
          );
        })}
        <div className="archives-images-view-more">
          <Link className="link-to-view-more" to="/archives">
            <button className="button-on-view-more">VIEW MORE</button>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Allarchives;
