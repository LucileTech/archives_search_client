import "./NavSearch.css";
import { Link } from "react-router-dom";
// We pass the props from creationList and artistList
const NavSearch = ({ searchCreationString, setSearchCreationString }) => {
  // Change the useState in creationList and artistList with the value of the input that search creation by name
  const handleCreationSearch = (event) => {
    setSearchCreationString(event.target.value);
  };

  return (
    <div className="search-navbar-entire">
      <div className="search-nav-bar">
        <Link to="/creations">
          <img
            className="search-logo-nav-bar"
            src="https://res.cloudinary.com/dsioshcio/image/upload/v1669837342/search-white_ledj7c.png"
            alt="logo-search"
          ></img>{" "}
        </Link>
        {/* input that search creation by name, on change of this input handleCreationSearch pass the value to setSearchCreationString useState */}
        <input
          className="search-navbar-input"
          value={searchCreationString}
          type="text"
          placeholder="Search by name"
          onChange={handleCreationSearch}
        />
      </div>
    </div>
  );
};

export default NavSearch;
