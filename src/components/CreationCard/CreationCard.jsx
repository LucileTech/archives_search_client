import React from "react";
import { Link } from "react-router-dom";

const CreationCard = ({ creation, showTitle = false }) => {
  return (
    <>
      <Link to={`/creations/${creation._id}`}>
        {/* the creation name is displayed only if showTitle = true */}
        {showTitle && (
          <p className="title-of-creation-all-creations-page">
            {creation.title}
          </p>
        )}
        <img
          className="creations-images-all-creations"
          src={creation.img}
          alt={creation.title}
        />
      </Link>
    </>
  );
};

export default CreationCard;
