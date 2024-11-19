import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import uploadNewImage from '@/utils/UploadNewImage'
import Axios from '../../utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Swal from 'sweetalert2'

const UploadCategory = ({close}) => {
    const [categoryData, setCategoryData] = useState({
        cateName: '',
        image: ''
    })

    //const [isLoading, setIsLoading] = useState(false)

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

        const responseImage = await uploadNewImage(file)
        const { data: responseNewImage } = responseImage
        setCategoryData((prev) => {
            return {
                ...prev,
                image: responseNewImage.data.url
            }
        })
    }

    {/** Xử lý khi bấm nút Submit */}
    const handleSubmitCreateCategory = async(e) => {
        e.preventDefault()
        try {
            const responseData = await Axios({
                ...connectApi.createNewCategory,
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
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        }
    }

    return (
        <section className='fixed top-20 bottom-0 left-0 right-0 p-20 bg-neutral-500 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-[700px] p-5 rounded-md'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold'>Thêm mới danh mục sản phẩm</h2>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoMdClose size={25} />
                    </button>
                </div>

                <form onSubmit={handleSubmitCreateCategory}>
                    <div className='grid py-4'>
                        <label className='py-2'>Tên:</label>
                        <input 
                            type='text'
                            id='cateName'
                            placeholder='Nhập tên danh mục sản phẩm'
                            value={categoryData.cateName}
                            name='cateName'
                            onChange={handleInputChange}
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />
                    </div>
                    <div className='grid gap-1 py-1'>
                        <label id='categoryImage' className='py-1'>Hình ảnh:</label>
                        <div className='flex flex-col gap-4 lg:flex-row items-center'>
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
                                <div className={`${!categoryData.cateName ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-400 cursor-pointer'} rounded px-3 py-2`}>
                                Tải hình ảnh
                                </div>
                                <input 
                                    type='file' 
                                    id='uploadCateImg' 
                                    className='hidden'
                                    disabled={!categoryData.cateName}
                                    onChange={handleUploadImage}
                                />
                            </label>
                            
                        </div>
                        <button disabled={!changeColorValue} className={`${categoryData.cateName && categoryData.image ? 'w-full flex items-center justify-center gap-4 mt-4 px-5 py-2.5 text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none'
                            : 'w-full flex items-center justify-center gap-4 px-5 py-2.5 mt-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none'}`}>
                            Cập nhật
                        </button>
                    </div>
                </form>                
            </div>
        </section>
    )
}

export default UploadCategory
