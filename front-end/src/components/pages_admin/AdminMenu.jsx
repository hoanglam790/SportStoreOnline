import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'

const AdminMenu = () => {
    return (
        <div className=''>
            <div className='text-[15px] grid gap-4 py-4'>
                <div className='flex items-center hover:text-blue-700 p-1 gap-2'>
                    <FaUser size={17}/>
                    <Link to={''}>Thông tin tài khoản</Link>
                </div>
                <div className='flex items-center hover:text-blue-700 gap-2'>
                    <BiLogOut size={22}/>
                    <button>Đăng xuất</button>
                </div>
                
            </div>
        </div>
    )
}

export default AdminMenu
