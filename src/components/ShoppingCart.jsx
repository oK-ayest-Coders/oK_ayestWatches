//cart.jsx
/*Default home page that will get worked on later.
just made it so i can have changes when i clicked around.JP*/

import React, { useState, useEffect } from "react";
import axios from "axios";

function Checkout() {
  const [order, setOrder] = useState([]);
  const taxRate = 0.08;
  console.log("order", order);

  useEffect(() => {
    async function getOrder() {
      try {
        const { data: order } = await axios.get("/api/order", {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        });
        setOrder(order);
        //  const subtotal = order.reduce((total, order) => total + order.price * order.quantity, 0);
        //  const tax = subtotal * taxRate;
        //  const total = subtotal + tax;
      } catch (error) {
        console.error(error);
      }
    }

    getOrder();
  }, []);

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

  async function handleDecrement(watchId, quantity) {
    if (quantity <= 1) {
      return;
    }
    const updated = await axios.put("/api/cart/update/dec");
  }

  return (
    <div>
      <h1>Checkout</h1>
      {order.Cart &&
        order.Cart.map((item, index) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Quantity: {item.quantity}</p>
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
        ))}
      {/* <div>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
        <button >Complete Order</button>
      </div>  */}
    </div>
  );
}

export default Checkout;
