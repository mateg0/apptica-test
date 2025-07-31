import { Category, RequestStatus } from "@/shared/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./getCategories";

const inittialCategories: Category[] = [];

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: inittialCategories,
    status: "initial" as RequestStatus,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.status = "done";
        state.categories = payload;
      })
      .addCase(getCategories.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.status = "fail";
        console.error("Failed to get caetgories with message: " + payload);
      }),
});

export const categoriesReducer = categoriesSlice.reducer;
