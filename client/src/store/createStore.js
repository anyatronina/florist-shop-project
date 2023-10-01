import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users";
import commentsReducer from "./comments";
import itemsReducer from "./items";
import basketReducer from "./basket";
import ordersReducer from "./orders";
import favoritesReducer from "./favorites";

const rootReducer = combineReducers({
  users: usersReducer,
  comments: commentsReducer,
  items: itemsReducer,
  basket: basketReducer,
  orders: ordersReducer,
  favorites: favoritesReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
