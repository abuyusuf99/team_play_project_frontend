import { configureStore } from "@reduxjs/toolkit";
import commentReducer from '../features/CommentSlice'

const reducer = {
  commentReducer,
};

export const store = configureStore({
  reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;