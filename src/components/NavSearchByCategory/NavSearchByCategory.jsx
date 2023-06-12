import React from "react";
import { Link } from "react-router-dom";

// props from creationlist
const NavSearchByCategory = ({
  creations,
  searchCreationCategoryString,
  setSearchCreationCategoryString,
}) => {
  // To search creation by category
  const handleCreationCategorySearch = (e) => {
    setSearchCreationCategoryString(e.target.value);
  };

  // To clear the input when you are doing another research by category
  const clear = (event) => {
    event.target.value = "";
  };

  //every categories are pushed in an array
  const creationCategories = [];
  for (let i = 0; i < creations.length; i++) {
    creationCategories.push(creations[i].categories[0]);
  }
  //Set Find unique values from an array in React/js / here the categories become unique
  const uniqueCreationCategories = [...new Set(creationCategories)];

  return (
    <div className="search-navbar-entire">
      <div className="search-nav-bar">
        <Link to="/creations">
          <img
            className="search-logo-nav-bar"
            src="https://res.cloudinary.com/dsioshcio/image/upload/v1670414363/next_ysiu0b.png"
            alt="logo-search"
          ></img>{" "}
        </Link>
        {/* input that search creation by categorie, on change of this input handleCreationCategorySearch pass the value to SearchCreationCategoryString that are defined in creationList */}
        <input
          className="search-navbar-input"
          value={searchCreationCategoryString}
          type="text"
          list="data"
          // display all categories again when the user click again
          onClick={clear}
          onFocus={clear}
          placeholder="Search by category"
          onChange={handleCreationCategorySearch}
        />
        {/* //datalist display every categories in allcreations */}
        <datalist id="data">
          {uniqueCreationCategories.map((element) => (
            <option key={element} value={element} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default NavSearchByCategory;
