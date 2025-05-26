// utils/fetcher.js

import { LOCAL_PRIVATE_TOKEN } from "./const";

function updateOptions(options = {}, auth = false) {
  const updatedOptions = {
    ...options,
    headers: {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const token = localStorage.getItem(LOCAL_PRIVATE_TOKEN);

  if (auth && token) {
    updatedOptions.headers.Authorization = `Bearer ${token}`;
  }

  return updatedOptions;
}

export default async function fetcher(
  url = "",
  options = {},
  params = {},
  auth = false
) {
  try {
    const __url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${url}`);

    // Query params qo‘shish
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        __url.searchParams.append(key, params[key]);
      }
    });

    const response = await fetch(__url.toString(), updateOptions(options, auth));

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Fetch error");
    }

    return response.json();
  } catch (error) {
    console.error("Fetcher error:", error.message);
    throw error;
  }
}
