import React, { useEffect, useState } from 'react'
import { IoTrashBinSharp } from 'react-icons/io5'
import { FaUser, FaPhone, FaAddressBook } from 'react-icons/fa'
import { TfiEmail } from 'react-icons/tfi'
import { useSelector } from 'react-redux'
import { useGlobalContext } from '@/provider/GlobalProvider'
import NoItemInCart from './NoItemInCart'
import AddToCartButton from './AddToCartButton'
import displayCurrencyToVND from '@/utils/FormatCurrency'
import displayDiscountPrice from '@/utils/DisplayDiscountPrice'
import { toast } from 'react-toastify'

const Cart = ({ data }) => {
    const [cartItemDetails, setCartItemDetails] = useState()
    const [quantity, setQuantity] = useState(0)
    const [isAvailableCart, setIsAvailableCart] = useState(false)

    const {deleteCartItems, totalPrice, totalPriceNotDiscount, totalQuantity } = useGlobalContext()
    const cartItem = useSelector(state => state?.cart_data?.cart?.cartItems)
    //console.log(cartItem)
    
    // Xóa sản phẩm trong giỏ hàng
    const handleRemoveItemsInCart = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        //console.log(cartItemDetails?._id)

        // Hiển thị confirm toast để hỏi người dùng
        toast(
            <div>
              <p className='text-base font-semibold'>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
              <div className='flex items-center justify-center gap-5 mt-6'>
                <button onClick={() => {deleteCartItems(cartItemDetails?._id), toast.dismiss()}}
                    className='bg-transparent hover:bg-green-700 hover:text-white border border-green-600 outline-none rounded-md w-[70px] text-black text-xl font-normal p-2'>
                    Có
                </button>
                <button onClick={() => toast.dismiss()}
                    className='bg-transparent hover:bg-red-700 hover:text-white border border-red-600 outline-none rounded-md w-[90px] text-black text-xl font-normal p-2'>Không</button>
              </div>              
            </div>,
            {
              position: 'top-center',
              autoClose: false,  // Không tự động đóng toast
              closeOnClick: false,  // Ngừng đóng khi click vào toast
              pauseOnHover: true,  // Dừng khi hover chuột vào
              draggable: false,  // Không cho kéo thả
              hideProgressBar: true,  // Ẩn thanh tiến trình
            }
        )
    }

    useEffect(() => {
        // Kiểm tra sản phẩm có tồn tại trong giỏ hàng hay không?
        // Nếu có: cập nhật số lượng
        if(Array.isArray(cartItem)){
            const checkItem = cartItem.some(item => item.productId?._id)
            //console.log('check',checkItem)
            setIsAvailableCart(checkItem)

            const quantityCartItems = cartItem.find(item => item.productId?._id)
            //console.log('see-qty',quantityCartItems)
            setQuantity(quantityCartItems?.quantity)
            setCartItemDetails(quantityCartItems)
        }           
    },[data, cartItem])

    return (
        <section className='container mx-auto py-12'>           
        {
            cartItem?.[0] ? (
            <>
                <h2 className='text-3xl font-bold text-gray-800 mb-5'>GIỎ HÀNG</h2>
                <div className='grid lg:grid-cols-3 gap-4 max-lg:max-w-3xl mx-auto'>
                    <div className='lg:col-span-2 bg-white divide-y divide-gray-300 px-4 rounded'>
                        {
                            cartItem?.[0] && (cartItem.map((item, index) => {
                                return(
                                <>
                                    <div className='grid md:grid-cols-4 items-center gap-4 py-2'>
                                        <div className='col-span-2 flex items-center gap-6'>
                                            <div className='w-24 h-20'>
                                                <img 
                                                    src={item?.productId?.image[0]}
                                                    className='w-full h-full object-scale-down'
                                                />
                                            </div>

                                            <div>
                                                <h3 className='text-base font-bold text-gray-800 text-ellipsis line-clamp-2'>{item?.productId?.name}</h3>
                                                <h4 className='text-sm text-gray-500 mt-1'>{item?.productId?.subCategory[0].name}</h4>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-3 ml-10'>
                                            <AddToCartButton data={item?.productId}/>
                                        </div>

                                        <div className='flex items-center justify-center gap-4'>
                                            {
                                                Boolean(item?.productId?.discount) ? (
                                                    <>
                                                        <strike className='text-gray-500 font-semibold text-base'>{displayCurrencyToVND(item?.productId?.price)}</strike>
                                                        <h4 className='text-base font-bold text-gray-800'>
                                                            {displayCurrencyToVND(displayDiscountPrice(item?.productId?.price, item?.productId?.discount) * (item?.quantity))}
                                                        </h4>
                                                    </>
                                                ) : (
                                                    <p className='text-base font-bold text-gray-800 ml-auto'>{displayCurrencyToVND(item?.productId?.price * item?.quantity)}</p>
                                                )
                                            }                                                                                       
                                        </div>
                                        <div className='flex items-center ml-7'>
                                            <button onClick={handleRemoveItemsInCart}>
                                                <IoTrashBinSharp size={20}/>
                                            </button>
                                        </div>                                        
                                    </div>
                                </>
                                )})
                            )
                        }                       
                    </div>                    

                    <div className='bg-gray-100 rounded-md p-4 h-max'>
                        <h3 className='text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2'>Thông tin đơn hàng</h3>
                        <form className='mt-6'>
                            <h3 className='text-base text-gray-800  font-semibold mb-4'>Nhập thông tin của bạn:</h3>
                            <div className='space-y-3'>
                                <div className='relative flex items-center'>
                                    <input 
                                        type='text'
                                        placeholder='Họ và tên'
                                        className='bg-white text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none'  
                                    />
                                    <FaUser className='absolute right-3'/>
                                </div>
                                <div className='relative flex items-center'>
                                    <input 
                                        type='email'
                                        placeholder='Email'
                                        className='bg-white text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none'  
                                    />
                                    <TfiEmail className='absolute right-3' />
                                </div>
                                <div className='relative flex items-center'>
                                    <input 
                                        type='number'
                                        placeholder='Số điện thoại'
                                        className='bg-white text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none'  
                                    />
                                    <FaPhone className='absolute right-3 rotate-90' />
                                </div>
                                <div className='relative flex items-center'>
                                    <input 
                                        type='text'
                                        placeholder='Địa chỉ'
                                        className='bg-white text-gray-800 px-4 py-2.5 rounded-md w-full text-sm border-b focus:border-gray-800 outline-none'  
                                    />
                                    <FaAddressBook className='absolute right-3' />
                                </div>
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
                            </li>
                        </ul>

                        {/** Button */}
                        <div className='mt-6 space-y-3'>
                            <button type='button'
                                className='w-full text-sm px-4 py-2.5 font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md'>
                                Thanh toán
                            </button>
                            <button className='w-full text-sm px-4 py-2.5 font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md'>
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
