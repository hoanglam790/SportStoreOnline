import connectApi from '@/common/ApiBackend'
import { useGlobalContext } from '@/provider/GlobalProvider'
import Axios from '@/utils/AxiosConfig'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const AddToCartButton = ({ data }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { fetchCartItems } = useGlobalContext()

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
                toast.success(responseData.data.message)
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
    return (
        <div className='w-full max-w-[150px]'>
            <div className='flex w-full h-full'>
                <button onClick={handleAddToCart} className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>Thêm</button>
            </div>
        </div>
    )
}

export default AddToCartButton
