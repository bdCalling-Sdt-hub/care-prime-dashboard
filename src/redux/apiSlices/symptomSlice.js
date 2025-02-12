import { api } from "../api/baseApi";

const symptomSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateSymptomCategory: builder.query({
      query: ({ id, category }) => ({
        url: `/symptom/${id}`,
        method: "GET",
        body: category,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {useUpdateSymptomCategoryQuery}=symptomSlice;