import React, { useEffect, useState } from 'react'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import { useNavigate } from 'react-router-dom'
import ProductPageDisplayHome from '@/pages/ProductPageDisplayHome'

const ProductDisplay = () => {
    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPageCount,setTotalPageCount] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Chuyển hướng trang
    const handleDirectPage = () => {
        navigate('/products')
    }

    // Gọi API lấy danh sách sản phẩm
    const fetchAllProduct = async() => {
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.getProduct,
                data: {
                    page: page,
                    limit: 8
                }
            })

            if(responseData.data.success) {
                setTotalPageCount(responseData.data.totalNumberPage)
                setProductData(responseData.data.data)
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAllProduct()
    },[page])
    return (
        <div className='py-5'>
            <div className='title mb-5 text-center'>
                <h2 className='text-3xl font-extrabold text-gray-800 inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-6 after:mx-auto after:bg-blue-800 after:rounded-full'>                  
                Sản phẩm nổi bật
                </h2>   
            </div>

            <div className='container mx-auto'>
                <div className='font-sans p-5'>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4'>
                    {
                        productData.map((p, index) => {
                            return (
                                <ProductPageDisplayHome
                                    data={p}
                                    key={p?._id}
                                />
                            )
                        })
                    }
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <button onClick={handleDirectPage}
                        className='bg-transparent border border-orange-400 p-3 w-[150px] font-semibold text-lg rounded-sm
                            hover:bg-orange-500 hover:text-white transition-all duration-100'>
                        Xem thêm
                    </button>    
                </div>                  
            </div>
        </div>
    )
}

export default ProductDisplay
