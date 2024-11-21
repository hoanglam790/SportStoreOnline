import UploadSubCategory from '@/components/admin/UploadSubCategory'
import React, { useState } from 'react'
import { MdAdd } from 'react-icons/md'
import NoDataSubCate from '../components/admin/NoDataSample'
import Loading from '@/components/admin/Loading'

const SubCategory = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [openUploadSubCate, setOpenUploadSubCate] = useState(false)
    const [subCategoryData, setSubCategoryData] = useState([])

    return (
        <section>
            <div className='bg-white shadow-lg flex items-center justify-between p-2 ml-2'>
                <h2 className='font-semibold'>Danh mục sản phẩm phụ</h2>
                <button onClick={() => setOpenUploadSubCate(true)} className='text-base border border-green-500 hover:bg-green-600 px-2 py-1 rounded flex items-center gap-1'>
                    <MdAdd size={20} />
                    Thêm mới
                </button>
            </div>

            {
                !subCategoryData[0] && !isLoading && (
                    <NoDataSubCate />
                )
            }

            <div className='font-sans overflow-x-auto'>
                <table className='bg-white min-w-full'>
                    <thead className='bg-gray-100 whitespace-nowrap'>
                        <tr>
                            <th className='w-1/4 p-4 text-left text-xs font-semibold text-gray-800'>
                            Tên
                            </th>
                            <th className='w-1/4 p-4 text-left text-xs font-semibold text-gray-800'>
                            Hình ảnh
                            </th>
                            <th className='w-1/4 p-4 text-left text-xs font-semibold text-gray-800'>
                            Danh mục sản phẩm
                            </th>
                            <th className='w-1/4 p-4 text-left text-xs font-semibold text-gray-800'>
                            Hành động
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>

            {/** Thực hiện các sự kiện khi nhấn vào các nút button thì sẽ mở ra cửa sổ và xử lý dữ liệu*/}
            {
                isLoading && (
                    <Loading />
                )
            }

            {
                openUploadSubCate && (
                    <UploadSubCategory close={() => setOpenUploadSubCate(false)} />
                )
            }
        </section>
    )
}

export default SubCategory
