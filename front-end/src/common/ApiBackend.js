export const baseURL = 'http://localhost:5000'

const connectApi = {
    // API người dùng
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
    
    // API tải hình ảnh lên Cloudinary
    uploadImage: {
        url: '/api/file/upload-image',
        method: 'POST'
    },
    checkImage: {
        url: '/api/file/check-image',
        method: 'GET'
    },

    // API danh mục sản phẩm
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

    // API danh mục sản phẩm phụ
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
    },

    // API sản phẩm
    createProduct: {
        url: '/api/products/create-product',
        method: 'POST'
    },
    getProduct: {
        url: '/api/products',
        method: 'POST'
    },
    getProductDetails: {
        url: '/api/products/get-product-details',
        method: 'POST'
    },
    getProductByCategory: {
        url: '/api/products/get-product-by-category',
        method: 'POST'
    },
    getProductByCateAndSubCate: {
        url: '/api/products/get-product-by-cate-and-subcate',
        method: 'POST'
    },
    updateProduct: {
        url: '/api/products/update-product',
        method: 'PUT'
    },
    deleteProduct: {
        url: '/api/products/delete-product',
        method: 'DELETE'
    },

    // API giỏ hàng
    addToCart: {
        url: '/api/cart/add-to-cart',
        method: 'POST'
    },
    getItemsInCart: {
        url: '/api/cart/get-cart',
        method: 'GET'
    },
    updateItemsInCart: {
        url: '/api/cart/update-cart',
        method: 'PUT'
    },
    deleteItemsInCart: {
        url: '/api/cart/delete-items-cart',
        method: 'DELETE'
    },

    // API đơn hàng
    createNewOrder: {
        url: '/api/order/pay-in-cash',
        method: 'POST'
    },
    getAllOrders: {
        url: '/api/order/get-all-orders',
        method: 'GET'
    },
    getOrderDetails: {
        url: '/api/order/get-order-details',
        method: 'POST'
    },

    // API giao hàng
    createNewDeliveryAddress: {
        url: '/api/delivery-address/add-delivery-address',
        method: 'POST'
    }
}

export default connectApi
