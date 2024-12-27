import React, { useState } from 'react'
import { FaAddressBook, FaPhone, FaUser } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { TfiEmail } from 'react-icons/tfi'
import { useSelector } from 'react-redux'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import { toast } from 'react-toastify'

const UpdateUserData = ({ close, fetchUserData }) => {
    const user = useSelector(state => state?.user_data)
    const [userData, setUserData] = useState({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address
    })

    {/** Xử lý sự kiện thay đổi giá trị nhập liệu trong biểu mẫu (form) */}
    const handleInputChange = (e) => {
        const { name, value } = e.target //name: xác định tên của trường input - e: giá trị hiện tại mà người dùng đã nhập vào trường input đó
        setUserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmitData = async(e) => {
        e.preventDefault()
        try {
            const responseData = await Axios({
                ...connectApi.updateUser,
                data: userData
            })

            if(responseData.data.success){
                toast.success(responseData.data.message, {
                    position: 'top-center'
                })
                fetchUserData()
                close()
            }

            if(responseData.data.error){
                toast.error(responseData.data.message, {
                    position: 'top-center'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-600 bg-opacity-60 z-50 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-[600px] p-5 rounded-md'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold text-xl uppercase'>Chỉnh sửa thông tin cá nhân</h2>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoMdClose size={25} />
                    </button>          
                </div>
                <form onSubmit={handleSubmitData} className='mt-6'>
                    <h3 className='text-base text-gray-800  font-semibold mb-4'>Nhập thông tin của bạn:</h3>
                    <div className='space-y-3'>
                        <div className='relative flex items-center'>
                            <input 
                                type='text'
                                value={userData.name}
                                onChange={handleInputChange}
                                placeholder='Họ và tên'
                                className='bg-white text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400' 
                            />
                            <FaUser className='absolute right-3'/>
                        </div>

                        <div className='relative flex items-center'>
                            <input 
                                type='email'
                                value={userData.email}
                                placeholder='Email'
                                className='bg-gray-200 text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400'  
                                disabled
                            />
                            <TfiEmail className='absolute right-3' />
                        </div>
                                                    
                        <div className='relative flex items-center'>
                            <input 
                                type='number'
                                value={userData.phone_number}
                                name='phone_number'
                                onChange={handleInputChange}
                                placeholder='Số điện thoại'
                                className='bg-white text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400'  
                            />
                            <FaPhone className='absolute right-3 rotate-90' />
                        </div>
                        <div className='relative flex items-center'>
                            <input 
                                type='text'
                                value={userData.address}
                                name='address'
                                onChange={handleInputChange}
                                placeholder='Địa chỉ'
                                className='bg-white text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400'  
                            />
                            <FaAddressBook className='absolute right-3' />
                        </div>
                    </div>
                    <div className='flex items-center justify-center mt-8'>
                        <button
                            className='bg-transparent border border-gray-400 hover:bg-blue-600 hover:border-white hover:text-white font-semibold p-3 rounded-md w-[200px] uppercase'>
                            Xác nhận
                        </button>
                    </div>
                </form>               
            </div>
        </section>
    )
}

export default UpdateUserData
