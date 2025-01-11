import React, { useEffect, useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import Swal from 'sweetalert2'

const EditProductWarehouse = ({ back, fetchData, data: productWarehouseData }) => {
    const [productData, setProductData] = useState({
        _id: productWarehouseData?._id,
        name: productWarehouseData?.name,
        quantity_added: '',
        warehouse_history: productWarehouseData?.warehouse_history
    })
    const [isLoading, setIsLoading] = useState(false)
    const changeColorValue = Object.values(productData).every(p => p)

    const latestHistory = productData?.warehouse_history?.sort((a,b) => new Date(b.date) - new Date(a.date))[0] // Phần tử đầu tiên nếu mảng đã được sắp xếp theo thời gian
    const latestCostPrice = latestHistory?.cost_price

    // Xử lý dữ liệu đầu vào
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductData((prev) => {
            const updatedHistory = [
                {
                    ...prev.warehouse_history?.[0],
                    [name]: value,  // Cập nhật đúng field trong warehouse_history
                },
            ]
            return {
                ...prev,
                [name]: value,
                warehouse_history: updatedHistory            
            }
        })
    }

    // Xử lý lưu dữ liệu khi nhấn nút xác nhận
    const handleSubmitEditProduct = async(e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.updateProductWarehouse,
                data: productData
            })

            if(responseData.data.error){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: responseData.data.message,                   
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        title: 'text-xl font-semibold'
                    }
                })
            }

            if(responseData.data.success){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: responseData.data.message,                   
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        title: 'text-xl font-semibold'
                    }
                })
            }
            back()
            fetchData()
        } catch (error) {
            axiosErrorAnnounce(error)
        } finally {
            setIsLoading(false)
        }
    }

    // Lấy ra lịch sử cập nhật mới nhất
    //const latestedHistory = productData?.warehouse_history?.sort((a,b) => new Date(b.date) - new Date(a.date))[0]
    console.log(productData)
    return (
        <section>
            <div className='bg-white flex items-center justify-between w-full mt-2'>
                <button onClick={back} className='text-left ml-2'>
                    <HiArrowNarrowLeft size={25} />
                </button>
                <h2 className='font-semibold text-center flex-1'>Cập nhật sản phẩm tồn kho</h2>
            </div>

            <form onSubmit={handleSubmitEditProduct}>
                <div className='grid pt-4 pb-2 mx-2'>
                    <label className='py-2'>Tên:</label>
                    <input 
                        type='text'
                        id='name'
                        placeholder='Nhập tên sản phẩm'
                        value={productData?.name}
                        name='name'
                        className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        disabled
                    />
                </div>

                <div className='grid py-1 mx-2'>
                    <label className='py-2'>Số lượng cần nhập:</label>
                    <input 
                        type='number'
                        id='quantity_added'
                        placeholder='Nhập số lượng tồn kho'
                        value={productData?.quantity_added}
                        name='quantity_added'
                        onChange={handleInputChange}
                        required
                        className='border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    />
                </div>

                <div className='grid py-1 mx-2'>
                    <label className='py-2'>Đơn giá nhập vào:</label>
                    <input 
                        type='number'
                        id='cost_price'
                        placeholder='Nhập đơn giá sản phẩm'
                        value={latestCostPrice}
                        name='cost_price'
                        onChange={handleInputChange}
                        required
                        className='border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    />
                </div>
                {
                    isLoading ? (
                        <div className='flex items-center justify-center'>
                            <button className='w-[150px] flex items-center justify-center gap-4 mt-4 ml-2 px-5 py-3.5 text-sm tracking-wide text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none'>
                                <CgSpinner size={25} className='animate-[spin_0.8s_linear_infinite]' />
                            </button>
                        </div>                       
                    ) : (
                        <div className='flex items-center justify-center'>
                            <button disabled={!changeColorValue}
                                className={`
                                    ${
                                        productData?.name &&  
                                        productData?.quantity_added && 
                                        latestCostPrice ? 
                                        'w-[150px] flex items-center justify-center gap-4 mt-4 ml-2 px-5 py-3.5 text-sm tracking-wide text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none'
                                        :
                                        'w-[150px] flex items-center justify-center gap-4 px-5 py-3.5 mt-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none cursor-not-allowed'
                                    }
                                `}
                                >
                                Cập nhật
                            </button>
                        </div>              
                    )
                }                
            </form>
        </section>
    )
}

export default EditProductWarehouse
