import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { GrSearch } from 'react-icons/gr'
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go'
import AdminMenu from './AdminMenu'

const Header = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const handleCloseAdminMenu = () => {
        setIsOpenMenu(false)
    }

    return (
        <>
        <header className='h-50 border-b sticky top-0 z-20 bg-white'>
            {/** Logo */}
            <div className='container mx-5 h-full flex items-center justify-between p-3'>
                <div className='h-full flex items-center gap-3'>
                    <Link to='/admin'>
                        <img
                            src={Logo}
                            width={80}
                            height={80}
                        />
                    </Link>
                    <p className='text-xl font-semibold'>Sport Store</p>
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

                {/** Thông tin tài khoản */}
                <div className='relative'>
                    <div onClick={() => setIsOpenMenu(pre => !pre)} className='flex items-center select-none gap-4 cursor-pointer'>
                        <div className='mt-4'>
                            <p>ABC</p>
                            <p>Admin</p>
                        </div>
                        
                        <span className='h-10 w-10 rounded-full'>
                            <img src={Logo} className='w-full h-full object-cover'></img>
                        </span>
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
                            <div className='absolute right-2 top-[85px]'>
                                <div className='bg-slate-300 rounded-sm p-4 min-w-52'>
                                    <AdminMenu close={handleCloseAdminMenu}/>
                                </div>                                       
                            </div>
                        )
                    }
                </div>
                
            </div>
        </header>
        </>        
    )
}

export default Header