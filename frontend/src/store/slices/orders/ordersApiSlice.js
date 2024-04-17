import { ORDERS_URL } from '../../constants'
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
    }),
})

export const { useCreateOrderMutation } = ordersApiSlice
