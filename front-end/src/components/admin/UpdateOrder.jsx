import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import OrderStatus from '@/common/OrderStatus'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Swal from 'sweetalert2'

const UpdateOrder = ({ close, fetchOrderData, data: orderData }) => {
    const [updateOrderData, setUpdateOrderData] = useState({
        order_id: orderData?._id,
        status: orderData?.status
    })
    const [orderStatus, setOrderStatus] = useState(orderData?.status || '')

    const handleChangeOrderStatus = (e) => {
        const selectedStatus = e.target.value
        setOrderStatus(selectedStatus)
        setUpdateOrderData((prev) => {
            return {
                ...prev,
                status: selectedStatus
            }
        })
    }

    // Gọi API và cập nhật dữ liệu vào cơ sở dữ liệu khi nhấn nút Xác nhận
    const updateOrderStatus = async(e) => {
        e.preventDefault()
        try {
            const responseOrderData = await Axios({
                ...connectApi.updateOrder,
                data: updateOrderData
            })

            // Kiểm tra trước khi gửi dữ liệu
            if (!updateOrderData.status) {
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    text: 'Vui lòng chọn 01 trạng thái.',
                    showConfirmButton: true,
                    customClass: {
                        title: 'text-xl font-semibold'
                    }
                })
                return // Dừng lại nếu role không hợp lệ
            }

            if(responseOrderData.data.success){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: responseOrderData.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        title: 'text-xl font-semibold'
                    }
                })
                close()
                fetchOrderData()
            }

            if(responseOrderData.data.error){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: responseOrderData.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        title: 'text-xl font-semibold'
                    }
                })
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        }
    }

    return (
        <section className='fixed top-10 bottom-0 left-0 right-0 w-full h-full flex items-center justify-between bg-slate-200 bg-opacity-60'>
            <div className='mx-auto bg-white shadow-sm p-4 w-full max-w-sm rounded-lg'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-lg font-medium'>Chỉnh sửa:</h1>
                    <button className='block ml-auto' onClick={close}>
                        <MdClose size={25}/>
                    </button>
                </div>
                
                <form onSubmit={updateOrderStatus}>
                    <div className='my-2'>
                        <p>Mã đơn hàng:</p>
                        <input
                            type='text'                           
                            value={updateOrderData?.order_id}
                            disabled
                            className='bg-blue-100 border border-gray-300 w-full text-sm px-4 py-2.5 mt-2 rounded-md outline-blue-500'
                        />                                                                                                                 
                    </div>
                    
                    <div className='flex items-center justify-between my-4'>
                        <p>Trạng thái: </p>
                        <select value={updateOrderData?.status} 
                            onChange={handleChangeOrderStatus} className='border px-4 py-2'
                            disabled={updateOrderData?.status === 'Đã thanh toán'}>
                            {
                                Object.values(OrderStatus).map(o => {
                                    return (
                                        <option value={o} key={o}>{o}</option>       
                                    )
                                })
                            }                       
                        </select>
                    </div>               
                    <button className='w-fit mx-auto block px-3 py-2 bg-blue-500 rounded hover:bg-blue-700 hover:text-white'>Xác nhận</button>
                </form>              
            </div>
        </section>
    )
}

export default UpdateOrder
