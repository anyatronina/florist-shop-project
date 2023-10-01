import React from "react";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

const FlowerCard = ({ name, price, img, id }) => {
  const { openModal } = useModal();

  return (
    <div className="product-item">
      <Link className="header-link" to={`/catalog/${id}`}>
        <img
          className="product-image"
          src={require(`../../img/flowers2/${img}.jpg`)}
          alt={name}
        />
      </Link>
      <div className="product-wrapper">
        <Link className="header-link" to={`/catalog/${id}`}>
          <p className="product-name">{name}</p>
        </Link>
        <div className="price-info">
          <div className="price">{price} ₽</div>
          <div>
            <button
              className="btn btn-outline-secondary"
              onClick={() => openModal(id)}
            >
              Купить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowerCard;
