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
                credentials: 'include', // Include credentials
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
        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
                credentials: 'include', // Include credentials
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: userId => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
                credentials: 'include', // Include credentials
            }),
        }),
        updateUser: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/${data.userId}`,
                method: 'PUT',
                body: data,
                credentials: 'include', // Include credentials
            }),
            invalidatesTags: ['User'],
        }),
    }),
})
export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
} = usersApiSlice
