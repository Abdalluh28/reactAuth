import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_MONGO_URL,
    credentials: 'include',
    // install js-cookie
    prepareHeaders: (headers) => {
        const token = Cookies.get('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            //headers.set('Accept-Language', 'en');

        }
        return headers;
    }
});


const baseQueryWithReauth = async (args, api, extraOptions) => {
    // refresh the access token which is expired after 15m 
    // args is the url, method, body
    // api is the dispatch and getState()

    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status == 403) {
        // send refresh token to get new access token (forbidden status)
        console.log("forbidden status");
        // need to call the refresh api to get new access token
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
        if (refreshResult?.data) {
            const { accessToken } = refreshResult.data;
            // store the new token
            Cookies.set('accessToken', accessToken);
            // then complete the original request
            result = await baseQuery(args, api, extraOptions);
        } else {
            if (refreshResult?.error?.status == 403) {
                refreshResult.error.data.message = "Your login has expired. Please login again.";
                return refreshResult;
            }
        }
    }

    return result;

}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
