import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.80.75:6009/api/v1",
  }),
  endpoints: () => ({}),
});

export const imageUrl = "http://206.189.231.81:5000";