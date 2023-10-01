import React from "react";

const Sorting = ({ onChange }) => {
  const options = [
    { value: 1, name: "По названию" },
    { value: 2, name: "Сначала дешевые" },
    { value: 3, name: "Сначала дорогие" }
  ];

  const handleChange = ({ target }) => {
    onChange(target.value);
  };

  return (
    <div className="container-fix">
      <p className="fw-bold mb-2">Сортировка</p>
      <select
        className="form-select form-select-sm"
        aria-label=".form-select-sm example"
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorting;
