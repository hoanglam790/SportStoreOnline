import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/provider/GlobalProvider'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { IoTrashBinSharp } from 'react-icons/io5'

const RemoveCartItemButton = ({ data }) => {
    const [cartItemDetails, setCartItemDetails] = useState()
    const [isAvailableCart, setIsAvailableCart] = useState(false)

    const { deleteCartItems } = useGlobalContext()
    const cartItem = useSelector(state => state?.cart_data?.cart?.cartItems)

    // Xử lý xóa sản phẩm khỏi giỏ hàng
    const handleRemoveItemsInCart = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        //console.log(cartItemDetails?._id)

        // Hiển thị hộp thoại toast để hỏi người dùng
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
              hideProgressBar: true  // Ẩn thanh tiến trình
            }
        )
    }

    useEffect(() => {
        // Kiểm tra sản phẩm có tồn tại trong giỏ hàng hay không?
        // Nếu có: xóa khỏi giỏ hàng
        if(Array.isArray(cartItem)){
            const checkItem = cartItem.some(item => item?.productId?._id === data?._id)
            setIsAvailableCart(checkItem)

            const quantityCartItems = cartItem.find(item => item?.productId?._id === data?._id)
            setCartItemDetails(quantityCartItems)
        }           
    },[data, cartItem])
    
    return (
        <div className='w-full max-w-[150px]'>
            <div className='flex w-full h-full'>
                {
                    isAvailableCart && (
                        <div className='flex items-center justify-center gap-2'>
                            <button onClick={handleRemoveItemsInCart}>
                                <IoTrashBinSharp size={20}/>
                            </button>
                        </div>
                    ) 
                }               
            </div>
        </div>
    )
}

export default RemoveCartItemButton
