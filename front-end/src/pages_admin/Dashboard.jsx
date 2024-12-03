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
            <div className='p-3 grid grid-cols-[330px,1fr] gap-2'>
                {/** Nội dung bên trái */}
                <div className='bg-slate-500 p-3 sticky top-[128px] max-h-[calc(88vh-120px)] border-r'>
                    <UserMenu />
                </div>

                {/** Nội dung bên phải */}
                <div className='flex-1 bg-white min-h-[75vh]'>
                    <Outlet />
                </div>
            </div>
        </section>
        </>
    )
}

export default Dashboard
