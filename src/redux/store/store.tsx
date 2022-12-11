import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../reduser/slice";

export const store = configureStore({
  reducer: {
    user: postReducer,
  },
});