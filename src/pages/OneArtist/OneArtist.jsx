import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import apiHandler from "./../../api/apiHandler";
import "./Onecontributor.css";

const Onecontributor = () => {
  const [contributor, setcontributor] = useState([]);
  const [contributorarchive, setcontributorarchive] = useState([]); //To get the specific archives of an contributor

  // Get contributor by id and the archives of this contributor
  const params = useParams();
  const id = params.id;

  // To get one contributor by his id
  useEffect(() => {
    apiHandler.getOnecontributor(id).then((res) => {
      setcontributor(res);
    });
    // To get specific archives of the contributor by his id
    apiHandler.getcontributorarchives(id).then((res) => {
      setcontributorarchive(res);
    });
  }, []);

  // Loading section if no contributor or no contributor archives
  if (!contributor) {
    return <div className="middle-div-min">Loading...</div>;
  }
  if (!contributorarchive) {
    return <div className="middle-div-min">Loading...</div>;
  }

  return (
    <div className="middle-div-min">
      <div className="contributor-presentation">
        <img
          className="contributor-picture"
          src={contributor.picture}
          alt={contributor.name}
        />
        <div className="contributor-details">
          <h2 className="contributor-details-name">{contributor.name}</h2>
          <p className="contributor-details-description">
            {contributor.description}
          </p>
        </div>
      </div>

      <div className="object-of-contributor-details">
        <h3 className="one-contributor-archives">archiveS</h3>
        <div className="all-archives-contributor-page">
          {/* To display each archive of the one contributor */}
          {contributorarchive.map((element) => {
            return (
              <div key={element._id}>
                <Link to={`/archives/${element._id}`}>
                  <img
                    className="archives-images-one-contributor"
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

export default Onecontributor;
