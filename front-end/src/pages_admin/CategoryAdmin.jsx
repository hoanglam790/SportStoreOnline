import Loading from '@/components/admin/Loading'
import NoDataCategory from '@/components/admin/NoDataSample'
import UploadCategory from '@/components/admin/UploadCategory'
import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import Axios from '../utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import EditCategory from '@/components/admin/EditCategory'
import Swal from 'sweetalert2'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'

const Category = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [openUploadCate, setOpenUploadCate] = useState(false)      
    const [openEditCate, setOpenEditCate] = useState(false)
    const [editCateData, setEditCategory] = useState({
        name: '',
        image: ''
    })

    const [deleteCateData, setDeleteCategory] = useState({
        _id: ''
    })

    // Hàm xử lý gọi API để hiển thị dữ liệu Category
    const fetchCategoryData = async() => {
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.getCategory,
                data: categoryData
            })
    
            if(responseData.data.success){
                setCategoryData(responseData.data.data)
            }
            
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
        } finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryData()
    }, [])

    
    // Hàm xử lý gọi API để xóa dữ liệu Category
    const handleDeleteCate = async() => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa danh mục sản phẩm này không?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: 'Không',
            customClass: {
                title: 'text-xl font-semibold'
            }          
        }).then(async(result) => {
            if(result.isConfirmed){
                try {
                    const responseData = await Axios({
                        ...connectApi.deleteCategory,
                        data: deleteCateData
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
                        fetchCategoryData()
                    }
                } catch (error) {
                    axiosErrorAnnounce(error)
                }
            }
        })       
    }

    return (
        <section>
            <div className='bg-slate-100 shadow-lg flex items-center justify-between p-2 ml-2'>
                <h2 className='font-semibold'>Danh mục sản phẩm</h2>
                <button onClick={() => setOpenUploadCate(true)} className='text-base border border-green-500 hover:bg-green-600 px-2 py-1 rounded flex items-center gap-1'>
                    <MdAdd size={20} />
                    Thêm mới
                </button>
            </div>

            {/** Nếu không có sản phẩm nào và đang tải thì sẽ hiện thông báo: Không có dữ liệu 
             * Ngược lại sẽ hiển thị ra danh sách.
            */}
            {
                !categoryData?.[0] && !isLoading ? (
                    <NoDataCategory />
                ) : (
                    <div className='p-3 m-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 h-[calc(80vh-100px)] overflow-y-scroll'>
                    {
                        categoryData.map((c) => {
                            return (
                                <div key={c._id} className='w-32 h-72 px-3 shadow-md rounded'>
                                    <img 
                                        alt={c.name}
                                        src={c.image}
                                        className='w-full h-36 mt-3 object-scale-down'
                                    />
                                    <p className='text-center'>{c.name}</p>
                                    <div className='flex items-center h-10 mt-3 gap-3 text-sm'>
                                        <button onClick={() => 
                                            {   
                                                setOpenEditCate(true),
                                                setEditCategory(c)
                                            }} 
                                            className='w-full h-8 bg-blue-600 hover:bg-blue-700 rounded focus:outline-none flex items-center justify-center'>
                                            <FaEdit size={20} className=''/>                   
                                        </button>
                                        <button onClick={() => {
                                                handleDeleteCate(),
                                                setDeleteCategory(c)
                                            }} className='w-full h-8 bg-red-500 hover:bg-red-700 rounded focus:outline-none flex items-center justify-center'>
                                            <RiDeleteBin6Line size={20} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                )
            }
           
            {/** Thực hiện các sự kiện khi nhấn vào các nút button thì sẽ mở ra cửa sổ và xử lý dữ liệu*/}
            {
                isLoading && (
                    <Loading />
                )
            }

            {
                openUploadCate && (
                    <UploadCategory fetchData={fetchCategoryData} close={() => setOpenUploadCate(false)} />
                )
            }

            {
                openEditCate && (
                    <EditCategory fetchData={fetchCategoryData} data={editCateData} close={() => setOpenEditCate(false)}/>
                )
            }
        </section>
    )
}

export default Category
