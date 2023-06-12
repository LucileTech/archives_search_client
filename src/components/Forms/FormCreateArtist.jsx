import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import useFormCreate from "../../hooks/useFormCreate";
import "./FormCreateArtist.css";

const CreateFormArtist = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // UseFormCreate hook defined in "hooks"
  const [formData, handleChangeData, setStateData, resetForm] = useFormCreate({
    name: "",
    description: "",
    picture: {},
  });

  // on submission of the form handleSubmitArtistForm pass the informations of the inputs to formData
  const handleSubmitArtistForm = async (event) => {
    event.preventDefault();
    const formDataArtist = new FormData();
    formDataArtist.append("name", formData.name);
    formDataArtist.append("description", formData.description);
    formDataArtist.append("picture", formData.picture);

    // createArtist is a post that creates a new artist
    try {
      const data = await apiHandler.createArtist(formDataArtist);
      resetForm();
      navigate("/artist/" + data._id);
    } catch (err) {
      setError(err);
    }
  };

  // destructuration of formData
  const { name, description } = formData;

  return (
    <div className="middle-div-min">
      <form
        onSubmit={handleSubmitArtistForm}
        className="create-artist-presentation"
      >
        {/* Pass a picture URL of the new artist thanks to Cloudinary */}
        <div className="create-artist-picture">
          <input
            type="file"
            id="create-picture"
            name="picture"
            onChange={handleChangeData}
          />
        </div>
        {/* New artist name */}
        <div className="create-artist-details">
          <input
            className="create-artist-details-name"
            type="text"
            value={name}
            name="name"
            id="create-name"
            onChange={handleChangeData}
            placeholder="Your brand/creator name"
          />
          {/* New artist description */}
          <textarea
            className="create-artist-details-description"
            type="text"
            value={description}
            name="description"
            id="create-description"
            onChange={handleChangeData}
            placeholder="Description of you and your activity"
          ></textarea>
          <div className="div-for-submit-button-create-artist">
            {/* Display the errors send by the back */}
            {error && <p>{error}</p>}
            <button className="submit-button-create-artist">Submit</button>
          </div>
        </div>
      </form>

      <div className="create-object-of-artist-details">
        <h3 className="create-one-artist-creations">CREATIONS</h3>
        <div className="create-all-creations-artist-page">
          <div>
            <div className="creations-images-view-more">
              {/* Img link that redirects to the page where we can create an object */}
              <Link to="/profile/artists/createobject">
                <img
                  className="create-creations-images-one-artist"
                  src="https://res.cloudinary.com/dzkbycvev/image/upload/v1670232991/first-fullstack-app/nldxlijwg2i2rf7lxygz.png"
                  alt="add-creation"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFormArtist;
