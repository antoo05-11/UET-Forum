import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId:"",
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
            state.userId = action.payload.userId;
        },
    },
})

export const { setLoginInfo} = loginInfoSlice.actions;

export default loginInfoSlice.reducer;