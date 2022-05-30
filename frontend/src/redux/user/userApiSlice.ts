import { apiSlice } from '../api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAdress: builder.mutation({
            query: (data) => ({
                url: '/auth/update-adress',
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.token}`,
                },
                body: data.formData,
            }),
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
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
        }),
        confirmUserEmail: builder.mutation({
            query: (data) => ({
                url: `/auth/confirm-email/${data.userId}/${data.username}`,
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${data.token}`,
                },
            }),
        }),
    }),
});

export const {
    useUpdateAdressMutation,
    useUpdatePasswordMutation,
    useConfirmUserEmailMutation,
} = userApiSlice;
