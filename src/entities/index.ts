import { configureStore } from "@reduxjs/toolkit";
import { countriesReducer } from "./countries";
import { categoriesReducer } from "./categories";
import { topHistoryReducer } from "./topHistory";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    categories: categoriesReducer,
    topHistory: topHistoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
