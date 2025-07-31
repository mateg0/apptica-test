import { TopHistory } from "../lib/types";
import { getFetch } from "./lib/utils";

export type TGetTopHistoryQueryParams = {
  countryId: number;
  dateFrom: string | null;
  dateTo: string | null;
};

export type TGetTopHistoryResponse = {
  status_code: number;
  message: string;
  data: TopHistory;
};

export const getTopHistory = async ({
  countryId,
  dateFrom,
  dateTo,
}: TGetTopHistoryQueryParams): Promise<TGetTopHistoryResponse> => {
  const getTopHistoryResponse = await getFetch(
    `/package/top_history/9379/${countryId}?${
      dateFrom ? `date_from=${dateFrom}&` : ""
    }${
      dateTo ? `date_to=${dateTo}&` : ""
    }platforms=1&B4NKGg=fVN5Q9KVOlOHDx9mOsKPAQsFBlEhBOwguLkNEDTZvKzJzT3l`,
  );
  const getTopHistoryJson = await getTopHistoryResponse.json();
  return getTopHistoryJson;
};
