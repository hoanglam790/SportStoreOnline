import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import NoProductData from '@/components/admin/NoDataSample'
import Loading from '@/components/admin/Loading'
import UploadProduct from '@/components/admin/UploadProduct'

const Product = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [productData, setProductData] = useState([])
    const [openUploadProduct, setOpenUploadProduct] = useState(false) // Mở trang thêm mới sản phẩm

    return (
        <section>          
            {
                !openUploadProduct && (
                    <>
                        {/** Giao diện hiển thị danh sách sản phẩm */}
                        <div className='bg-slate-100 shadow-lg flex items-center justify-between p-2 ml-2'>
                            <h2 className='font-semibold'>Danh sách sản phẩm</h2>
                            <button onClick={() => setOpenUploadProduct(true)} className='text-base border border-green-500 hover:bg-green-600 px-2 py-1 rounded flex items-center gap-1'>
                                <MdAdd size={20} />
                                Thêm mới
                            </button>
                        </div>
                        {
                            !productData[0] && !isLoading && (
                                <NoProductData />
                            )
                        }
                    </>
                )
            }
                
            {
                isLoading && (
                    <Loading />
                )
            }

            {
                openUploadProduct && (
                    <UploadProduct back={() => setOpenUploadProduct(false)}/>
                )
            }
        </section>
    )
}

export default Product
