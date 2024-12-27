import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'
import deliveryAddressReducer from './deliveryAddressSlice'

export default configureStore({
    reducer: {
        user_data: userReducer,
        product_data: productReducer,
        cart_data: cartReducer,
        order_data: orderReducer,
        delivery_address_data: deliveryAddressReducer
    },
})
