import React, { useEffect, useState } from "react";
import apiHandler from "../../api/apiHandler";
import { Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [orderCart, setOrderCart] = useState(null);

  // get updated Cart from the back
  const fetchCart = () => {
    apiHandler.getOrderCart().then((res) => {
      setOrderCart(res);
    });
  };
  //Use effect that calls the function fetchCart that get updated Cart
  useEffect(() => {
    fetchCart();
  }, []);

  console.log("order cart", orderCart);
  // Increment quantity of creation(s) in the cart
  const handleIncrementCreation = async (id) => {
    try {
      const orderIncremented = await apiHandler.patchIncrementCreationToOrder(
        id
      );
      fetchCart();
    } catch (error) {
      console.error(error);
    }
    // });
  };

  // Decrement quantity of creation(s) in the cart

  const handleDecrementCreation = async (id) => {
    try {
      const orderDecremented = await apiHandler.patchDecrementCreationToOrder(
        id
      );
      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete all the cart
  const handleDeleteCart = async (event) => {
    event.preventDefault();
    try {
      const orderDeleted = await apiHandler.deleteCart();
      setOrderCart(orderDeleted);
    } catch (error) {
      console.error(error);
    }
  };

  // Buy what you put on the cart (the cart become an order)
  const handleBuyCart = async (event) => {
    event.preventDefault();
    try {
      const orderCartBuy = await apiHandler.buyCart();
    } catch (error) {
      console.error(error);
    }
  };

  // if the cart is empty
  if (!orderCart?.creations?.length) {
    return (
      <div className="middle-div-min">You don't have any cart... yet !</div>
    );
  }

  const creationOfOrder = orderCart.creations;

  //Handle event for the delete button of one creation
  const handleDeleteCreation = async (id) => {
    console.log(id);
    try {
      const updatedOrder = await apiHandler.deleteCreationCart(id);
      console.log("=========", { updatedOrder });
      setOrderCart(updatedOrder);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="middle-div-min">
      <div>
        <div className="creation-details-total-price-section">
          <ul className="all-creation-order">
            {/* Mapping through creations ordered populated by creations */}
            {creationOfOrder.map((element) => {
              const product = element.productId;
              return (
                <div key={product._id}>
                  <li className="each-creation-order">
                    <img className="creation-image-order" src={product.img} />
                    <div className="info-creation-order">
                      <h4>
                        <div className="title-trashbin-order-section">
                          {product.title}

                          <button className="trash-bin-creation-cart-button">
                            <img
                              onClick={() => handleDeleteCreation(product._id)}
                              id={product._id}
                              className="trash-bin-creation-cart"
                              src="images/logos/trash-bin.png"
                              alt="trashbin-image"
                            ></img>
                          </button>
                        </div>
                      </h4>

                      <div className="quantity-creation-order">
                        <p>Quantity:</p>
                        <button
                          className="decrement-button"
                          id={product._id}
                          onClick={() => handleDecrementCreation(product._id)}
                        >
                          {" "}
                          -{" "}
                        </button>
                        <h4>{element.quantity}</h4>
                        <button
                          className="increment-button"
                          id={product._id}
                          onClick={() => handleIncrementCreation(product._id)}
                        >
                          {" "}
                          +{" "}
                        </button>
                      </div>
                      <h3>{product.price * element.quantity}€</h3>
                    </div>
                  </li>
                  <hr />
                </div>
              );
            })}
          </ul>

          <div className="order-summary-and-delete">
            <div>
              <button className="delete-all-cart" onClick={handleDeleteCart}>
                {" "}
                DELETE THE CART{" "}
              </button>
            </div>
            <div className="order-summary">
              <h3>ORDER SUMMARY</h3>
              <div className="total-price-order">
                <div>
                  <h4>TOTAL</h4>
                </div>
                <div>
                  {/* To get the total price of the order */}
                  {creationOfOrder.reduce(
                    (total, element) =>
                      total + element.productId.price * element.quantity,
                    0
                  )}
                  €
                </div>
              </div>
              <button className="button-to-buy" onClick={handleBuyCart}>
                {" "}
                <Link className="link-to-buy" to="/order/validation">
                  BUY
                </Link>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
