import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./modules/postSlice";
import userReducer from "./modules/userSlice";
import itemReducer from "./modules/itemSlice";

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
    item: itemReducer,
  },
});

export default store;
