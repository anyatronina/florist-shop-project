import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  checkResetPassword,
  getAuthErrors,
  getIsReset,
  getIsResetComplete,
  getResetLoadingStatus,
  resetPassword
} from "../../store/users";
import Loader from "../common/loader";

const ResetPasswordForm = () => {
  const [data, setData] = useState({
    email: "",
    resetPassword: "",
    password: ""
  });
  const resetError = useSelector(getAuthErrors());
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const isLoading = useSelector(getResetLoadingStatus());
  const isReset = useSelector(getIsReset());
  const isResetComplete = useSelector(getIsResetComplete());

  useEffect(() => {
    validate();
  }, [data]);

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
    },
    resetPassword: {
      isRequired: {
        message: "Поле обязательно для заполнения"
      }
    }
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate({ email: data.email });
    if (!isValid) return;

    dispatch(resetPassword({ email: data.email }));
  };

  const handleSubmitMail = (e) => {
    e.preventDefault();
    const isValid = validate({
      resetPassword: data.resetPassword
    });
    if (!isValid) return;

    dispatch(
      checkResetPassword({
        email: data.email,
        resetPassword: data.resetPassword
      })
    );
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    const isValid = validate({ password: data.password });
    if (!isValid) return;

    dispatch(changePassword({ email: data.email, password: data.password }));
  };

  const validate = (data) => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* ввод email и проверка на существующего user */}
          {!isReset && !isResetComplete && (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Электронная почта"
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />

              {resetError && <p className="text-danger">{resetError}</p>}

              <button
                type="submit"
                // disabled={!isValid}
                className="btn btn-secondary w-100 mx-auto"
              >
                Отправить
              </button>
            </form>
          )}

          {/* ввод resetPassword и проверка */}
          {isReset && (
            <form onSubmit={handleSubmitMail}>
              <TextField
                label="Введите пароль из письма"
                type="text"
                name="resetPassword"
                value={data.resetPassword}
                onChange={handleChange}
                error={errors.resetPassword}
              />

              {resetError && <p className="text-danger">{resetError}</p>}

              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-secondary w-100 mx-auto"
              >
                Отправить
              </button>
            </form>
          )}

          {/* ввод newPassword */}
          {isResetComplete && (
            <form onSubmit={handleSubmitPassword}>
              <TextField
                label="Введите новый пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
              />

              {resetError && <p className="text-danger">{resetError}</p>}

              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-secondary w-100 mx-auto"
              >
                Отправить
              </button>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default ResetPasswordForm;
