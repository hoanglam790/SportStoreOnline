import connectApi from '@/common/ApiBackend'
import { useGlobalContext } from '@/provider/GlobalProvider'
import Axios from '@/utils/AxiosConfig'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../admin/Loading'
import { useSelector } from 'react-redux'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { TiShoppingCart } from 'react-icons/ti'

const AddToCartInDetailPageButton = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [quantity, setQuantity] = useState(0)
    const [cartItemDetails, setCartItemDetails] = useState()
    const [isAvailableCart, setIsAvailableCart] = useState(false)

    const { fetchCartItems, updateCartItems, deleteCartItems } = useGlobalContext()
    const cartItem = useSelector(state => state?.cart_data?.cart)
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

    // Xử lý thay đổi số lượng thông qua ô nhập liệu
    const handleQuantityChange = (e) => {
        const newQuantity = e.target.value

        // Nếu người dùng xóa hoàn toàn, set giá trị quantity là rỗng
        if (newQuantity === '') {
            setQuantity('')
        } else {
            const parsedQuantity = parseInt(newQuantity, 10)
            
            // Kiểm tra xem giá trị nhập vào có phải là số và >= 1 không ?
            if (!isNaN(parsedQuantity) && parsedQuantity >= 1) {
                setQuantity(parsedQuantity) // Cập nhật số lượng mới
                updateCartItems(cartItemDetails?._id, parsedQuantity) // Cập nhật lên server hoặc state
            }
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
                    product_id: data?._id
                }
            })
            
            // Thông báo thành công khi trả về dữ liệu
            if(responseData.data.success){
                toast.success(responseData.data.message, {
                    position: 'top-center'
                })

                // Cập nhật lại giỏ hàng sau khi thanh toán
                if(fetchCartItems){
                    fetchCartItems()
                }
            }

            // Thông báo lỗi khi không trả về được dữ liệu
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
            const checkItem = cartItem.some(item => item?.product_id?._id === data?._id)
            setIsAvailableCart(checkItem)

            const quantityCartItems = cartItem.find(item => item?.product_id?._id === data?._id)
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
                            className='bg-green-700 hover:bg-green-800 text-white w-full flex-1 p-1 rounded flex items-center justify-center'><FiMinus /></button>
                            
                            <input
                                type='number'
                                value={quantity}
                                onChange={handleQuantityChange}
                                className='flex-1 w-full font-semibold px-1 text-center flex items-center justify-center'
                                min='1' // Đảm bảo số lượng không nhỏ hơn 1
                            />
                            
                            <button onClick={increaseQuantity}
                            className='bg-green-700 hover:bg-green-800 text-white w-full flex-1 p-1 rounded flex items-center justify-center'><FiPlus /></button>
                        </div>
                    ) : (
                        <button onClick={handleAddToCart} className='bg-green-600 hover:bg-green-700 text-white text-base px-2 lg:px-4 py-1 rounded flex items-center justify-center gap-1'>
                            <TiShoppingCart size={20} />
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

export default AddToCartInDetailPageButton
