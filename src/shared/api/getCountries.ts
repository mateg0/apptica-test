import { Country } from "../lib/types";
import { getFetch } from "./lib/utils";

type TGetCountriesResponse = {
  status_code: number;
  message: string;
  data: Country[];
};

export const getCountries = async (): Promise<TGetCountriesResponse> => {
  const getCountriesResponse = await getFetch(
    "/v1/geo?B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l",
  );
  const getCountriesJson = await getCountriesResponse.json();
  return getCountriesJson;
};
