import React, { useState } from "react";
import PropTypes from "prop-types";
import TextAriaField from "../form/textAriaField";
import { validator } from "../../../utils/validator";

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    content: {
      isRequired: {
        message: "Сообщение не может быть пустым"
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({});
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div>
      <h2>Оставьте свой отзыв</h2>
      <form onSubmit={handleSubmit}>
        <TextAriaField
          value={data.content || ""}
          onChange={handleChange}
          name="content"
          // label=""
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary btn-lg ">Опубликовать</button>
        </div>
      </form>
    </div>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
};

export default AddCommentForm;
