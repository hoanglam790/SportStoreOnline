import BannerPage from '@/components/user/BannerPage'
import Category from '@/components/user/Category'
import React, { useState } from 'react'
//import { IoMenu } from 'react-icons/io5'

const Home = () => {
    // const [isOpen, setIsOpen] = useState(false)
    // const toggleDropdown = () => {
    //     setIsOpen(!isOpen)
    // }

    return (
        <section>
            <div className='container mx-auto p-3'>
                {/** Hiển thị các ảnh banner */}
                <div className='py-2'>
                    <BannerPage />
                </div>

                {/** Hiển thị danh mục sản phẩm */}
                <div className='py-24'>
                    <Category />
                </div>
            </div>           
        </section>
    )
}

export default Home
