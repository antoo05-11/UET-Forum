import { configureStore } from '@reduxjs/toolkit'
import counterReducer from "../features/counter/counterSlice"
import loginInfoReuder from "../features/loginInfo/loginInfoSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loginInfo: loginInfoReuder,
  },
})