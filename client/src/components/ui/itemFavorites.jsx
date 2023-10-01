import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getItemById } from "../../store/items";

const ItemFavorites = ({ itemId, onDelete }) => {
  const item = useSelector(getItemById(itemId));

  if (item) {
    return (
      <div className="product-item">
        <Link className="header-link" to={`/catalog/${itemId}`}>
          <img
            className="product-image"
            src={require(`../../img/flowers2/${item.img}.jpg`)}
            alt={item.name}
          />
        </Link>
        <div className="product-wrapper">
          <Link className="header-link" to={`/catalog/${itemId}`}>
            <p className="product-name">{item.name}</p>
          </Link>
          <div className="price-info">
            <div className="price">{item.price} ₽</div>
            <div>
              <button
                className="btn btn-outline-secondary"
                onClick={() => onDelete(itemId)}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ItemFavorites;
