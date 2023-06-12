import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import "./ProfileOrders.css";

const ProfileOrders = () => {
  const [orders, setOrders] = useState([]);
  const [creations, setCreations] = useState([]);

  // Find orders of the current user and details of the creations
  useEffect(() => {
    apiHandler.getAllOrders().then((res) => {
      setOrders(res);
    });
    apiHandler.getAllCreations().then((res) => {
      setCreations(res);
    });
  }, []);

  return (
    <div className="all-orders">
      {!orders.length ? (
        <h5 className="your-orders-on-profile">
          Your do not have orders yet !
        </h5>
      ) : (
        <h3 className="your-orders-on-profile">Your orders :</h3>
      )}
      {orders.map((order) => {
        return (
          <div key={order._id} className="one-order">
            <p>
              Date : <span className="bold">{order.date.slice(0, 10)}</span>
            </p>
            {order.creations.map((element) => {
              return (
                <div key={element._id}>
                  {/* Ternary on the name of creation bought if creation deleted by artist */}
                  {!creations.find(
                    (creation) => creation._id === element.productId
                  ) ? (
                    <h5>Creation deleted</h5>
                  ) : (
                    <p className="bold">
                      {
                        creations.find(
                          (creation) => creation._id === element.productId
                        ).title
                      }
                    </p>
                  )}

                  <p>
                    {" "}
                    Quantity: <span className="bold">{element.quantity}</span>
                  </p>
                </div>
              );
            })}

            <p>
              {/* Ternary on order total price if creation deleted by artist */}
              Total price:{" "}
              <span className="bold">
                {order.creations.reduce(
                  (total, element) =>
                    total +
                    (!creations.find(
                      (creation) => creation._id === element.productId
                    )
                      ? 0
                      : creations.find(
                          (creation) => creation._id === element.productId
                        ).price) *
                      element.quantity,
                  0
                )}
              </span>
              €
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileOrders;
