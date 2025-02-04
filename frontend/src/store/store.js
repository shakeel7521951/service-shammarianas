import { configureStore } from "@reduxjs/toolkit";
import { blogsApi } from "../features/blogsApi";
import { stocksApi } from "../features/stocksApi";
import { usersApi } from "../features/usersApi";
import { cartApi } from "../features/cartApi.js";
import { commentApi } from "../features/commentApi.js";

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    [stocksApi.reducerPath]: stocksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      blogsApi.middleware,
      stocksApi.middleware,
      usersApi.middleware,
      cartApi.middleware
    ),
});
