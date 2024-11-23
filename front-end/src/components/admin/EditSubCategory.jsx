import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import uploadNewImage from '@/utils/UploadNewImage'
import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import Swal from 'sweetalert2'

const EditSubCategory = ({ close, fetchData, data: subCateData }) => {
    const [subCategoryData, setSubCategoryData] = useState({
        _id: subCateData._id,
        name: subCateData.name,
        image: subCateData.image,
        category: subCateData.category
    })
    const [selectCate, setSelectCate] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const allCategories = useSelector(state => state.product_data?.allCategory)

    const changeColorValue = Object.values(subCategoryData).every(e => e)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSubCategoryData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Xử lý khi chọn ô dữ liệu trong Dropdown list
    const handleChangeSelect = (e) => {
        const handleSelectedCate = e.target.value
        setSelectCate(handleSelectedCate)
        setSubCategoryData((prev) => {
            return{
                ...prev,
                category: handleSelectedCate
            }
        })
    }

    const handleUploadImage = async(e) => {
        const file = e.target.files[0]

        if(!file){
            return
        }
        setIsLoading(true)
        const responseImage = await uploadNewImage(file)
        const { data: responseNewImage } = responseImage
        setIsLoading(false)

        setSubCategoryData((prev) => {
            return {
                ...prev,
                image: responseNewImage.data.url
            }
        })
    }

    // Thực hiện cập nhật dữ liệu khi nhấn nút xác nhận
    const handleSubmitEditSubCategory = async(e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.updateSubCate,
                data: subCategoryData
            })

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
           
        } catch (error) {
            axiosErrorAnnounce(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='fixed top-10 bottom-10 left-0 right-0 mt-[60px] p-10 bg-neutral-500 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-white max-w-2xl w-[600px] p-3 rounded-md'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold'>Chỉnh sửa danh mục sản phẩm phụ</h2>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoMdClose size={25} />
                    </button>
                </div>

                <form onSubmit={handleSubmitEditSubCategory}>
                    <div className='grid py-4'>
                        <label className='py-2'>Tên:</label>
                        <input 
                            type='text'
                            id='name'
                            placeholder='Nhập tên danh mục sản phẩm phụ'
                            value={subCategoryData.name}
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
                                    subCategoryData.image ? (
                                        <img
                                            alt='category'
                                            src={subCategoryData.image}
                                            className='w-full h-full object-scale-down'                                        
                                        />
                                    ) : (
                                        <p className='text-sm font-semibold'>Không có hình ảnh</p>
                                    )
                                }
                                
                            </div>

                            <label htmlFor='uploadCateImg'>
                                <div className={`${!subCategoryData.name ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-400 cursor-pointer'} rounded px-3 py-2`}>
                                {
                                    isLoading ? 'Đang tải ảnh...' : 'Tải hình ảnh'
                                }
                                </div>
                                <input 
                                    type='file' 
                                    id='uploadCateImg' 
                                    className='hidden'
                                    disabled={!subCategoryData.name}
                                    onChange={handleUploadImage}
                                />
                            </label>
                            
                        </div>                       
                    </div>

                    <div className='grid gap-2 mt-6'>
                        <label>Chọn danh mục sản phẩm:</label>
                        <div className='border focus-within:border-orange-400 rounded'>
                            <select onChange={handleChangeSelect} className='w-full bg-transparent p-3 outline-none'>
                                <option value={''}>--- Hãy chọn 01 danh mục sản phẩm</option>
                                {
                                    allCategories.map((category, index) => {
                                        return(
                                            <option value={category?._id}>
                                                {category?.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>                       
                    </div>

                    <button disabled={!changeColorValue} className={`${subCategoryData.name && subCategoryData.image ? 'w-full flex items-center justify-center gap-4 mt-4 px-5 py-2.5 text-sm tracking-wide text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none'
                        : 'w-full flex items-center justify-center gap-4 px-5 py-2.5 mt-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none'}`}>
                        Chỉnh sửa
                    </button>
                </form>                
            </div>
        </section>
    )
}

export default EditSubCategory
