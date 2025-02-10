import { api } from "../api/baseApi";

const blogsSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get All Blogs
    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),

    // ✅ Add New Blog
    addNewBlog: builder.mutation({
      query: (blogs) => ({
        url: "/blog",
        method: "POST",
        body: blogs,
      }),
      invalidatesTags: ["Blogs"], 
    }),

    // ✅ Edit Blog by ID
    editBlog: builder.mutation({
      query: ({ id, ...blogData }) => ({
        url: `/blog/${id}`,
        method: "PATCH",
        body: blogData,
      }),
      invalidatesTags: ["Blogs"], 
    }),

    // ✅ Delete Blog by ID
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"], 
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useAddNewBlogMutation,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = blogsSlice;
