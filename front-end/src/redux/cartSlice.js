import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cart_data',
    initialState: initialValue,
    reducers: {
        setAllItemsInCart: (state, action) => {
            state.cart = action.payload
        }
    }
})

export const { setAllItemsInCart } = cartSlice.actions
export default cartSlice.reducer