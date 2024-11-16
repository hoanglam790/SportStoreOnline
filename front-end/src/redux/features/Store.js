const { configureStore } = require("@reduxjs/toolkit")
import CartSlice from "./cart/CartSlice"


const Store = configureStore({
    reducer: {
        cart: CartSlice
    }
})

export default Store