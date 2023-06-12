import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiHandler from "./../../api/apiHandler";
import "./OneCreation.css";

const OneCreation = () => {
  const [creation, setCreation] = useState([]);

  // Get creation by id
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  // Get one creation by its id
  useEffect(() => {
    const getCreation = async () => {
      const res = await apiHandler.getOneCreation(id);
      setCreation(res);
    };
    getCreation();
  }, []);

  // Add creation to cart and navigate to cart
  const handleAddToCart = async (event) => {
    event.preventDefault();
    try {
      await apiHandler.postAddToCart(id);
    } catch (error) {
      console.error(error);
    }
    navigate("/cart");
  };

  // Loading section if no creation
  if (!creation) {
    return <div className="middle-div-min">Loading...</div>;
  }

  // Display of all creation details
  return (
    <div className="middle-div-min">
      <div className="all-object-details-page">
        <div className="creation-presentation">
          <img
            className="creation-picture"
            src={creation.img}
            alt={creation.title}
          />
          <div className="creation-details">
            <h2 className="creation-details-title">{creation.title}</h2>
            <p className="creation-details-description">
              {creation.description}
            </p>
            <h4>Categories: {creation.categories}</h4>
          </div>
        </div>
        <div className="creation-price-and-button">
          <h3 className="creation-price">Price: {creation.price} €</h3>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-button-creation-page"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default OneCreation;
