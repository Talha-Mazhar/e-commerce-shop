import { USERS_URL } from '../../constants'
import { apiSlice } from '../apiSlice'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
                credentials: 'include', // Include credentials
            }),
        }),
        register: builder.mutation({
            query: data => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
                credentials: 'include', // Include credentials
            }),
        }),

        profile: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data,
                credentials: 'include', // Include credentials
            }),
        }),
    }),
})
export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
} = usersApiSlice
