import React, { useEffect, useState } from 'react'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import Swal from 'sweetalert2'
import moment from 'moment'
import { FaRegEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import ChangeRole from '@/components/admin/ChangeRole'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'


const AllUsers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [dataUser, setDataUser] = useState([])
    const [openUpdateUser, setOpenUpdateUser] = useState(false)
    const [updateDataUser, setUpdateDataUser] = useState({
        name: '',
        email: '',
        role: ''
    })

    // Gửi yêu cầu API để lấy dữ liệu người dùng.
    // Cập nhật dữ liệu người dùng vào state khi thành công.
    // Hiển thị thông báo lỗi khi có lỗi từ API.
    // Quản lý trạng thái isLoading để hiển thị thông báo đang tải.
    const fetchDataAllUsers = async() => {
        try {
            setIsLoading(true)
            const responseData = await Axios({
                ...connectApi.getAllUsers,
                data: dataUser
            })

            if(responseData.data.success) {
                setDataUser(responseData.data.data)
            }

            if(responseData.data.error) {
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
        fetchDataAllUsers()
    }, [])

    return (
        <div className='bg-white pb-4'>
            <table className='userTable w-full'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th className='w-14'>STT</th>
                        <th className='w-80'>Tên tài khoản/Email</th>
                        <th className='w-80'>Tên</th>
                        <th className=''>Vai trò</th>
                        <th className=''>Ngày tạo</th>
                        <th className=''>Hành động</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        dataUser.map((u, index) => {
                            return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{u?.email}</td>
                                    <td>{u?.name}</td>
                                    <td>{u?.role}</td>
                                    <td>{(moment(u?.createdAt).format('lll'))}</td>
                                    <td className='flex justify-center gap-2'>
                                        <button 
                                            onClick={() => {
                                                setOpenUpdateUser(true),
                                                setUpdateDataUser(u)                                                                                             
                                            }}
                                            className='bg-blue-600 rounded p-1.5 hover:bg-blue-700 hover:text-white cursor-pointer'>
                                            <FaRegEdit size={20}/>
                                        </button>
                                        <button className='bg-red-500 rounded p-1.5 hover:bg-red-700 hover:text-white cursor-pointer'>
                                            <MdDelete size={20}/>
                                        </button>                                        
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            {
                openUpdateUser && (
                    <ChangeRole fetchUserData={fetchDataAllUsers} data={updateDataUser} close={() => setOpenUpdateUser(false)} />
                )
            }
            
        </div>
    )
}

export default AllUsers