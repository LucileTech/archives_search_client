import React, { useState, useEffect } from "react";
import apiHandler from "../../api/apiHandler";
import "./ProfileOrders.css";

const ProfileOrders = () => {
  const [orders, setOrders] = useState([]);
  const [archives, setarchives] = useState([]);

  // Find orders of the current user and details of the archives
  useEffect(() => {
    apiHandler.getAllOrders().then((res) => {
      setOrders(res);
    });
    apiHandler.getAllarchives().then((res) => {
      setarchives(res);
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
            {order.archives.map((element) => {
              return (
                <div key={element._id}>
                  {/* Ternary on the name of archive bought if archive deleted by contributor */}
                  {!archives.find(
                    (archive) => archive._id === element.productId
                  ) ? (
                    <h5>archive deleted</h5>
                  ) : (
                    <p className="bold">
                      {
                        archives.find(
                          (archive) => archive._id === element.productId
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
              {/* Ternary on order total price if archive deleted by contributor */}
              Total price:{" "}
              <span className="bold">
                {order.archives.reduce(
                  (total, element) =>
                    total +
                    (!archives.find(
                      (archive) => archive._id === element.productId
                    )
                      ? 0
                      : archives.find(
                          (archive) => archive._id === element.productId
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
