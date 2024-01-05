//cart.jsx
/*Default home page that will get worked on later.
just made it so i can have changes when i clicked around.JP*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Checkout() {
  const [order, setOrder] = useState([]);
  const taxRate = 0.08; 
  console.log("order", order)

  useEffect(() => {
    async function getOrder() {
        try {
            const {data: order} = await axios.get("/api/order");
            setOrder(order)
   const subtotal = order.reduce((total, order) => total + order.price * order.quantity, 0);
   const tax = subtotal * taxRate;
   const total = subtotal + tax;

        } catch (error) {
            console.error(error)
        }
    }

   getOrder()

   }, [])
   

  return (
    <div>
      <h1>Checkout</h1>
      {order.map((order, index) => (
        <div key={order}>
          <h2>{order.name}</h2>
          <p>Price: ${order.price.toFixed(2)}</p>
          <p>Quantity: {order.quantity}</p>
        </div>
      ))}
      <div>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
        <button >Complete Order</button>
      </div>
    </div>
  );
}

export default Checkout;
