import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import Swal from 'sweetalert2'
import Role from '@/common/Role'
// import AccountStatus from '@/common/AccountStatus'

const EditAccount = ({close, fetchUserData, data: userData}) => {
    const [userRole, setUserRole] = useState(userData.role || '')
    // const [userStatus, setUserStatus] = useState(userData.status || '')

    const [allUserData, setAllUserData] = useState({
        _id: userData?._id,
        name: userData?.name,
        email: userData?.email,
        role: userData?.role,
        status: userData?.status
    })

    // Xử lý sự kiện thay đổi dữ liệu trong DropDownList
    const handleChangeRole = (e) => {
        const selectedRole = e.target.value
        setUserRole(selectedRole)
        setAllUserData((prev) => {
            return {
                ...prev,
                role: selectedRole
            }
        })
    }

    // Xử lý sự kiện thay đổi dữ liệu trong Toggle
    const handleChangeStatus = (e) => {
        // const selectedStatus = e.target.value
        // setUserStatus(selectedStatus)
        // setAllUserData((prev) => {
        //     return {
        //         ...prev,
        //         status: selectedStatus
        //     }
        // })
        const newStatus = e.target.checked ? 'Đang hoạt động' : 'Không hoạt động'
        setAllUserData((prev) => {
            return {
                ...prev,
                status: newStatus
            }
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target //name: xác định tên của trường input - e: giá trị hiện tại mà người dùng đã nhập vào trường input đó
        setAllUserData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // Gọi API và cập nhật dữ liệu vào cơ sở dữ liệu khi nhấn nút Xác nhận
    const updateUser = async(e) => {
        e.preventDefault()
        try {
            const responseData = await Axios({
                ...connectApi.updateUser,
                data: allUserData
            })

            if(responseData.data.success){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    text: responseData.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        title: 'text-xl font-semibold'
                    }
                })
                close()
                fetchUserData()
            }

            if(responseData.data.error){
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    text: responseData.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                    customClass: {
                        title: 'text-xl font-semibold'
                    }
                })
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        }
    }

    return (
        <section className='fixed top-10 bottom-0 left-0 right-0 w-full h-full flex items-center justify-between bg-slate-200 bg-opacity-60'>
            <div className='mx-auto bg-white shadow-sm p-4 w-full max-w-sm rounded-lg'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-lg font-medium'>Chỉnh sửa:</h1>
                    <button className='block ml-auto' onClick={close}>
                        <MdClose size={25}/>
                    </button>
                </div>
                
                <form onSubmit={updateUser}>
                    <div className='my-2'>
                        <p>Email:</p>
                        <input
                            type='email'
                            id='email'
                            placeholder='Nhập tên danh mục sản phẩm'
                            value={allUserData?.email}
                            name='email'
                            onChange={handleInputChange}
                            disabled
                            className='bg-blue-100 border border-gray-300 w-full text-sm px-4 py-2.5 mt-2 rounded-md outline-blue-500'
                        />
                                                                                          
                        <p className='mt-3'>Tên:</p>
                        <input
                            type='text'
                            id='name'
                            placeholder='Nhập tên danh mục sản phẩm'
                            value={allUserData?.name}
                            name='name'
                            onChange={handleInputChange}
                            className='bg-white border border-gray-300 w-full text-sm px-4 py-2.5 mt-2 rounded-md outline-blue-500'
                        />                       
                    </div>
                    
                    <div className='flex items-center justify-between my-4'>
                        <p>Vai trò: </p>
                        <select value={allUserData?.role} onChange={handleChangeRole} className='border px-4 py-2'>
                            {
                                Object.values(Role).map(r => {
                                    return (
                                        <option value={r} key={r}>
                                            {r}
                                        </option>       
                                    )
                                })
                            }                       
                        </select>
                    </div>
                    
                    <div className='flex items-center justify-between my-6'>
                        <p>Trạng thái: </p>
                        <label className='inline-flex items-center cursor-pointer'>
                            <input
                                type='checkbox'
                                className='sr-only peer'
                                checked={allUserData?.status === 'Đang hoạt động'} // Kiểm tra trạng thái ban đầu
                                onChange={handleChangeStatus} // Lắng nghe sự thay đổi
                            />
                            <div className='relative w-11 h-6 bg-gray-200 rounded-full dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600'></div>
                            <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                                {allUserData?.status === 'Đang hoạt động' ? 'Đang hoạt động' : 'Không hoạt động'}
                            </span>
                        </label>
                    </div>                         
                    <button className='w-fit mx-auto block px-3 py-2 bg-blue-500 rounded hover:bg-blue-700 hover:text-white'>Xác nhận</button>
                </form>              
            </div>
        </section>
    )
}

export default EditAccount
