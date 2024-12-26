import React from 'react'
import Logo from '@/assets/Banner/shoes_banner.png'

const MyCart = () => {  
    return (
        <section className='py-16'>
            <div className='container mx-auto'>
                <div>
                    <h2 className='text-xl font-bold'>Đơn hàng của tôi</h2>
                </div>
                <div className='bg-white rounded mt-6'>
                    <div className='flex items-center justify-between mx-5'>
                        <p className='font-semibold mt-3'>Đơn hàng: <span></span></p>
                        <p className='font-semibold mt-3'>Ngày nhận: <span></span></p>
                        <p className='font-semibold text-green-600 mt-3'>Đã nhận hàng</p>                       
                    </div>
                    <hr className='mx-5 mt-3'/>
                    <div className='mx-5 mt-3'>
                        <div className='grid grid-cols-3'>
                            <div className='w-20 h-20'>
                                <img 
                                    src={Logo}
                                    className='w-full h-full object-scale-down' 
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <h2>ABC</h2>
                            </div>
                            <div className='flex items-center justify-end'>
                                <p className='font-semibold'>Tổng tiền: <span></span></p>
                            </div>                          
                        </div>                       
                    </div>
                    <div className='mx-5 py-5 flex items-center justify-end'>
                        <button className='bg-transparent border hover:bg-orange-500 hover:text-white border-orange-600 outline-none rounded-md p-3 w-[135px] transition-all duration-300'>
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyCart
