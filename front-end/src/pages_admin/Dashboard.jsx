import UserMenu from '@/components/user/UserMenu'
import { setUserDetails } from '@/redux/userSlice'
import fetchUser from '@/utils/FetchUser'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
            <div className='container mx-auto p-3 grid grid-cols-[300px,1fr] gap-2'>
                <div className='bg-slate-500 p-3 sticky top-[128px] max-h-[calc(90vh-130px)] border-r z-10'>
                    <UserMenu />
                </div>

                <div className='flex-1 bg-white min-h-[100vh] mt-4'>
                    <Outlet />
                </div>
            </div>
        </section>
        </>
    )
}

export default Dashboard
