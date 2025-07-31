import { getCountries as getCountriesFetch } from "@/shared/api/getCountries";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCountries = createAsyncThunk(
  "countries/getCountries",
  async (_, { rejectWithValue }) => {
    try {
      const getCountriesData = await getCountriesFetch();
      if (getCountriesData.status_code === 200) {
        return getCountriesData.data;
      } else {
        throw Error(
          "Failed to get countries data with message: " +
            getCountriesData.message,
        );
      }
    } catch (error: { message: string } | any) {
      return rejectWithValue(error.message);
    }
  },
);
