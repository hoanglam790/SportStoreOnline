import React from 'react'
import NoOrder from '@/assets/not-order-found.png'
import { useNavigate } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5'

const NotOrderFound = () => {
    const navigate = useNavigate()
    
    const handleNavigate = () => {
        navigate('/')
    }
    return (
        <>
            <div className='my-2'>
                <div className='p-1 flex items-center justify-center'>
                    <img src={NoOrder} className='w-[400px] h-[350px] mix-blend-multiply'/> {/** Hòa trộn ảnh với nền */}
                    {/*  */}
                </div>
                <p className='text-black text-center font-medium p-3 mx-auto'>Bạn không có đơn hàng nào</p>
            </div>
            
            <div className='flex items-center justify-center mb-5 pb-5'>
                <button onClick={handleNavigate} className='bg-blue-700 hover:bg-transparent hover:text-blue-800 border border-blue-600 outline-none rounded-md w-[400px] text-white text-xl font-semibold p-3 flex items-center justify-center gap-2'>
                    <IoChevronBack size={22}/>
                    Về trang chủ
                </button>
            </div>
        </>
    )
}

export default NotOrderFound
