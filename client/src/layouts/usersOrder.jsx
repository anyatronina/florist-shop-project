import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
  getOrdersLoadingStatus,
  loadOrderList
} from "../store/orders";
import OrderUserInfo from "../components/ui/order/orderUserInfo";
import OrderListInfo from "../components/ui/order/orderListInfo";
import { orderBy } from "lodash";
import Loader from "../components/common/loader";

const UsersOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders());
  const isLoading = useSelector(getOrdersLoadingStatus());

  useEffect(() => {
    dispatch(loadOrderList());
  }, []);

  const sortedOrders = orderBy(orders, ["createdAt"], ["desc"]);

  if (isLoading)
    return (
      <div className="wrapper-fix">
        <h1 className="mt-3">Заказы пользователей</h1>
        <Loader />
      </div>
    );

  if (sortedOrders.length > 0) {
    return (
      <div className="wrapper-fix">
        <h1 className="mt-3">Заказы пользователей</h1>
        <div className="container ps-1 pe-0">
          {!isLoading &&
            sortedOrders.map((order) => (
              <div className="container-fix mb-1">
                <h3>Заказ №{order._id}</h3>
                <OrderUserInfo
                  userId={order.userId}
                  createdAt={order.createdAt}
                />
                <OrderListInfo order={order.orderList} />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper-fix">
      <h1 className="mt-3">Заказы пользователей</h1>
      <h5 className="container-fix">Заказов нет</h5>
    </div>
  );
};

export default UsersOrder;
