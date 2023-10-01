import { createSlice } from "@reduxjs/toolkit";
import favoritesService from "../services/favorites.service";

const initialState = {
  entities: [],
  isLoading: true,
  error: null
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    favoritesRequested: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    favoritesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    favoritesRequestFailed: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    favoritesItemAdded: (state, action) => {
      console.log(action);
      const isAdded = state.entities.filter(
        (item) => item.itemId === action.payload.itemId
      );

      if (!isAdded.length) {
        state.entities.push(action.payload);
        favoritesService.set(state.entities);
      }
      state.isLoading = false;
    },
    favoritesItemDeleted: (state, action) => {
      state.entities = state.entities.filter((item) => {
        console.log(item, "item", action.payload);
        return item.itemId !== action.payload;
      });
      favoritesService.set(state.entities);
      state.isLoading = false;
    }
  }
});

const { actions, reducer: favoritesReducer } = favoritesSlice;
const {
  favoritesRequested,
  favoritesReceived,
  favoritesRequestFailed,
  favoritesItemAdded,
  favoritesItemDeleted
} = actions;

export const loadFavoritesList = () => (dispatch) => {
  dispatch(favoritesRequested());
  try {
    const favorites = favoritesService.get();
    const itemsList = favorites ? favorites : [];
    dispatch(favoritesReceived(itemsList));
  } catch (error) {
    dispatch(favoritesRequestFailed(error.message));
  }
};

export const addItemFavorites = (payload) => (dispatch) => {
  dispatch(favoritesRequested());
  try {
    dispatch(favoritesItemAdded(payload));
  } catch (error) {
    dispatch(favoritesRequestFailed(error.message));
  }
};

export const deleteItem = (payload) => (dispatch) => {
  dispatch(favoritesRequested());
  try {
    dispatch(favoritesItemDeleted(payload));
  } catch (error) {
    dispatch(favoritesRequestFailed(error.message));
  }
};

export const getFavoritesList = () => (state) => state.favorites.entities;
export const getFavoritesLoadingStatus = () => (state) =>
  state.favorites.isLoading;
export const getFavoritesById = (id) => (state) => {
  if (state.favorites.entities)
    return state.favorites.entities.find((item) => item.itemId === id);
};
export const getFavoritesCount = () => (state) => {
  if (state.favorites.entities) return state.favorites.entities.length;
  return 0;
};
export const getTotalFavorites = () => (state) => {
  const favorites = state.favorites.entities;
  let total = 0;
  favorites.map((itemFavorites) => {
    total += itemFavorites.amount * itemFavorites.price;
  });
  return total;
};

export default favoritesReducer;
