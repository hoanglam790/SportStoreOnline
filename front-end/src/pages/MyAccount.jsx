import connectApi from '@/common/ApiBackend'
import UpdateUserData from '@/components/user/UpdateUserData'
import { setUserDetails } from '@/redux/userSlice'
import Axios from '@/utils/AxiosConfig'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const MyAccount = () => {
    const dispatch = useDispatch()
    const [openEditUserData, setOpenEditData] = useState(false)
    const user = useSelector(state => state.user_data)

    const fetchUserDetails = async() => {
        try {
            const responseData = await Axios({
                ...connectApi.getUser
            })

            if(responseData.data.success){
                dispatch(setUserDetails(responseData.data.data))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUserDetails()
    },[user])
    return (
        <section className='py-16'>
            <div className='container mx-auto'>
                <div className='bg-white p-4 rounded-md'>
                    <p className='text-xl font-bold uppercase'>Thông tin cá nhân</p>
                    <div className='mt-10 space-y-5'>
                        <p className='font-medium'>Họ tên: <span className='font-normal'>{user.name}</span></p>
                        <p className='font-medium'>Địa chỉ email: <span className='font-normal'>{user.email}</span></p>
                        <p className='font-medium'>Số điện thoại: <span className='font-normal'>{`0${user.phone_number}`}</span></p>
                        <p className='font-medium'>Địa chỉ: <span className='font-normal'>{user.address}</span></p>
                    </div>
                    <div className='flex items-center justify-center mt-8'>
                        <button 
                            onClick={() => setOpenEditData(true)}
                            className='bg-transparent border border-gray-400 hover:bg-orange-500 hover:border-white hover:text-white font-semibold p-3 rounded-md w-[200px] uppercase'>
                            Chỉnh sửa
                        </button>
                    </div>
                </div>
            </div>
            {
                openEditUserData && (
                    <UpdateUserData fetchUserData={fetchUserDetails} close={() => setOpenEditData(false)} />
                )
            }
        </section>
    )
}

export default MyAccount
