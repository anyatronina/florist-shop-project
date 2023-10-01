import { createSlice } from "@reduxjs/toolkit";
import basketService from "../services/basket.service";

const initialState = {
  entities: [],
  isLoading: true,
  error: null
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    basketRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    basketReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    basketRequestFailed: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    basketItemAdded: (state, action) => {
      state.entities.push(action.payload);
      basketService.set(state.entities);
      state.isLoading = false;
    },
    basketItemDeleted: (state, action) => {
      state.entities = state.entities.filter(
        (item) => item.idBasket !== action.payload
      );
      basketService.set(state.entities);
      state.isLoading = false;
    }
  }
});

const { actions, reducer: basketReducer } = basketSlice;
const {
  basketRequested,
  basketReceived,
  basketRequestFailed,
  basketItemAdded,
  basketItemDeleted
} = actions;

export const loadBasketList = () => (dispatch) => {
  dispatch(basketRequested());
  try {
    const basket = basketService.get();
    const itemsList = basket ? basket : [];
    dispatch(basketReceived(itemsList));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const clearBasket = () => (dispatch) => {
  dispatch(basketRequested());
  try {
    basketService.delete();
    dispatch(basketReceived([]));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const addItem = (payload) => (dispatch) => {
  dispatch(basketRequested());
  try {
    dispatch(basketItemAdded(payload));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const deleteItem = (itemId) => (dispatch) => {
  dispatch(basketRequested());
  try {
    dispatch(basketItemDeleted(itemId));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const createOrder = (payload) => async (dispatch) => {
  dispatch(basketRequested());
  try {
    await basketService.createOrder(payload);

    basketService.delete();
    dispatch(basketReceived([]));
  } catch (error) {
    dispatch(basketRequestFailed(error.message));
  }
};

export const getBasketList = () => (state) => state.basket.entities;
export const getBasketLoadingStatus = () => (state) => state.basket.isLoading;
export const getBasketById = (id) => (state) => {
  if (state.basket.entities)
    return state.basket.entities.find((item) => item.itemId === id);
};
export const getBasketCount = () => (state) => {
  if (state.basket.entities) return state.basket.entities.length;
  return 0;
};
export const getTotal = () => (state) => {
  const basket = state.basket.entities;
  let total = 0;
  basket.map((itemBasket) => {
    total += itemBasket.amount * itemBasket.price;
  });
  return total;
};

export default basketReducer;
