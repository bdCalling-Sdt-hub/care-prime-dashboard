import { api } from "../api/baseApi";


const privacyPolicySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updatePrivacyPolicy: builder.mutation({
      query: (content) => {
        return {
          url: `/rule/privacy-policy`,
          method: "POST",
          body: content,
        };
      },
    }),
    privacyPolicy: builder.query({
      query: () => {
        return {
          url: "/rule/privacy-policy",
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { usePrivacyPolicyQuery, useUpdatePrivacyPolicyMutation } =
  privacyPolicySlice;
