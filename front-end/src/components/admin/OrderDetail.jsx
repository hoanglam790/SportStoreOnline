import React, { useState } from 'react'
import { IoMdClose, IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io'
import displayCurrencyToVND from '@/utils/FormatCurrency'

const OrderDetail = ({ close, data: orderData }) => {
    const [orderDataDetail, setOrderDataDetail] = useState({
        _id: orderData?._id,
        user_id: orderData?.user_id,
        delivery_address: orderData?.delivery_address,
        total_amount: orderData?.total_amount,
        total_quantity: orderData?.total_quantity,
        payment_method: orderData?.payment_method,
        details: orderData?.details
    })

    // Xử lý sự kiện DropDownList của tổng tiền
    const [isOpenTotalAmount, setIsOpenTotalAmount] = useState(false)
    const toggleDropdownAmount = () => {
        setIsOpenTotalAmount(prev => !prev)   // Đảo ngược trạng thái mỗi lần nhấn button
    }

    // Xử lý sự kiện DropDownList của tổng số lượng
    const [isOpenTotalQuantity, setIsOpenTotalQuantity] = useState(false)
    const toggleDropdownQuantity = () => {
        setIsOpenTotalQuantity(prev => !prev)   // Đảo ngược trạng thái mỗi lần nhấn button
    }
    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 w-full h-full flex items-center justify-between bg-slate-200 bg-opacity-60 z-50'>
            <div className='mx-auto bg-white shadow-sm p-4 w-[500px] rounded-lg'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-bold text-xl uppercase'>Chi tiết đơn hàng</h2>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoMdClose size={25} />
                    </button>
                </div>
                <div className='font-[sans-serif] border divide-y rounded-lg mt-3'>
                    <div className='py-2'>
                        <div className='w-full text-base border-b flex items-center transition-all py-1'>
                            <div className='flex items-center gap-2 mx-3'>
                                <p className='font-semibold'>Mã đơn hàng:</p>
                                <span>{orderDataDetail?._id}</span>
                            </div>
                        </div>
                        {
                            orderDataDetail?.user_id ? (
                                <div className='w-full text-base border-b flex items-center transition-all py-2'>
                                    <div className='flex items-center gap-2 mx-3'>
                                        <p className='font-semibold'>Tên tài khoản/Email:</p>
                                        <span>{orderDataDetail?.user_id?.email}</span>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )
                        }
                        <div className='w-full text-base border-b flex items-center transition-all py-2'>
                            <div className='flex items-center gap-2 mx-3'>
                                <p className='font-semibold'>Người nhận:</p>
                                <span>{orderDataDetail?.delivery_address?.name}</span>
                            </div>
                        </div>
                        <div className='w-full text-base border-b flex items-center transition-all py-2'>
                            <div className='flex items-center gap-2 mx-3'>
                                <p className='font-semibold'>Số điện thoại:</p>
                                <span>{orderDataDetail?.delivery_address?.phone_number}</span>
                            </div>
                        </div>
                        <div className='w-full text-base border-b flex items-center transition-all py-2'>
                            <div className='flex items-center gap-2 mx-3'>
                                <p className='font-semibold'>Địa chỉ nhận hàng:</p>
                                <span>{orderDataDetail?.delivery_address?.address}</span>
                            </div>
                        </div>
                        
                        <div className='w-full text-base border-b transition-all py-2'>
                            <button onClick={toggleDropdownAmount} className='w-full text-base px-3 flex items-center transition-all gap-2'>
                                <p className='font-semibold'>Tổng tiền:</p>
                                <span className='font-normal'>{displayCurrencyToVND(orderDataDetail?.total_amount)}</span>
                                <div className='ml-auto'>
                                    {
                                        isOpenTotalAmount ? (
                                            <IoMdArrowDropdown size={20} />
                                        ) : (
                                            <IoMdArrowDropright size={20} />
                                        )
                                    }
                                </div>                                                                                                                                   
                            </button>
                        </div>
                        {/* Chỉ hiển thị div khi isOpen là true */}
                        {
                            isOpenTotalAmount && (
                                <div className='w-full text-base border-b transition-all py-2'>
                                    <div className='mx-3'>
                                        <p className='font-semibold text-sm mb-2'>Thông tin chi tiết:</p>
                                        <ul>
                                            {orderDataDetail?.details?.map((item, index) => (
                                                <li key={index} className='flex items-center justify-between gap-2'>
                                                    <p className='truncate' title={item?.product_id?.name}>
                                                        {item?.product_id?.name}
                                                    </p>
                                                    <p>-</p>
                                                    <p>{displayCurrencyToVND(item?.total)}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>                                 
                                </div>
                            )
                        }

                        <div className='w-full text-base border-b transition-all py-2'>
                            <button onClick={toggleDropdownQuantity} className='w-full text-base px-3 flex items-center transition-all gap-2'>
                                <p className='font-semibold'>Tổng số lượng: </p>
                                <span className='font-normal'>{orderDataDetail?.total_quantity}</span>
                                <div className='ml-auto'>
                                    {
                                        isOpenTotalQuantity ? (
                                            <IoMdArrowDropdown size={20} />
                                        ) : (
                                            <IoMdArrowDropright size={20} />
                                        )
                                    }
                                </div>                                                                                                                           
                            </button>
                        </div>
                        {/* Chỉ hiển thị div khi isOpen là true */}
                        {
                            isOpenTotalQuantity && (
                                <div className='w-full text-base border-b transition-all py-2'>
                                    <div className='mx-3'>
                                        <p className='font-semibold text-sm mb-2'>Thông tin chi tiết:</p>
                                        <ul>
                                            {orderDataDetail?.details?.map((item, index) => (
                                                <li key={index} className='flex items-center justify-between gap-2'>
                                                    <p className='truncate' title={item?.product_id?.name}>
                                                        {item?.product_id?.name}
                                                    </p>
                                                    <p>{item?.quantity}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>                                 
                                </div>
                            )
                        }
                        <div className='w-full text-base  flex items-center transition-all py-2'>
                            <div className='flex items-center gap-2 mx-3'>
                                <p className='font-semibold'>Hình thức thanh toán:</p>
                                <span>{orderDataDetail?.payment_method}</span>
                            </div>
                        </div>    
                    </div>
                </div>              
            </div>
        </section>
    )
}

export default OrderDetail
