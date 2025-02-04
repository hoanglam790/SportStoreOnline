import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import BannerPage from '@/components/user/BannerPage'
import Category from '@/components/user/Category'
import NewsDisplay from '@/components/user/NewsDisplay'
import ProductDisplay from '@/components/user/ProductDisplay'
import urlConvert from '@/utils/urlConvert'

const Home = () => {
    const productData = useSelector(state => state.product_data.product)

    return (
        <section>
            <div className='container mx-auto p-3'>
                {/** Hiển thị các ảnh banner */}
                <div className='py-1'>
                    <BannerPage />
                </div>

                {/** Hiển thị danh mục sản phẩm */}
                <div className='py-16'>
                    <Category />                   
                </div>

                {/** Hiển thị sản phẩm nổi bật */}
                <div className='py-16'>
                    <ProductDisplay />
                </div>

                {/** Hiển thị tin tức nổi bật */}
                <div className='py-20'>
                    <NewsDisplay />
                </div>
                <div>
                    
                </div>
            </div>           
        </section>
    )
}

export default Home
