const BASE_URL = "https://api.apptica.com";

export const getFetch = async (url: string, requestParams?: RequestInit) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(BASE_URL + url, {
    headers,
    method: "GET",
    ...requestParams,
  });

  return response;
};

export const postFetch = async (
  url: string,
  body: Record<string, unknown>,
  requestParams?: RequestInit
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const response = await fetch(BASE_URL + url, {
    headers,
    body: JSON.stringify(body),
    method: "POST",
    ...requestParams,
  });

  return response;
};
