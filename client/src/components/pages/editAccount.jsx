import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserData } from "../../store/users";
import { validator } from "../../utils/validator";
import TextFieldExtra from "../common/form/textFieldExtra";

const EditAccount = ({ currentUser, onToggleMode }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setData((prevState) => ({
        ...prevState,
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
        address: currentUser.address,
        sex: currentUser.sex
      }));
    }
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...currentUser,
      ...data
    };

    dispatch(updateUserData({ payload: newData }));
    onToggleMode();
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      },
      max: {
        message: "Имя должно состоять максимум из 10 символов",
        value: 10
      }
    },
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Электронная почта введена некорректно"
      }
    },
    phone: {
      isNumber: {
        message: "Номер телефона введен некорректно"
      }
    },
    address: {
      isRequired: {
        message: "Адрес введен некорректно"
      }
    }
  };

  const isValid = Object.keys(errors).length === 0;

  if (Object.keys(data).length !== 0) {
    return (
      <div className="row w-50 p-2 h-350px">
        <form onSubmit={handleSubmit}>
          <TextFieldExtra
            label="Имя/никнейм"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextFieldExtra
            label="Электронная почта"
            type="text"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextFieldExtra
            label="Номер телефона"
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <TextFieldExtra
            label="Адрес"
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
            error={errors.address}
          />

          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-secondary w-25 mx-2"
          >
            Сохранить
          </button>
          <button
            className="btn btn-outline-secondary w-25 mx-2"
            onClick={() => onToggleMode()}
          >
            Отмена
          </button>
        </form>
      </div>
    );
  }
};

export default EditAccount;
