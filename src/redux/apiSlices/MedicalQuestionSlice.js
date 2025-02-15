import { api } from "../api/baseApi";

const questionSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET Request: Fetch Question by ID
    getIdQuestion: builder.query({
      query: (id) => ({
        url: `/question/${id}`,
        method: "GET",
      }),
      providesTags: ["question"],
    }),

    // POST Request: Add New Question
    addQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: "/question",
        method: "POST",
        body: newQuestion,
      }),
      invalidatesTags: ["question"], // Invalidate the "question" tag to refetch data
    }),

    // PUT Request: Update an existing Question
    updateQuestion: builder.mutation({
      query: ({ id, updatedQuestion }) => ({
        url: `/question/${id}`,
        method: "PATCH",
        body: updatedQuestion,
      }),
      invalidatesTags: ["question"], // Invalidate the "question" tag to refetch data
    }),

    // DELETE Request: Delete Question by ID
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/question/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["question"], // Invalidate the "question" tag to refetch data
    }),
  }),
});

export const {
  useGetIdQuestionQuery,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionSlice;
