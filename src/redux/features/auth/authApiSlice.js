import { apiSlice } from '../../app/api/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...data }, // firstName, lastName, email, password
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...data },
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        })
    })
});

export const { 
    useRegisterMutation, 
    useLoginMutation, 
    useLogoutMutation } = authApiSlice;
