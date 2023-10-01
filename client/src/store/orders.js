import { createSlice } from "@reduxjs/toolkit";
import orderService from "../services/order.service";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    ordersRequested: (state) => {
      state.isLoading = true;
    },
    ordersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    ordersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: ordersReducer, actions } = ordersSlice;
const { ordersRequested, ordersReceived, ordersRequestFailed } = actions;

export const loadOrderList = () => async (dispatch, getState) => {
  dispatch(ordersRequested());
  try {
    const { content } = await orderService.get();
    dispatch(ordersReceived(content));
  } catch (error) {
    dispatch(ordersRequestFailed(error.message));
  }
};

export const getOrders = () => (state) => state.orders.entities;
export const getOrdersLoadingStatus = () => (state) => state.orders.isLoading;
export const getOrderById = (id) => (state) => {
  if (state.orders.entities) {
    return state.orders.entities.find((item) => item._id === id);
  }
};

export default ordersReducer;
