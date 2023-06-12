import React from "react";
import { Link } from "react-router-dom";
import "./OrderValidation.css";

const OrderValidation = () => {
  return (
    <div id="thanks-order" className="middle-div-min">
      <h3>THANK YOU FOR YOUR ORDER!</h3>
      <p>
        To see your order history <Link to="/profile/orders">click here</Link>
      </p>
    </div>
  );
};

export default OrderValidation;
