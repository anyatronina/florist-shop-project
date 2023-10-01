import React from "react";

const SearchLine = ({ value, onChange }) => {
  return (
    <div className="container-fix py-3">
      {/* <p className="fw-bold">Поиск по названию</p> */}
      <input
        type="text"
        placeholder="Поиск..."
        value={value}
        onChange={onChange}
        className="container searchline mb-0"
      ></input>
    </div>
  );
};

export default SearchLine;
