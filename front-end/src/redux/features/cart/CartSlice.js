const { createSlice } = require("@reduxjs/toolkit")


const initalState = {
    cartItems: []
}

const CartSlice = createSlice({
    name: 'cart',
    initialState: initalState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id)
            if(!existingItem){
                state.cartItems.push(action.payload)
                alert('Đã thêm sản phẩm thành công !')
            }
            else {
                alert('Sản phẩm đã tồn tại.')
            }
        }
    }
})

export const { addToCart } = CartSlice.actions
export default CartSlice.reducer