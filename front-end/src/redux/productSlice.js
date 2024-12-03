import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
    allCategory: [],
    allSubCategory: [],
    loadingCategory: false,
    product: []
}

export const productSlice = createSlice({
    name: 'product_data',
    initialState: initialValue,
    reducers: {
        setAllCategories: (state, action) => {
            //console.log('all cate redux', action.payload)
            state.allCategory = [...action.payload]
        },
        setAllSubCategories: (state, action) => {
            //console.log('all sub cate redux', action.payload)
            state.allSubCategory = [...action.payload]
        },
        setLoadingCategories: (state, action) => {
            state.loadingCategory = action.payload
        },
        setAllProducts: (state, action) => {
            //console.log('all product redux', action.payload)
            state.product = [...action.payload]
        }
    }
})

// Action creators are generated for each case reducer function
export const { setAllCategories, setAllSubCategories, setAllProducts, setLoadingCategories } = productSlice.actions

export default productSlice.reducer