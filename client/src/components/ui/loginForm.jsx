import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signIn } from "../../store/users";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const loginError = useSelector(getAuthErrors());
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы 1 заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы 1 цифру"
      }
    }
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(signIn(data));
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      {loginError && <p className="text-danger">{loginError}</p>}

      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-secondary w-100 mx-auto"
      >
        Отправить
      </button>
    </form>
  );
};

export default LoginForm;
