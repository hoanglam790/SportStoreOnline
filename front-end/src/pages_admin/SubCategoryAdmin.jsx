import UploadSubCategory from '@/components/admin/UploadSubCategory'
import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import NoDataSubCate from '../components/admin/NoDataSample'
import Loading from '@/components/admin/Loading'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import Swal from 'sweetalert2'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import EditSubCategory from '@/components/admin/EditSubCategory'
import ViewImage from '@/components/admin/ViewImage'

const SubCategory = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [openUploadSubCate, setOpenUploadSubCate] = useState(false)
    const [subCategoryData, setSubCategoryData] = useState([])
    const [openEditSubCate, setOpenEditSubCate] = useState(false)
    const [editSubCateData, setEditSubCategory] = useState({
        name: '',
        image: '',
        category: []
    })

    const [deleteSubCateData, setDeleteSubCategory] = useState({
        _id: ''
    })

    const [imageURL, setImageURL] = useState('')

    // Lấy dữ liệu category từ API
    const fetDataSubCategory = async() => {
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.getAllSubCate,
                data: subCategoryData
            })

            if(responseData.data.success){
                setSubCategoryData(responseData.data.data)
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
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetDataSubCategory()
    }, [])
    
    // Thực hiện xóa khi nhấn nút xác nhận
    const handleDeleteSubCate = () => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn xóa danh mục sản phẩm phụ này không?",
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
                        ...connectApi.deleteSubCate,
                        data: deleteSubCateData
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
                        fetDataSubCategory()
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
                <h2 className='font-semibold'>Danh mục sản phẩm phụ</h2>
                <button onClick={() => setOpenUploadSubCate(true)} className='text-base border border-green-500 hover:bg-green-600 px-2 py-1 rounded flex items-center gap-1'>
                    <MdAdd size={20} />
                    Thêm mới
                </button>
            </div>

            {
                !subCategoryData[0] && !isLoading ? (
                    <NoDataSubCate />
                ) : (
                    <div className='bg-white overflow-x-auto mt-4 mx-3'>
                        <table className='userTable w-full'>
                            <thead>
                                <tr className='bg-slate-600 text-white'>
                                    <th className='w-[120px] p-4'>
                                    Tên
                                    </th>
                                    <th className='w-[30px] p-4'>
                                    Hình ảnh
                                    </th>
                                    <th className='w-[110px] p-4'>
                                    Danh mục sản phẩm
                                    </th>
                                    <th className='w-[20px] p-4'>
                                    Hành động
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                            {
                                subCategoryData.map((s, index) => {
                                    return(
                                        <tr>
                                            <td>{s.name}</td>
                                            <td>
                                                <div className='flex items-center justify-center'>
                                                    <img 
                                                        alt={s.name}
                                                        src={s.image}
                                                        className='w-16 h-12 object-scale-down'
                                                        onClick={() => setImageURL(s.image)}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                {
                                                    s.category.map((c, index) => {
                                                        return(
                                                            <p>{c.name}</p>
                                                        )
                                                    })
                                                
                                                }
                                            </td>
                                            <td>
                                                <div className='flex items-center justify-center h-10 gap-2 text-sm'>
                                                    <button onClick={() => {
                                                        setOpenEditSubCate(true),
                                                        setEditSubCategory(s)
                                                    }} 
                                                        className='w-[40px] h-8 bg-blue-600 hover:bg-blue-700 rounded focus:outline-none flex items-center justify-center'>
                                                        <FaEdit size={20} className=''/>                   
                                                    </button>
                                                    <button onClick={() => {
                                                        handleDeleteSubCate(),
                                                        setDeleteSubCategory(s)
                                                    }}
                                                        className='w-[40px] h-8 bg-red-500 hover:bg-red-700 rounded focus:outline-none flex items-center justify-center'>
                                                        <RiDeleteBin6Line size={20} />
                                                    </button>
                                                </div>
                                                
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
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
                openUploadSubCate && (
                    <UploadSubCategory fetchData={fetDataSubCategory} close={() => setOpenUploadSubCate(false)} />
                )
            }

            {
                openEditSubCate && (
                    <EditSubCategory fetchData={fetDataSubCategory} data={editSubCateData} close={() => setOpenEditSubCate(false)}/>
                )
            }

            {
                imageURL &&
                <ViewImage url={imageURL} close={() => setImageURL('')}/>
            }
        </section>
    )
}

export default SubCategory
