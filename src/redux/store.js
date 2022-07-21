import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./modules/collectionSlice";
import userReducer from "./modules/userSlice";

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
    user: userReducer,
  },
});

export default store;
