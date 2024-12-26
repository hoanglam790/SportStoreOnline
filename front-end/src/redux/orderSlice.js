import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    order: []
}

const orderSlice = createSlice({
    name: 'order_data',
    initialState: initialValue,
    reducers: {
        setOrders: ( state, action ) => {
            state.order = [...action.payload]
        }
    }
})

export const { setOrders } = orderSlice.actions
export default orderSlice.reducer