import { createReducer } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value:any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('user_details', jsonValue);
  } catch (error) {
    console.log(error);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user_details');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null,
    user: getData(),
    //user: null
}

export const userReducer = createReducer(initialState, {
  //Register User
  userRegisterRequest: state => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  userRegisterSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload.user;
    storeData(action.payload.user);
    state.message = action.payload.message;
  },
  userRegisterFailed: (state, action) => {
    (state.loading = false), (state.isAuthenticated = false);
    state.error = action.payload;
  },

  //Load User
  userLoadRequest: state => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  userLoadSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  userLoadFailed: (state, action) => {
    (state.loading = false), (state.isAuthenticated = false);
    state.error = action.payload;
  },
  clearErrors: state => {
    state.error = null;
    state.isAuthenticated = false;
  },

  //Login User
  userLoginRequest: state => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  userLoginSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
    storeData(action.payload);
  },
  userLoginFailed: (state, action) => {
    (state.loading = false), (state.isAuthenticated = false);
    state.error = action.payload;
    state.user = null as any;
  },

  //Logout User
  userLogoutRequest: state => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  userLogoutSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  userLogoutFailed: (state, action) => {
    (state.loading = false), (state.isAuthenticated = false);
    state.error = action.payload;
    state.user = null as any;
  },
});