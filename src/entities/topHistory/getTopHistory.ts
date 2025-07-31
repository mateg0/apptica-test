import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTopHistory as getTopHistoryFetch,
  TGetTopHistoryQueryParams,
} from "@/shared/api/getTopHistory";

export const getTopHistory = createAsyncThunk(
  "topHistory/getTopHistory",
  async (params: TGetTopHistoryQueryParams, { rejectWithValue }) => {
    try {
      const getTopHistoryResponse = await getTopHistoryFetch(params);
      if (getTopHistoryResponse.status_code === 200) {
        const topHistoryData = [];
        for (const key in getTopHistoryResponse.data) {
          for (const subKey in getTopHistoryResponse.data[key]) {
            topHistoryData.push({
              categoryId: Number(key),
              subcategoryId: Number(subKey),
              values: getTopHistoryResponse.data[key][subKey],
            });
          }
        }
        return topHistoryData;
      } else {
        throw new Error(getTopHistoryResponse.message ?? "Unknown error");
      }
    } catch (error: { message: string } | any) {
      return rejectWithValue(error.message);
    }
  },
);
