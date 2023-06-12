import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import "./CreationsList.css";
import NavSearch from "../../components/NavSearch/NavSearch";
import NavSearchByCategory from "../../components/NavSearchByCategory/NavSearchByCategory";
import CreationCard from "../../components/CreationCard/CreationCard";

const CreationsList = () => {
  const [creations, setCreations] = useState([]);
  const [searchCreationString, setSearchCreationString] = useState(""); // To search creation by name
  const [searchCreationCategoryString, setSearchCreationCategoryString] =
    useState(""); // To search creation by category

  //To get the list of all creations
  useEffect(() => {
    apiHandler.getAllCreations().then((res) => {
      setCreations(res);
    });
  }, []);

  //To display creations filtered
  const filteredCreations = () => {
    let creationsFiltered = [...creations];
    //Filtered by name
    if (searchCreationString) {
      creationsFiltered = creationsFiltered.filter((element) =>
        element.title.toLowerCase().includes(searchCreationString.toLowerCase())
      );
    }
    //Filtered by category
    if (searchCreationCategoryString) {
      creationsFiltered = creationsFiltered.filter((element) =>
        element.categories.includes(searchCreationCategoryString)
      );
    }
    return creationsFiltered;
  };

  return (
    <div className="middle-div-min">
      {/* To search creations by name */}
      <NavSearch
        setSearchCreationString={setSearchCreationString}
        searchCreationString={searchCreationString}
      ></NavSearch>
      {/* To search creation by category */}
      <NavSearchByCategory
        searchCreationCategoryString={searchCreationCategoryString}
        setSearchCreationCategoryString={setSearchCreationCategoryString}
        creations={creations}
      ></NavSearchByCategory>
      <div className="all-creations-page">
        {/* To display creation by creation in the creation list */}
        {filteredCreations().map((creation) => {
          return (
            <div key={creation._id}>
              <CreationCard creation={creation} showTitle={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreationsList;
