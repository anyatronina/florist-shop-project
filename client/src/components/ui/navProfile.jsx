import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  if (currentUser) {
    return (
      <div className="dropdown" onClick={toggleMenu}>
        <div className="btn sign-in dropdown-toggle d-flex align-items-center">
          <img
            src={currentUser.image}
            alt=""
            height="40"
            className="img-responsive rounded-circle"
          />
          <div className="font ms-2">{currentUser.name}</div>
        </div>
        <div className={"w-200 end-0 dropdown-menu" + (isOpen ? " show" : "")}>
          <Link to={`/users/${currentUser._id}`} className="dropdown-item">
            Личный кабинет
          </Link>
          <Link to="/logout" className="dropdown-item">
            Выйти
          </Link>
        </div>
      </div>
    );
  }
};

export default NavProfile;
