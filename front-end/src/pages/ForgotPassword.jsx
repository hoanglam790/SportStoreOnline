import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineMailOpen } from 'react-icons/hi'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import toast from 'react-hot-toast'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'

const ForgotPassword = () => {
    const [userData, setUserData] = useState({
        email: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    
    const changeColorValue = Object.values(userData).every(e => e)

    const handleSubmitLogin = async(e) => {
        e.preventDefault()
        try {
            const responseData = await Axios({
                ...connectApi.forgotPassword,
                data: userData
            })

            // Thông báo lỗi
            if(responseData.data.error){
                toast.error(responseData.data.message)
            }

            if(responseData.data.success){
                toast.success(responseData.data.message)
                navigate('/verification-password', {
                    state: userData
                })
                setUserData({
                    email: ''
                })
                
            }

        } catch (error) {
            axiosErrorAnnounce(error)
        }
    }

    return (
        <section id='login'>
            <div className='container mx-auto p-8'>
                <div className='font-[sans-serif] bg-gray-50 max-w-md w-full px-4 py-8 mx-auto'>
                    <form onSubmit={handleSubmitLogin}>
                        <div className='mb-12'>
                            <h3 className='text-gray-800 text-4xl text-center font-extrabold'>Thông tin xác thực</h3>
                        </div>
                        <div>
                            <label className='text-gray-800 text-sm block mb-2 px-2 py-1'>Email: </label>
                            <div className='relative flex items-center'>
                                <input type='text' required 
                                    value={userData.email}
                                    name='email' 
                                    onChange={handleChange} 
                                    placeholder='Hãy nhập địa chỉ email mà bạn muốn khôi phục mật khẩu' 
                                    className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'/>
                                <div className='text-2xl absolute right-2'>
                                    <HiOutlineMailOpen />
                                </div>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <button disabled={!changeColorValue} className={`${changeColorValue ? 'w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none' 
                            : 
                            'w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none'}`}>
                            Xác nhận
                            </button>
                        </div>

                        <div className='my-4 flex items-center gap-4'>
                            <hr className='w-full border-gray-300' />
                            <p className='text-sm text-gray-800 text-center'>Hoặc</p>
                            <hr className='w-full border-gray-300' />
                        </div>
                
                        <div className='mt-8'>
                            <p className='text-gray-800 text-sm text-center mt-6'>
                                Bạn đã có tài khoản?
                                <Link to='/login' className='text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap'>
                                Đăng nhập tại đây
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ForgotPassword
