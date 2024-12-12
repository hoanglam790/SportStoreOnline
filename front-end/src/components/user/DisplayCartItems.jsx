import { useGlobalContext } from '@/provider/GlobalProvider'
import displayCurrencyToVND from '@/utils/FormatCurrency'
import React from 'react'
import { IoClose } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import displayDiscountPrice from '@/utils/DisplayDiscountPrice'
import LogoCart from '@/assets/no-item-in-cart.png'
import { useNavigate } from 'react-router-dom'

const DisplayCartItems = ({ close }) => {
    const { totalPrice, totalPriceNotDiscount, totalQuantity } = useGlobalContext()
    const cartItem = useSelector(state => state?.cart_data?.cart?.cartItems)
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/')
    }

    const handleNavigateCart = () => {
        navigate('/cart')
    }
    return (
        <section className='bg-neutral-900 fixed top-0 bottom-0 left-0 right-0 bg-opacity-70'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
                <div className='flex items-center justify-between shadow-md p-3 gap-2'>
                    <h2 className='font-semibold text-[18px]'>Giỏ hàng của bạn</h2>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>

                <div className='min-h-[75vh] lg:min-h-[80vh] max-h-[calc(100vh-130px)] h-full bg-blue-50 p-2 flex flex-col gap-4'>
                {
                    cartItem?.[0] ? (
                    <>
                        <div className='bg-white p-2 rounded-lg grid gap-3 overflow-auto'>
                        {
                            cartItem?.[0] && (cartItem.map((item, index) => {
                                return(
                                <>
                                    <div className='flex w-full gap-2'>
                                        <div className='w-20 h-20 min-h-20 min-w-20 border rounded'>
                                            <img 
                                                src={item?.productId?.image[0]}
                                                className='object-scale-down'                                           
                                            />                                           
                                        </div>
                                        
                                        <div className='ml-2 w-full max-w-sm'>
                                            <p className='text-[13px] text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                            <div className='flex justify-between mt-3'>
                                                <p className='text-sm'>{displayCurrencyToVND(displayDiscountPrice(item?.productId?.price, item?.productId?.discount))}</p>
                                                <p className='text-sm font-semibold'>{displayCurrencyToVND(displayDiscountPrice(item?.productId?.price, item?.productId?.discount) * (item?.quantity))}</p>
                                            </div>                                           
                                        </div>
                                        
                                        <div>
                                            <AddToCartButton data={item?.productId}/>
                                        </div>                                        
                                    </div>
                                    <hr className='mt-0'/>
                                </>                                                                       
                                )})
                            )
                        }
                        </div>

                        <div className='bg-white p-4 rounded-lg'>
                            <h3 className='font-semibold'>Thông tin chi tiết</h3>
                            <div className='flex justify-between gap-4 mt-5'>
                                <p>Thành tiền:</p>
                                <p className='flex items-center gap-3'>
                                    <span className='font-semibold'>{displayCurrencyToVND(totalPrice)}</span>
                                </p>
                            </div>
                            <div className='flex justify-between gap-4 mt-5'>
                                <p>Tổng số lượng:</p>
                                <p className='flex items-center gap-3 font-semibold'>
                                    {totalQuantity}
                                </p>
                            </div>
                            <div className='flex justify-between gap-4 mt-5'>
                                <p>Phí vận chuyển:</p>
                                <p className='flex items-center gap-3 font-semibold'>
                                    Miễn phí
                                </p>
                            </div>
                            <div className='flex justify-between gap-4 mt-5'>
                                <p>Tổng cộng:</p>
                                {
                                    !Object.is(totalPrice, totalPriceNotDiscount) ? (
                                    <>
                                        <p className='flex items-center gap-3'>
                                            <span className='text-gray-500 font-normal text-base'>
                                                <strike>
                                                    {displayCurrencyToVND(totalPriceNotDiscount)}
                                                </strike>                                            
                                            </span>
                                            <span className='font-bold'>{displayCurrencyToVND(totalPrice)}</span>
                                        </p>
                                    </>
                                    ) : (
                                        <span className='font-bold'>
                                            {displayCurrencyToVND(totalPriceNotDiscount)}
                                        </span>
                                    )
                                }                                
                            </div>
                        </div>
                    </>
                    ) : (
                        <div className='px-1 mt-20'>
                            <img 
                                src={LogoCart} 
                                className='w-full h-full mix-blend-multiply'
                            />
                            <p className='text-red-700 text-center font-medium p-3 mx-auto'>Không có sản phẩm nào trong giỏ hàng</p>
                            
                            <div className='flex items-center justify-center mt-8 pb-5'>
                                <button onClick={() => {
                                    handleNavigate(),
                                    close()
                                }}
                                className='bg-blue-700 hover:bg-transparent hover:text-blue-800 border border-blue-600 outline-none rounded-md w-[400px] text-white text-xl font-semibold p-3'>
                                Mua sắm ngay
                                </button>
                            </div>
                        </div>
                    )
                }                   
                </div>

                {
                    cartItem[0] && (
                        <div className='p-2'>
                            <div className='bg-green-600 hover:bg-green-800 hover:text-black text-neutral-100 text-xl font-bold p-4 rounded static bottom-3 flex items-center justify-center'>
                                <button onClick={() => {
                                    handleNavigateCart()
                                    close()
                                }}>
                                    Xem giỏ hàng và thanh toán
                                </button>                     
                            </div>                   
                        </div>
                    )
                }                
            </div>           
        </section>
    )
}

export default DisplayCartItems
