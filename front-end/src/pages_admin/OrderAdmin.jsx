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

const OrderAdmin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [orderData, setOrderData] = useState([])
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
        status: ''
    })

    const fetchDataAllOrders = async() => {
        try {
            setIsLoading(true)
            const responseOrderData = await Axios({
                ...connectApi.getAllOrdersAdmin,
                data: orderData
            })

            if(responseOrderData.data.success){
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
        fetchDataAllOrders()
    },[])
    return (
        <section>
            <div className='bg-slate-200 shadow-lg flex items-center justify-between p-3 mb-3'>
                <h2 className='font-semibold'>Danh sách đơn hàng</h2>
            </div>
            {
                !orderData?.[0] && !isLoading ? (
                    <NotOrderFoundAdmin />
                ) : (
                    <div className='bg-white pb-4'>
                        <table className='userTable w-full'>
                            <thead>
                                <tr className='bg-black text-white'>
                                    <th className='w-14'>STT</th>
                                    <th className='w-[350px]'>Mã đơn hàng</th>
                                    <th className='w-[250px]'>Ngày tạo</th>
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
                                                <td className='flex items-center justify-center gap-3'>
                                                    <button 
                                                        onClick={() => {
                                                            setOpenOrderDetail(true),
                                                            setOrderDataDetail(order)                                                                                             
                                                        }}
                                                        className='bg-blue-500 rounded p-1.5 hover:bg-blue-700 hover:text-white cursor-pointer'>
                                                        <IoMdEye size={20}/>
                                                    </button>
                                                    <button onClick={() => {
                                                            setOpenUpdateOrder(true),
                                                            setUpdateOrderData(order)                                                                                             
                                                        }}
                                                        className='bg-orange-500 rounded p-1.5 hover:bg-orange-700 hover:text-white cursor-pointer'>
                                                        <FaRegEdit size={20}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
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
