import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null,
    user: {},
}

export const userReducer = createReducer(initialState, {
    userRegisterRequest: state => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    userRegisterSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message
    },
    userRegisterFailed: (state, action) => {
        state.loading = false,
        state.isAuthenticated = false;
        state.error = action.payload
    },

    userLoadRequest: state => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    userLoadSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload
    },
    userLoadFailed: (state, action) => {
        state.loading = false,
        state.isAuthenticated = false;
        state.error = action.payload
    },
    clearErrors: state =>{
        state.error = null
        state.isAuthenticated = false
    }
})