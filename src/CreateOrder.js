import React, { useState } from "react";
import moment from "moment";
import SelectBox from "./commponents/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import { addPizzaOrder } from "./redux/slice/orderSlice";
import './style/createOrder.css'

const typeOptions = ["veg", "non-veg"];
const sizeOptions = ["small", "medium", "large"];
const baseOptions = ["thick", "thin"];

const CreateOrder = () => {
  const dispatch = useDispatch();
  const currentOrders = useSelector((state) => state?.orders?.pizzaOrders);
  const [typeValue, setTypeValue] = useState("veg");
  const [sizeValue, setSizeValue] = useState("small");
  const [baseValue, setBaseValue] = useState("thick");

  const AddOrder = (e) => {
    e.preventDefault();
    const orderData = {
      id: currentOrders.length + 1,
      type: typeValue,
      size: sizeValue,
      base: baseValue,
      orderTime: `${new Date().getMinutes()}:${new Date().getSeconds()}`,
      timePlaced: "",
      timeMaking: "",
      timeReady: "",
      place: true,
      making: false,
      ready: false,
      isCompleted: false,
    };
    if (currentOrders.length < 10) {
      dispatch(addPizzaOrder(orderData));
    } else {
      alert("Not taking any order for now");
    }
  };

  return (
    <div className="create-order-container">
      <h1>Create Your Pizza Order</h1>
      <form className="order-form">
        <SelectBox
          options={typeOptions}
          selectedValue={typeValue}
          onChange={(e) => setTypeValue(e.target.value)}
          label="Select Pizza Type"
        />
        <SelectBox
          options={sizeOptions}
          selectedValue={sizeValue}
          onChange={(e) => setSizeValue(e.target.value)}
          label="Select Pizza Size"
        />
        <SelectBox
          options={baseOptions}
          selectedValue={baseValue}
          onChange={(e) => setBaseValue(e.target.value)}
          label="Select Pizza Base"
        />
        <button className="formbutton" onClick={AddOrder}>Create Order</button>
      </form>
    </div>
  );
};

export default CreateOrder;
