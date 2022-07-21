import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./modules/collectionSlice";
import userReducer from "./modules/userSlice";
import itemReducer from "./modules/itemSlice";

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
    user: userReducer,
    item: itemReducer,
  },
});

export default store;
