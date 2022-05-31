import { ILogin } from '../../typescript/types';
import { apiSlice } from '../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials: ILogin) => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
