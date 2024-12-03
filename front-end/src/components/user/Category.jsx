import React, { useEffect, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import urlConvert from '@/utils/urlConvert'


const Category = () => {
    const loadingCategory = useSelector(state => state.product_data.loadingCategory)
    const categoryData = useSelector(state => state.product_data.allCategory)
    const subCategoryData = useSelector(state => state.product_data.allSubCategory)
    const navigate = useNavigate()

    // Xử lý khi nhấn vào danh mục sản phẩm => chuyển trang danh mục sản phẩm phụ tương ứng
    const handleRedirectProductList = (id,cate) => {
        const subCate = subCategoryData.find(sc => {
            const filterData = sc.category.some(c => {
                return c._id == id
            })
            return filterData ? true : null
        })
        const url = `/${urlConvert(cate)}-${id}/${urlConvert(subCate.name)}-${subCate._id}`
        navigate(url)
    }

    return (
        <section>
            <div className='title mb-5 text-center'>
                <h2 className='text-3xl font-extrabold text-gray-800 inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-6 after:mx-auto after:bg-blue-800 after:rounded-full'>                  
                    Danh mục sản phẩm
                </h2>
                <p className='text-base text-center mt-10'>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
                </p>
            </div>

            <div className='w-full max-h-screen relative'>
                <div className='grid md:grid-cols-4 lg:grid-cols-6 gap-6 h-full rounded cursor-pointer'>
                    {
                        loadingCategory ? (
                            new Array(12).fill(null).map((c,index)=>{
                                return(
                                  <div key={index} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                                    <div className='bg-blue-100 min-h-24 rounded'></div>
                                    <div className='bg-blue-100 h-8 rounded'></div>
                                  </div>
                                )
                              })
                        ) : (
                            categoryData.map((cate,index) => {
                                return(
                                    <div key={cate._id} onClick={() => handleRedirectProductList(cate._id, cate.name)} 
                                    className="flex flex-col items-center justify-center px-5 py-4 shadow-md rounded transition-all">
                                        <img src={cate.image} className="w-32 h-36" />
                                        <button className='w-full p-1.5 rounded-lg text-sm outline-none bg-transparent hover:bg-purple-700 text-black hover:text-white transition-all duration-300 mt-5'>
                                            {cate.name}
                                        </button>
                                    </div>
                                )
                            })
                        )
                    }                                       
                </div>
            </div>                 
        </section>       
    )
}

export default Category
