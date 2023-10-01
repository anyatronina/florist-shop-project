import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getCurrentUserData, getUsersLoadingStatus } from "../../store/users";
import EditAccount from "../pages/editAccount";
import Loader from "../common/loader";

const PersonalAccount = () => {
  const { userId } = useParams();
  const history = useHistory();
  const currentUser = useSelector(getCurrentUserData());
  const [editMode, setMode] = useState(false);
  const isLoading = useSelector(getUsersLoadingStatus());

  const toggleMode = () => {
    setMode((prevState) => !prevState);
  };

  if (currentUser) {
    if (userId !== currentUser._id) {
      history.push(`/users/${currentUser._id}`);
    }

    return (
      <div className="wrapper-fix">
        <h1 className="mt-3">Личный кабинет</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="container-fix p-5 d-flex justify-content-evenly">
              <div className="row ">
                <img
                  src={currentUser.image}
                  className="rounded-circle shadow-1-strong me-2"
                  alt="avatar"
                  width="200"
                  height="200"
                />
              </div>

              {!editMode ? (
                <div className="row w-50 p-2 h-350px">
                  <div>
                    <div className="mb-3 ps-2">
                      <div className="fw-bold">Имя/никнейм</div>
                      <div>{currentUser.name}</div>
                    </div>
                    <div className="mb-3 ps-2">
                      <div className="fw-bold">Электронная почта</div>
                      <div>{currentUser.email}</div>
                    </div>
                    <div className="mb-3 ps-2">
                      <div className="fw-bold">Номер телефона</div>
                      <div>{currentUser.phone}</div>
                    </div>
                    <div className="mb-4 ps-2">
                      <div className="fw-bold">Адрес</div>
                      <div>{currentUser.address}</div>
                    </div>
                    <button
                      className="btn btn-secondary w-25 ms-2"
                      onClick={toggleMode}
                    >
                      Изменить
                    </button>
                  </div>
                </div>
              ) : (
                <EditAccount
                  currentUser={currentUser}
                  onToggleMode={toggleMode}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  }
  return <Loader />;
};

export default PersonalAccount;
