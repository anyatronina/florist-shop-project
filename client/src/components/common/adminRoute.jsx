import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData, getIsLoggedIn } from "../../store/users";
import config from "../../config.json";

const AdminRoute = ({ component: Component, children, ...rest }) => {
  const currentUser = useSelector(getCurrentUserData());
  const isLoggedIn = useSelector(getIsLoggedIn());

  if (currentUser) {
    const admin = currentUser.email === config.admin.email;

    return (
      <Route
        {...rest}
        render={(props) => {
          if (!admin) {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location
                  }
                }}
              />
            );
          }

          return Component ? <Component {...props} /> : children;
        }}
      />
    );
  }
};

export default AdminRoute;
