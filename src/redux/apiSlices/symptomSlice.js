import { api } from "../api/baseApi";

const symptomSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET Request: Fetch Symptom Category
    getIdSymptomCategory: builder.query({
      query: (id) => ({
        url: `/symptom/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),

    // POST Request: Add New Symptom Category
    addSymptomCategory: builder.mutation({
      query: (newCategory) => ({
        url: "/symptom",
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["category"], 
    }),
  }),
});

export const { useGetIdSymptomCategoryQuery, useAddSymptomCategoryMutation } =
  symptomSlice;
