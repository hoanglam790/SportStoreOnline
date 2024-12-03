import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import urlConvert from '@/utils/urlConvert'
import ProductCard from '@/components/user/ProductCard'
import Loading from '@/components/admin/Loading'
import convertToVietnameseName from '@/utils/ConvertToVietnamese'

const ProductDisplayPage = () => {
    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const params = useParams()

    const allSubCategories = useSelector(state => state.product_data.allSubCategory)
    const [displaySubCatory, setDisplaySubCategory] = useState([])

    const subCategory = params?.subCategory?.split('-')
    const subCategoryName = convertToVietnameseName(subCategory?.slice(0, subCategory?.length - 1)?.join(' ')) 

    const categoryId = params.category.split('-').slice(-1)[0]
    const subCategoryId = params.subCategory.split('-').slice(-1)[0]

    const fetchProductData = async() => {
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.getProductByCateAndSubCate,
                data: {
                    categoryId: categoryId,
                    subCategoryId: subCategoryId,
                    page: page,
                    limit: 8
                }
            })

            if(responseData.data.success){
                if(responseData.data.page == 1){
                    setProductData(responseData.data.data)
                }
                else{
                    setProductData([...productData.data, ...responseData.data.data])
                }
                setTotalPage(responseData.data.totalPage)
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProductData()
    },[params])

    useEffect(() => {
        const subCate = allSubCategories.filter(sc => {
            const filterData = sc.category.some(e => {
                return e._id == categoryId
            })
            return filterData ? true : null
        })
        setDisplaySubCategory(subCate)
    },[params, allSubCategories])
    
    return (
        <section className='sticky top-24 lg:top-20'>
            <div className='container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
                {/** Hiển thị sub category */}
                <div className='min-h-[90vh] max-h-[90vh] grid gap-1 bg-white py-2 overflow-y-scroll '>
                    {
                        displaySubCatory.map((d,index) => {
                            const link = `/${urlConvert(d?.category[0]?.name)}-${d?.category[0]?._id}/${urlConvert(d.name)}-${d._id}`
                            return(
                                <Link to={link}
                                    className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b hover:bg-green-100 cursor-pointer
                                    ${subCategoryId === d._id ? 'bg-orange-400' : ''}`}
                                >
                                    <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border'>
                                        <img 
                                            src={d.image}
                                            alt='Sub-Category'
                                            className='w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                                        />
                                    </div>
                                    <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{d.name}</p>
                                </Link>
                            )
                        })
                    }
                </div>

                {/** Hiển thị product */}
                <div className='sticky top-20'>
                    <div className='bg-white border-b p-4 mt-2 z-10'>
                        <h2 className='text-xl font-semibold'>{subCategoryName}</h2>
                    </div>

                    <div className='relative min-h-[80vh] max-h-[80vh] overflow-y-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-2 gap-3'>
                        {
                            productData.map((p,index) => {
                                return(
                                    <ProductCard 
                                        data={p}
                                        key={p._id + 'productSubCategory' + index}
                                    />
                                )
                            })
                        }
                        </div>
                        {
                            isLoading && (
                                <Loading />
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductDisplayPage
