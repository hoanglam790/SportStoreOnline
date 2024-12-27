import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import displayCurrencyToVND from '@/utils/FormatCurrency'
import NotOrderFound from '@/components/user/NotOrderFound'

const MyCart = () => {
    const orderItem = useSelector(state => state?.order_data?.order)
    //console.log('orderItem redux', orderItem)
    return (
        <section className='py-16'>
            <div className='container mx-auto'>
            {                
                orderItem?.[0] ? (
                    <>                       
                        <div>
                            <h2 className='text-xl font-bold'>Đơn hàng của tôi</h2>
                        </div>                           
                        {
                            orderItem?.[0] && (orderItem.map((order,index) => {
                                return(
                                <>
                                    <div className='bg-white rounded mt-6'>
                                        <div className='flex items-center justify-between mx-5'>
                                            <p className='font-semibold mt-3'>Đơn hàng: <span className='font-normal'>{`#${order?._id}`}</span></p>
                                            <p className='font-semibold mt-3'>Ngày đặt: <span className='font-normal'>{(moment(order?.createdAt).format('DD/MM/YYYY HH:mm'))}</span></p>
                                            
                                            {/** Sử dụng Ternary Operator để kiểm tra trạng thái của đơn hàng */}
                                            <p className={`font-semibold mt-3
                                                ${
                                                    order?.status === 'Chờ xử lý' ? 'text-yellow-500' : 
                                                    order?.status === 'Đã thanh toán' ? 'text-green-600' : 
                                                    order?.status === 'Đã xác nhận' ? 'text-blue-600' :
                                                    order?.status === 'Đang giao hàng' ? 'text-orange-600' :
                                                    order?.status === 'Đã hủy đơn hàng' ? 'text-red-700' : ''
                                                }`}>
                                                {order?.status}
                                            </p>                       
                                        </div>
                                        <hr className='mx-5 mt-3'/>
                                        <div className='mx-5 mt-3'>
                                            <div className='grid grid-cols-3'>
                                                <div className='w-20 h-20'>
                                                    <img 
                                                        src={order?.details?.[0]?.product_id?.image}
                                                        className='w-full h-full object-scale-down' 
                                                    />
                                                </div>
                                                <div className='flex items-center justify-between'>
                                                    <h2>{order?.details?.[0]?.product_id?.name}</h2>
                                                </div>
                                                <div className='flex items-center justify-end'>
                                                    <p className='font-semibold text-base'>Tổng tiền: <span className='font-normal text-xl'>{displayCurrencyToVND(order?.total_amount)}</span></p>
                                                </div>                          
                                            </div>                       
                                        </div>
                                        <div className='mx-5 py-5 flex items-center justify-end'>
                                            <button className='bg-transparent borderItem hover:bg-orange-500 hover:text-white borderItem-orange-600 outline-none rounded-md p-3 w-[135px] transition-all duration-300'>
                                                Xem chi tiết
                                            </button>
                                        </div>
                                    </div>                                           
                                </>
                                )})
                            )
                        }                              
                                               
                    </>
                ) : (
                    <NotOrderFound/>
                )
            }
            </div>
        </section>
    )
}

export default MyCart
