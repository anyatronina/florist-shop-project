import React from "react";
import Counter from "../common/counter";
import { useModal } from "../../hooks/useModal";
import { useBasket } from "../../hooks/useBasket";
import Loader from "../common/loader";
import Comments from "../ui/comments";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/users";
import { useHistory } from "react-router-dom";
import { getItemById } from "../../store/items";
import {
  addItemFavorites,
  deleteItem,
  getFavoritesById
} from "../../store/favorites";
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { addItem } from "../../store/basket";

const FlowerPage = ({ itemId }) => {
  const item = useSelector(getItemById(itemId));
  const { closeModal, statusModal } = useModal();
  const { sumBasket, updateSum } = useBasket();
  const loggedIn = useSelector(getIsLoggedIn());
  const dispatch = useDispatch();
  const history = useHistory();
  let amount = 1;
  const isModalAndNotLogged = !statusModal && loggedIn;
  const isFavorites = useSelector(getFavoritesById(itemId));

  if (item) {
    const { name, price, img } = item;

    const handleSubmit = () => {
      closeModal();
      if (!loggedIn) {
        return history.push(`/login`);
      }
      amount = sumBasket;
      const idBasket = nanoid(4);
      dispatch(addItem({ amount, itemId, idBasket, price }));
      updateSum(0);
    };

    const handleFavorites = () => {
      closeModal();
      if (!loggedIn) {
        return history.push(`/login`);
      }
      dispatch(addItemFavorites({ itemId }));
    };

    const handleDelete = (itemId) => {
      dispatch(deleteItem(itemId));
    };

    return (
      <>
        <div className="d-flex mt-1 media-column">
          <div
            className={
              "container container-fix shadow-sm" +
              (isModalAndNotLogged ? " w-65 h-100 me-0" : "")
            }
          >
            <div className="row">
              <div className="col">
                <img
                  src={require(`../../img/flowers2/${img}.jpg`)}
                  alt={name}
                  className="flower-page-img"
                />
              </div>

              <div className="col">
                <h1 className="mb-4">{name}</h1>
                <h3 className="flower-page-price mb-2">{price} ₽</h3>
                <Counter amount={amount} />
                <button
                  className="btn btn-dark btn-lg me-2"
                  onClick={handleSubmit}
                >
                  В корзину
                </button>

                {isFavorites ? (
                  <button
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() => handleDelete(itemId)}
                  >
                    Удалить
                  </button>
                ) : (
                  <button
                    className="btn btn-dark btn-lg"
                    onClick={handleFavorites}
                  >
                    Избранное
                  </button>
                )}
              </div>
            </div>
          </div>
          {isModalAndNotLogged && <Comments />}
        </div>
        {!loggedIn && !statusModal && (
          <div className="container container-fix text-center p-1">
            <h4>
              <Link className="header-link" to="/login">
                Войдите
              </Link>
              , чтобы просматривать комментарии
            </h4>
          </div>
        )}
      </>
    );
  }

  return <Loader />;
};

export default FlowerPage;
