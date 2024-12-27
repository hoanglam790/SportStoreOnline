import connectApi from '@/common/ApiBackend'
import { setAllItemsInCart } from '@/redux/cartSlice'
import Axios from '@/utils/AxiosConfig'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import displayDiscountPrice from '@/utils/DisplayDiscountPrice'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setOrders } from '@/redux/orderSlice'

export const GlobalContext = createContext(null)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch()
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalPriceNotDiscount, setTotalPriceNotDiscount] = useState(0)
    const cartItem = useSelector((state) => state?.cart_data?.cart)
    const user = useSelector(state => state?.user_data)

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
    const updateCartItems = async(id, quantity) => {
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
    const deleteCartItems = async(id) => {
        try {
            const responseData = await Axios({
                ...connectApi.deleteItemsInCart,
                data: {
                    _id: id
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

    const fetchOrder = async() => {
        try {
            const responseData = await Axios({
                ...connectApi.getAllOrders
            })

            if(responseData.data.success){
                dispatch(setOrders(responseData.data.data))
            }
        } catch (error) {
            console.log(error)
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
                const priceAfterDiscount = displayDiscountPrice(cur?.product_id?.price, cur?.product_id?.discount)
                return pre + (priceAfterDiscount * cur.quantity)
            },0)
            setTotalPrice(price)

            const notDiscount = cartItem.reduce((pre, cur) => {
                return pre + (cur?.product_id?.price * cur.quantity)
            },0)
            setTotalPriceNotDiscount(notDiscount)
        }
    }, [cartItem])

    // Xử lý sự kiện khi đăng xuất tài khoản: Xóa thông tin giỏ hàng được hiển thị trên web
    const handleLogout = () => {
        localStorage.clear()
        dispatch(setAllItemsInCart())
    }

    useEffect(() => {
        fetchCartItems()
        fetchOrder()
        handleLogout()
    },[user])

    return(
        <GlobalContext.Provider value={{
            fetchCartItems,
            updateCartItems,
            deleteCartItems,
            totalQuantity,
            totalPrice,
            totalPriceNotDiscount,
            fetchOrder
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider