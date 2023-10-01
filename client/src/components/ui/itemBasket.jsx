import React from "react";
import { useSelector } from "react-redux";
import { getItemById } from "../../store/items";

const ItemBasket = ({ idBasket, _id, amount, onDelete }) => {
  const item = useSelector(getItemById(_id));

  if (item) {
    const { img, name, price } = item;

    return (
      <div className="container-fix d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            className="cart-page-img me-4"
            src={require(`../../img/flowers2/${img}.jpg`)}
            alt={name}
          />
          <p className="cart-page-p">{name}</p>
        </div>
        <div className="d-flex align-items-center">
          <p className="my-2 me-5 cart-page-price">{amount} шт.</p>

          <p className="my-2 me-5 cart-page-price">{price} ₽</p>
          <button
            className="btn btn-outline-secondary"
            onClick={() => onDelete(idBasket)}
          >
            Удалить
          </button>
        </div>
      </div>
    );
  }
};

export default ItemBasket;
