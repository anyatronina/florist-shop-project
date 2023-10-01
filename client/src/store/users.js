import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import history from "../utils/history";
import { generateAuthError } from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
      resetLoading: false,
      isReset: false,
      isResetComplete: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
      resetLoading: false,
      isReset: false,
      isResetComplete: false
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
      state.isReset = false;
      state.isResetComplete = false;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      state.resetLoading = false;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userUpdated: (state, action) => {
      state.entities = state.entities.map((u) =>
        u._id === action.payload._id ? { ...u, ...action.payload } : { ...u }
      );
      state.isLoading = false;
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
    authRequestedReset: (state) => {
      state.error = null;
      state.resetLoading = true;
    },
    userRequestSuccess: (state) => {
      state.resetLoading = false;
      state.isReset = true;
    },
    userPasswordRequestSuccess: (state) => {
      state.resetLoading = false;
      state.isReset = false;
      state.isResetComplete = true;
    },
    userChangeRequestSuccess: (state) => {
      state.resetLoading = false;
      state.isReset = false;
      state.isResetComplete = false;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userUpdated,
  userLoggedOut,
  userRequestSuccess,
  authRequested,
  authRequestedReset,
  userPasswordRequestSuccess,
  userChangeRequestSuccess
} = actions;

export const signIn = (payload) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    history.goBack();
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    history.push("/");
  } catch (error) {
    const { message } = error.response.data.error;
    const errorMessage = generateAuthError(message);
    dispatch(authRequestFailed(errorMessage));
  }
};

export const resetPassword = (payload) => async (dispatch) => {
  dispatch(authRequestedReset());
  try {
    const data = await authService.reset(payload);
    if (data) dispatch(userRequestSuccess());
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const checkResetPassword = (payload) => async (dispatch) => {
  dispatch(authRequestedReset());
  try {
    const data = await authService.check(payload);
    if (data) dispatch(userPasswordRequestSuccess());
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const changePassword = (payload) => async (dispatch) => {
  dispatch(authRequestedReset());
  try {
    const data = await authService.change(payload);
    dispatch(userChangeRequestSuccess());
    history.push("/");
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      const errorMessage = generateAuthError(message);
      dispatch(authRequestFailed(errorMessage));
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};

export const updateUserData =
  ({ payload }) =>
  async (dispatch) => {
    dispatch(usersRequested());
    try {
      const { content } = await userService.update(payload);
      dispatch(userUpdated(content));
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const clearErrorList = () => (dispatch) => {
  dispatch(authRequested());
};

export const getUsersList = () => (state) => state.users.entities;

export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};

export const getUserBasket = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId).basket;
  }
};

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getResetLoadingStatus = () => (state) => state.users.resetLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;
export const getIsReset = () => (state) => state.users.isReset;
export const getIsResetComplete = () => (state) => state.users.isResetComplete;

export default usersReducer;
