import React from 'react'
import NoOrder from '@/assets/not-order-found.png'

const NotOrderFoundAdmin = () => {
    return (
        <div className='my-2'>
            <div className='p-1 flex items-center justify-center'>
                <img src={NoOrder} className='w-[400px] h-[360px] mix-blend-multiply'/> {/** Hòa trộn ảnh với nền */}
            </div>
            <p className='text-black text-xl text-center font-medium p-3 mx-auto'>Không tìm thấy đơn hàng nào</p>
        </div>
    )
}

export default NotOrderFoundAdmin
