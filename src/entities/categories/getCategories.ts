import { getCategories as getCategoriesFetch } from "@/shared/api/getCategories";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categoriesResponse = await getCategoriesFetch();
      if (categoriesResponse.status_code === 200) {
        return categoriesResponse.data.flatMap((bigCategory) => [
          {
            id: bigCategory.id,
            name: bigCategory.name,
          },
          ...bigCategory.categories,
        ]);
      } else {
        throw Error(
          "Failed to get categories with message: " +
            categoriesResponse.message,
        );
      }
    } catch (error: { message: string } | any) {
      return rejectWithValue(error.message);
    }
  },
);
