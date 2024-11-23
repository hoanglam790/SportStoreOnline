
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
    getAllUsers: {
        url: '/api/users/get-all-users',
        method: 'GET'
    },
    updateUser: {
        url: '/api/users/update-user',
        method: 'PUT'
    },
    logout: {
        url: '/api/users/logout',
        method: 'GET'
    },
    
    uploadImage: {
        url: '/api/file/upload-image',
        method: 'POST'
    },
    checkImage: {
        url: '/api/file/check-image',
        method: 'GET'
    },
    getCategory: {
        url: '/api/categories',
        method: 'GET'
    },
    createNewCategory: {
        url: '/api/categories/create-category',
        method: 'POST'
    },
    updateCategory: {
        url: '/api/categories/update-category',
        method: 'PUT'
    },
    deleteCategory: {
        url: '/api/categories/delete-category',
        method: 'DELETE'
    },

    getAllSubCate: {
        url: '/api/sub-categories',
        method: 'GET'
    },
    createSubCate: {
        url: '/api/sub-categories/create-sub-category',
        method: 'POST'
    },
    updateSubCate: {
        url: '/api/sub-categories/update-sub-category',
        method: 'PUT'
    },
    deleteSubCate: {
        url: '/api/sub-categories/delete-sub-category',
        method: 'DELETE'
    }
}

export default connectApi
