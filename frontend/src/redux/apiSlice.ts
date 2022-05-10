import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
    tagTypes: ['Products', 'Product', 'LIST', 'AdminProducts', 'LIST-ADMIN'],
    refetchOnFocus: true,
    //refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        getAllPublished: builder.query({
            query: () => ({
                url: `/products`,
            }),
            providesTags: (result) =>
                result
                    ? [
                          { type: 'Products', id: 'LIST' },
                          ...result.products.map(({ id }: any) => ({
                              type: 'Products',
                              id: id,
                          })),
                      ]
                    : [{ type: 'Products', id: 'LIST' }],
        }),
        getAllProducts: builder.query({
            query: (token) => ({
                url: `/products/all`,
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: (result) =>
                result
                    ? [
                          { type: 'AdminProducts', id: 'LIST-ADMIN' },
                          ...result.products.map(({ _id }: any) => ({
                              type: 'AdminProducts',
                              id: _id,
                          })),
                      ]
                    : [{ type: 'AdminProducts', id: 'LIST-ADMIN' }],
        }),
        addProduct: builder.mutation({
            query: (data: { token: string; formData: any }) => ({
                url: `/products`,
                method: 'POST',
                credentials: 'include',
                headers: { Authorization: `Bearer ${data.token}` },
                body: data.formData,
            }),
            invalidatesTags: () => [
                { type: 'Products' },
                { type: 'AdminProducts' },
            ],
        }),
        deleteProduct: builder.mutation({
            query: (data: { token: string; id: string }) => ({
                url: `/products/${data.id}`,
                method: 'DELETE',
                credentials: 'include',
                headers: { Authorization: `Bearer ${data.token}` },
            }),
            invalidatesTags: () => [
                { type: 'Products' },
                { type: 'AdminProducts' },
            ],
        }),
        updateProduct: builder.mutation({
            query: (data: { token: string; id: string; formData: any }) => ({
                url: `/products/${data.id}`,
                method: 'PUT',
                credentials: 'include',
                headers: { Authorization: `Bearer ${data.token}` },
                body: data.formData,
            }),
            invalidatesTags: () => [
                { type: 'Products' },
                { type: 'AdminProducts' },
                //{ type: 'AdminProducts', id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetAllPublishedQuery,
    useGetAllProductsQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useUpdateProductMutation,
} = apiSlice;
