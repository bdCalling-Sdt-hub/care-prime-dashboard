import { api } from "../api/baseApi";


const packagesSlice = api.injectEndpoints({
    endpoints: (builder)=>({
        getAllPackages: builder.query({
            query: ()=> {
                return {
                  url: `/package`,
                  method: "GET",
                };
            },
            providesTags: ["package"],
        }),
    })
})

export const {useGetAllPackagesQuery}=packagesSlice;

