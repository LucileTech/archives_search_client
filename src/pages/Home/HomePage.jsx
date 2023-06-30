import React from "react";
import Allcontributors from "../../components/Allcontributors/Allcontributors";
import Allarchives from "../../components/Allarchives/Allarchives";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="middle-div-min">
      {/* Section intro with logo */}
      <section className="intro-home-page">
        <img
          className="logo-octopus-home-page"
          src="images/logos/intro-logo.png"
        ></img>
        <h6>
          A marketplace for creativity to spread art everywhere. From unique
          handcrafted pieces to art treasures...
        </h6>
      </section>
      {/* Section that display some contributor + view more */}
      <section className="contributors-home-page">
        <Allcontributors></Allcontributors>
      </section>
      {/* Section that display some archive + view more */}
      <section className="archives-home-page">
        <Allarchives></Allarchives>
      </section>
    </div>
  );
};

export default HomePage;
