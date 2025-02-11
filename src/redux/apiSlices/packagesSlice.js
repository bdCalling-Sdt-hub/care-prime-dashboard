import { api } from "../api/baseApi";

const packagesSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackages: builder.query({
      query: () => ({
        url: `/package`,
        method: "GET",
      }),
      providesTags: ["package"],
    }),

    addPackage: builder.mutation({
      query: (newPackage) => ({
        url: `/package`,
        method: "POST",
        body: newPackage,
      }),
      invalidatesTags: ["package"],
    }),

    updatePackage: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/package/${id}`,
        method: "PATCH", 
        body: updatedData,
      }),
      invalidatesTags: ["package"],
    }),

    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/package/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["package"],
    }),
  }),
});

export const {
  useGetAllPackagesQuery,
  useAddPackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packagesSlice;
