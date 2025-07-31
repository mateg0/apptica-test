import { getFetch } from "./lib/utils";

export type TGetCategoriesResponse = {
  status_code: number;
  message: string;
  data: {
    id: number;
    name: string;
    categories: {
      id: number;
      name: string;
    }[];
  }[];
};

export const getCategories = async (): Promise<TGetCategoriesResponse> => {
  const getCategoriesRequest = await getFetch(
    "/v1/applicationCategory?platform=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l",
  );
  const getCategoriesJson = await getCategoriesRequest.json();
  return getCategoriesJson;
};
