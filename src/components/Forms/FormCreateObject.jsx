import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import useFormCreate from "../../hooks/useFormCreate";

import "./FormCreateObject.css";

const CreateFormCreation = () => {
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

  // on submission of the form handleSubmitCreationForm pass the informations of the inputs to formData
  const handleSubmitCreationForm = async (e) => {
    e.preventDefault();
    const formDataCreation = new FormData();
    formDataCreation.append("title", formData.title);
    formDataCreation.append("description", formData.description);
    formDataCreation.append("img", formData.img);
    formDataCreation.append("categories", formData.categories.toLowerCase());
    formDataCreation.append("price", formData.price);

    // createCreation is a post that creates a new creation
    try {
      const data = await apiHandler.createCreation(formDataCreation);
      resetForm();
      navigate("/creations/" + data._id);
    } catch (err) {
      setError(err);
    }
  };

  // destructuration of formData
  const { title, description, categories, price } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleSubmitCreationForm}
        className="create-all-object-details-page"
      >
        {/* Pass a picture URL of the new creation thanks to Cloudinary */}
        <div className="create-creation-presentation">
          <div className="create-creation-picture">
            <input
              type="file"
              id="create-creation-picture"
              name="img"
              onChange={handleChangeData}
            />
          </div>
          {/* New creation name */}
          <div className="create-creation-details">
            <input
              className="create-creation-details-title"
              type="text"
              value={title}
              name="title"
              id="title"
              onChange={handleChangeData}
              placeholder="Your creation name"
            />
            {/* New creation description */}
            <textarea
              className="create-creation-details-description"
              type="text"
              value={description}
              name="description"
              id="description"
              onChange={handleChangeData}
              placeholder="Your description here"
            ></textarea>
            {/* New creation category */}
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
        {/* New creation price */}
        <div className="create-creation-price-and-button">
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

          <button className="create-add-to-profile-button-creation-page">
            ADD TO YOUR PROFILE
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFormCreation;
