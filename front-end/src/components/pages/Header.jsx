import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import { GrSearch } from 'react-icons/gr'
import { FaUserCircle } from 'react-icons/fa'
import { TiShoppingCart } from 'react-icons/ti'
import { IoIosMenu, IoMdClose } from 'react-icons/io'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <header className='flex border-b py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
            {/* Logo */}
            <div className='flex  items-center gap-12 w-full'>
                <Link to='/'>
                    <img src={Logo} width={80} height={50} />   
                </Link>

                {/* Menu Desktop */}
                <div className='max-lg:hidden lg:!block'>
                    <ul className='hidden md:flex lg:flex lg:mx-10 lg:gap-x-8'>
                        <li className='block antialiased font-sans text-sm font-light leading-normal'>
                            <Link
                            to='/'
                            className='flex items-center gap-1 p-1 font-bold hover:text-blue-700'
                            >
                            Trang chủ
                            </Link>
                        </li>
                        <li className='block antialiased font-sans text-sm font-light leading-normal'>
                            <Link
                            to='/'
                            className='flex items-center gap-1 p-1 font-bold hover:text-blue-700'
                            >
                            Trang chủ
                            </Link>
                        </li>
                        <li className='block antialiased font-sans text-sm font-light leading-normal'>
                            <Link
                            to='/'
                            className='flex items-center gap-1 p-1 font-bold hover:text-blue-700'
                            >
                            Trang chủ
                            </Link>
                        </li>
                        <li className='block antialiased font-sans text-sm font-light leading-normal'>
                            <Link
                            to='/'
                            className='flex items-center gap-1 p-1 font-bold hover:text-blue-700'
                            >
                            Trang chủ
                            </Link>
                        </li>
                        <li className='block antialiased font-sans text-sm font-light leading-normal'>
                            <Link
                            to='/'
                            className='flex items-center gap-1 p-1 font-bold hover:text-blue-700'
                            >
                            Trang chủ
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Menu Mobile */}
                <nav className={`${isMenuOpen ? 'flex items-center flex-col gap-y-10 fixed top-32 right-8 bg-gray-100 rounded-2xl shadow-md w-64 transition-all duration-300' : 'flex items-center flex-col gap-y-10 fixed top-32 bg-gray-100 rounded-2xl shadow-md w-64 transition-all duration-300 -right-[100%]'}`}>
                    <div className='my-6 flex-1'>
                        <ul className='mt-6 space-y-6'>
                            <li className='flex text-sm text-black hover:text-white cursor-pointer'>
                                <Link
                                    to='/'
                                    className='flex items-center gap-1 p-1 font-bold hover:text-blue-700'
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li className='flex text-sm text-black hover:text-white cursor-pointer'>
                                <Link
                                    to='/'
                                    className='flex items-center gap-1 p-1 font-bold hover:text-blue-700'
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li className='flex text-sm text-black hover:text-white cursor-pointer'>
                                <Link
                                    to='/'
                                    className='flex items-center gap-1 p-1 font-bold hover:text-blue-700'
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li className='flex text-sm text-black hover:text-white cursor-pointer'>
                                <Link
                                    to='/'
                                    className='flex items-center gap-1 p-1 font-bold hover:text-blue-700'
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li className='flex text-sm text-black hover:text-white cursor-pointer'>
                                <Link
                                    to='/'
                                    className='flex items-center gap-1 p-1 font-bold hover:text-blue-700'
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            
                        </ul>
                    </div>
                </nav>
                

                {/* Search */}
                <div className='flex gap-x-6 gap-y-4 ml-auto'>
                    <div className='flex border-2 focus-within:border-gray-400 rounded px-4 py-3 overflow-hidden max-w-60 max-lg:hidden'>
                        <input type='text' placeholder='Tìm kiếm...' className='w-full text-sm bg-transparent rounded outline-none pr-2'/>
                        <div className='text-lg h-10 flex items-center'>
                            <GrSearch className='cursor-pointer fill-gray-600'/>
                        </div>                   
                    </div>
                </div>

                {/* User, Cart, Login, Register */}
                <div className='flex items-center gap-3 space-x-7'>               
                    <div className='text-3xl relative'>
                        <span>
                            <TiShoppingCart />
                        </span>
                        <div className='bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-2'>
                            <p className='text-xs'>0</p>
                        </div>                   
                    </div>
                    <div className='text-3xl'>
                        <FaUserCircle />
                    </div>
                    <div>
                        <Link to='/login' className='px-5 py-2 text-sm rounded-lg text-white border-2 border-[#007bff] bg-[#007bff] hover:bg-[#004bff]'>
                        Đăng nhập
                        </Link>
                    </div>
                </div>
                <div>
                    {!isMenuOpen ? 
                    (<IoIosMenu className='lg:hidden block cursor-pointer hover:text-blue-600 rounded-md' onClick={toggleMenu} />) 
                    : 
                    (<IoMdClose className='lg:hidden block cursor-pointer hover:text-blue-600 rounded-md' onClick={toggleMenu} />)}
                </div>
            </div>
        </header>
    )
}

export default Header
