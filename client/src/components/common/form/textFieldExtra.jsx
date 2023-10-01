import React, { useState } from "react";
// import { AddressSuggestions } from "react-dadata";
// import "react-dadata/dist/react-dadata.css";

const TextFieldExtra = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [val, setVal] = useState("");

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleChange = ({ target }) => {
    // if (name === "address") {
    //   onChange({ name: "address", value: val });
    // } else {
    onChange({ name: target.name, value: target.value });
    // }
  };

  if (name === "address") {
    return (
      <div className="mb-4 ms-2 d-flex align-items-flex-start">
        <label className="w-50" htmlFor={name}>
          {label}
        </label>
        <div className="input-group has-validation">
          {/* <AddressSuggestions
            uid={name}
            name={name}
            defaultQuery={value}
            value={val}
            onChange={handleChange}
            className={getInputClasses()}
            token="553596130840455a98988cb05ae84945230e72cd"
          /> */}
          <input
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className={getInputClasses()}
          />
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 ms-2 d-flex align-items-flex-start">
      <label className="w-50" htmlFor={name}>
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={toggleShowPassword}
          >
            <i className={"bi bi-eye" + (showPassword ? "-slash" : "")}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextFieldExtra.defaultValues = {
  type: "text"
};

export default TextFieldExtra;
