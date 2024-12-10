import connectApi from '@/common/ApiBackend'
import { setAllItemsInCart } from '@/redux/cartSlice'
import Axios from '@/utils/AxiosConfig'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import displayDiscountPrice from '@/utils/DisplayDiscountPrice'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

export const GlobalContext = createContext(null)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch()
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalPriceNotDiscount, setTotalPriceNotDiscount] = useState(0)
    const cartItem = useSelector((state) => state?.cart_data?.cart?.cartItems)

    {/** Lấy thông tin của giỏ hàng */}
    const fetchCartItems = async() => {
        try {
            const responseData = await Axios({
                ...connectApi.getItemsInCart
            })

            if(responseData.data.success){
                dispatch(setAllItemsInCart(responseData.data.data))
            }
        } catch (error) {
            console.log(error)
        }
    }

    {/** Cập nhật số lượng sản phẩm trong giỏ hàng */}
    const updateCartItems = async(id,quantity) => {
        try {
            const responseData = await Axios({
                ...connectApi.updateItemsInCart,
                data: {
                    _id: id,
                    quantity: quantity
                }
            })

            if(responseData.data.success){
                toast.success(responseData.data.message, {
                    position: 'top-center'
                })
                fetchCartItems()
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        }
    }

    {/** Xóa số lượng sản phẩm trong giỏ hàng */}
    const deleteCartItems = async(cartId) => {
        try {
            const responseData = await Axios({
                ...connectApi.deleteItemsInCart,
                data: {
                    _id: cartId
                }
            })
    
            if(responseData.data.success){
                toast.success(responseData.data.message, {
                    position: 'top-center'
                })
                fetchCartItems()
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        }        
    }

    useEffect(() => {
        fetchCartItems()
    }, [])

    useEffect(() => {
        if(Array.isArray(cartItem)) {
            const quantity = cartItem.reduce((pre, cur) => {
                return pre + cur.quantity
            },0)
            setTotalQuantity(quantity)

            const price = cartItem.reduce((pre, cur) => {
                const priceAfterDiscount = displayDiscountPrice(cur?.productId?.price, cur?.productId?.discount)
                return pre + (priceAfterDiscount * cur.quantity)
            },0)
            setTotalPrice(price)

            const notDiscount = cartItem.reduce((pre, cur) => {
                return pre + (cur?.productId?.price * cur.quantity)
            },0)
            setTotalPriceNotDiscount(notDiscount)
        }
    }, [cartItem])

    return(
        <GlobalContext.Provider value={{
            fetchCartItems,
            updateCartItems,
            deleteCartItems,
            totalQuantity,
            totalPrice,
            totalPriceNotDiscount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider