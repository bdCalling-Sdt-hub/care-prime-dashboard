import { api } from "../api/baseApi";

const faqSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All FAQs (Provides Tag for Auto Refresh)
    getAllFaq: builder.query({
      query: () => ({
        url: "/faq",
        method: "GET",
      }),
      providesTags: ["FAQ"], 
    }),

    // Add New FAQ (Invalidates Tag to Refresh List)
    addNewFaq: builder.mutation({
      query: (faqData) => ({
        url: "/faq",
        method: "POST",
        body: faqData,
      }),
      invalidatesTags: ["FAQ"], 
    }),

    // Update FAQ by ID (Invalidates Tag to Refresh List)
    editFaq: builder.mutation({
      query: ({ id, ...faqData }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: faqData,
      }),
      invalidatesTags: ["FAQ"], 
    }),

    // Delete FAQ by ID (Invalidates Tag to Refresh List)
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"], 
    }),
  }),
});

export const {
  useAddNewFaqMutation,
  useGetAllFaqQuery,
  useEditFaqMutation,
  useDeleteFaqMutation,
} = faqSlice;
