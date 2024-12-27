import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    deliveryAddress: []
}

const deliveryAddressSlice = createSlice({
    name: 'delivery_address_data',
    initialState: initialValue,
    reducers: {
        setAllDeliveryAddresses: (state, action) => {
            state.deliveryAddress = [...action.payload]
        }
    }
})

export const { setAllDeliveryAddresses } = deliveryAddressSlice.actions
export default deliveryAddressSlice.reducer