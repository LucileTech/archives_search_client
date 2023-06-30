import "./NavSearch.css";
import { Link } from "react-router-dom";
// We pass the props from archiveList and contributorList
const NavSearch = ({ searcharchiveString, setSearcharchiveString }) => {
  // Change the useState in archiveList and contributorList with the value of the input that search archive by name
  const handlearchiveSearch = (event) => {
    setSearcharchiveString(event.target.value);
  };

  return (
    <div className="search-navbar-entire">
      <div className="search-nav-bar">
        <Link to="/archives">
          <img
            className="search-logo-nav-bar"
            src="https://res.cloudinary.com/dsioshcio/image/upload/v1669837342/search-white_ledj7c.png"
            alt="logo-search"
          ></img>{" "}
        </Link>
        {/* input that search archive by name, on change of this input handlearchiveSearch pass the value to setSearcharchiveString useState */}
        <input
          className="search-navbar-input"
          value={searcharchiveString}
          type="text"
          placeholder="Search by name"
          onChange={handlearchiveSearch}
        />
      </div>
    </div>
  );
};

export default NavSearch;
