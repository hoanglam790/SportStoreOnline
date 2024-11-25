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
import { FaExternalLinkAlt, FaUserTie } from 'react-icons/fa'
import { TbCategory } from 'react-icons/tb'
import { MdCategory, MdProductionQuantityLimits } from 'react-icons/md'
import { IoNewspaperSharp } from 'react-icons/io5'
import { TbReportAnalytics } from 'react-icons/tb'
import checkIsAdmin from '@/utils/checkIsAdmin'


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

    const handleClose = ()=>{
        if(close){
            close()
        }
    }

    return (
        <div>
            <div className='font-bold'>Tài khoản của tôi</div>
            <div className='my-3 text-center flex items-center ml-8 gap-4 cursor-pointer w-full'>{user.name}
                <Link onClick={handleClose} to='/admin/profile'>
                    <FaExternalLinkAlt size={17} />
                </Link>
            </div>
            <p className='text-center text-red-800 mb-5'>{user.role === 'Admin' ? 'Admin' : ''}</p>

            <div className='p-[1px] bg-[#121e31]'/>

            <div className='text-[15px] grid gap-4 py-5'>
                {
                    user.role === 'Admin' ? (
                        <>
                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <FaUserTie size={20}/>
                                <Link onClick={handleClose} to='/admin/all-users'>Thông tin tài khoản</Link>
                            </div>

                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <TbCategory size={20}/>
                                <Link onClick={handleClose} to='/admin/categories'>Danh mục sản phẩm</Link>
                            </div>

                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <MdCategory size={20}/>
                                <Link onClick={handleClose} to='/admin/sub-categories'>Danh mục sản phẩm phụ</Link>
                            </div>

                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <MdProductionQuantityLimits size={20}/>
                                <Link onClick={handleClose} to='/admin/products'>Sản phẩm</Link>
                            </div>

                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <IoNewspaperSharp size={20}/>
                                <Link onClick={handleClose} to={''}>Tin tức</Link>
                            </div>

                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <TbReportAnalytics size={20}/>
                                <Link onClick={handleClose} to={''}>Thống kê</Link>
                            </div>
                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <BiLogOut size={22}/>
                                <button onClick={handleLogout}>Đăng xuất</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <TiShoppingCart size={20}/>
                                <Link onClick={handleClose} to={''}>Đơn hàng</Link>
                            </div>
                                        
                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <BiLogOut size={22}/>
                                <button onClick={handleLogout}>Đăng xuất</button>
                            </div>                          
                        </>
                    )                   
                }                                 
            </div>
        </div>
    )
}

export default UserMenu
