import React from 'react'
import Image from '@/assets/page-not-found.png'

const PageNotFoundAdmin = () => {
    return (
        <div className='bg-white dark:bg-gray-900 '>
            <div className='px-3 py-6 lg:py-14 lg:px-6'>
                <div className='text-center'>
                    <div className='p-4 flex items-center justify-center'>
                        <img src={Image} className='w-[400px] h-[300px] mix-blend-normal'/> {/** Hòa trộn ảnh với nền */}
                    </div>
                    <p className='mb-5 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>Đã xảy ra lỗi...</p>
                    <p className='mb-10 text-lg font-medium text-gray-500 dark:text-gray-400'>Không tìm thấy trang mà bạn yêu cầu. </p>
                </div>   
            </div>
        </div>
    )
}

export default PageNotFoundAdmin
