import React from 'react'
import Image from '@/assets/page-not-found.png'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

    return (
        <section className='bg-white dark:bg-gray-900'>
            <div className='px-4 py-8 mx-auto max-w-screen-xl lg:py-16 lg:px-6'>
                <div className='mx-auto max-w-screen-sm text-center'>
                    <div className='p-3 flex items-center justify-center'>
                        <img src={Image} className='w-[400px] h-[280px] mix-blend-normal'/> {/** Hòa trộn ảnh với nền */}
                    </div>
                    <p className='mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white'>Đã xảy ra lỗi...</p>
                    <p className='mb-10 text-lg font-medium text-gray-500 dark:text-gray-400'>Rất tiếc, chúng tôi không tìm thấy trang mà bạn yêu cầu. </p>
                    
                    <div className='flex items-center justify-center mb-5 pb-5'>
                        <button onClick={handleNavigate} className='bg-blue-700 hover:bg-transparent hover:text-blue-800 border border-blue-600 outline-none rounded-md w-[400px] text-white text-xl font-semibold p-3'>Về trang chủ</button>
                    </div>
                </div>   
            </div>
        </section>
    )
}

export default PageNotFound
