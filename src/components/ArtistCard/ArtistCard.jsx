import React from "react";
import { Link } from "react-router-dom";

const contributorCard = ({ contributor, showName = false }) => {
  return (
    <>
      <Link to={`/contributor/${contributor._id}`}>
        {/* the contributor name is displayed only if showName = true */}
        {showName && (
          <p className="name-of-contributor-all-contributors-page">
            {contributor.name}
          </p>
        )}
        <img
          className="contributors-images-all-contributors-page"
          src={contributor.picture}
          alt={contributor.name}
        />
      </Link>
    </>
  );
};

export default contributorCard;
