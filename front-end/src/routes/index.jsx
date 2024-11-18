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
            
        ]
    },
    {
        path: '/admin',
        element: <Dashboard />,
        children: [
            {
                path: 'category',
                element: <Category />
            },
            {
                path: 'sub-category',
                element: <SubCategory />
            }
        ]
    }
])

export default router