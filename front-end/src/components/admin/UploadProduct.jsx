import React, { useState } from 'react'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { MdCloudUpload } from 'react-icons/md'
import uploadNewImage from '@/utils/UploadNewImage'
import Loading from './Loading'
import ViewImage from './ViewImage'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import Swal from 'sweetalert2'
import { CgSpinner } from 'react-icons/cg'

const UploadProduct = ({ back, fetchData }) => {
    const [productData, setProductData] = useState({
        name: '',
        image: [],
        description: '',
        price: '',
        discount: '',
        quantity_in_stock: '',
        category: [],
        subCategory: [],
        publish: true
    })

    const [isLoading, setIsLoading] = useState(false)
    const [isImageLoading, setIsImageLoading] = useState(false)
    const [viewFullImage, setViewFullImage] = useState('')
    const [selectCategory, setSelectCategory] = useState('')
    const [selectSubCategory, setSelectSubCategory] = useState('')

    const allCategories = useSelector(state => state.product_data?.allCategory)
    const allSubCategories = useSelector(state => state.product_data?.allSubCategory)

    const changeColorValue = Object.values(productData).every(p => p)

    // Xử lý dữ liệu đầu vào
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setProductData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Xử lý khi chọn ô dữ liệu trong Dropdown list
    const handleChangeSelectCate = (e) => {
        const value = e.target.value
        const category = allCategories.find(c => c._id === value)

        setProductData((prev) => {
            return {
                ...prev,
                category: [...prev.category, category]
            }
        })
        setSelectCategory(value)
    }
    
    // Xử lý khi chọn ô dữ liệu trong Dropdown list
    const handleChangeSelectSubCate = (e) => {
        const value = e.target.value
        const subCategory = allSubCategories.find(el=> el._id === value)

        setProductData((prev) => {
            return {
                ...prev,
                subCategory: [...prev.subCategory, subCategory]
            }
        })
        setSelectSubCategory(value)
    }

    // Xử lý lưu hình ảnh
    const handleUploadImage = async(e) => {
        const file = e.target.files[0]

        if(!file){
            return
        }

        setIsImageLoading(true)
        const responseImage = await uploadNewImage(file)
        const { data: responseNewImage } = responseImage
        const imageUrl = responseNewImage.data.url

        setProductData((prev) => {
            return {
                ...prev,
                image: [...prev.image, imageUrl]
            }
        })
        setIsImageLoading(false)
    }

    // Xử lý xóa hình ảnh nếu không ưng ý
    const handleDeleteImage = async(index) => {
        productData.image.splice(index, 1)
        setProductData((prev) => {
            return {
                ...prev
            }
        })
    }

    const handleRemoveCategorySelected = async(index)=>{
        productData.category.splice(index, 1)
        if(productData.category.length === 1){
            setSelectCategory('')
        }

        setProductData((prev) => {
            return {
                ...prev
            }
        })
    }

    const handleRemoveSubCategorySelected = async(index)=>{
        productData.subCategory.splice(index, 1)
        if(productData.subCategory.length === 1){
            setSelectSubCategory('')
        }

        setProductData((prev) => {
            return {
                ...prev
            }
        })
    }

    // Xử lý khi nhấn nút xác nhận
    const handleSubmitCreateProduct = async(e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.createProduct,
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
                setProductData({
                    name: '',
                    image: [],
                    description: '',
                    price: '',
                    discount: '',
                    quantity_in_stock: '',
                    category: [],
                    subCategory: []
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

    return (
        <section>
            <div className='bg-white flex items-center justify-between w-full mt-2'>
                <button onClick={back} className='text-left ml-2'>
                    <HiArrowNarrowLeft size={25} />
                </button>
                <h2 className='font-semibold text-center flex-1'>Thêm mới sản phẩm</h2>
            </div>
            <form onSubmit={handleSubmitCreateProduct}>
                <div className='grid pt-4 pb-2 mx-2'>
                    <label className='py-2'>Tên:</label>
                    <input 
                        type='text'
                        id='name'
                        placeholder='Nhập tên sản phẩm'
                        value={productData.name}
                        name='name'
                        onChange={handleInputChange}
                        required
                        className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    />
                </div>

                <div className='grid py-1 mx-2'>
                    <label className='py-2'>Mô tả:</label>
                    <textarea 
                        type='text'
                        id='description'
                        placeholder='Nhập mô tả sản phẩm'
                        value={productData.description}
                        name='description'
                        onChange={handleInputChange}
                        rows={4}
                        required
                        className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    />
                </div>

                <div className='grid py-1 mx-2'>
                    <p className='py-2'>Hình ảnh:</p>
                    <div>
                        {/** Tải hình ảnh */}
                        <label htmlFor='productImage' className='bg-neutral-200 h-28 border rounded-md flex items-center justify-center'>
                            <div className='flex justify-center items-center text-center flex-col'>
                            {
                                isImageLoading ? <Loading /> : (
                                    <>
                                        <MdCloudUpload size={40}/>
                                        <p>Tải hình ảnh</p>
                                    </>
                                )
                            }
                                
                            </div>
                            <input 
                                type='file'
                                id='productImage'
                                className='hidden'
                                accept='image/*'
                                onChange={handleUploadImage}
                            />
                        </label>

                        {/** Hiển thị hình ảnh */}
                        <div className='flex flex-wrap gap-4'>
                        {   
                            productData.image.map((img, index) => {
                                return(
                                    <div key={img + index} className='w-20 h-20 min-w-20 mt-2 bg-blue-50 border '>
                                        <div onClick={() => handleDeleteImage(index)} className='w-fit block ml-auto'>
                                            <IoMdClose />
                                        </div>
                                        <img 
                                            src={img} 
                                            alt={img}
                                            onClick={() => setViewFullImage(img)}
                                            className='w-[150px] h-[50px] object-scale-down'
                                        />                                       
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>                    
                </div>

                <div className='grid py-1 mx-2'>
                    <label className='py-2'>Danh mục sản phẩm:</label>
                    <div className='border focus-within:border-orange-400 rounded'>
                        <select 
                            value={selectCategory} 
                            className='w-full bg-transparent p-3 outline-none'
                            onChange={handleChangeSelectCate}
                        >                           
                            <option value={''} >--- Hãy chọn 01 danh mục sản phẩm</option>
                            {
                                allCategories.map((c, index) => {
                                    return(
                                        <option value={c?._id}>
                                            {c?.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-wrap gap-1'>
                        {
                            productData.category.map((cate, index) => {
                                return(
                                    <p key={cate?._id} 
                                    className='bg-transparent border border-orange-400 p-2 m-1 flex items-center gap-2 rounded-sm'>
                                        {cate?.name}
                                        <div className='hover:text-green-600 cursor-pointer'
                                            onClick={() => handleRemoveCategorySelected(index)}>
                                            <IoMdClose size={20}/>
                                        </div>
                                    </p>
                                )                                      
                            })
                        }
                    </div>
                </div>

                <div className='grid py-1 mx-2'>
                    <label className='py-2'>Danh mục sản phẩm phụ:</label>
                    <div className='border focus-within:border-orange-400 rounded'>
                        <select 
                            value={selectSubCategory} 
                            className='w-full bg-transparent p-3 outline-none'
                            onChange={handleChangeSelectSubCate}
                        >                           
                            <option value={''} >--- Hãy chọn 01 danh mục sản phẩm phụ</option>
                            {
                                allSubCategories.map((sb, index) => {
                                    return(
                                        <option value={sb?._id}>
                                            {sb?.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-wrap gap-1'>
                        {
                            productData.subCategory.map((sc, index) => {
                                return(
                                    <p key={sc?._id} 
                                    className='bg-transparent border border-orange-400 p-2 m-1 flex items-center gap-2 rounded-sm'>
                                        {sc?.name}
                                        <div className='hover:text-green-600 cursor-pointer'
                                            onClick={() => handleRemoveSubCategorySelected(index)}>
                                            <IoMdClose size={20}/>
                                        </div>
                                    </p>
                                )                                      
                            })
                        }
                    </div>
                </div>

                <div className='grid py-1 mx-2'>
                    <label className='py-2'>Giá gốc:</label>
                    <input 
                        type='number'
                        id='price'
                        placeholder='Nhập giá sản phẩm'
                        value={productData.price}
                        name='price'
                        onChange={handleInputChange}
                        required
                        className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    />
                </div>

                <div className='grid py-1 mx-2'>
                    <label className='py-2'>Giảm giá (%):</label>
                    <input 
                        type='number'
                        id='discount'
                        placeholder='Nhập giá sản phẩm khuyến mãi'
                        value={productData.discount}
                        name='discount'
                        onChange={handleInputChange}
                        required
                        className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                    />
                </div>

                <div className='grid py-1 mx-2'>
                    <label className='py-2'>Số lượng trong kho:</label>
                    <input 
                        type='number'
                        id='quantity_in_stock'
                        placeholder='Nhập số lượng tồn kho'
                        value={productData.quantity_in_stock}
                        name='quantity_in_stock'
                        onChange={handleInputChange}
                        required
                        className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
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
                                        productData.name && 
                                        productData.image[0] && 
                                        productData.description && 
                                        productData.price && 
                                        productData.discount && 
                                        productData.quantity_in_stock && 
                                        productData.category[0] && 
                                        productData.subCategory[0] ? 
                                        'w-[150px] flex items-center justify-center gap-4 mt-4 ml-2 px-5 py-3.5 text-sm tracking-wide text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none'
                                        :
                                        'w-[150px] flex items-center justify-center gap-4 px-5 py-3.5 mt-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none cursor-not-allowed'
                                    }
                                `}
                                >
                                Thêm mới
                            </button>
                        </div>              
                    )
                }                
            </form>
            {
                viewFullImage && (
                    <ViewImage url={viewFullImage} close={() => setViewFullImage('')}/>
                )
            }
        </section>
    )
}

export default UploadProduct
