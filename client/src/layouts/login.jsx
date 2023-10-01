import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";
import LoginForm from "../components/ui/loginForm";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorList, getIsLoggedIn } from "../store/users";
import ResetPasswordForm from "../components/ui/resetPasswordForm";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formType, setFormType] = useState("login");
  const loggedIn = useSelector(getIsLoggedIn());

  const toggleFormType = (type) => {
    setFormType(type);
    dispatch(clearErrorList());
  };

  useEffect(() => {
    dispatch(clearErrorList());
  }, []);

  if (loggedIn) return history.push("/");

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="container-fix col-md-6 offset-md-3 shadow p-4">
          {formType === "register" && (
            <>
              <h3 className="mb-4">Регистрация</h3>
              <RegisterForm />
              <p className="mt-2 mb-1">
                Уже есть аккаунт?{" "}
                <a role="button" onClick={() => toggleFormType("login")}>
                  Войти
                </a>
              </p>
            </>
          )}

          {formType === "login" && (
            <>
              <h3 className="mb-4">Вход</h3>
              <LoginForm />
              <p className="mt-2 mb-1">
                <a
                  role="button"
                  onClick={() => toggleFormType("resetPassword")}
                >
                  Восстановить пароль
                </a>
              </p>
              <p>
                Нет аккаунта?{" "}
                <a role="button" onClick={() => toggleFormType("register")}>
                  Зарегистрироваться
                </a>
              </p>
            </>
          )}

          {formType === "resetPassword" && (
            <>
              <h3 className="mb-4">Восстановление пароля</h3>
              <ResetPasswordForm />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
