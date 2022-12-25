import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../reduser/userSlice";

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>

export type AppDispatch = AppStore['dispatch'];

const rootReducer = combineReducers({
  user: userSlice,
});

export const store = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
