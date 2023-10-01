import React, { useState, useEffect } from "react";
import ItemBasket from "../components/ui/itemBasket";
import Loader from "../components/common/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBasket,
  createOrder,
  deleteItem,
  getBasketList,
  getTotal
} from "../store/basket";
import { getCurrentUserId } from "../store/users";
import { getItemsLoadingStatus } from "../store/items";

const Basket = () => {
  const dispatch = useDispatch();
  const itemsBasket = useSelector(getBasketList());
  const isLoading = useSelector(getItemsLoadingStatus());
  const total = useSelector(getTotal());
  const [ordered, setOrdered] = useState(false);
  const currentUserId = useSelector(getCurrentUserId());

  useEffect(() => {
    setOrdered(false);
  }, []);

  const handleDelete = (idBasket) => {
    dispatch(deleteItem(idBasket));
  };

  const handleClear = () => {
    dispatch(clearBasket());
  };

  const handleOrder = () => {
    const itemListIds = itemsBasket.map((item) => ({
      itemId: item.itemId,
      amount: item.amount
    }));

    dispatch(createOrder({ itemListIds, currentUserId }));
    setOrdered(true);
  };

  if (!isLoading) {
    if (itemsBasket.length > 0) {
      return (
        <div className="wrapper-fix">
          <h1 className="mt-3">Корзина</h1>
          {itemsBasket.map((item) => (
            <ItemBasket
              key={item.idBasket}
              idBasket={item.idBasket}
              _id={item.itemId}
              amount={item.amount}
              onDelete={handleDelete}
            />
          ))}

          <div className="d-flex justify-content-between align-items-start my-3">
            <div className="d-flex cart-page-p">
              <button
                className="btn btn-outline-secondary btn-lg"
                onClick={handleClear}
              >
                Очистить корзину
              </button>
            </div>

            <div className="d-flex flex-column align-items-end">
              <div className="cart-page-p mb-2">
                К оплате &nbsp;
                <span className="fw-bold">{total} ₽</span>
              </div>
              <div>
                <button className="btn btn-dark btn-lg" onClick={handleOrder}>
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="wrapper-fix">
        <h1 className="mt-3">Корзина</h1>
        {ordered ? (
          <h5 className="container-fix">
            Спасибо за заказ! В ближайшее время с вами свяжемся...
          </h5>
        ) : (
          <h5 className="container-fix">В корзине пока пусто</h5>
        )}
      </div>
    );
  }
  return (
    <div className="wrapper-fix">
      <h1 className="mt-3">Корзина</h1>
      <Loader />
    </div>
  );
};

export default Basket;
