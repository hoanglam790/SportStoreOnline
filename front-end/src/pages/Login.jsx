import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMailOpen } from 'react-icons/hi'
//import { IoEyeOutline, IoEyeOffSharp } from 'react-icons/io5'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    async function handleLogin(e) {
        try{
            await axios.post('http://localhost:5000/login', {email, password})
            alert('Đăng nhập thành công')
        } catch (error) {
            alert('Đăng nhập thất bại')
        }
    }

    return (
        <section id='login'>
            <div className='container mx-auto p-8'>
                <div className='font-[sans-serif] bg-gray-50 max-w-md w-full px-4 py-8 mx-auto'>
                    <form onSubmit={handleLogin}>
                        <div className='mb-12'>
                            <h3 className='text-gray-800 text-4xl text-center font-extrabold'>Đăng nhập</h3>
                        </div>
                        <div>
                            <label className='text-gray-800 text-sm block mb-2 px-2 py-1'>Email: </label>
                            <div className='relative flex items-center'>
                                <input type='text' required value={email} onChange={e => setEmail(e.target.value)} placeholder='Hãy nhập email' />
                                <div className='text-2xl absolute right-2'>
                                    <HiOutlineMailOpen />
                                </div>
                            </div>
                        </div>
                        <div className='mt-8'>
                            <label className='text-gray-800 text-sm block mb-2 px-2 py-1'>Mật khẩu: </label>
                            <div className='relative flex items-center'>
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder='Hãy nhập mật khẩu' />
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
                            <Link to='' className='w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none'>
                            Đăng nhập
                            </Link>
                        </div>
                        <div className='my-4 flex items-center gap-4'>
                            <hr className='w-full border-gray-300' />
                            <p className='text-sm text-gray-800 text-center'>Hoặc</p>
                            <hr className='w-full border-gray-300' />
                        </div>
                        <div className='mt-4'>
                            <Link to='' className='w-full flex items-center justify-center gap-4 py-2.5 px-4 text-sm tracking-wide text-gray-800 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none'>
                            <div className='text-xl'>
                                <FcGoogle />
                            </div>                            
                            Đăng nhập với Google
                            </Link>
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
