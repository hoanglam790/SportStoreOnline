import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    allCategory: [],
    allSubCategory: [],
    product: []
}

export const productSlice = createSlice({
    name: 'product_data',
    initialState: initialValue,
    reducers: {
        setAllCategories: (state, action) => {
            console.log('all cate redux', action.payload)
            state.allCategory = [...action.payload]
        }
    }
})

// Action creators are generated for each case reducer function
export const { setAllCategories } = productSlice.actions

export default productSlice.reducer