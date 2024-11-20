import { createBrowserRouter } from "react-router-dom"
import App from '../App'
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import SearchPage from "@/pages/SearchPage"
import ForgotPassword from "@/pages/ForgotPassword"
import VerifyByOTP from "@/pages/VerifyByOTP"
import ResetPassword from "@/pages/ResetPassword"
import Dashboard from "@/pages_admin/Dashboard"
import Category from '../pages_admin/Category'
import SubCategory from "@/pages_admin/SubCategory"
import AdminPermission from "@/pages_admin/AdminPermission"
import Profile from "@/pages_admin/Profile"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
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
                path: 'admin',
                element: <AdminPermission><Dashboard /></AdminPermission>,
                children: [
                    {
                        path: 'profile',
                        element: <AdminPermission><Profile /></AdminPermission>
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