import React from "react";
import '../style/orderCard.css'
const OrderCard = ({ orderId, orderTime, onButtonClick, buttonText,child }) => {

  return (
    <div className="order-card">
      <h3>Order {orderId}</h3>
      {orderTime &&
        <>
        <p>{orderTime}</p>
        <button onClick={onButtonClick}>{buttonText}</button>
        </>
      }
      <p>{child}</p>
    </div>
  );
};

export default OrderCard;
