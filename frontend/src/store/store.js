import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import cartSliceReducer from './slices/cart/cartSlice'
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
    },
    middleware: getDefualtMiddleware =>
        getDefualtMiddleware().concat(apiSlice.middleware),
    devTooles: true,
})

export default store
