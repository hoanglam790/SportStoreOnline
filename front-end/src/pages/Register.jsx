import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    async function registerUser(ev) {
        try{
            await axios.post('http://localhost:5000/register', {
                name,
                email,
                password
            })
            alert('Đăng ký thành công')
        } catch (error) {
            alert('Đăng ký thất bại')
        }
    }

    return (
        <section id='register' className='py-12'>
            <div className='font-[sans-serif] bg-gray-100 max-w-4xl flex items-center mx-auto md:h-screen p-4'>
                <div className='grid md:grid-cols-3 items-center rounded-xl overflow-hidden'>
                    <div className='max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4'>
                        <div>
                            <h4 className='text-white text-lg font-semibold'>Create Your Account</h4>
                            <p className='text-[13px] text-gray-300 mt-3 leading-relaxed'>Welcome to our registration page! Get started by creating your account.</p>
                        </div>
                        <div>
                            <h4 className='text-white text-lg font-semibold'>Simple & Secure Registration</h4>
                            <p className='text-[13px] text-gray-300 mt-3 leading-relaxed'>Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
                        </div>
                    </div>

                    <form onSubmit={registerUser} className='md:col-span-2 w-full py-6 px-6 sm:px-16'>
                        <div className='mb-6'>
                            <h3 className='text-gray-800 text-2xl font-bold'>Tạo tài khoản</h3>
                        </div>
                        <div className='space-y-6'>
                            <div>
                                <label className='text-gray-800 text-sm mb-2 block'>Họ tên: </label>
                                <div className='relative flex items-center'>
                                    <input type='text' required value={name} onChange={e => setName(e.target.value)} className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500' placeholder='Vui lòng nhập họ tên của bạn'/>
                                    <div className='text-xl absolute right-3'>
                                        <FaUser />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className='text-gray-800 text-sm mb-2 block'>Email: </label>
                                <div className='relative flex items-center'>
                                    <input type='email' required value={email} onChange={e => setEmail(e.target.value)} className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500' placeholder='Vui lòng nhập email của bạn'/>
                                    <div className='text-xl absolute right-3'>
                                        <HiOutlineMail />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-8'>
                                <label className='text-gray-800 text-sm block mb-2'>Mật khẩu: </label>
                                <div className='relative flex items-center'>
                                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500' placeholder='Hãy nhập mật khẩu của bạn' />
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
                                    <input type={showConfirmPassword ? 'text' : 'password'} className='text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500' placeholder='Hãy nhập lại mật khẩu của bạn' />
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
                                <Link to='' className='w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-gray-700 hover:bg-gray-800 rounded-md focus:outline-none'>
                                Đăng ký
                                </Link>
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