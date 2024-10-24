import { PRODUCTS_URL, UPLOAD_URL } from '../../constants'
import { apiSlice } from '../apiSlice'

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: ({ keyword, pageNumber }) => ({
                url: PRODUCTS_URL,
                params: {
                    pageNumber,
                    keyword,
                },
            }),
            providesTags: ['Products'],
            keepUnusedDataFor: 5,
        }),
        getProductDetails: builder.query({
            query: productId => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: PRODUCTS_URL,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: data => ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        uploadProductImage: builder.mutation({
            query: data => ({
                url: `/api/upload`,
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: productId => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
                credentials: 'include',
            }),
        }),
        createReview: builder.mutation({
            query: data => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`,
                credentials: 'include',
            }),
            keepUnusedDataFor: 5,
        }),
    }),
})
export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
} = productApiSlice
