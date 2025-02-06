import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: ({ page, search }) => {
        const params = new URLSearchParams();
        if (page) params.append("page", page);
        if (search) params.append("search", search);
        return {
          url: `/auth/get-all-user?${params.toString()}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useUsersQuery, useLoginMutation } = userSlice;
