import React from "react";
import OrderItemInfo from "./orderItemInfo";

const OrderListInfo = ({ order }) => {
  return (
    <div className="d-flex justify-content-start flex-wrap">
      {order.map((order) => (
        <OrderItemInfo itemId={order.itemId} amount={order.amount} />
      ))}
    </div>
  );
};

export default OrderListInfo;
