import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "../redux/user/slice";
import moduleReducer from "../redux/module/slice";
import filterReducer from "../redux/filter/slice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    module: moduleReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
