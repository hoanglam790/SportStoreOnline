import React, { useEffect, useRef, useState } from 'react'
import Image from '@/assets/Banner/sports_sale_banner.png'
import { TiShoppingCart } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import urlConvert from '@/utils/urlConvert'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const ProductDisplay = ({ id, name }) => {
    const [productData, setProductData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const containerRef = useRef()
    const subCategoryData = useSelector(state => state.product_data.allSubCategory)

    const fetchCategoryWiseProduct = async () => {
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.getProductByCategory,
                data: {
                    _id: id
                }
            })

            if (responseData.data.success) {
                setProductData(responseData.data.data)
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRedirectProductListpage = () =>{
        const subCategory = subCategoryData.find(sub =>{
          const filterData = sub.category.some(c => {
            return c._id == id
          })
  
          return filterData ? true : null
        })
        const url = `/${urlConvert(name)}-${id}/${urlConvert(subCategory?.name)}-${subCategory?._id}` 
        return url
    }
    const redirectURL =  handleRedirectProductListpage()

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    },[])

    return (
        <div className='py-5'>
            <div className='container mx-auto p-4 flex items-center justify-between gap-6'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to={redirectURL} className='text-green-600 hover:text-green-400'>Xem tất cả</Link>
            </div>

            <div className='relative flex items-center'>
                <div className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth' ref={containerRef}>
                    {
                        productData.map((p, index) => {
                            return (
                                <ProductCard
                                    data={p}
                                    key={p._id}
                                />
                            )
                        })
                    }

                </div>
                <div className='w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay
