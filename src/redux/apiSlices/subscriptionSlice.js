import { api } from "../api/baseApi"

const subscriptionSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        getAllSubscritption: builder.query({
            query: ()=> {
                return {
                  url: `/subscription`,
                  method: "GET",
                };
            },
            providesTags: ["Blogs"],
        }),
    })
})

export const {useGetAllSubscriptionQuery}=subscriptionSlice;

