import React, { useEffect, useState } from 'react'
import Logo from '../../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Search from './Search'
import { FaUserCircle } from 'react-icons/fa'
import { TiShoppingCart } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go'
import { GrSearch } from 'react-icons/gr'
import UserMenu from './UserMenu'


const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState({
        text: ''
    })

    const user = useSelector((state) => state?.user_data)
    
    // Tạo thanh menu
    const navigation = [
        {
            title: 'Trang chủ',
            href: ''
        },
        {
            title: 'Sản phẩm',
            href: 'products'
        },
        {
            title: 'Tin tức',
            href: 'news'
        },
        {
            title: 'Liên hệ',
            href: 'contact'
        }
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchText((prev) => {
            return{
                ...prev,
                [name]: value
            }
        })
    }

    const handleCloseUserMenu = () => {
        setIsOpenMenu(false)
    }

    const redirectToSearchPage = () => {
        navigate(`/search/${searchText}`)
    }

    return (
        <header className='h-32 border-b fixed top-0 left-0 w-full bg-white z-50'>
            {
                user.role === 'Admin' ? (
                <>
                    <div className='container mx-auto h-full flex items-center justify-between p-3 gap-6'>
                        {/* Logo  */}
                        <div className='h-full flex items-center gap-3'>
                            <Link to='/admin'>
                                <img
                                    src={Logo}
                                    width={100}
                                    height={100}
                                    className='hidden lg:block'
                                />
                            </Link>
                            <Link to='/'>
                                <img
                                    src={Logo}
                                    width={100}
                                    height={100}
                                    className='lg:hidden'
                                />
                            </Link>
                            <p className='text-xl font-semibold text-black'>Sport Store</p>
                        </div>
                        
                        {/** Tìm kiếm */}
                        <div className='min-w-[250px] lg:min-w-[400px] h-12 rounded-md border overflow-hidden focus-within:border-orange-400'>
                            <button className='flex items-center justify-between ml-auto w-full h-full p-3 text-neutral-500'>
                                <input type='text' 
                                    placeholder='Tìm kiếm...' 
                                    className='w-full h-full bg-transparent outline-none'/>
                                <GrSearch className=' fill-gray-600'/>
                            </button>                       
                        </div>

                        {/* Cart and Login  */}
                        <div className=''>
                            <button className='text-neutral-600 lg:hidden'>
                                <FaUserCircle size={25} />
                            </button>

                            <div className='items-center hidden lg:flex gap-10'>
                                {
                                    user._id ? (
                                        <div className='relative'>
                                            <div onClick={() => setIsOpenMenu(pre => !pre)} className='flex items-center select-none gap-2 cursor-pointer'>
                                                <p>Tài khoản</p>
                                                {
                                                    isOpenMenu ? (
                                                        <GoTriangleUp size={25}/>
                                                    ) : (
                                                        <GoTriangleDown size={25}/> 
                                                    )
                                                }                                        
                                            </div>
                                            {
                                                isOpenMenu && (
                                                    <div className='absolute right-2 top-10'>
                                                        <div className='bg-slate-300 rounded-sm p-4 min-w-52'>
                                                            <UserMenu close={handleCloseUserMenu}/>
                                                        </div>                                       
                                                    </div>
                                                )
                                            }                                           
                                        </div>
                                    ) : (
                                        <Link to='/login' className='text-base px-2 font-medium hover:text-blue-700'>Đăng nhập</Link>  
                                    )
                                }
                            </div>
                        </div>
                
                    </div>
                </>
                ) : (
                <>
                    <div className='container mx-auto h-full flex items-center justify-between p-3'>
                        {/* Logo  */}
                        <div className='h-full'>
                            <Link to='/'>
                                <img
                                    src={Logo}
                                    width={100}
                                    height={100}
                                    className='hidden lg:block'
                                />
                            </Link>
                            <Link to='/'>
                                <img
                                    src={Logo}
                                    width={100}
                                    height={100}
                                    className='lg:hidden'
                                />
                            </Link>
                        </div>

                        {/* Navbar */}
                        <nav className='hidden md:flex items-center gap-3 lg:gap-5'>
                            {
                                navigation.map((nav, index) => {
                                    return (
                                        <div>
                                            <NavLink key={nav.title} to={nav.href} 
                                                className={({isActive})=>`px-3 font-bold hover:text-blue-800 ${isActive && 'text-blue-700 max-lg:border-b max-lg:py-3 relative lg:after:absolute lg:after:block lg:after:bg-pink-500 lg:after:w-full lg:after:h-[3px] lg:after:-bottom-4'}`}>
                                                {nav.title}
                                            </NavLink>
                                        </div>
                                    )
                                })
                            }
                        </nav>

                        {/* Search  */}
                        <div className='min-w-[220px] lg:min-w-[330px] h-12 rounded-md border overflow-hidden focus-within:border-orange-600'>
                            <button className='flex items-center justify-between ml-auto w-full h-full p-3 text-neutral-500'>
                                <input type='text'
                                    value={searchText.text}
                                    name='text'
                                    onChange={handleInputChange}
                                    placeholder='Tìm kiếm...' 
                                    className='w-full h-full bg-transparent outline-none'
                                />
                                <GrSearch onClick={redirectToSearchPage} className='fill-gray-600'/>
                            </button>                       
                        </div>

                        {/* Cart and Login  */}
                        <div className=''>
                            <button className='text-neutral-600 lg:hidden'>
                                <FaUserCircle size={25} />
                            </button>

                            <div className='items-center hidden lg:flex gap-10'>
                                {
                                    user._id ? (
                                        <div className='relative'>
                                            <div onClick={() => setIsOpenMenu(pre => !pre)} className='flex items-center select-none gap-2 cursor-pointer'>
                                                <p>Tài khoản</p>
                                                {
                                                    isOpenMenu ? (
                                                        <GoTriangleUp size={25}/>
                                                    ) : (
                                                        <GoTriangleDown size={25}/> 
                                                    )
                                                }                                        
                                            </div>
                                            {
                                                isOpenMenu && (
                                                    <div className='absolute right-2 top-10'>
                                                        <div className='bg-slate-300 rounded-sm p-4 min-w-52'>
                                                            <UserMenu close={handleCloseUserMenu}/>
                                                        </div>                                       
                                                    </div>
                                                )
                                            }                                           
                                        </div>
                                    ) : (
                                        <Link to='/login' className='text-base px-2 font-medium hover:text-blue-700'>Đăng nhập</Link>  
                                    )
                                }
                                
                                <button className='flex items-center relative'>
                                    <div>
                                        <TiShoppingCart size={30}/>
                                    </div>
                                    <div className='bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-2'>
                                        <p className='text-xs'>0</p>
                                    </div>
                                </button>
                            </div>
                        </div>               
                    </div>
                </>
                )
            }           
        </header>
    )
}

export default Header
