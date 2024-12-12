import BannerPage from '@/components/user/BannerPage'
import Category from '@/components/user/Category'
import NewsDisplay from '@/components/user/NewsDisplay'
import ProductDisplay from '@/components/user/ProductDisplay'
import urlConvert from '@/utils/urlConvert'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    //const loadingCategory = useSelector(state => state.product_data.loadingCategory)
    const categoryData = useSelector(state => state.product_data.allCategory)

    return (
        <section>
            <div className='container mx-auto p-3'>
                {/** Hiển thị các ảnh banner */}
                <div className='py-2'>
                    <BannerPage />
                </div>

                {/** Hiển thị danh mục sản phẩm */}
                <div className='py-16'>
                    <Category />                   
                </div>

                {/** Hiển thị sản phẩm nổi bật */}
                <div className='py-16'>
                {
                    categoryData.map((c,index) => {
                        return(
                            <ProductDisplay 
                                key={c?._id}
                                id={c?._id}
                                name={c?.name}
                            />
                        )
                    })
                }                
                </div>

                {/** Hiển thị tin tức nổi bật */}
                <div className='py-20'>
                    <NewsDisplay />
                </div>
            </div>           
        </section>
    )
}

export default Home
