import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import "./archivesList.css";
import NavSearch from "../../components/NavSearch/NavSearch";
import NavSearchByCategory from "../../components/NavSearchByCategory/NavSearchByCategory";
import archiveCard from "../../components/archiveCard/archiveCard";

const archivesList = () => {
  const [archives, setarchives] = useState([]);
  const [searcharchiveString, setSearcharchiveString] = useState(""); // To search archive by name
  const [searcharchiveCategoryString, setSearcharchiveCategoryString] =
    useState(""); // To search archive by category

  //To get the list of all archives
  useEffect(() => {
    apiHandler.getAllarchives().then((res) => {
      setarchives(res);
    });
  }, []);

  //To display archives filtered
  const filteredarchives = () => {
    let archivesFiltered = [...archives];
    //Filtered by name
    if (searcharchiveString) {
      archivesFiltered = archivesFiltered.filter((element) =>
        element.title.toLowerCase().includes(searcharchiveString.toLowerCase())
      );
    }
    //Filtered by category
    if (searcharchiveCategoryString) {
      archivesFiltered = archivesFiltered.filter((element) =>
        element.categories.includes(searcharchiveCategoryString)
      );
    }
    return archivesFiltered;
  };

  return (
    <div className="middle-div-min">
      {/* To search archives by name */}
      <NavSearch
        setSearcharchiveString={setSearcharchiveString}
        searcharchiveString={searcharchiveString}
      ></NavSearch>
      {/* To search archive by category */}
      <NavSearchByCategory
        searcharchiveCategoryString={searcharchiveCategoryString}
        setSearcharchiveCategoryString={setSearcharchiveCategoryString}
        archives={archives}
      ></NavSearchByCategory>
      <div className="all-archives-page">
        {/* To display archive by archive in the archive list */}
        {filteredarchives().map((archive) => {
          return (
            <div key={archive._id}>
              <archiveCard archive={archive} showTitle={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default archivesList;
