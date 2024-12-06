import connectApi from '@/common/ApiBackend'
import { setAllItemsInCart } from '@/redux/cartSlice'
import Axios from '@/utils/AxiosConfig'
import { createContext, useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const GlobalContext = createContext(null)
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch()

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

    useEffect(() => {
        fetchCartItems()
    }, [])

    return(
        <GlobalContext.Provider value={{
            fetchCartItems
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider