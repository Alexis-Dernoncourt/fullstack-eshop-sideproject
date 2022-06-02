import { apiSlice } from '../api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (data: { accessToken: string; userId: string }) => ({
                url: `/auth/profile/${data.userId}`,
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.accessToken}`,
                },
            }),
            providesTags: ['User'],
        }),
        updateAdress: builder.mutation({
            query: (data: { token: string; formData: object }) => ({
                url: '/auth/update-adress',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.token}`,
                },
                body: data.formData,
            }),
            invalidatesTags: ['User'],
        }),
        updatePassword: builder.mutation({
            query: (data: {
                formData: {
                    userId: string;
                    password: string;
                    passwordUpdate: string;
                };
                token: string;
            }) => ({
                url: `/auth/modify-password/${data.formData.userId}`,
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.token}`,
                },
                body: {
                    password: data.formData.password,
                    passwordUpdate: data.formData.passwordUpdate,
                },
            }),
            invalidatesTags: ['User'],
        }),
        confirmUserEmail: builder.mutation({
            query: (data: {
                userId: string;
                username: string;
                token: string;
            }) => ({
                url: `/auth/confirm-email/${data.userId}/${data.username}`,
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.token}`,
                },
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateAdressMutation,
    useUpdatePasswordMutation,
    useConfirmUserEmailMutation,
} = userApiSlice;
