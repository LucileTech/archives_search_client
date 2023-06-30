import React from "react";
import { Link } from "react-router-dom";

// props from archivelist
const NavSearchByCategory = ({
  archives,
  searcharchiveCategoryString,
  setSearcharchiveCategoryString,
}) => {
  // To search archive by category
  const handlearchiveCategorySearch = (e) => {
    setSearcharchiveCategoryString(e.target.value);
  };

  // To clear the input when you are doing another research by category
  const clear = (event) => {
    event.target.value = "";
  };

  //every categories are pushed in an array
  const archiveCategories = [];
  for (let i = 0; i < archives.length; i++) {
    archiveCategories.push(archives[i].categories[0]);
  }
  //Set Find unique values from an array in React/js / here the categories become unique
  const uniquearchiveCategories = [...new Set(archiveCategories)];

  return (
    <div className="search-navbar-entire">
      <div className="search-nav-bar">
        <Link to="/archives">
          <img
            className="search-logo-nav-bar"
            src="https://res.cloudinary.com/dsioshcio/image/upload/v1670414363/next_ysiu0b.png"
            alt="logo-search"
          ></img>{" "}
        </Link>
        {/* input that search archive by categorie, on change of this input handlearchiveCategorySearch pass the value to SearcharchiveCategoryString that are defined in archiveList */}
        <input
          className="search-navbar-input"
          value={searcharchiveCategoryString}
          type="text"
          list="data"
          // display all categories again when the user click again
          onClick={clear}
          onFocus={clear}
          placeholder="Search by category"
          onChange={handlearchiveCategorySearch}
        />
        {/* //datalist display every categories in allarchives */}
        <datalist id="data">
          {uniquearchiveCategories.map((element) => (
            <option key={element} value={element} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default NavSearchByCategory;
