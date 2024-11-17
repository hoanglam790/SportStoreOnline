import React, { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import Axios from '@/utils/AxiosConfig'
import toast from 'react-hot-toast'
import connectApi from '@/common/ApiBackend'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const navigate = useNavigate()
    const currentLocation = useLocation()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [userData, setUserData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if(!(currentLocation?.state?.data?.success)){
            navigate('/')
        }

        if(currentLocation?.state?.email){
            setUserData((prev)=>{
                return{
                    ...prev,
                    email : currentLocation?.state?.email
                }
            })
        }
    },[])

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

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(userData.newPassword !== userData.confirmPassword){
            toast.error('Mật khẩu nhập vào phải giống nhau. Vui lòng kiểm tra lại !!!')
            return
        }

        try {
            const responseData = await Axios({
                ...connectApi.resetPassword,
                data: userData
            })

            // Thông báo lỗi
            if(responseData.data.error){
                toast.error(responseData.data.message)
            }

            if(responseData.data.success){
                toast.success(responseData.data.message)
                navigate('/login')
                setUserData({
                    email: '',
                    newPassword: '',
                    confirmPassword: ''
                })
                
            }

        } catch (error) {
            // Hiển thị thông báo lỗi từ API
            axiosErrorAnnounce(error)
        }
        
    }

    return (
        <section id='register' className='py-12'>
            <div className='font-[sans-serif] bg-gray-100 max-w-2xl flex items-center mx-auto p-4 rounded-lg'>
                <form onSubmit={handleSubmit} className='w-full p-12 sm:px-12 '>
                    <div className='mb-2'>
                        <h3 className='text-gray-800 text-2xl font-bold'>Tạo mật khẩu mới</h3>
                    </div>

                    <div className='space-y-6'>
                        <div className='mt-8'>
                            <label className='text-gray-800 text-sm block mb-2'>Mật khẩu: </label>
                            <div className='relative flex items-center'>
                                <input type={showPassword ? 'text' : 'password'}
                                    id='newPassword'
                                    value={userData.newPassword} 
                                    name='newPassword'
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
                            <button disabled={!changeColorValue} className={`${changeColorValue ? 'w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-green-700 hover:bg-green-500 rounded-md focus:outline-none' 
                                : 'w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none'}`}>
                            Đồng ý
                            </button>
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
        </section>       
    )
}

export default ResetPassword