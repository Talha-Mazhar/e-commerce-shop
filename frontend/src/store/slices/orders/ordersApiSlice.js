import { ORDERS_URL, PAYPAL_URL } from '../../constants'
import { apiSlice } from '../apiSlice'
export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createOrder: builder.mutation({
            query: order => ({
                url: ORDERS_URL,
                method: 'POST',
                body: { ...order },
                credentials: 'include', // Include credentials
            }),
        }),
        getOrderDetails: builder.query({
            query: orderId => ({
                url: `${ORDERS_URL}/${orderId}`,
                credentials: 'include', // Include credentials
            }),
            keepUnusedDataFor: 5,
        }),
        payOrder: builder.mutation({
            query: ({ orderId, details }) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: details,
                credentials: 'include', // Include credentials
            }),
        }),

        getPayPalClientId: builder.query({
            query: () => ({
                url: PAYPAL_URL,
            }),
            keepUnusedDataFor: 5,
        }),

        getMyOrders: builder.query({
            query: () => ({
                url: `${ORDERS_URL}/me`,
                credentials: 'include', // Include credentials
            }),
            keepUnusedDataFor: 5,
        }),
        getOrders: builder.query({
            query: () => ({
                url: ORDERS_URL,
                credentials: 'include', // Include credentials
            }),
            keepUnusedDataFor: 5,
        }),
        deliverOrder: builder.mutation({
            query: orderId => ({
                url: `${ORDERS_URL}/${orderId}/deliver`,
                method: 'PUT',
                credentials: 'include', // Include credentials
            }),
        }),
    }),
})

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useGetMyOrdersQuery,
    useGetOrdersQuery,
    useDeliverOrderMutation,
} = ordersApiSlice
