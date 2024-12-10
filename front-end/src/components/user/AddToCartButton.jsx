import connectApi from '@/common/ApiBackend'
import { useGlobalContext } from '@/provider/GlobalProvider'
import Axios from '@/utils/AxiosConfig'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../admin/Loading'
import { useSelector } from 'react-redux'
import { FiMinus, FiPlus } from 'react-icons/fi'

const AddToCartButton = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [cartItemDetails, setCartItemDetails] = useState()

    const { fetchCartItems, updateCartItems, deleteCartItems } = useGlobalContext()
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const cartItem = useSelector(state => state?.cart_data?.cart?.cartItems)
    //console.log('addtocartbtn', cartItem)

    // Tăng số lượng sản phẩm trong giỏ hàng
    const increaseQuantity = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        updateCartItems(cartItemDetails?._id, quantity + 1)
    }

    // Giảm số lượng sản phẩm trong giỏ hàng
    const decreaseQuantity = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        if(quantity === 1){
            deleteCartItems(cartItemDetails?._id)
        }
        else{
            updateCartItems(cartItemDetails?._id, quantity - 1)
        }      
    }

    // Xử lý thêm sản phẩm mới vào giỏ hàng
    const handleAddToCart = async(e) => {
        e.preventDefault()
        e.stopPropagation()
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.addToCart,
                data: {
                    productId: data?._id
                }
            })
            
            if(responseData.data.success){
                toast.success(responseData.data.message, {
                    position: 'top-center'
                })
                if(fetchCartItems){
                    fetchCartItems()
                }
            }

            if(responseData.data.error){
                toast.error(responseData.data.message)
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        // Kiểm tra sản phẩm có tồn tại trong giỏ hàng hay không?
        // Nếu có: cập nhật số lượng
        if(Array.isArray(cartItem)){
            const checkItem = cartItem.some(item => item.productId._id === data._id)
            setIsAvailableCart(checkItem)

            const quantityCartItems = cartItem.find(item => item.productId._id === data._id)
            setQuantity(quantityCartItems?.quantity)
            setCartItemDetails(quantityCartItems)
        }           
    },[data, cartItem])
    
    return (
        <div className='w-full max-w-[150px]'>
            <div className='flex w-full h-full'>
                {
                    isAvailableCart ? (
                        <div className='flex items-center justify-center gap-2'>
                            <button onClick={decreaseQuantity}
                            className='bg-green-700 hover:bg-green-800 text-white w-full flex-1 p-1 rounded'><FiMinus /></button>
                            
                            <p className='flex-1 font-semibold w-full'>{quantity}</p>

                            <button onClick={increaseQuantity}
                            className='bg-green-700 hover:bg-green-800 text-white w-full flex-1 p-1 rounded'><FiPlus /></button>
                        </div>
                    ) : (
                        <button onClick={handleAddToCart} className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>
                        {
                            isLoading ? <Loading /> : 'Thêm'
                        }    
                        </button>
                    )
                }               
            </div>
        </div>
    )
}

export default AddToCartButton
