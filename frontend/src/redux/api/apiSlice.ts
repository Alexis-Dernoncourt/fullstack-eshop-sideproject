import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../auth/authSlice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log(result);

    if (result?.error?.status === 403 || result?.error?.status === 401) {
        console.log('sending refresh token');
        // send refresh token to get new access token
        const refreshResult = await baseQuery(
            '/auth/refresh',
            api,
            extraOptions
        );
        console.log(refreshResult);
        if (refreshResult?.data) {
            //const user = api.getState().auth.user;
            // store the new token
            api.dispatch(setCredentials(refreshResult.data));
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: 'eshopApi',
    tagTypes: ['Products', 'Product', 'LIST', 'AdminProducts', 'LIST-ADMIN'],
    refetchOnFocus: true,
    //refetchOnMountOrArgChange: true,
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({}),
});
