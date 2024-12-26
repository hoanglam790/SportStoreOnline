import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import Swal from 'sweetalert2'
import { setLogout } from '@/redux/userSlice'

const AdminMenu = ({ close }) => {
    const user = useSelector((state) => state.user_data)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async() => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn đăng xuất không?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng ý",
            cancelButtonText: 'Không'           
        }).then(async(result) => {
            if(result.isConfirmed){
                try {
                    const responseData = await Axios({
                        ...connectApi.logout
                    })
        
                    if(responseData.data.success){
                        if(close){
                            close()
                        }
                        dispatch(setLogout(null))
                        localStorage.clear()

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
                        navigate('/')
                    }
                } catch (error) {
                    axiosErrorAnnounce(error)
                }
            }
        })       
    }

    return (
        <div className=''>
            <div className='my-3 text-xl text-center font-semibold'>{user.name}</div>
            <div className='my-3 text-center'>{user.role}</div>

            <div className='p-[1px] bg-slate-800'/>

            <div className='text-[15px] grid gap-4 py-4'>
                <div className='flex items-center hover:text-blue-700 p-1 gap-2'>
                    <FaUser size={17}/>
                    <Link to={''}>Thông tin tài khoản</Link>
                </div>
                <div className='flex items-center hover:text-blue-700 gap-2'>
                    <BiLogOut size={22}/>
                    <button onClick={handleLogout}>Đăng xuất</button>
                </div>                
            </div>
        </div>
    )
}

export default AdminMenu
