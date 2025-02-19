import { api } from "../api/baseApi";

const homeSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        summary: builder.query({
            query: ()=> {
                return {
                  url: `/visitor`,
                  method: "GET",
                };
            }
        }),
    })
})

export const {
    useSummaryQuery
} = homeSlice;