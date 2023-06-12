import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFormCreate from "../../hooks/useFormCreate";
import apiHandler from "./../../api/apiHandler";
import "./ProfileUpdateCreation.css";

const ProfileUpdateCreation = () => {
  const [error, setError] = useState("");

  // Get the id of the creation
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  // setFormData for the update creation page
  const [formData, handleChange, setFormData, resetForm] = useFormCreate({
    title: "",
    description: "",
    img: {},
    categories: [],
    price: 0,
  });

  //To get creation by id
  useEffect(() => {
    apiHandler.getOneCreation(id).then((res) => {
      setFormData(res);
    });
  }, []);

  // To delete a creation and to go back to the artist profile page
  const handleDeleteCreation = async (event) => {
    event.preventDefault();
    try {
      const creationDeleted = await apiHandler.deleteCreationArtistProfile(id);
      navigate("/profile/artists/updateartistpage");
    } catch (error) {
      console.error(error);
    }
  };

  // To update the creation
  const handleUpdateCreationForm = async (event) => {
    event.preventDefault();
    const formDataUpdatedCreation = new FormData();
    // Error message if some input are empty
    for (const key in formData) {
      if (formData[key] === "") {
        setError(`${key} is required`);
        return;
      }
    }

    // Get the value of each input of the update form
    formDataUpdatedCreation.append("title", formData.title);
    formDataUpdatedCreation.append("description", formData.description);
    formDataUpdatedCreation.append("img", formData.img);
    formDataUpdatedCreation.append("categories", formData.categories);
    formDataUpdatedCreation.append("price", formData.price);

    // To update the creation and reload the page
    try {
      const data = await apiHandler.patchUpdateCreation(
        formDataUpdatedCreation,
        id
      );
      resetForm();
      navigate("/profile/artists/updatecreationpage");
    } catch (err) {
      setError(err);
    }
  };

  const { title, description, categories, price, img } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleUpdateCreationForm}
        className="update-all-object-details-page"
      >
        <div className="update-creation-presentation">
          <img
            className="update-creation-picture"
            src={`${img}`}
            alt="add-creation"
          />

          <div className="update-creation-details">
            <input
              className="update-creation-details-title"
              type="text"
              value={title}
              name="title"
              id="title"
              onChange={handleChange}
            />

            <textarea
              className="update-creation-details-description"
              type="text"
              value={description}
              name="description"
              id="description"
              onChange={handleChange}
            ></textarea>

            <h4>
              <label htmlFor="description">Categories: </label>
              <input
                type="text"
                value={categories}
                name="categories"
                id="categories"
                onChange={handleChange}
                placeholder="add category"
              />
            </h4>
          </div>
        </div>
        <div className="change-picture-creation-update">
          <input
            type="file"
            id="update-creation-picture"
            name="img"
            onChange={handleChange}
          />
        </div>
        <div className="update-creation-price-and-button">
          <h3>
            <label htmlFor="description">Price: </label>
            <input
              type="number"
              value={price}
              name="price"
              id="price"
              onChange={handleChange}
              placeholder="price"
            />
            €
          </h3>
          {error && <p className="error">{error}</p>}
          <button className="update-add-to-profile-button-creation-page">
            SUBMIT CHANGES
          </button>
          <button
            className="update-add-to-profile-button-creation-page"
            onClick={handleDeleteCreation}
          >
            DELETE THIS CREATION
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdateCreation;
