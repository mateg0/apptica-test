import { RequestStatus, TopHistory } from "@/shared/lib/types";
import { createSlice } from "@reduxjs/toolkit";
import { getTopHistory } from "./getTopHistory";

export const topHistorySlice = createSlice({
  name: "topHistory",
  initialState: {
    status: "initial" as RequestStatus,
    data: [] as {
      categoryId: number;
      subcategoryId: number;
      values: Record<string, number>;
    }[],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getTopHistory.fulfilled, (state, action) => {
        state.status = "done";
        state.data = action.payload;
      })
      .addCase(getTopHistory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getTopHistory.rejected, (state, payload) => {
        state.status = "fail";
        console.error(
          "Failed to get top history for this filters: " + payload.payload,
        );
      }),
});

export const topHistoryReducer = topHistorySlice.reducer;
