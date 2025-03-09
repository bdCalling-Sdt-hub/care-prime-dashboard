import { api } from "../api/baseApi";


const disclaimerApi = api.injectEndpoints({
    endpoints: (builder)=>({
        updateDisclaimer: builder.mutation({
            query: ( content)=> {
                return {
                  url: `/rule/disclaimer`,
                  method: "POST",
                  body: content,
                };
            }
        }),
        disclaimer: builder.query({
            query: ()=> {
                return {
                  url: "/rule/disclaimer",
                  method: "GET",
                };
            },
            transformResponse: ({data})=>{
                return data
            }
        }),
    })
})

export const {
    useDisclaimerQuery,
    useUpdateDisclaimerMutation
} = disclaimerApi;