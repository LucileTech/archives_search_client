import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import useFormCreate from "../../hooks/useFormCreate";

import "./FormCreateObject.css";

const CreateFormarchive = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // UseFormCreate hook defined in "hooks"
  const [formData, handleChangeData, setStateData, resetForm] = useFormCreate({
    title: "",
    description: "",
    img: {},
    categories: [],
    price: 0,
  });

  // on submission of the form handleSubmitarchiveForm pass the informations of the inputs to formData
  const handleSubmitarchiveForm = async (e) => {
    e.preventDefault();
    const formDataarchive = new FormData();
    formDataarchive.append("title", formData.title);
    formDataarchive.append("description", formData.description);
    formDataarchive.append("img", formData.img);
    formDataarchive.append("categories", formData.categories.toLowerCase());
    formDataarchive.append("price", formData.price);

    // createarchive is a post that creates a new archive
    try {
      const data = await apiHandler.createarchive(formDataarchive);
      resetForm();
      navigate("/archives/" + data._id);
    } catch (err) {
      setError(err);
    }
  };

  // destructuration of formData
  const { title, description, categories, price } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleSubmitarchiveForm}
        className="create-all-object-details-page"
      >
        {/* Pass a picture URL of the new archive thanks to Cloudinary */}
        <div className="create-archive-presentation">
          <div className="create-archive-picture">
            <input
              type="file"
              id="create-archive-picture"
              name="img"
              onChange={handleChangeData}
            />
          </div>
          {/* New archive name */}
          <div className="create-archive-details">
            <input
              className="create-archive-details-title"
              type="text"
              value={title}
              name="title"
              id="title"
              onChange={handleChangeData}
              placeholder="Your archive name"
            />
            {/* New archive description */}
            <textarea
              className="create-archive-details-description"
              type="text"
              value={description}
              name="description"
              id="description"
              onChange={handleChangeData}
              placeholder="Your description here"
            ></textarea>
            {/* New archive category */}
            <h4>
              <label htmlFor="description">Categories: </label>
              <input
                type="text"
                value={categories}
                name="categories"
                id="categories"
                onChange={handleChangeData}
                placeholder="add category"
              />
            </h4>
          </div>
        </div>
        {/* New archive price */}
        <div className="create-archive-price-and-button">
          <h3>
            <label htmlFor="description">Price: </label>
            <input
              type="number"
              value={price}
              name="price"
              id="price"
              onChange={handleChangeData}
              placeholder="price"
            />
            €
          </h3>
          {/* Display the errors send by the back */}
          {error && <p>{error}</p>}

          <button className="create-add-to-profile-button-archive-page">
            ADD TO YOUR PROFILE
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFormarchive;
