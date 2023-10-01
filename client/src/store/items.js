import { createSlice } from "@reduxjs/toolkit";
import itemService from "../services/item.service";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    itemsRequested: (state) => {
      state.isLoading = true;
    },
    itemsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    itemsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: itemsReducer, actions } = itemsSlice;
const { itemsRequested, itemsReceived, itemsRequestFailed } = actions;

function isOutdated(date) {
  if (Date.now() - date > 10 * 60 * 100) {
    return true;
  }
  return false;
}

export const loadItemsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().items;
  if (isOutdated(lastFetch)) {
    dispatch(itemsRequested());
    try {
      const { content } = await itemService.get();
      dispatch(itemsReceived(content));
    } catch (error) {
      dispatch(itemsRequestFailed(error.message));
    }
  }
};

export const getItems = () => (state) => state.items.entities;
export const getItemsLoadingStatus = () => (state) => state.items.isLoading;
export const getItemById = (id) => (state) => {
  if (state.items.entities) {
    return state.items.entities.find((item) => item._id === id);
  }
};

export default itemsReducer;
