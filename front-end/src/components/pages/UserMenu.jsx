import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../utils/AxiosConfig'
import connectApi from '../../common/ApiBackend'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import { setLogout } from '@/redux/userSlice'
import Swal from 'sweetalert2'


const UserMenu = ({ close }) => {
    const user = useSelector((state) => state.user_data)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const customNotifyAlert = async() => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Đăng xuất thành công',
            showConfirmButton: false,
            timer: 1500
        })
    }

    const handleLogout = async() => {
        Swal.fire({
            title: "Bạn có chắc chắn muốn đăng xuất không?",
            icon: "warning",
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
                        dispatch(setLogout())
                        localStorage.clear()
                        customNotifyAlert(responseData.data.message)
                        navigate('/')
                    }
                } catch (error) {
                    axiosErrorAnnounce(error)
                }
            }
        })       
    }

    return (
        <div>
            <div className='font-bold'>Tài khoản của tôi</div>
            <div className='my-3 text-center'>{user.name}</div>

            <div className='p-[1px] bg-slate-800'/>

            <div className='text-sm grid gap-4 py-4'>
                <Link to={''} className='hover:bg-orange-700 px-2 py-1'>Đơn hàng</Link>
                <button onClick={handleLogout} className='text-left hover:bg-orange-700 px-2 py-1'>Đăng xuất</button>
            </div>
        </div>
    )
}

export default UserMenu
