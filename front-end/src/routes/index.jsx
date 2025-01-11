import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import SearchPage from '@/pages/SearchPage'
import ForgotPassword from '@/pages/ForgotPassword'
import VerifyByOTP from '@/pages/VerifyByOTP'
import ResetPassword from '@/pages/ResetPassword'
import Dashboard from '@/pages_admin/Dashboard'
import CategoryAdmin from '@/pages_admin/CategoryAdmin'
import SubCategoryAdmin from '@/pages_admin/SubCategoryAdmin'
import AdminPermission from '@/pages_admin/AdminPermission'
import Home from '@/pages/Home'
import AllUsers from '@/pages_admin/AllUsers'
import Product from '@/pages/Product'
import NoItemInCart from '@/components/user/NoItemInCart'
import PageNotFound from '@/pages/PageNotFound'
import ProductAdmin from '@/pages_admin/ProductAdmin'
import ProductDisplayPage from '@/pages/ProductDisplayPage'
import ProductDetailPage from '@/pages/ProductDetailPage'
import Cart from '@/components/user/Cart'
import PaymentSuccess from '@/pages/PaymentSuccess'
import MyAccount from '@/pages/MyAccount'
import MyOrder from '@/pages/MyOrder'
import MyOrderDetail from '@/pages/MyOrderDetail'
import OrderAdmin from '@/pages_admin/OrderAdmin'
import PageNotFoundAdmin from '@/pages_admin/PageNotFoundAdmin'
import Warehouse from '@/pages_admin/Warehouse'

const router = createBrowserRouter([
    {
        path : '/',
        element : <App />,
        children : [
            {
                path : '',
                element : <Home />
            },           
            {
                path : 'search/:text',
                element : <SearchPage />
            },
            {
                path : 'products',
                element : <Product />
            },
            {
                path : 'no-item',
                element : <NoItemInCart />
            },
            {
                path : 'admin',
                element : <AdminPermission><Dashboard /></AdminPermission>,
                children : [
                    {
                        path : '*',
                        element : <PageNotFoundAdmin />
                    },
                    {
                        path : 'all-users',
                        element : <AdminPermission><AllUsers /></AdminPermission>
                    },
                    {
                        path : 'categories',
                        element : <AdminPermission><CategoryAdmin /></AdminPermission>
                    },
                    {
                        path : 'sub-categories',
                        element : <AdminPermission><SubCategoryAdmin /></AdminPermission>
                    },
                    {
                        path : 'products',
                        element : <AdminPermission><ProductAdmin /></AdminPermission>
                    },
                    {
                        path : 'orders',
                        element : <AdminPermission><OrderAdmin /></AdminPermission>
                    },
                    {
                        path : 'warehouse',
                        element : <AdminPermission><Warehouse /></AdminPermission>
                    }
                ]
            },
            {
                path : ':category',
                children : [
                    {
                        path : ':subCategory',
                        element : <ProductDisplayPage/>
                    }
                ]
            },
            {
                path : 'product/:id',
                element : <ProductDetailPage/>
            },
            {
                path : 'my-account',
                element : <MyAccount/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : 'my-order',
                element : <MyOrder />
            },
            {
                path : 'my-order/:id',
                element : <MyOrderDetail />
            },
            {
                path : 'checkout/success',
                element : <PaymentSuccess />
            }
        ]
    },
    {
        path : '*',
        element : <PageNotFound />
    },
    {
        path : 'login',
        element : <Login />
    },
    {
        path : 'register',
        element : <Register />
    },
    {
        path : 'forgot-password',
        element : <ForgotPassword />
    },
    {
        path : 'verification-password',
        element : <VerifyByOTP />
    },
    {
        path : 'reset-password',
        element : <ResetPassword />
    }
])

export default router