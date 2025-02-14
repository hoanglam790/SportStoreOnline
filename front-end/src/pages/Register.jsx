import React, { useState } from 'react'
//import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Axios from '../utils/AxiosConfig'
import Swal from 'sweetalert2'
import connectApi from '@/common/ApiBackend'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import { Link, useNavigate } from 'react-router-dom'
import { CgSpinner } from 'react-icons/cg'
//import axios from 'axios'

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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

    const registerNewUser = async(e) => {
        {/** Ngừng hành động gửi form mặc định khi nhấn nút Đăng ký */}
        e.preventDefault()
        
        {/** Kiểm tra mật khẩu và xác nhận mật khẩu khi nhập vào */}
        if(userData.password !== userData.confirmPassword){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Mật khẩu nhập vào phải giống nhau. Vui lòng kiểm tra lại !!!',
                showConfirmButton: false,
                timer: 3000,
                customClass: {
                    title: 'text-xl font-semibold'
                }
            })
            return
        }

        try {
            setIsLoading(true)
            {/** Gọi API từ Backend */}
            //const responseData = await axios.post('http://localhost:5000/api/users/register', userData)
            const responseData = await Axios({
                ...connectApi.register,
                data: userData
            })
            
            {/** Thông báo lỗi */}
            if(responseData.data.error){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: responseData.data.message,                   
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        title: 'text-xl font-semibold'
                    }
                })
            }

            {/** Nếu đăng ký thành công thì chuyển hướng về trang Đăng nhập
                Cài đặt mới (reset) các ô nhập liệu về trạng thái ban đầu (chưa nhập) */}
            if(responseData.data.success){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: responseData.data.message,                 
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        title: 'text-xl font-semibold'
                    }
                })

                setUserData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                })
                navigate('/login')
            }

        } catch (error) {
            {/** Hiển thị thông báo lỗi từ API */}
            axiosErrorAnnounce(error)
        } finally {
            setIsLoading(false)
        }
        
    }

    return (
        <section id='register' className='py-2'>
            <div className='font-[sans-serif] bg-gray-200 border border-b max-w-4xl flex items-center mx-auto md:h-screen p-4 rounded-lg'>
                <div className='grid md:grid-cols-3 items-center rounded-xl overflow-hidden mb-8'>
                    <div className='flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4'>
                        <div>
                            <h4 className='text-white text-lg font-semibold'>Create Your Account</h4>
                            <p className='text-[13px] text-gray-300 mt-3 leading-relaxed'>Welcome to our registration page! Get started by creating your account.</p>
                        </div>
                        <div>
                            <h4 className='text-white text-lg font-semibold'>Simple & Secure Registration</h4>
                            <p className='text-[13px] text-gray-300 mt-3 leading-relaxed'>Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
                        </div>
                    </div>

                    <form onSubmit={registerNewUser} className='md:col-span-2 w-full py-6 px-4 sm:px-16'>
                        <div className='mb-6'>
                            <h3 className='text-gray-800 text-2xl font-bold'>Tạo tài khoản</h3>
                        </div>

                        <div className='space-y-6'>
                            <div>
                                <label className='text-gray-800 text-sm mb-2 block'>Họ tên: </label>
                                <div className='relative flex items-center'>
                                    <input type='text' required 
                                        value={userData.name}
                                        name='name'
                                        onChange={handleChange}
                                        className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500' 
                                        placeholder='Vui lòng nhập họ tên của bạn'/>
                                    <div className='text-xl absolute right-3'>
                                        <FaUser />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className='text-gray-800 text-sm mb-2 block'>Email: </label>
                                <div className='relative flex items-center'>
                                    <input type='email' required 
                                        value={userData.email}
                                        name='email'
                                        onChange={handleChange}
                                        className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500' placeholder='Vui lòng nhập email của bạn'/>
                                    <div className='text-xl absolute right-3'>
                                        <HiOutlineMail />
                                    </div>
                                </div>
                            </div>

                            <div className='mt-8'>
                                <label className='text-gray-800 text-sm block mb-2'>Mật khẩu: </label>
                                <div className='relative flex items-center'>
                                    <input type={showPassword ? 'text' : 'password'}
                                        id='password'
                                        value={userData.password} 
                                        name='password'
                                        onChange={handleChange}
                                        className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500' placeholder='Hãy nhập mật khẩu của bạn' />
                                    <div onClick={() => setShowPassword((prev) => !prev)} className='text-xl absolute right-3 cursor-pointer opacity-50'>
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

                            <div className='mt-8'>
                                <label className='text-gray-800 text-sm block mb-2'>Xác nhận mật khẩu: </label>
                                <div className='relative flex items-center'>
                                    <input type={showConfirmPassword ? 'text' : 'password'}
                                        id='confirmPassword'
                                        value={userData.confirmPassword}
                                        name='confirmPassword'
                                        onChange={handleChange}
                                        className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500' placeholder='Hãy nhập lại mật khẩu của bạn' />
                                    <div onClick={() => setShowConfirmPassword((prev) => !prev)} className='text-xl absolute right-3 cursor-pointer opacity-50'>
                                        <span>
                                            {showConfirmPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )}
                                        </span>                                   
                                    </div>
                                </div>
                            </div>
                            <div className='mt-12'>
                                {
                                    isLoading ? (
                                        <button disabled={!changeColorValue} className='w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-green-700 hover:bg-green-500 rounded-md focus:outline-none'>
                                            <CgSpinner size={30} className='animate-[spin_0.8s_linear_infinite]'/>
                                        </button>
                                    ) : (
                                        <button disabled={!changeColorValue} className={`${changeColorValue ? 'w-full flex items-center justify-center gap-4 py-3.5 px-5 text-sm tracking-wide text-white bg-green-700 hover:bg-green-500 rounded-md focus:outline-none' 
                                            : 'w-full flex items-center justify-center gap-4 py-3.5 px-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none cursor-not-allowed'}`}>
                                        Đăng ký
                                        </button>
                                    )
                                }

                                
                            </div>
                        </div>
                        <div className='mt-8'>
                            <p className='text-gray-800 text-sm text-center mt-6'>
                                Bạn đã có tài khoản?
                                <Link to='/login' className='text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap'>
                                Đăng nhập ngay
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>       
    )
}

export default Register