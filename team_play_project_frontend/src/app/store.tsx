import { configureStore } from "@reduxjs/toolkit";
import commentReducer from '../features/CommentSlice'
import postReducer from '../features/PostSlice'
import authSlice from "../features/AuthSlice"

const reducer = {
  commentReducer,
  postReducer,
  authSlice,
};

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;