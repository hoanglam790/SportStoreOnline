import Loading from '@/components/pages_admin/Loading'
import NoDataCategory from '@/components/pages_admin/NoDataCategory'
import UploadCategory from '@/components/pages_admin/UploadCategory'
import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import Axios from '../utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'

const Category = () => {
    const [openUploadCate, setOpenUploadCate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])

    const fetchCategoryData = async() => {
        try {
            setIsLoading(true)
            const responseCateData = await Axios({
                ...connectApi.getCategory,
                data: categoryData
            })

            if(responseCateData.data.success){
                setCategoryData(responseCateData.data.data)
            }

        } catch (error) {
            
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryData()
    }, [])

    return (
        <section>
            <div className='bg-white shadow-lg flex items-center justify-between p-2 ml-2'>
                <h2 className='font-semibold'>Danh mục sản phẩm</h2>
                <button onClick={() => setOpenUploadCate(true)} className='text-base border border-green-500 hover:bg-green-600 px-2 py-1 rounded flex items-center gap-1'>
                    <MdAdd size={20} />
                    Thêm mới
                </button>
            </div>
            {
                !categoryData[0] && !isLoading && (
                    <NoDataCategory />
                )
            }

            {/** Đang tạm dừng ở đây */}
            

            {
                isLoading && (
                    <Loading />
                )
            }

            {
                openUploadCate && (
                    <UploadCategory close={() => setOpenUploadCate(false)} />
                )
            }
        </section>
    )
}

export default Category
