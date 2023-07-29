import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    logged: false,
}

export const loginInfoSlice = createSlice({
    name: 'loginInfo',
    initialState,
    reducers: {
        setLoginInfo: (state, action) => {
            state.username = action.payload.username;
            state.logged = action.payload.logged;
        },
    },
})

export const { setLoginInfo} = loginInfoSlice.actions;

export default loginInfoSlice.reducer;