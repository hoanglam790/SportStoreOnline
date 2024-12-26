import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import uploadNewImage from '@/utils/UploadNewImage'
import Axios from '../../utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Swal from 'sweetalert2'
import { CgSpinner } from 'react-icons/cg'

const EditCategory = ({ close, fetchData, data : cateData }) => {
    const [categoryData, setCategoryData] = useState({
        _id: cateData._id,
        name: cateData.name,
        image: cateData.image
    })

    const [isLoading, setIsLoading] = useState(false)

    {/** Xử lý sự kiện thay đổi giá trị nhập liệu trong biểu mẫu (form) */}
    const handleInputChange = (e) => {
        const { name, value } = e.target //name: xác định tên của trường input - e: giá trị hiện tại mà người dùng đã nhập vào trường input đó
        setCategoryData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const changeColorValue = Object.values(categoryData).every(e => e)

    const handleUploadImage = async(e) => {
        const file = e.target.files[0]

        if(!file){
            return
        }
        setIsLoading(true)
        const responseImage = await uploadNewImage(file)
        const { data: responseNewImage } = responseImage
        setIsLoading(false)

        setCategoryData((prev) => {
            return {
                ...prev,
                image: responseNewImage.data.url
            }
        })
    }

    {/** Xử lý khi bấm nút Submit */}
    const handleSubmitEditCategory = async(e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.updateCategory,
                data: categoryData
            })

            {/** Thông báo lỗi */}
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
                close()
                fetchData()
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 z-50 p-20 bg-neutral-500 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-[600px] p-5 rounded-md'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold'>Chỉnh sửa danh mục sản phẩm</h2>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoMdClose size={25} />
                    </button>
                </div>

                <form onSubmit={handleSubmitEditCategory}>
                    <div className='grid py-4'>
                        <label className='py-2'>Tên:</label>
                        <input 
                            type='text'
                            id='name'
                            placeholder='Nhập tên danh mục sản phẩm'
                            value={categoryData.name}
                            name='name'
                            onChange={handleInputChange}
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />
                    </div>

                    <div className='grid gap-1 py-1'>
                        <label id='categoryImage' className='py-1'>Hình ảnh:</label>
                        <div className='flex flex-col gap-4 lg:flex-row items-center justify-center'>
                            <div className='border border-blue-200 h-40 w-full lg:w-40 flex items-center justify-center rounded'>
                                {
                                    categoryData.image ? (
                                        <img
                                            alt='category'
                                            src={categoryData.image}
                                            className='w-full h-full object-scale-down'                                        
                                        />
                                    ) : (
                                        <p className='text-sm font-semibold'>Không có hình ảnh</p>
                                    )
                                }
                                
                            </div>

                            <label htmlFor='uploadCateImg'>
                                <div className={`${!categoryData.name ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-400 cursor-pointer'} rounded px-3 py-2`}>
                                {
                                    isLoading ? (
                                        <div className='w-[110px] h-[42px] flex items-center justify-center'>
                                            <CgSpinner size={30} className='animate-[spin_0.8s_linear_infinite]' />
                                        </div>
                                    ) : (
                                        <div className='px-3 py-2'>
                                            <p>Tải hình ảnh</p>
                                        </div>
                                        
                                    )
                                }
                                
                                </div>
                                <input 
                                    type='file' 
                                    id='uploadCateImg' 
                                    className='hidden'
                                    disabled={!categoryData.name}
                                    onChange={handleUploadImage}
                                />
                            </label>                           
                        </div>
                        {
                            isLoading ? (
                                <button className='w-full flex items-center justify-center gap-4 mt-4 px-5 py-3.5 text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none'>
                                    <CgSpinner size={25} className='animate-[spin_0.8s_linear_infinite]' />
                                </button>
                            ) : (
                                <button disabled={!changeColorValue} className={`${categoryData.name && categoryData.name ? 'w-full flex items-center justify-center gap-4 mt-4 px-5 py-3.5 text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none'
                                    : 'w-full flex items-center justify-center gap-4 px-5 py-3.5 mt-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none cursor-not-allowed'}`}>
                                    Cập nhật
                                </button>
                            )
                        }
                        
                    </div>
                </form>
            </div>
        </section>
    )
}

export default EditCategory
