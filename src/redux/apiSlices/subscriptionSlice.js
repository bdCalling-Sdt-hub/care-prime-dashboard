import { api } from "../api/baseApi";

const subscriptionSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscription: builder.query({
      query: () => ({
        url: `/subscription`,
        method: "GET",
      }),
      providesTags: ["subscription"], 
    }),
  }),
});

export const { useGetAllSubscriptionQuery } = subscriptionSlice;
