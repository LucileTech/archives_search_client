import React from "react";
import { Link } from "react-router-dom";

const ArtistCard = ({ artist, showName = false }) => {
  return (
    <>
      <Link to={`/artist/${artist._id}`}>
        {/* the artist name is displayed only if showName = true */}
        {showName && (
          <p className="name-of-artist-all-artists-page">{artist.name}</p>
        )}
        <img
          className="artists-images-all-artists-page"
          src={artist.picture}
          alt={artist.name}
        />
      </Link>
    </>
  );
};

export default ArtistCard;
