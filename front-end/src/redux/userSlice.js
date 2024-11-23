import { createSlice } from '@reduxjs/toolkit'

const initialUser = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    phone_number: '',
    last_login: '',
    role: '',
    refresh_token: ''
}

export const userSlice = createSlice({
    name: 'user_data',
    initialState: initialUser,
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload?._id
            state.email = action.payload?.email
            state.name = action.payload?.name
            state.avatar = action.payload?.avatar
            state.phone_number = action.payload?.phone_number
            state.last_login = action.payload?.last_login
            state.role = action.payload?.role
        },
        setLogout: (state, action) => {
            state._id = ''
            state.email = ''
            state.name = ''
            state.avatar = ''
            state.phone_number = ''
            state.last_login = ''
            state.role = '',
            state.refresh_token = ''
        }
    }
})

// Action creators are generated for each case reducer function
export const { setUserDetails, setLogout } = userSlice.actions

export default userSlice.reducer