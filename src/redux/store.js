import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./modules/postSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
});

export default store;
