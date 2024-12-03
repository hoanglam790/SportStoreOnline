import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'

const ProductDetails = ({ close, fetchData, data: productData }) => {
    const [productDataDetail, setProductDataDetail] = useState({
        _id: productData._id,
        name: productData.name,
        image: productData.image,
        description: productData.description,
        price: productData.price,
        discount: productData.discount,
        quantity_in_stock: productData.quantity_in_stock,
        category: productData.category.name,
        subCategory: productData.subCategory
    })

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 z-50 p-10 bg-neutral-500 bg-opacity-60 flex items-center justify-center'>
            <div className='bg-white max-w-2xl w-[600px] p-3 rounded-md'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold uppercase'>Chi tiết sản phẩm</h2>
                    <button onClick={close} className='w-fit block ml-auto'>
                        <IoMdClose size={25} />
                    </button>
                </div>

                <form>
                    <div className='grid py-4'>
                        <label className='py-2'>Tên sản phẩm:</label>
                        <input 
                            type='text'
                            value={productDataDetail.name}
                            disabled
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />
                    </div>

                    <div className='grid gap-2'>
                        <label className='py-2'>Mô tả:</label>
                        <textarea 
                            type='text'                                                      
                            value={productDataDetail.description}
                            rows={3}                           
                            disabled
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />                       
                    </div>

                    <div className='grid gap-2 mt-2'>
                        <label className='py-2'>Giá:</label>
                        <input 
                            type='text'
                            value={productDataDetail.price}
                            disabled
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />                       
                    </div>

                    <div className='grid gap-2 mt-2'>
                        <label className='py-2'>Giảm giá:</label>
                        <input 
                            type='text'
                            value={productDataDetail.discount}
                            disabled
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />                       
                    </div>

                    <div className='grid gap-2 mt-2'>
                        <label className='py-2'>Số lượng trong kho:</label>
                        <input 
                            type='text'
                            value={productDataDetail.quantity_in_stock}
                            disabled
                            className='bg-blue-50 border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500'
                        />                       
                    </div>                 
                </form>
            </div>
        </section>
    )
}

export default ProductDetails
