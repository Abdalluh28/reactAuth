import { apiSlice } from "../../app/api/apiSlice";



const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers : builder.query({
            query: () => ({
                url: '/users'
            })
        })
    })
})


export const {
    useGetUsersQuery} = userApiSlice