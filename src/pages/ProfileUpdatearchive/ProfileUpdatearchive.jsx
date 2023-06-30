import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFormCreate from "../../hooks/useFormCreate";
import apiHandler from "./../../api/apiHandler";
import "./ProfileUpdatearchive.css";

const ProfileUpdatearchive = () => {
  const [error, setError] = useState("");

  // Get the id of the archive
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  // setFormData for the update archive page
  const [formData, handleChange, setFormData, resetForm] = useFormCreate({
    title: "",
    description: "",
    img: {},
    categories: [],
    price: 0,
  });

  //To get archive by id
  useEffect(() => {
    apiHandler.getOnearchive(id).then((res) => {
      setFormData(res);
    });
  }, []);

  // To delete a archive and to go back to the contributor profile page
  const handleDeletearchive = async (event) => {
    event.preventDefault();
    try {
      const archiveDeleted = await apiHandler.deletearchivecontributorProfile(
        id
      );
      navigate("/profile/contributors/updatecontributorpage");
    } catch (error) {
      console.error(error);
    }
  };

  // To update the archive
  const handleUpdatearchiveForm = async (event) => {
    event.preventDefault();
    const formDataUpdatedarchive = new FormData();
    // Error message if some input are empty
    for (const key in formData) {
      if (formData[key] === "") {
        setError(`${key} is required`);
        return;
      }
    }

    // Get the value of each input of the update form
    formDataUpdatedarchive.append("title", formData.title);
    formDataUpdatedarchive.append("description", formData.description);
    formDataUpdatedarchive.append("img", formData.img);
    formDataUpdatedarchive.append("categories", formData.categories);
    formDataUpdatedarchive.append("price", formData.price);

    // To update the archive and reload the page
    try {
      const data = await apiHandler.patchUpdatearchive(
        formDataUpdatedarchive,
        id
      );
      resetForm();
      navigate("/profile/contributors/updatearchivepage");
    } catch (err) {
      setError(err);
    }
  };

  const { title, description, categories, price, img } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleUpdatearchiveForm}
        className="update-all-object-details-page"
      >
        <div className="update-archive-presentation">
          <img
            className="update-archive-picture"
            src={`${img}`}
            alt="add-archive"
          />

          <div className="update-archive-details">
            <input
              className="update-archive-details-title"
              type="text"
              value={title}
              name="title"
              id="title"
              onChange={handleChange}
            />

            <textarea
              className="update-archive-details-description"
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
        <div className="change-picture-archive-update">
          <input
            type="file"
            id="update-archive-picture"
            name="img"
            onChange={handleChange}
          />
        </div>
        <div className="update-archive-price-and-button">
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
          <button className="update-add-to-profile-button-archive-page">
            SUBMIT CHANGES
          </button>
          <button
            className="update-add-to-profile-button-archive-page"
            onClick={handleDeletearchive}
          >
            DELETE THIS archive
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileUpdatearchive;
