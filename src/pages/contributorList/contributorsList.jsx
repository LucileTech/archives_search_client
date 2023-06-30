import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import "./contributorsList.css";
import NavSearch from "../../components/NavSearch/NavSearch";
import contributorCard from "../../components/contributorCard/contributorCard";

const contributorsList = () => {
  const [contributors, setcontributors] = useState([]);
  const [searcharchiveString, setSearcharchiveString] = useState(""); // To search archive by name

  // Get the list of all contributors
  useEffect(() => {
    apiHandler.getAllcontributors().then((data) => {
      setcontributors(data);
    });
  }, []);

  // To filter all contributors name by navSearch value
  const filteredcontributors = () => {
    let contributorsFiltered = [...contributors];
    if (searcharchiveString) {
      contributorsFiltered = contributorsFiltered.filter((element) =>
        element.name.toLowerCase().includes(searcharchiveString.toLowerCase())
      );
    }
    return contributorsFiltered;
  };

  return (
    <div className="middle-div-min">
      {/* To search contributor by name */}
      <NavSearch
        setSearcharchiveString={setSearcharchiveString}
        searcharchiveString={searcharchiveString}
      ></NavSearch>
      <div className="all-contributors-page">
        {/* To display contributor by contributor in the contributor list */}
        {filteredcontributors().map((contributor) => {
          return (
            <div key={contributor._id}>
              <contributorCard contributor={contributor} showName={true} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default contributorsList;
