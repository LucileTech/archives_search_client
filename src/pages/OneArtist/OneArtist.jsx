import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "./../../api/apiHandler";
import "./OneArtist.css";

const OneArtist = () => {
  const [artist, setArtist] = useState([]);
  const [artistCreation, setArtistCreation] = useState([]); //To get the specific creations of an artist

  // Get artist by id and the creations of this artist
  const params = useParams();
  const id = params.id;

  // To get one artist by his id
  useEffect(() => {
    apiHandler.getOneArtist(id).then((res) => {
      setArtist(res);
    });
    // To get specific creations of the artist by his id
    apiHandler.getArtistCreations(id).then((res) => {
      setArtistCreation(res);
    });
  }, []);

  // Loading section if no artist or no artist creations
  if (!artist) {
    return <div className="middle-div-min">Loading...</div>;
  }
  if (!artistCreation) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div className="middle-div-min">
      <div className="artist-presentation">
        <img
          className="artist-picture"
          src={artist.picture}
          alt={artist.name}
        />
        <div className="artist-details">
          <h2 className="artist-details-name">{artist.name}</h2>
          <p className="artist-details-description">{artist.description}</p>
        </div>
      </div>

      <div className="object-of-artist-details">
        <h3 className="one-artist-creations">CREATIONS</h3>
        <div className="all-creations-artist-page">
          {/* To display each creation of the one artist */}
          {artistCreation.map((element) => {
            return (
              <div key={element._id}>
                <Link to={`/creations/${element._id}`}>
                  <img
                    className="creations-images-one-artist"
                    src={element.img}
                    alt={element.title}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OneArtist;
