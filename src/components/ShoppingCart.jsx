//cart.jsx
/*Default home page that will get worked on later.
just made it so i can have changes when i clicked around.JP*/
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function Checkout() {
  const [order, setOrder] = useState([]);
  const taxRate = 0.08;
  console.log("order", order);
  const navigate = useNavigate();

  useEffect(() => {
    async function getOrder() {
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
    }
    console.log(order);
    getOrder();
  }, []);


  const calculateSubtotal = () => {
    if (order.Cart) {
      let subtotal = 0;
      for (const item of order.Cart) {
        subtotal += item.price * item.quantity;
      }
      return subtotal;
    } else {
      return 0;
    }
  };
  const calculateTax = () => {
    return calculateSubtotal() * taxRate;
  };
  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const completeOrder = async () => {
    try {

      const token = window.localStorage.getItem("TOKEN");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete("/api/cart/clearCart", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate("/completedOrder");
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
  };

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
  return (
    <div className="container">
      <header>
        <h1>Your Shopping Cart</h1>
        <div className="shopping">
        </div>
      </header>

      <div className="list">
        {order.Cart && order.Cart.length > 0 ? (
          order.Cart.map((item, index) => (
            <div className="item" key={item.id}>
              <div className="item-info">
                <h2>{item.name}</h2>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="item-buttons">
                  <button onClick={() => handleIncrement(item.watch_id)}>+</button>
                  <button onClick={() => handleDecrement(item.watch_id, item.quantity)}>-</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Cart is empty</p>
        )}
      </div>

      <div className="card">
        {/* <h1>Card</h1> */}
        <ul className="listCard">
          {order.Cart && order.Cart.map((item) => (
            <li key={item.id}>
              <div className="cart-item">
                <p>{item.name}</p>
                <p>Price: ${item.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="checkOut">
          <p>Subtotal: ${calculateSubtotal().toFixed(2)}</p>
          <p>Tax: ${calculateTax().toFixed(2)}</p>
          <div className="total">Total: ${calculateTotal().toFixed(2)}</div>
          <div className="closeShopping" onClick={completeOrder}>Complete Order</div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;