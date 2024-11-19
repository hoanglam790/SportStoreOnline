import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Axios from '../../utils/AxiosConfig'
import connectApi from '../../common/ApiBackend'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import { setLogout } from '@/redux/userSlice'
import Swal from 'sweetalert2'
import { BiLogOut } from 'react-icons/bi'
import { TiShoppingCart } from 'react-icons/ti'


const UserMenu = ({ close }) => {
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
        <div>
            <div className='font-bold'>Tài khoản của tôi</div>
            <div className='my-3 text-center'>{user.name}</div>

            <div className='p-[1px] bg-slate-800'/>

            <div className='text-[15px] grid gap-4 py-5'>
                <div className='flex items-center hover:text-blue-700 gap-2 cursor-pointer'>
                    <TiShoppingCart size={23}/>
                    <Link to={''}>Đơn hàng</Link>
                </div>
                
                <div className='flex items-center hover:text-blue-700 gap-2 cursor-pointer'>
                    <BiLogOut size={22}/>
                    <button onClick={handleLogout}>Đăng xuất</button>
                </div>
                
            </div>
        </div>
    )
}

export default UserMenu
