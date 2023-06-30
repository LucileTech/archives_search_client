import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiHandler from "./../../api/apiHandler";
import "./Onearchive.css";

const Onearchive = () => {
  const [archive, setarchive] = useState([]);

  // Get archive by id
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  // Get one archive by its id
  useEffect(() => {
    const getarchive = async () => {
      const res = await apiHandler.getOnearchive(id);
      setarchive(res);
    };
    getarchive();
  }, []);

  // Add archive to cart and navigate to cart
  const handleAddToCart = async (event) => {
    event.preventDefault();
    try {
      await apiHandler.postAddToCart(id);
    } catch (error) {
      console.error(error);
    }
    navigate("/cart");
  };

  // Loading section if no archive
  if (!archive) {
    return <div className="middle-div-min">Loading...</div>;
  }

  // Display of all archive details
  return (
    <div className="middle-div-min">
      <div className="all-object-details-page">
        <div className="archive-presentation">
          <img
            className="archive-picture"
            src={archive.img}
            alt={archive.title}
          />
          <div className="archive-details">
            <h2 className="archive-details-title">{archive.title}</h2>
            <p className="archive-details-description">{archive.description}</p>
            <h4>Categories: {archive.categories}</h4>
          </div>
        </div>
        <div className="archive-price-and-button">
          <h3 className="archive-price">Price: {archive.price} €</h3>
          <button
            onClick={handleAddToCart}
            className="add-to-cart-button-archive-page"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onearchive;
