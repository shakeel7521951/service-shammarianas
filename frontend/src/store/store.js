import { configureStore } from "@reduxjs/toolkit";
import { blogsApi } from "../features/blogsApi";
import { stocksApi } from "../features/stocksApi";

export const store = configureStore({
  reducer: {
    [blogsApi.reducerPath]: blogsApi.reducer,
    [stocksApi.reducerPath]: stocksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogsApi.middleware, stocksApi.middleware),
});
