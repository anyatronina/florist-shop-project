import "./App.css";
import NavBar from "./components/ui/navBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Catalog from "./layouts/catalog";
import UsersOrder from "./layouts/usersOrder";
import MainPage from "./components/pages/mainPage";
import Basket from "./layouts/basket";
import BasketProvider from "./hooks/useBasket";
import ModalProvider from "./hooks/useModal";
import Favorites from "./layouts/favorites";
import AppLoader from "./components/ui/hoc/appLoader";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import PersonalAccount from "./components/pages/personalAccount";
import ProtectedRoute from "./components/common/protectedRoute";
import AdminRoute from "./components/common/adminRoute";

function App() {
  return (
    <div>
      <AppLoader>
        <BasketProvider>
          <ModalProvider>
            <NavBar />
            <Switch>
              <ProtectedRoute
                path="/users/:userId?"
                component={PersonalAccount}
              />
              <Route path="/catalog/:itemId?" component={Catalog} />
              <AdminRoute path="/orders" component={UsersOrder} />
              <ProtectedRoute path="/cart" component={Basket} />
              <ProtectedRoute path="/favorites" component={Favorites} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/" exact component={MainPage} />
              <Redirect to="/" />
            </Switch>
          </ModalProvider>
        </BasketProvider>
      </AppLoader>
    </div>
  );
}

export default App;
