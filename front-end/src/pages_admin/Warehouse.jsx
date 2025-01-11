import React, { useEffect, useState } from 'react'
import NoProductData from '@/components/admin/NoDataSample'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import displayCurrencyToVND from '@/utils/FormatCurrency'
import Loading from '@/components/admin/Loading'
import EditProductWarehouse from '@/components/admin/EditProductWarehouse'
import { GrSearch } from 'react-icons/gr'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import { FaRegEdit } from 'react-icons/fa'
import { IoMdEye } from 'react-icons/io'

const Warehouse = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPageCount, setTotalPageCount] = useState(1)
    const [search, setSearch] = useState('')
    const [openEditProduct, setOpenEditProduct] = useState(false)
    const [editProduct, setEditProduct] = useState({
        name: '',
        warehouse_history: []
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
                    limit: 8,
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
            !openEditProduct && (
                <>
                    <div className='bg-slate-100 shadow-lg flex items-center justify-between p-3 mb-3'>
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
                    </div>
                    {
                        !productData[0] && !isLoading ? (
                            <NoProductData />
                        ) : (
                            <div className='bg-white pb-4 flex flex-col h-full'>
                                <div className='min-h-[63vh]'>
                                    <table className='userTable w-full'>
                                        <thead>
                                            <tr className='bg-black text-white'>
                                                <th className='w-14'>STT</th>
                                                <th className='w-[400px]'>Tên sản phẩm</th>
                                                <th className='w-[160px]'>Hình ảnh</th>
                                                <th className='w-[170px]'>Số lượng trong kho</th>
                                                <th className='w-[200px]'>Đơn giá</th>
                                                <th className=''>Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                productData.map((p, index) => {
                                                    const latestedHistory = p?.warehouse_history?.sort((a,b) => new Date(b.date) - new Date(a.date))[0] 
                                                    return(
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td className='truncate'>{p?.name}</td>
                                                            <td>
                                                                <div className='flex items-center justify-center'>
                                                                    <img 
                                                                        alt={p?.name}
                                                                        src={p?.image[0]}
                                                                        className='w-16 h-12 object-scale-down'
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>{p?.quantity_in_stock}</td>
                                                            <td>{displayCurrencyToVND(latestedHistory?.cost_price)}</td>
                                                            <td>
                                                                <div className='flex items-center justify-center gap-2 text-sm'>                                                           
                                                                    <button onClick={() => {
                                                                            setOpenEditProduct(true),
                                                                            setEditProduct(p)                                                                                             
                                                                        }}
                                                                        className='bg-orange-500 rounded p-1.5 hover:bg-orange-700 hover:text-white cursor-pointer'
                                                                        title='Chỉnh sửa'>
                                                                        <FaRegEdit size={20}/>
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => {
                                                                            setOpenOrderDetail(true),
                                                                            setOrderDataDetail(order)                                                                                             
                                                                        }}
                                                                        className='bg-blue-500 rounded p-1.5 hover:bg-blue-700 hover:text-white cursor-pointer'
                                                                        title='Xem lịch sử'>
                                                                        <IoMdEye size={20}/>
                                                                    </button>
                                                                </div>                                                        
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
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
            openEditProduct && (
                <EditProductWarehouse fetchData={fetchProductData} data={editProduct} back={() => setOpenEditProduct(false)}/>
            )
        }
        </section>
    )
}

export default Warehouse
