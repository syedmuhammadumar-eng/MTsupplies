import { createSlice } from "@reduxjs/toolkit";

export interface CredentialState {
    isLoginSuccessFull: boolean,
    login: {
        name: string,
        email: string;
        password: string;
    },
}

const initialState: CredentialState = {
    isLoginSuccessFull: false,
    login: {
        name: '',
        email: '',
        password: '',
    },
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
    },
});

export const {
    setLoginData,
    setLogout,
} = credentialReducer.actions;
export default credentialReducer.reducer;