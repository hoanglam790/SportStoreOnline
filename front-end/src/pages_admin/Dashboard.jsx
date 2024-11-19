import Header from '@/components/pages_admin/Header'
import Sidebar_Header from '@/components/pages_admin/Sidebar_Header'
import { setUserDetails } from '@/redux/userSlice'
import fetchUser from '@/utils/FetchUser'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    const dispatch = useDispatch()

    const fetchUsers = async() => {
        const userData = await fetchUser()
        dispatch(setUserDetails(userData.data))
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
        <section className='bg-white'>
            <Header />
            <div className='container flex lg:flex-row flex-col gap-2'>
                <div className='py-4 sticky top-24 max-h-[calc(100vh-150px)] overflow-y-auto hidden lg:block border-r'>
                    <Sidebar_Header />
                </div>
                <div className='flex-1 min-h-[100vh] mt-4'>
                    <Outlet />
                </div>
            </div>
        </section>
        </>
    )
}

export default Dashboard
