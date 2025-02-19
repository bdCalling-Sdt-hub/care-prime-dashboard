import { api } from "../api/baseApi";

const medicalHistorySlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All FAQs (Provides Tag for Auto Refresh)
    getMedicalHistory: builder.query({
      query: () => ({
        url: "/medication",
        method: "GET",
      }),
      providesTags: ["FAQ"],
    }),

    // POST (Create) - Add New FAQ
    addMedicalHistory: builder.mutation({
      query: (newData) => ({
        url: "/medication",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["FAQ"],
    }),

    // PATCH (Update) - Update Existing FAQ
    updateMedicalHistory: builder.mutation({
      query: ({ id, updateHistory }) => ({
        url: `/medication/${id}`,
        method: "PATCH",
        body: updateHistory,
      }),
      invalidatesTags: ["FAQ"],
    }),

    // DELETE (Delete) - Delete FAQ
    deleteMedicalHistory: builder.mutation({
      query: (id) => ({
        url: `/medication/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"],
    }),
  }),
});

export const {
  useGetMedicalHistoryQuery,
  useAddMedicalHistoryMutation,
  useUpdateMedicalHistoryMutation,
  useDeleteMedicalHistoryMutation,
} = medicalHistorySlice;
