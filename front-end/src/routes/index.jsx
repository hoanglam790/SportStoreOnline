import { createBrowserRouter } from "react-router-dom"
import App from '../App'
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import SearchPage from "@/pages/SearchPage"
import ForgotPassword from "@/pages/ForgotPassword"
import VerifyByOTP from "@/pages/VerifyByOTP"
import ResetPassword from "@/pages/ResetPassword"
import Dashboard from "@/pages_admin/Dashboard"
import Category from '@/pages_admin/Category'
import SubCategory from "@/pages_admin/SubCategory"
import AdminPermission from "@/pages_admin/AdminPermission"
import Home from "@/pages/Home"
import AllUsers from "@/pages_admin/AllUsers"
import Product from "@/pages/Product"
import NoItemInCart from "@/components/user/NoItemInCart"
import PageNotFound from "@/pages/PageNotFound"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '*',
                element: <PageNotFound />
            },
            {
                path: '',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'verification-password',
                element: <VerifyByOTP />
            },
            {
                path: 'reset-password',
                element: <ResetPassword />
            },
            {
                path: 'product',
                element: <Product />
            },
            {
                path: 'no-item',
                element: <NoItemInCart />
            },
            {
                path: 'admin',
                element: <AdminPermission><Dashboard /></AdminPermission>,
                children: [
                    {
                        path: '*',
                        element: <PageNotFound />
                    },
                    {
                        path: 'all-users',
                        element: <AdminPermission><AllUsers /></AdminPermission>
                    },
                    {
                        path: 'category',
                        element: <AdminPermission><Category /></AdminPermission>
                    },
                    {
                        path: 'sub-category',
                        element: <AdminPermission><SubCategory /></AdminPermission>
                    }
                ]
            }            
        ]
    }
    
])

export default router