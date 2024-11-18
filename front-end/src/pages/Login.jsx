import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import toast from 'react-hot-toast'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import fetchUser from '@/utils/FetchUser'
import { useDispatch } from 'react-redux'
import { setUserDetails } from '@/redux/userSlice'

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
                ...connectApi.login,
                data: userData
            })

            // Thông báo lỗi
            if(responseData.data.error){
                toast.error(responseData.data.message)
            }

            if(responseData.data.success){
                toast.success(responseData.data.message)
                localStorage.setItem('accessToken', responseData.data.data.accessToken)
                localStorage.setItem('refreshToken', responseData.data.data.refreshToken)

                const updateUser = await fetchUser()
                dispatch(setUserDetails(updateUser.data))
                
                setUserData({
                    email: '',
                    password: ''
                })
                navigate('/')
            }

        } catch (error) {
            // Hiển thị thông báo lỗi từ API
            axiosErrorAnnounce(error)
        }
    }

    return (
        <section id='login'>
            <div className='container mx-auto p-8'>
                <div className='font-[sans-serif] bg-gray-50 max-w-md w-full px-4 py-8 mx-auto rounded-lg'>
                    <form onSubmit={handleSubmitLogin}>
                        <div className='mb-12'>
                            <h3 className='text-gray-800 text-4xl text-center font-extrabold'>Đăng nhập</h3>
                        </div>
                        <div>
                            <label className='text-gray-800 text-sm block mb-2 px-2 py-1'>Email: </label>
                            <div className='relative flex items-center'>
                                <input type='text' required 
                                    value={userData.email}
                                    name='email' 
                                    onChange={handleChange} 
                                    placeholder='Hãy nhập email' 
                                    className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'/>
                                <div className='text-2xl absolute right-2'>
                                    <HiOutlineMailOpen />
                                </div>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <label className='text-gray-800 text-sm block mb-2 px-2'>Mật khẩu: </label>
                            <div className='relative flex items-center'>
                                <input type={showPassword ? 'text' : 'password'} 
                                    value={userData.password}
                                    name='password'
                                    onChange={handleChange} 
                                    placeholder='Hãy nhập mật khẩu' 
                                    className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'/>
                                <div onClick={() => setShowPassword((prev) => !prev)} className='text-2xl absolute right-2 cursor-pointer opacity-50'>
                                    <span>
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </span>                                   
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between gap-4 mt-6'>
                            <div className='flex items-center px-2'>
                                <input type='checkbox' className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded' />
                                <label className='text-gray-800 ml-3 text-sm'>Nhớ tài khoản</label>
                            </div>
                            <div>
                                <Link to='/forgot-password' className='text-blue-600 text-sm font-semibold hover:underline'>
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <button disabled={!changeColorValue} className={`${changeColorValue ? 'w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none' 
                            : 
                            'w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none'}`}>
                            Đăng nhập
                            </button>
                        </div>
                        <div className='my-4 flex items-center gap-4'>
                            <hr className='w-full border-gray-300' />
                            <p className='text-sm text-gray-800 text-center'>Hoặc</p>
                            <hr className='w-full border-gray-300' />
                        </div>
                        <div className='mt-4'>
                            <button className='w-full flex items-center justify-center gap-4 py-2.5 px-4 text-sm tracking-wide text-gray-800 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none'>
                                <div className='text-xl'>
                                    <FcGoogle />
                                </div>                            
                                Đăng nhập với Google
                            </button>
                        </div>
                        <div className='mt-8'>
                            <p className='text-gray-800 text-sm text-center mt-6'>
                                Bạn chưa có tài khoản?
                                <Link to='/register' className='text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap'>
                                Đăng ký tại đây
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login
