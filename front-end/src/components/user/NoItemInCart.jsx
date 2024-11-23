import React from 'react'
import NoItem from '@/assets/no-item-in-cart.png'
import { useNavigate } from 'react-router-dom'

const NoItemInCart = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

    return (
        <>
            <div className='my-6'>
                <div className='p-6 flex items-center justify-center'>
                    <img src={NoItem} className='w-[450px] h-[300px] mix-blend-multiply'/> {/** Hòa trộn ảnh với nền */}
                    {/*  */}
                </div>
                <p className='text-2xl font-medium text-center p-1 mx-auto'>Giỏ hàng trống</p>
                <p className='text-red-700 text-center font-medium p-3 mx-auto'>Không có sản phẩm nào trong giỏ hàng.</p>
            </div>
            
            <div className='flex items-center justify-center mb-5 pb-5'>
                <button onClick={handleNavigate} className='bg-blue-700 hover:bg-transparent hover:text-blue-800 border border-blue-600 outline-none rounded-md w-[400px] text-white text-xl font-semibold p-3'>Về trang chủ</button>
            </div>
            
        </>
    )
}

export default NoItemInCart
