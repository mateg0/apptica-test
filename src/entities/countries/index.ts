import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country, RequestStatus } from "@/shared/lib/types";
import { getCountries } from "./getCountries";

const countriesInitialState: Country[] = [];

const countriesSlice = createSlice({
  initialState: {
    countries: countriesInitialState,
    status: "initial" as RequestStatus,
  },
  name: "countries",
  reducers: {
    setCountries: (state, { payload }: PayloadAction<Country[]>) => {
      state.countries = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.fulfilled, (state, { payload }) => {
        state.countries = payload;
        state.status = "done";
      })
      .addCase(getCountries.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCountries.rejected, (state, { payload }) => {
        state.status = "fail";
        console.error("Failed to get countries: " + payload);
      });
  },
});

export const countriesReducer = countriesSlice.reducer;
export const { setCountries } = countriesSlice.actions;
