import React from 'react'
import { Link } from 'react-router-dom'
import { TbCategory } from 'react-icons/tb'
import { MdCategory, MdProductionQuantityLimits } from 'react-icons/md'
import { IoNewspaperSharp } from 'react-icons/io5'
import { TiShoppingCart } from 'react-icons/ti'
import { TbReportAnalytics } from 'react-icons/tb'
import { BiLogOut } from 'react-icons/bi'

const Sidebar_Header = () => {
    return (
        <div className='bg-[#121e31] mx-6 grid grid-cols-[340px] py-5 px-3 font-[sans-serif]'>
            <div className='text-white text-xl ml-4'>
                MENU
            </div>
            <hr className='my-4 border-gray-50' />  
            <ul className='space-y-4'>
                <li className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-4 py-3'>
                    <TbCategory size={25}/>
                    <Link to={'/admin/category'}>Danh mục sản phẩm chính</Link>
                </li>
                <li className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-4 py-3'>
                    <MdCategory size={25} />
                    <Link to={'/admin/sub-category'}>Danh mục sản phẩm phụ</Link>
                </li>
                <li className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-4 py-3'>
                    <MdProductionQuantityLimits size={25} />
                    <Link to={''}>Sản phẩm</Link>
                </li>
                <li className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-4 py-3'>
                    <IoNewspaperSharp size={25} />
                    <Link to={''}>Tin tức</Link>
                </li>
                <li className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-4 py-3'>
                    <TiShoppingCart size={25} />
                    <Link to={''}>Đơn hàng</Link>
                </li>
                <li className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-4 py-3'>
                    <TbReportAnalytics size={25} />
                    <Link to={''}>Báo cáo thống kê</Link>
                </li>

                <hr className='my-2 border-gray-50' />

                <li className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-4 py-3'>
                    <BiLogOut size={25} />
                    <Link to={''}>Thoát</Link>
                </li>
            </ul>           
        </div>       
    )
}

export default Sidebar_Header
