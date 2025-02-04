import { configureStore } from "@reduxjs/toolkit";
import { blogsApi } from "../features/blogsApi";
import { stocksApi } from "../features/stocksApi";
import { usersApi } from "../features/usersApi";
import userReducer from "../../src/slices/userSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    [stocksApi.reducerPath]: stocksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogsApi.middleware,
      stocksApi.middleware,
      usersApi.middleware
    ),
});
