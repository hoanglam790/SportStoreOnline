import React from 'react'
import { Link } from 'react-router-dom'

const Product = () => {
    return (
        <section className='py-12'>
            <div className='container mx-auto'>
                <ul className='flex font-[sans-serif] space-x-4 pb-3 mb-4 mx-auto lg:max-w-7xl sm:max-w-full'>
                    <Link to={'/'} className='flex items-center text-gray-500 text-base cursor-pointer'>
                        Trang chủ
                    </Link>
                    <li className='text-black text-lg'>/</li>
                    <li className='flex items-center font-bold text-base'>Sản phẩm</li>
                </ul>
                <hr className='mx-auto mb-8 border-gray-400'/>
            </div>
        </section>
    )
}

export default Product
