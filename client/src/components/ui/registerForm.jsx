import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, signUp } from "../../store/users";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const loginError = useSelector(getAuthErrors());
  const [data, setData] = useState({
    email: "",
    password: "",
    phone: "",
    sex: "male",
    name: "",
    licence: false
  });
  const [errors, setErrors] = useState({});

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      },
      min: {
        message: "Имя должно состоять минимум из 3 символов",
        value: 3
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
    },
    phone: {
      isNumber: {
        message: "Номер телефона введен некорректно"
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
    const newData = { ...data };
    dispatch(signUp(newData));
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
        label="Номер телефона"
        type="text"
        name="phone"
        value={data.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      <TextField
        label="Имя"
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Выберите ваш пол"
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

export default RegisterForm;
