import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./modules/postSlice";
import userReducer from "./modules/userSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
});

export default store;
