import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "counter",
  initialState: {
    pizzaOrders: []
  },
  reducers: {
    addPizzaOrder: (state, action) => {
      state.pizzaOrders.push(action.payload);
      localStorage.setItem("orders", JSON.stringify(state.pizzaOrders));
    },
    getOrders: (state) => {
      const orders = localStorage.getItem("orders");
      if (orders) {
        state.pizzaOrders = JSON.parse(orders);
      }
    },
    updatePizzaOrder: (state, action) => {
      localStorage.clear("orders");
      localStorage.setItem("orders", JSON.stringify(action?.payload));
      state.pizzaOrders =action?.payload;
    },
    cancelOrder:(state,action)=>{
      const orders = JSON.parse(localStorage.getItem("orders"));
      const index=orders?.findIndex((data)=>{return data?.id==action?.payload})
      orders?.splice(index,1)
      localStorage.clear("orders");
      localStorage.setItem("orders", JSON.stringify(orders));
      state.pizzaOrders = orders;
    }
  },
});

export const { getOrders, addPizzaOrder, completeOrder, updatePizzaOrder,cancelOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
