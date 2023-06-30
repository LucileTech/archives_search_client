import React from "react";
import { Link } from "react-router-dom";

const archiveCard = ({ archive, showTitle = false }) => {
  return (
    <>
      <Link to={`/archives/${archive._id}`}>
        {/* the archive name is displayed only if showTitle = true */}
        {showTitle && (
          <p className="title-of-archive-all-archives-page">{archive.title}</p>
        )}
        <img
          className="archives-images-all-archives"
          src={archive.img}
          alt={archive.title}
        />
      </Link>
    </>
  );
};

export default archiveCard;
