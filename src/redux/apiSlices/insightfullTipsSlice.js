import { api } from "../api/baseApi";

const insightfullTipsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET: Fetch All Insight Tips
    getAllInsightTips: builder.query({
      query: () => ({
        url: "/tips",
        method: "GET",
      }),
      providesTags: ["Tips"],
    }),

    // ✅ POST: Add New Tip
    addInsightTip: builder.mutation({
      query: (newTip) => ({
        url: "/tips",
        method: "POST",
        body: newTip,
      }),
      invalidatesTags: ["Tips"],
    }),

    // ✅ PATCH: Update Existing Tip
    editInsightTip: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/tips/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Tips"],
    }),

    // ✅ DELETE: Remove Tip
    deleteInsightTip: builder.mutation({
      query: (id) => ({
        url: `/tips/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tips"],
    }),
  }),
});

export const {
  useGetAllInsightTipsQuery,
  useAddInsightTipMutation,
  useEditInsightTipMutation,
  useDeleteInsightTipMutation,
} = insightfullTipsSlice;
