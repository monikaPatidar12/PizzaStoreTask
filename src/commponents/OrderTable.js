import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector,useDispatch } from "react-redux";
import OrderCard from "./OrderCard";
import { cancelOrder, getOrders, updatePizzaOrder } from "../redux/slice/orderSlice";
import SummaryTable from "./SummaryTable";
import '../style/orderTable.css'

const OrderTable = () => {
  const dispatch = useDispatch();
  const [placedOrder,setPlacedOrder]=useState([])
  const [makingOrder,setMakingOrder]=useState([])
  const [readyOrder,setReadyOrder]=useState([])
  const [placedPickedup,setPlacedPickedup]=useState([])

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const currentOrder = useSelector((state) => {
    return state?.orders?.pizzaOrders;
  });

  useEffect(()=>{
      const orderPlace = currentOrder?.filter((data) => {
        return data?.place;
      });
      setPlacedOrder(orderPlace)
      const orderMaking = currentOrder?.filter((data) => {
        return data?.making;
      });
      setMakingOrder(orderMaking)
      const orderReady = currentOrder?.filter((data) => {
        return data?.ready;
      });
      setReadyOrder(orderReady)
      const orderComplete = currentOrder?.filter((data) => {
        return data?.isCompleted;
      });
      setPlacedPickedup(orderComplete)
  },[currentOrder])

  const updateMaking = (id) => {
    const copyData = [...currentOrder];
    const newArray = copyData.map(ele=> {
      if(id===ele?.id){
        if(ele?.place){
          return Object.assign({},ele,{making:true,place:false,timeMaking:`${new Date().getMinutes()}:${new Date().getSeconds()}`});
        }
        if(ele?.making){
          return Object.assign({},ele,{place:false,making:false,ready:true,timeReady:`${new Date().getMinutes()}:${new Date().getSeconds()}`});
        }
        if(ele?.ready){
          return Object.assign({},ele,{place:false,making:false,ready:false,isCompleted:true});
        }
      }
      return ele
    });
    dispatch(updatePizzaOrder(newArray))
    dispatch(getOrders());
  };

  return (
    <>
    <table className="table-container">
      <tr>
        <th>Order Place</th>
        <th>Order in Making</th>
        <th>Order Ready</th>
        <th>Order Picked</th>
      </tr>
      <tr>
        <td>
          {placedOrder?.map((data, i) => {
            return (
              <OrderCard
                orderId={data?.id}
                orderTime={data?.orderTime}
                buttonText="Next"
                onButtonClick={() => updateMaking(data.id)}
              />
            );
          })}
        </td>
        <td>
          {makingOrder?.map((data, i) => {
            return (
              <OrderCard
                orderId={data?.id}
                orderTime={data?.timeMaking}
                buttonText="Next"
                onButtonClick={() =>updateMaking(data?.id)}
              />
            );
          })}
        </td>
        <td>
          {readyOrder?.map((data, i) => {
            return (
              <OrderCard
                orderId={data?.id}
                orderTime={data?.timeReady}
                buttonText="Next"
                onButtonClick={() =>updateMaking(data?.id)}
              />
            );
          })}
        </td>
        <td>
          {placedPickedup?.map((data, i) => {
            return (
              <OrderCard
                orderId={data?.id}
                child={'Order Picked'}
              />
            );
          })}
        </td>
      </tr>
    </table>
    <SummaryTable tableData={currentOrder} cancelNow={(id)=>{dispatch(cancelOrder(id)),dispatch(getOrders());}}/>
    </>
  );
};

export default OrderTable;
