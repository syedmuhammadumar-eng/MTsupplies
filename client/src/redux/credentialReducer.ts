import { createSlice } from "@reduxjs/toolkit";

export interface CredentialState {
    isLoginSuccessFull: boolean,
    login: {
        name: string,
        email: string;
        password: string;
        role: string,
        userId: string,
    },
    userToken: string,
    isAdmin: string,
}

const initialState: CredentialState = {
    isLoginSuccessFull: false,
    login: {
        name: '',
        email: '',
        password: '',
        role: '',
        userId: '',
    },
    userToken: '',
    isAdmin: '',
};

export const credentialReducer = createSlice({
    name: "credentialReducer",
    initialState,
    reducers: {
        setLoginData: (state, action) => {
            state.login = action.payload;
            state.isLoginSuccessFull = action.payload.isLoginSuccessFull;
        },
        setLogout: (state, action) => {
            state.isLoginSuccessFull = action.payload;
            state.login = initialState?.login;
        },
        setToken: (state, action) => {
            state.userToken = action.payload;
        },
        setRemoveToken: (state) => {
            state.userToken = '';
            state.isLoginSuccessFull = false;
            state.login = initialState.login;
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload;
        }
    },
});

export const {
    setLoginData,
    setToken,
    setRemoveToken,
    setLogout,
    setIsAdmin,
} = credentialReducer.actions;
export default credentialReducer.reducer;