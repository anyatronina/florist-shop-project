import React from "react";
import { useSelector } from "react-redux";
import { getItemById } from "../../../store/items";

const OrderItemInfo = ({ itemId, amount }) => {
  const item = useSelector(getItemById(itemId));
  return (
    <div className="product-item">
      <img
        className="product-image"
        src={require(`../../../img/flowers2/${item.img}.jpg`)}
        alt={item.name}
      />

      <div className="product-wrapper">
        <p className="product-name">{item.name}</p>

        <div className="price-info">
          <div className="price">{item.price} ₽</div>
          <div>{amount} шт.</div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemInfo;
