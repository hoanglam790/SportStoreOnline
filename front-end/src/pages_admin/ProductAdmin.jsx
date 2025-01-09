import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import NoProductData from '@/components/admin/NoDataSample'
import Loading from '@/components/admin/Loading'
import UploadProduct from '@/components/admin/UploadProduct'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import { GrSearch } from 'react-icons/gr'
import ProductDetails from '@/components/admin/ProductDetails'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import EditProduct from '@/components/admin/EditProduct'
import Swal from 'sweetalert2'

const Product = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPageCount, setTotalPageCount] = useState(1)
    const [search, setSearch] = useState('')
    const [openUploadProduct, setOpenUploadProduct] = useState(false) // Mở trang thêm mới sản phẩm
    const [openProductDetail, setOpenProductDetail] = useState(false)
    const [openEditProduct, setOpenEditProduct] = useState(false)
    const [editProduct, setEditProduct] = useState({
        name: '',
        image: [],
        description: '',
        price: '',
        discount: '',
        quantity_in_stock: '',
        category: [],
        subCategory: []
    })

    const [deleteProduct, setDeleteProduct] = useState({
        _id: ''
    })

    const handlePreviousPage = () => {
        if(page > 1){
            setPage(prev => prev - 1)
        }
    }

    const handleNextPage = () => {
        if(page !== totalPageCount){
            setPage(prev => prev + 1)
        }       
    }

    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value)
        setPage(1)
    }
    
    const fetchProductData = async() => {
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.getProduct,
                data: {
                    page: page,
                    limit: 12,
                    search: search
                }
            })
            
            if(responseData.data.success){
                setTotalPageCount(responseData.data.totalNumberPage)
                setProductData(responseData.data.data)
            }
            
            if(responseData.data.error){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: responseData.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        title: 'text-xl font-semibold'
                    }
                })
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteProduct = () => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: 'Không',
            customClass: {
                title: 'text-xl font-semibold'
            }          
        }).then(async(result) => {
            if(result.isConfirmed){
                try {
                    const responseData = await Axios({
                        ...connectApi.deleteProduct,
                        data: deleteProduct
                    })
        
                    if(responseData.data.success){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: responseData.data.message,
                            showConfirmButton: false,
                            timer: 3000,
                            customClass: {
                                title: 'text-xl font-semibold'
                            }
                        })
                        fetchProductData()
                    }
                } catch (error) {
                    axiosErrorAnnounce(error)
                }
            }
        })
    }

    useEffect(() => {
        let flag = true 

        const interval = setTimeout(() => {
            if(flag){
                fetchProductData()
                flag = false
            }
        }, 300)

        return () => {
            clearTimeout(interval)
        }
    },[page, search])

    return (
        <section>          
            {
                !openUploadProduct && (
                    <>
                        {/** Giao diện hiển thị danh sách sản phẩm */}
                        <div className='bg-slate-100 shadow-lg flex items-center justify-between p-2 ml-2'>
                            <h2 className='font-semibold'>Danh sách sản phẩm</h2>
                            <div className='min-w-[220px] lg:min-w-[330px] h-10 rounded-md border border-gray-400 overflow-hidden focus-within:border-orange-600'>
                                <button className='flex items-center justify-between ml-auto w-full h-full p-2 text-neutral-500'>
                                    <input type='text'
                                        //value={searchText.text}
                                        //onChange={handleInputChange}
                                        placeholder='Tìm kiếm...'
                                        value={search}
                                        onChange={handleSearch}
                                        className='w-full h-full bg-transparent outline-none'
                                    />
                                    <GrSearch className='fill-gray-600'/>
                                </button>                       
                            </div>

                            <button onClick={() => setOpenUploadProduct(true)} className='text-base border border-green-500 hover:bg-green-600 px-2 py-1 rounded flex items-center gap-1'>
                                <MdAdd size={20} />
                                Thêm mới
                            </button>
                        </div>
                        {
                            !productData[0] && !isLoading ? (
                                <NoProductData />
                            ) : (
                                <div className='bg-blue-50 p-3 mx-2'>
                                    <div className='min-h-[65vh]'>
                                        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                                            {
                                                productData.map((p,index) => {
                                                    return(
                                                        <div className='w-36 p-4 bg-white rounded'>
                                                            <div>
                                                                <img 
                                                                    src={p?.image[0]} 
                                                                    alt={p.name}
                                                                    onClick={() => 
                                                                    {
                                                                        setOpenProductDetail(true)
                                                                        setEditProduct(p)
                                                                    }}
                                                                    className='w-full h-36 mt-3 object-scale-down cursor-pointer'
                                                                />
                                                            </div>
                                                            <p className='font-normal mt-2 truncate' title={p?.name}>
                                                                {p?.name}
                                                            </p>
                                                            <div className='flex items-center h-10 mt-3 gap-3 text-sm'>
                                                                <button onClick={() => 
                                                                    {   
                                                                        setOpenEditProduct(true),
                                                                        setEditProduct(p)
                                                                    }} 
                                                                    className='w-full h-8 bg-blue-600 hover:bg-blue-700 rounded focus:outline-none flex items-center justify-center'
                                                                    title='Chỉnh sửa'>
                                                                    <FaEdit size={20} className=''/>                   
                                                                </button>
                                                                <button onClick={() => {
                                                                        handleDeleteProduct(),
                                                                        setDeleteProduct(p)
                                                                    }} 
                                                                    className='w-full h-8 bg-red-500 hover:bg-red-700 rounded focus:outline-none flex items-center justify-center'
                                                                    title='Xóa'>
                                                                    <RiDeleteBin6Line size={20} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }                                           
                                        </div>
                                    </div>
                                    
                                    {/** Tạo 2 nút button trước và sau */}
                                    <div className='mt-3 flex justify-between'>
                                        <button onClick={handlePreviousPage} disabled={page === 1} 
                                            className={`font-normal px-4 py-2 rounded flex items-center justify-center gap-2 ${page === 1 ? 'bg-gray-300 border-none text-white cursor-not-allowed' : 'border border-orange-500 hover:bg-blue-600'}`}>
                                            <HiArrowNarrowLeft size={20}/>
                                            Trang trước
                                        </button>
                                        <button disabled>Trang {page} / {totalPageCount}</button>
                                        <button onClick={handleNextPage} disabled={page === totalPageCount} 
                                            className={`font-normal px-4 py-2 rounded flex items-center justify-center gap-2 ${page === totalPageCount ? 'bg-gray-300 border-none text-white cursor-not-allowed' : 'border border-orange-500 hover:bg-yellow-600'}`}>
                                            Trang sau
                                            <HiArrowNarrowRight size={20}/>
                                        </button>
                                    </div>
                                </div>
                            )
                        }                                              
                    </>
                )
            }
                
            {
                isLoading && (
                    <Loading />
                )
            }

            {
                openUploadProduct && (
                    <UploadProduct fetchData={fetchProductData} back={() => setOpenUploadProduct(false)}/>
                )
            }

            {
                openProductDetail && (
                    <ProductDetails data={editProduct} close={() => setOpenProductDetail(false)}/>
                )
            }

            {
                openEditProduct && (
                    <EditProduct fetchData={fetchProductData} data={editProduct} close={() => setOpenEditProduct(false)}/>
                )
            }
        </section>
    )
}

export default Product
