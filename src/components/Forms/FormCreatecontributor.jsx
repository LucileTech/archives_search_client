import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import useFormCreate from "../../hooks/useFormCreate";
import "./FormCreatecontributor.css";

const CreateFormcontributor = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // UseFormCreate hook defined in "hooks"
  const [formData, handleChangeData, setStateData, resetForm] = useFormCreate({
    name: "",
    description: "",
    picture: {},
  });

  // on submission of the form handleSubmitcontributorForm pass the informations of the inputs to formData
  const handleSubmitcontributorForm = async (event) => {
    event.preventDefault();
    const formDatacontributor = new FormData();
    formDatacontributor.append("name", formData.name);
    formDatacontributor.append("description", formData.description);
    formDatacontributor.append("picture", formData.picture);

    // createcontributor is a post that creates a new contributor
    try {
      const data = await apiHandler.createcontributor(formDatacontributor);
      resetForm();
      navigate("/contributor/" + data._id);
    } catch (err) {
      setError(err);
    }
  };

  // destructuration of formData
  const { name, description } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleSubmitcontributorForm}
        className="create-contributor-presentation"
      >
        {/* Pass a picture URL of the new contributor thanks to Cloudinary */}
        <div className="create-contributor-picture">
          <input
            type="file"
            id="create-picture"
            name="picture"
            onChange={handleChangeData}
          />
        </div>
        {/* New contributor name */}
        <div className="create-contributor-details">
          <input
            className="create-contributor-details-name"
            type="text"
            value={name}
            name="name"
            id="create-name"
            onChange={handleChangeData}
            placeholder="Your brand/creator name"
          />
          {/* New contributor description */}
          <textarea
            className="create-contributor-details-description"
            type="text"
            value={description}
            name="description"
            id="create-description"
            onChange={handleChangeData}
            placeholder="Description of you and your activity"
          ></textarea>
          <div className="div-for-submit-button-create-contributor">
            {/* Display the errors send by the back */}
            {error && <p>{error}</p>}
            <button className="submit-button-create-contributor">Submit</button>
          </div>
        </div>
      </form>

      <div className="create-object-of-contributor-details">
        <h3 className="create-one-contributor-archives">archiveS</h3>
        <div className="create-all-archives-contributor-page">
          <div>
            <div className="archives-images-view-more">
              {/* Img link that redirects to the page where we can create an object */}
              <Link to="/profile/contributors/createobject">
                <img
                  className="create-archives-images-one-contributor"
                  src="https://res.cloudinary.com/dzkbycvev/image/upload/v1670232991/first-fullstack-app/nldxlijwg2i2rf7lxygz.png"
                  alt="add-archive"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFormcontributor;
