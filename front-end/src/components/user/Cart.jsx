import React, { useEffect, useState } from 'react'
import { FaUser, FaPhone, FaAddressBook } from 'react-icons/fa'
import { TfiEmail } from 'react-icons/tfi'
import { useSelector } from 'react-redux'
import { useGlobalContext } from '@/provider/GlobalProvider'
import NoItemInCart from './NoItemInCart'
import AddToCartButton from './AddToCartButton'
import displayCurrencyToVND from '@/utils/FormatCurrency'
import displayDiscountPrice from '@/utils/DisplayDiscountPrice'
import RemoveCartItemButton from './RemoveCartItemButton'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

const Cart = () => {
    const { totalPrice, totalPriceNotDiscount, totalQuantity, fetchCartItems, fetchOrder } = useGlobalContext()
    const cartItem = useSelector(state => state?.cart_data?.cart)
    //console.log(cartItem)
    const user = useSelector(state => state?.user_data)
    const navigate = useNavigate()
    // const order = useSelector(state => state?.order_data)
    // console.log(order)
    const [userData, setUserData] = useState({
        name: user.name || '',
        email: user.email || '',
        phone_number: user.phone_number || '',
        address: user.address || ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Xử lý sự kiện thanh toán bằng tiền mặt
    const handleCheckOut = async() => {
        try {
            // Lưu thông tin địa chỉ vào bảng deliveryAddressDetails
            const saveDeliveryAddress = await Axios({
                ...connectApi.createNewDeliveryAddress,
                data: userData
            })
            //console.log(saveDeliveryAddress.data)

            if(saveDeliveryAddress.data.success){
                // Lấy Id của địa chỉ đã lưu
                const deliveryAddressId = saveDeliveryAddress.data.data._id
                //console.log("ID địa chỉ: ", deliveryAddressId)

                // Lưu đơn hàng, gửi Id địa chỉ vào delivery_address
                const orderData = {
                    ...cartItem,  // Dữ liệu đơn hàng
                    delivery_address: deliveryAddressId  // Id địa chỉ
                }

                const responseOrderData = await Axios({
                    ...connectApi.createNewOrder,
                    data: orderData
                })
    
                if(responseOrderData.data.success){
                    toast.success(responseOrderData.data.message, {
                        position: 'top-center'
                    })
                    // Cập nhật lại giỏ hàng sau khi thanh toán
                    if(fetchCartItems){
                        fetchCartItems()
                    }

                    // Cập nhật lại đơn hàng sau khi tạo mới
                    if(fetchOrder){
                        fetchOrder()
                    }

                    // Điều hướng tới trang thanh toán thành công
                    navigate('/checkout/success')
                }
            }            
        } catch (error) {
            toast.error('Có lỗi xảy ra khi thanh toán!', {
                position: 'top-center',
            })
        }
    }

    const handleCheckOutOnline = async() => {
        try {
            toast.loading('Đang tải dữ liệu...', {
                position: 'top-center'
            })
            const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
            const stripePromise = await loadStripe(stripePublicKey)
            
            // Lưu thông tin địa chỉ vào bảng deliveryAddressDetails
            const saveDeliveryAddress = await Axios({
                ...connectApi.createNewDeliveryAddress,
                data: userData
            })
            //console.log(saveDeliveryAddress.data)

            if(saveDeliveryAddress.data.success){
                // Lấy Id của địa chỉ đã lưu
                const deliveryAddressId = saveDeliveryAddress.data.data._id
                //console.log("ID địa chỉ: ", deliveryAddressId)

                // Lưu đơn hàng, gửi Id địa chỉ vào delivery_address
                const orderData = {
                    ...cartItem,  // Dữ liệu đơn hàng
                    delivery_address: deliveryAddressId  // Id địa chỉ
                }

                const responseOrderData = await Axios({
                    ...connectApi.createNewOrderOnline,
                    data: orderData
                })
                
                // Lấy session_id từ response để thanh toán qua Stripe
                const sessionId = responseOrderData.data.data.session_id

                if(sessionId) {
                    // Chuyển hướng đến trang thanh toán của Stripe
                    const stripe = await stripePromise

                    // Kiểm tra xem Stripe đã được tải chưa
                    if(stripe) {
                        const { error } = await stripe.redirectToCheckout({
                            sessionId: sessionId,  // Sử dụng session_id trả về từ backend
                        })

                        if(error) {
                            toast.error(error.message, {
                                position: 'top-center',
                            })
                        }
                    }
                }

                if(responseOrderData.data.success){
                    toast.success(responseOrderData.data.message, {
                        position: 'top-center'
                    })
                    // Cập nhật lại giỏ hàng sau khi thanh toán
                    if(fetchCartItems){
                        fetchCartItems()
                    }

                    // Cập nhật lại đơn hàng sau khi tạo mới
                    if(fetchOrder){
                        fetchOrder()
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className='container mx-auto py-12'>           
        {
            cartItem?.[0] ? (
            <>
                <h2 className='text-3xl font-bold text-gray-800 mb-5'>GIỎ HÀNG</h2>
                <div className='grid lg:grid-cols-3 gap-4 max-lg:max-w-3xl mx-auto'>
                    <div className='lg:col-span-2 bg-white divide-y divide-gray-300 px-4 rounded overflow-auto'>
                        {
                            cartItem?.[0] && (cartItem.map((item, index) => {
                                return(
                                <>
                                    <div className='grid md:grid-cols-4 items-center gap-4 py-5'>
                                        <div className='col-span-2 flex items-center gap-6'>
                                            <div className='w-24 h-20'>
                                                <img 
                                                    src={item?.product_id?.image[0]}
                                                    className='w-full h-full object-scale-down'
                                                />
                                            </div>

                                            <div>
                                                <h3 className='text-base font-bold text-gray-800 text-ellipsis line-clamp-2'>{item?.product_id?.name}</h3>
                                                <h4 className='text-sm text-gray-500 mt-1'>{item?.product_id?.subCategory?.[0].name}</h4>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-3 ml-10'>
                                            <AddToCartButton data={item?.product_id}/>
                                        </div>

                                        <div className='flex items-center justify-center gap-4'>
                                            {
                                                Boolean(item?.product_id?.discount) ? (
                                                    <>
                                                        <strike className='text-gray-500 font-semibold text-base'>{displayCurrencyToVND(item?.product_id?.price)}</strike>
                                                        <h4 className='text-base font-bold text-gray-800'>
                                                            {displayCurrencyToVND(displayDiscountPrice(item?.product_id?.price, item?.product_id?.discount) * (item?.quantity))}
                                                        </h4>
                                                    </>
                                                ) : (
                                                    <p className='text-base font-bold text-gray-800 ml-auto'>{displayCurrencyToVND(item?.product_id?.price * item?.quantity)}</p>
                                                )
                                            }                                                                                       
                                        </div>
                                        <div className='flex items-center lg:ml-7 md:ml-6'>
                                            <RemoveCartItemButton data={item?.product_id}/>
                                        </div>                                        
                                    </div>
                                </>
                                )})
                            )
                        }                       
                    </div>                    

                    <div className='bg-gray-100 rounded-md p-3 h-max'>
                        <h3 className='text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2'>Thông tin đơn hàng</h3>
                        <form className='mt-6'>
                            <h3 className='text-base text-gray-800 font-semibold mb-4'>Nhập thông tin của bạn:</h3>
                            <div className='space-y-3'>
                                {
                                    user?._id ? (
                                        <>
                                            <div className='relative flex items-center'>
                                                <input 
                                                    type='text'
                                                    value={userData.name}
                                                    onChange={handleChange}
                                                    placeholder='Họ và tên'
                                                    className='bg-transparent text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400'
                                                    disabled 
                                                />
                                                <FaUser className='absolute right-3'/>
                                            </div>
                                            <div className='relative flex items-center'>
                                                <input 
                                                    type='email'
                                                    value={userData.email}
                                                    onChange={handleChange}
                                                    placeholder='Email'
                                                    className='bg-transparent text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400'  
                                                    disabled
                                                />
                                                <TfiEmail className='absolute right-3' />
                                            </div>
                                            <div className='relative flex items-center'>
                                                <input 
                                                    type='number'
                                                    value={`0${userData.phone_number}`}
                                                    name='phone_number'
                                                    onChange={handleChange}
                                                    placeholder='Số điện thoại'
                                                    className='bg-transparent text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400'  
                                                    disabled
                                                />
                                                <FaPhone className='absolute right-3 rotate-90' />
                                            </div>
                                            <div className='relative flex items-center'>
                                                <input 
                                                    type='text'
                                                    value={userData.address}
                                                    name='address'
                                                    onChange={handleChange}
                                                    placeholder='Địa chỉ giao hàng'
                                                    className='bg-transparent text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400'  
                                                    disabled
                                                />
                                                <FaAddressBook className='absolute right-3' />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='relative flex items-center'>
                                                <input 
                                                    type='text'
                                                    value={userData.name}
                                                    name='name'
                                                    onChange={handleChange}
                                                    placeholder='Họ và tên'
                                                    className='bg-white text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400'                               
                                                />
                                                <FaUser className='absolute right-3'/>
                                            </div>
                                            <div className='relative flex items-center'>
                                                <input 
                                                    type='email'
                                                    value={userData.email}
                                                    name='email'
                                                    onChange={handleChange}
                                                    placeholder='Email'
                                                    className='bg-white text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400'                                                   
                                                />
                                                <TfiEmail className='absolute right-3' />
                                            </div>
                                            <div className='relative flex items-center'>
                                                <input 
                                                    type='number'
                                                    value={userData.phone_number}
                                                    name='phone_number'
                                                    onChange={handleChange}
                                                    placeholder='Số điện thoại'
                                                    className='bg-white text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400'  
                                                />
                                                <FaPhone className='absolute right-3 rotate-90' />
                                            </div>
                                            <div className='relative flex items-center'>
                                                <input 
                                                    type='text'
                                                    value={userData.address}
                                                    name='address'
                                                    onChange={handleChange}
                                                    placeholder='Địa chỉ giao hàng'
                                                    className='bg-white text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border border-gray-400'  
                                                />
                                                <FaAddressBook className='absolute right-3' />
                                            </div>
                                        </>
                                    )
                                }                               
                            </div>
                        </form>

                        <ul className='text-gray-800 mt-6 space-y-3'>
                            <li className='flex flex-wrap gap-4 text-base font-semibold'>
                                <p>({totalQuantity}) sản phẩm:</p>
                                <span className='ml-auto font-bold'>
                                    {displayCurrencyToVND(totalPrice)}
                                </span>
                            </li>
                            <li className='flex flex-wrap gap-4 text-base font-semibold'>
                                <p>Phí vận chuyển:</p>
                                <span className='ml-auto font-bold'>
                                Miễn phí
                                </span>
                            </li>
                            <hr className='border-gray-300'/>
                            <li className='flex items-center justify-between gap-2 text-base font-semibold'>
                                <p>Tổng cộng:</p>
                                {
                                    !Object.is(totalPrice, totalPriceNotDiscount) ? (
                                        <>
                                            <p className='flex items-center gap-3'>
                                                <span className='text-gray-500 font-semibold text-base'>
                                                    <strike>
                                                        {displayCurrencyToVND(totalPriceNotDiscount)}
                                                    </strike>                                            
                                                </span>
                                                <span className='font-bold'>
                                                    {displayCurrencyToVND(totalPrice)}
                                                </span>
                                            </p>
                                        </>
                                    ) : (
                                        <span className='font-bold'>
                                            {displayCurrencyToVND(totalPriceNotDiscount)}
                                        </span>
                                    )
                                }                                                         
                            </li>
                        </ul>

                        {/** Button */}
                        <div className='mt-6 space-y-3'>
                            <button type='button'
                                onClick={handleCheckOut}
                                className='w-full text-sm px-4 py-3 font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md'>
                                Thanh toán bằng tiền mặt
                            </button>
                            <button type='button'
                                onClick={handleCheckOutOnline}
                                className='w-full text-sm px-4 py-3 font-semibold tracking-wide bg-transparent border border-green-400 hover:bg-green-700 hover:text-white text-black rounded-md'>
                                Thanh toán bằng thẻ tín dụng
                            </button>
                            <button className='w-full text-sm px-4 py-3 font-semibold tracking-wide bg-transparent hover:bg-blue-700 hover:text-white text-gray-800 border border-gray-300 rounded-md transition-all duration-200'>
                                Tiếp tục mua sắm
                            </button>
                        </div>
                    </div>
                </div>
            </>
            ) : (
                <div>
                    <NoItemInCart />
                </div>
            )
        }           
        </section>
    )
}

export default Cart
