import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'

const store = configureStore({
    reducer: { [apiSlice.reducerPath]: apiSlice.reducer },
    middleware: getDefualtMiddleware =>
        getDefualtMiddleware().concat(apiSlice.middleware),
    devTooles: true,
})

export default store
