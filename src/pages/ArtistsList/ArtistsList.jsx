import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import "./ArtistsList.css";
import NavSearch from "../../components/NavSearch/NavSearch";
import ArtistCard from "../../components/ArtistCard/ArtistCard";

const ArtistsList = () => {
  const [artists, setArtists] = useState([]);
  const [searchCreationString, setSearchCreationString] = useState(""); // To search creation by name

  // Get the list of all artists
  useEffect(() => {
    apiHandler.getAllArtists().then((data) => {
      setArtists(data);
    });
  }, []);

  // To filter all artists name by navSearch value
  const filteredArtists = () => {
    let artistsFiltered = [...artists];
    if (searchCreationString) {
      artistsFiltered = artistsFiltered.filter((element) =>
        element.name.toLowerCase().includes(searchCreationString.toLowerCase())
      );
    }
    return artistsFiltered;
  };

  return (
    <div className="middle-div-min">
      {/* To search artist by name */}
      <NavSearch
        setSearchCreationString={setSearchCreationString}
        searchCreationString={searchCreationString}
      ></NavSearch>
      <div className="all-artists-page">
        {/* To display artist by artist in the artist list */}
        {filteredArtists().map((artist) => {
          return (
            <div key={artist._id}>
              <ArtistCard artist={artist} showName={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistsList;
