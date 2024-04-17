import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './slices/apiSlice'
import cartSliceReducer from './slices/cart/cartSlice'
import authSliceReducer from './slices/users/authSlice'
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        cart: cartSliceReducer,
        auth: authSliceReducer,
    },
    middleware: getDefualtMiddleware =>
        getDefualtMiddleware().concat(apiSlice.middleware),
    devTooles: true,
})

export default store
