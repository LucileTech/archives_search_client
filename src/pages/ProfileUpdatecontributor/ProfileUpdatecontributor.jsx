import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFormCreate from "../../hooks/useFormCreate";
import apiHandler from "../../api/apiHandler";
import "./ProfileUpdatecontributor.css";

const ProfileUpdatecontributor = () => {
  const [error, setError] = useState("");
  const [myarchives, setMyarchives] = useState([]);
  // setFormData for the update contributor page
  const [formData, handleChange, setFormData, resetForm] = useFormCreate({
    name: "",
    description: "",
    picture: {},
  });
  const navigate = useNavigate();

  //Display contributor profile with archive
  useEffect(() => {
    apiHandler.getMycontributor().then((res) => {
      setFormData(res);
    });
    apiHandler.getMyarchives().then((res) => {
      setMyarchives(res);
    });
  }, []);

  // Update contributor profile
  const handleUpdatecontributorForm = async (event) => {
    event.preventDefault();
    const formDataUpdatedcontributor = new FormData();
    // Error message if some input are empty
    for (const key in formData) {
      if (formData[key] === "") {
        setError(`${key} is required`);
        return;
      }
    }
    // Get the value of each input of the update form
    formDataUpdatedcontributor.append("name", formData.name);
    formDataUpdatedcontributor.append("description", formData.description);
    formDataUpdatedcontributor.append("picture", formData.picture);

    // Update the contributor profile
    try {
      const { data } = await apiHandler.patchUpdatecontributor(
        formDataUpdatedcontributor
      );
      resetForm();
      navigate("/profile");
    } catch (err) {
      setError(err);
    }
  };

  //Delete the contributor profile
  const handleDeletecontributor = async (event) => {
    event.preventDefault();
    try {
      const contributorDeleted = await apiHandler.deletecontributor();
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  const { name, description, picture } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleUpdatecontributorForm}
        className="update-contributor-presentation"
      >
        <div className="update-contributor-picture">
          <img id="update-picture" src={`${picture}`} alt="add-archive" />
        </div>
        <div className="update-contributor-details">
          <input
            className="update-contributor-details-name"
            type="text"
            id="create-name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <textarea
            className="update-contributor-details-description"
            type="text"
            value={description}
            name="description"
            id="create-description"
            onChange={handleChange}
          ></textarea>
          <input type="file" name="picture" onChange={handleChange} />

          <div className="div-for-submit-button-update-contributor">
            {error && <p className="error">{error}</p>}
            <button className="submit-button-update-contributor">
              SUBMIT CHANGES
            </button>
            <button
              className="submit-button-update-contributor"
              onClick={handleDeletecontributor}
            >
              DELETE CREATOR PAGE
            </button>
          </div>
        </div>
      </form>

      <div className="update-object-of-contributor-details">
        <h3 className="update-one-contributor-archives">
          UPDATE YOUR archiveS
        </h3>
        <div className="all-archives-update-contributor-page">
          <div>
            <div className="archives-images-view-more">
              <Link to="/profile/contributors/createobject">
                <img
                  className="create-archives-images-one-contributor"
                  src="https://res.cloudinary.com/dzkbycvev/image/upload/v1670232991/first-fullstack-app/nldxlijwg2i2rf7lxygz.png"
                  alt="add-archive"
                />
              </Link>
            </div>
          </div>
          {/* To display all my archives on my profile */}
          {myarchives.map((element) => {
            return (
              <div key={element._id}>
                <Link
                  to={`/profile/contributors/updateobjectpage/${element._id}`}
                >
                  <img
                    className="update-archives-images-one-contributor"
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

export default ProfileUpdatecontributor;
