import { Upload } from "lucide-react"

export const baseURL = 'http://localhost:5000'

const connectApi = {
    register: {
        url: '/api/users/register',
        method: 'POST'
    },
    login: {
        url: '/api/users/login',
        method: 'POST'
    },
    forgotPassword: {
        url: '/api/users/forgot-password',
        method: 'PUT'
    },
    verifyPasswordByOtp: {
        url: '/api/users/verify-forgot-password',
        method: 'PUT'
    },
    resetPassword: {
        url: '/api/users/reset-password',
        method: 'PUT'
    },
    refreshToken: {
        url: '/api/users/refresh-token',
        method: 'POST'
    },
    getUser: {
        url: '/api/users/get-user',
        method: 'GET'
    },
    logout: {
        url: '/api/users/logout',
        method: 'GET'
    },
    uploadImage: {
        url: '/api/file/upload-image',
        method: 'POST'
    },
    getCategory: {
        url: '/api/categories',
        method: 'GET'
    },
    createNewCategory: {
        url: '/api/categories/create-category',
        method: 'POST'
    }
}

export default connectApi
