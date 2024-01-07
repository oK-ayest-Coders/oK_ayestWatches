//cart.jsx
/*Default home page that will get worked on later.
just made it so i can have changes when i clicked around.JP*/
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [order, setOrder] = useState([]);
  const taxRate = 0.08;
  console.log("order", order);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const token = window.localStorage.getItem("TOKEN");
        if (!token) {
          console.error("No token found");
          return;
        }
        const { data: order } = await axios.get("/api/order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(order);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(order);
    getOrder();
  }, []);

  const completeOrder = async () => {
    try {
      const token = window.localStorage.getItem("TOKEN");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.delete("/api/cart/clear-cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state or perform any other actions needed after clearing the cart
      console.log("Cart cleared:", response.data);
      navigate("/completedcart");
    } catch (error) {
      console.error("Error in completing the order:", error);
    }
  };

  async function handleIncrement(watchId) {
    try {
      const updated = await axios.put(
        "/api/cart/update/inc",
        {
          watchId: watchId,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        }
      );
      const { data: order } = await axios.get("/api/order", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
        },
      });
      setOrder(order);
      console.log("updated", updated);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDecrement = async (watchId, quantity) => {
    if (quantity <= 1) {
      return;
    }
    try {
      const updated = await axios.put(
        "/api/cart/update/dec",
        {
          watchId: watchId,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        }
      );
      const { data: order } = await axios.get("/api/order", {
        headers: {
          Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
        },
      });
      setOrder(order);
      console.log("updated", updated);
    } catch (error) {
      console.error(error);
    }
  };
  return;
  <>
    <h1>Checkout</h1>
    <div className="checkout-content">
      <div className="checkout-content1">
        {order.Cart && order.Cart.length > 0 ? (
          order.Cart.map((item, index) => (
            <div className="itemsDisplay" key={item.id}>
              <div className="item-info">
                <h2>{item.name}</h2>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="item-buttons">
                <button
                  onClick={() => handleIncrement(item.watch_id)}
                  style={{ background: "blue", padding: "5px 10px" }}
                >
                  +
                </button>
                <button
                  onClick={() => handleDecrement(item.watch_id, item.quantity)}
                  style={{ background: "red", padding: "5px 10px" }}
                >
                  -
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Cart is empty</p>
        )}
      </div>
      <div className="checkout-content2">
        <div className="priceDisplay">
          {calculateSubtotal() > 0 && (
            <>
              <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
              <p>Tax: ${calculateTax().toFixed(2)}</p>
              <p>Total: ${calculateTotal().toFixed(2)}</p>
              <button onClick={completeOrder}>Complete Order</button>
            </>
          )}
        </div>
      </div>
    </div>
  </>;
};
export default Checkout;
