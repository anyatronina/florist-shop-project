import React from "react";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";
import { displayDate } from "../../../utils/displayDate";

const OrderUserInfo = ({ userId, createdAt }) => {
  const user = useSelector(getUserById(userId));

  return (
    <div className="mb-2">
      <div>
        <span className="fw-bold me-2">Время заказа:</span>
        {displayDate(createdAt)}
      </div>
      <div>
        <span className="fw-bold me-2">Имя/никнейм:</span> {user.name}
      </div>
      <div>
        <span className="fw-bold me-2">Номер телефона:</span> {user.phone}
      </div>
    </div>
  );
};

export default OrderUserInfo;
