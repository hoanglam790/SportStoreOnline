import React, { useEffect, useState } from 'react'
import Axios from '@/utils/AxiosConfig'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import connectApi from '@/common/ApiBackend'
import Swal from 'sweetalert2'
import NotOrderFoundAdmin from '@/components/admin/NotOrderFoundAdmin'
import moment from 'moment'
import { IoMdEye } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'
import Loading from '@/components/admin/Loading'
import OrderDetail from '@/components/admin/OrderDetail'
import UpdateOrder from '@/components/admin/UpdateOrder'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import { GrSearch } from 'react-icons/gr'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'

const OrderAdmin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [orderData, setOrderData] = useState([])
    const [page, setPage] = useState(1)
    const [totalPageCount, setTotalPageCount] = useState(1)
    const [search, setSearch] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [openOrderDetail, setOpenOrderDetail] = useState(false)
    const [openUpdateOrder, setOpenUpdateOrder] = useState(false)
    const [orderDataDetail, setOrderDataDetail] = useState({
        _id: '',
        user_id: '',
        delivery_address: '',
        total_amount: '',
        total_quantity: '',
        payment_method: '',
        details: []
    })
    
    const [updateOrderData, setUpdateOrderData] = useState({
        order_id: '',
        status: '',
        details: []
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

    const fetchDataAllOrders = async() => {
        try {
            setIsLoading(true)

            const responseOrderData = await Axios({
                ...connectApi.getAllOrdersAdmin,
                data: {
                    page: page,
                    limit: 10,
                    search: search
                }
            })

            if(responseOrderData.data.success){
                setTotalPageCount(responseOrderData.data.pagination.totalNumberPage)
                setOrderData(responseOrderData.data.data)
            }

            if(responseOrderData.data.error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: responseOrderData.data.message,
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
                fetchDataAllOrders()
                flag = false
            }
        }, 300)

        return () => {
            clearTimeout(interval)
        }
    },[page, search])
    return (
        <section>
            <div className='bg-slate-200 shadow-lg flex items-center justify-between p-3 mb-3'>
                <h2 className='font-semibold'>Danh sách đơn hàng</h2>
                <div className='min-w-[220px] lg:min-w-[330px] h-10 rounded-md border border-orange-500 overflow-hidden focus-within:border-orange-600'>
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

                {/** <div className="date-picker-container flex gap-3 mt-3">
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        placeholderText="Chọn ngày bắt đầu"
                        dateFormat="dd/MM/yyyy"
                        className="w-full h-10 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        placeholderText="Chọn ngày kết thúc"
                        dateFormat="dd/MM/yyyy"
                        className="w-full h-10 rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    />
                </div> */}                
            </div>
            {
                !orderData?.[0] && !isLoading ? (
                    <NotOrderFoundAdmin />
                ) : (
                    <div className='bg-white pb-4 flex flex-col h-full'>
                        <div className='min-h-[64vh]'>
                            <table className='userTable w-full'>
                                <thead>
                                    <tr className='bg-black text-white'>
                                        <th className='w-14'>STT</th>
                                        <th className='w-[350px]'>Mã đơn hàng</th>
                                        <th className='w-[260px]'>Ngày tạo</th>
                                        <th className=''>Trạng thái</th>
                                        <th className=''>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderData.map((order, index) => {
                                            return(
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{order?._id}</td>
                                                    <td>{moment(order?.createdAt).format('DD/MM/YYYY - HH:mm:ss')}</td>
                                                    <td>{order?.status}</td>
                                                    <td>
                                                        <div className='flex items-center justify-center gap-3'>
                                                            <button 
                                                                onClick={() => {
                                                                    setOpenOrderDetail(true),
                                                                    setOrderDataDetail(order)                                                                                             
                                                                }}
                                                                className='bg-blue-500 rounded p-1.5 hover:bg-blue-700 hover:text-white cursor-pointer'
                                                                title='Xem chi tiết'>
                                                                <IoMdEye size={20}/>
                                                            </button>
                                                            <button onClick={() => {
                                                                    setOpenUpdateOrder(true),
                                                                    setUpdateOrderData(order)                                                                                             
                                                                }}
                                                                className='bg-orange-500 rounded p-1.5 hover:bg-orange-700 hover:text-white cursor-pointer'
                                                                title='Chỉnh sửa'>
                                                                <FaRegEdit size={20}/>
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
                        <div className='mt-auto flex justify-between'>
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
                       
            {/** Thực hiện các sự kiện khi nhấn vào các nút button thì sẽ mở ra cửa sổ và xử lý dữ liệu*/}
            {
                isLoading && (
                    <Loading />
                )
            }

            {
                openOrderDetail && (
                    <OrderDetail data={orderDataDetail} close={() => setOpenOrderDetail(false)} />
                )
            }

            {
                openUpdateOrder && (
                    <UpdateOrder fetchOrderData={fetchDataAllOrders} data={updateOrderData} close={() => setOpenUpdateOrder(false)}/>
                )
            }
        </section>
    )
}

export default OrderAdmin
