import { api } from "../api/baseApi";


const termsAndConditionSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        updateTermsAndConditions: builder.mutation({
            query: ({id, description})=> {
                return {
                  url: `/rule/terms-and-conditions/${id}`,
                  method: "PATCH",
                  body: { description },
                };
            }
        }),
        termsAndCondition: builder.query({
            query: ()=> {
                return {
                  url: "/rule/terms-and-conditions",
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
    useTermsAndConditionQuery,
    useUpdateTermsAndConditionsMutation
} = termsAndConditionSlice;