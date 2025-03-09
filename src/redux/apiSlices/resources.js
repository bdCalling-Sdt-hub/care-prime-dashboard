import { api } from "../api/baseApi";


const resourcesApi = api.injectEndpoints({
    endpoints: (builder)=>({
        updateResources: builder.mutation({
            query: ( content)=> {
                return {
                  url: `/rule/resources`,
                  method: "POST",
                  body: content,
                };
            }
        }),
        resources: builder.query({
            query: ()=> {
                return {
                  url: "/rule/resources",
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
    useResourcesQuery,
    useUpdateResourcesMutation
} = resourcesApi;