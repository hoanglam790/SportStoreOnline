import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { BsCreditCard2Back } from 'react-icons/bs'
import { HiOutlineShoppingBag } from 'react-icons/hi'
import { useNavigate, useParams } from 'react-router-dom'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import moment from 'moment'
import displayCurrencyToVND from '@/utils/FormatCurrency'

const MyOrderDetail = () => {
    const navigate = useNavigate()
    const params = useParams()
    let orderId = params?.id?.split('-').slice(-1)[0]
    const [orderData, setOrderData] = useState({
        name: '',
        phone_number: '',
        address: '',
        payment_method: '',
        image: []
    })
    const [isLoading, setIsLoading] = useState(false)

    // Xử lý sự kiện lấy chi tiết đơn hàng
    const fetOrderDetails = async() => {
        try {
            setIsLoading(true)
            const responseOrderData = await Axios({
                ...connectApi.getOrderDetails,
                data: {
                    order_id: orderId
                }
            })

            if(responseOrderData.data.success){
                setOrderData(responseOrderData.data.data)
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        } finally {
            setIsLoading(false)
        }
    }

    // Xử lý sự kiện chuyển hướng trang
    const handleNavigateOrderList = () => {
        navigate('/my-order')
    }

    // Tính tổng tiền trước khi giảm giá của các sản phẩm trong đơn hàng
    const totalPriceNotDiscount = orderData?.orderDetails?.reduce((total, orderItem) => {
        const itemTotal = orderItem?.quantity * orderItem?.product_id?.price // Tính tiền cho từng sản phẩm
        return total + itemTotal // Cộng dồn vào tổng
    }, 0)

    // Tính tổng tiền sau khi giảm giá của các sản phẩm trong đơn hàng
    const totalPrice = orderData?.orderDetails?.reduce((total, orderItem) => {
        const itemTotal = orderItem?.quantity * orderItem?.price // Tính tiền cho từng sản phẩm
        return total + itemTotal // Cộng dồn vào tổng
    }, 0)

    // Tải dữ liệu
    useEffect(() => {
        fetOrderDetails()
    }, [params])
    return (
        <section className='py-12'>
            <div className='container mx-auto'>
                {/** Thông tin người nhận và hình thức thanh toán */}
                {
                    orderData?.order?.map((item, index) => {
                        return(
                        <>
                            <div className='grid grid-cols-2 gap-3 mb-10'>
                                <div className='flex items-center gap-2'>
                                    <h2 className='text-xl font-bold'>Chi tiết đơn hàng: </h2>
                                    <span className='font-normal text-lg'>{`#${item?._id}`}</span>
                                    <span>-</span>
                                    <p className={`font-semibold text-lg
                                        ${
                                            item?.status === 'Chờ xử lý' ? 'text-yellow-500' : 
                                            item?.status === 'Đã thanh toán' ? 'text-green-600' : 
                                            item?.status === 'Đã xác nhận' ? 'text-blue-600' :
                                            item?.status === 'Đang giao hàng' ? 'text-orange-600' :
                                            item?.status === 'Đã hủy đơn hàng' ? 'text-red-700' : ''
                                        }`}>
                                        {item?.status}
                                    </p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <p className='font-bold'>Đặt hàng lúc: </p>
                                    <span className='font-normal'>
                                        {(moment(item?.createdAt).format('DD/MM/YYYY - HH:mm'))}
                                    </span>
                                </div>
                            </div>
                            <div className='grid lg:grid-cols-4 gap-3'>
                                <div className='col-span-3'>
                                    <div className='bg-white rounded-sm p-3'>
                                        <div className='grid grid-rows-4 gap-3 mx-3'>
                                            <div className='flex items-center gap-2'>
                                                <FaMapLocationDot size={23}/>
                                                <p className='font-semibold uppercase'>Thông tin nhận hàng</p>
                                            </div>
                                            <div className='flex items-center gap-16'>
                                                <p>Người nhận: </p>
                                                <span>{item?.delivery_address?.name}</span>
                                            </div>
                                            <div className='flex items-center gap-14'>
                                                <p>Số điện thoại: </p>
                                                <span>{item?.delivery_address?.phone_number}</span>
                                            </div>
                                            <div className='flex gap-5'>
                                                <p>Địa chỉ nhận hàng: </p>
                                                <span>{item?.delivery_address?.address}</span>
                                            </div>                               
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-1'>
                                    <div className='bg-white rounded-sm p-3'>
                                        <div className='grid grid-rows-4 gap-3 mx-3'>
                                            <div className='flex items-center gap-2 row-span-1'>
                                                <BsCreditCard2Back size={23}/>
                                                <p className='font-semibold uppercase'>Hình thức thanh toán</p>
                                            </div>
                                            <p className='row-span-3'>{item?.payment_method}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )})
                }
                
                {/** Thông tin các sản phẩm */}
                <div className='bg-white rounded-sm p-6 mt-6'>
                    <div className='flex items-center gap-2'>
                        <HiOutlineShoppingBag size={23}/>
                        <p className='font-semibold uppercase'>Thông tin sản phẩm</p>
                    </div>
                    {
                        orderData?.orderDetails?.map((orderItem,index) => {
                            return(
                            <>
                                <div key={index} className='grid lg:grid-cols-[90px_auto_20%] gap-5 mt-10'>
                                    <div className='w-20 h-16 ml-2'>
                                        <img 
                                            src={orderItem?.product_id?.image?.[0]}
                                            className='w-full h-full object-cover' 
                                        />
                                    </div>
                                    <div className='grid grid-rows-2 gap-3 mx-3'>
                                        <p>{orderItem?.product_id?.name}</p>
                                        <div className='flex items-center gap-3'>
                                            <p>Số lượng: </p>
                                            <span>{orderItem?.quantity}</span>
                                        </div>
                                        <div className='flex items-center gap-5'>
                                            <p>Đơn giá: </p>
                                            <span>{displayCurrencyToVND(orderItem?.price)}</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-end'>
                                        <p className='font-semibold'>{displayCurrencyToVND(orderItem?.quantity * orderItem?.price)}</p>
                                    </div>
                                </div>                                                                        
                            </>
                        )})                        
                    }                                      
                    <hr className='my-5'/>

                    {/** Thành tiền */}
                    <div className='flex flex-col items-end bg-white p-4'>
                        <p className='mb-2.5 w-1/3 flex items-center justify-between'>
                            <span>Tạm tính: </span>
                            {
                                !Object.is(totalPrice, totalPriceNotDiscount) ? (
                                <>
                                    <div className='flex items-center gap-3'>
                                        <strike>{displayCurrencyToVND(totalPriceNotDiscount)}</strike>
                                        <span>{displayCurrencyToVND(totalPrice)}</span>
                                    </div>
                                </>
                                ) : (
                                    <span>{displayCurrencyToVND(totalPrice)}</span>
                                )
                            }                                                      
                        </p>
                        <p className='mb-2.5 w-1/3 flex items-center justify-between'>
                            <span>Tổng cộng: </span>
                            <span>{displayCurrencyToVND(totalPrice)}</span>
                        </p>
                        <p className='mb-2.5 w-1/3 flex items-center justify-between'>
                            <span className='font-semibold'>Số tiền đã thanh toán: </span>
                            <span className='font-bold text-red-600'>{displayCurrencyToVND(totalPrice)}</span>
                        </p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button 
                            onClick={handleNavigateOrderList}
                            className='bg-transparent border border-orange-500 p-4 rounded-lg uppercase 
                            font-semibold text-orange-600 hover:bg-orange-500 hover:text-white transition-all duration-100'>
                            Về trang danh sách đơn hàng
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyOrderDetail
