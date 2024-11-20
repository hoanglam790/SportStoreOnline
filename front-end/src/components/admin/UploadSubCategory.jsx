import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import uploadNewImage from '@/utils/UploadNewImage'
import Axios from '../../utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Swal from 'sweetalert2'

const UploadSubCategory = ({ close }) => {
    const [subCategoryData, setSubCategoryData] = useState({
        subCateName: '',
        image: '',
        Category: []
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSubCategoryData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const changeColorValue = Object.values(subCategoryData).every(e => e)

    const handleUploadImage = async(e) => {
        const file = e.target.files[0]

        if(!file){
            return
        }

        const responseImage = await uploadNewImage(file)
        const { data: responseNewImage } = responseImage
        setSubCategoryData((prev) => {
            return {
                ...prev,
                image: responseNewImage.data.url
            }
        })
    }

    const handleSubmitCreateSubCategory = async() => {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-20 bg-neutral-500 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-white max-w-4xl w-[600px] p-5 rounded-md'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold'>Thêm mới danh mục sản phẩm phụ</h2>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoMdClose size={25} />
                    </button>
                </div>

                <form onSubmit={handleSubmitCreateSubCategory}>
                    <div className='grid py-4'>
                        <label className='py-2'>Tên:</label>
                        <input 
                            type='text'
                            id='subCateName'
                            placeholder='Nhập tên danh mục sản phẩm'
                            value={subCategoryData.subCateName}
                            name='subCateName'
                            onChange={handleInputChange}
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />
                    </div>

                    <div className='grid gap-1 py-1'>
                        <label id='categoryImage' className='py-1'>Hình ảnh:</label>
                        <div className='flex flex-col gap-4 lg:flex-row items-center'>
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
                                <div className={`${!subCategoryData.subCateName ? 'bg-gray-300 cursor-not-allowed' : 'bg-orange-400 cursor-pointer'} rounded px-3 py-2`}>
                                Tải hình ảnh
                                </div>
                                <input 
                                    type='file' 
                                    id='uploadCateImg' 
                                    className='hidden'
                                    disabled={!subCategoryData.subCateName}
                                    onChange={handleUploadImage}
                                />
                            </label>
                            
                        </div>                       
                    </div>

                    <div className='grid gap-2 mt-6'>
                        <label>Chọn danh mục sản phẩm:</label>
                        <div className='border focus-within:border-orange-400 rounded'>
                            <select className='w-full bg-transparent p-3 outline-none'>
                                <option value={''} disabled>Chọn</option>
                            </select>
                        </div>
                        
                    </div>

                    <button disabled={!changeColorValue} className={`${subCategoryData.subCateName && subCategoryData.image ? 'w-full flex items-center justify-center gap-4 mt-4 px-5 py-2.5 text-sm tracking-wide text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none'
                        : 'w-full flex items-center justify-center gap-4 px-5 py-2.5 mt-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none'}`}>
                        Thêm mới
                    </button>
                </form>                
            </div>
        </section>
    )
}

export default UploadSubCategory
