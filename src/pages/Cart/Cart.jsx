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
  // Increment quantity of archive(s) in the cart
  const handleIncrementarchive = async (id) => {
    try {
      const orderIncremented = await apiHandler.patchIncrementarchiveToOrder(
        id
      );
      fetchCart();
    } catch (error) {
      console.error(error);
    }
    // });
  };

  // Decrement quantity of archive(s) in the cart

  const handleDecrementarchive = async (id) => {
    try {
      const orderDecremented = await apiHandler.patchDecrementarchiveToOrder(
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
  if (!orderCart?.archives?.length) {
    return (
      <div className="middle-div-min">You don't have any cart... yet !</div>
    );
  }

  const archiveOfOrder = orderCart.archives;

  //Handle event for the delete button of one archive
  const handleDeletearchive = async (id) => {
    console.log(id);
    try {
      const updatedOrder = await apiHandler.deletearchiveCart(id);
      console.log("=========", { updatedOrder });
      setOrderCart(updatedOrder);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="middle-div-min">
      <div>
        <div className="archive-details-total-price-section">
          <ul className="all-archive-order">
            {/* Mapping through archives ordered populated by archives */}
            {archiveOfOrder.map((element) => {
              const product = element.productId;
              return (
                <div key={product._id}>
                  <li className="each-archive-order">
                    <img className="archive-image-order" src={product.img} />
                    <div className="info-archive-order">
                      <h4>
                        <div className="title-trashbin-order-section">
                          {product.title}

                          <button className="trash-bin-archive-cart-button">
                            <img
                              onClick={() => handleDeletearchive(product._id)}
                              id={product._id}
                              className="trash-bin-archive-cart"
                              src="images/logos/trash-bin.png"
                              alt="trashbin-image"
                            ></img>
                          </button>
                        </div>
                      </h4>

                      <div className="quantity-archive-order">
                        <p>Quantity:</p>
                        <button
                          className="decrement-button"
                          id={product._id}
                          onClick={() => handleDecrementarchive(product._id)}
                        >
                          {" "}
                          -{" "}
                        </button>
                        <h4>{element.quantity}</h4>
                        <button
                          className="increment-button"
                          id={product._id}
                          onClick={() => handleIncrementarchive(product._id)}
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
                  {archiveOfOrder.reduce(
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
