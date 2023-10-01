import React from "react";

const GroupList = ({ selectedItem, onItemSelect }) => {
  const items = [
    { _id: "1", name: "Цветы поштучно" },
    { _id: "2", name: "Авторские букеты" },
    { _id: "3", name: "Букеты в коробке" }
  ];

  return (
    <div className="container-fix">
      <p className="fw-bold mb-2">Категории</p>
      {items.map((item) => (
        <div
          className="form-check ms-3"
          role="button"
          onClick={() => onItemSelect(item)}
        >
          <input
            className="form-check-input"
            type="radio"
            name="filter"
            id={item._id}
            key={item._id}
            checked={item._id === selectedItem?._id ? true : false}
          />
          <label className="form-check-label" htmlFor={item._id}>
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default GroupList;
