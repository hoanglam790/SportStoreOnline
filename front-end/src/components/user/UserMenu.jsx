import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
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
import { LuWarehouse } from 'react-icons/lu'

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
            <div className='font-bold flex items-center justify-center uppercase'>Tài khoản của tôi</div>
            <div className='flex items-center justify-center gap-4 w-full my-3'>
                {user.name}
                {/* <Link onClick={handleClose} to='/admin/profile'>
                    <FaExternalLinkAlt size={17} />
                </Link> */}
            </div>
            <p className='text-center text-red-800 mb-5'>{user.role === 'Admin' ? 'Admin' : ''}</p>

            <div className='p-[1px] bg-[#121e31]'/>

            <div className='text-[15px] grid gap-3 py-4'>
                {
                    user.role === 'Admin' ? (
                        <>
                            <div className='text-white text-sm'>                               
                                <NavLink onClick={handleClose} to={'/admin/all-users'}
                                className={({ isActive }) => `${isActive ? 'flex items-center gap-3 bg-gray-700 rounded p-2 w-full' : 'flex items-center gap-3 text-white text-sm ml-2 py-2'}`}>
                                    <FaUserTie size={20}/>
                                    Thông tin tài khoản
                                </NavLink>
                            </div>

                            <div className='text-white text-sm'>                  
                                <NavLink onClick={handleClose} to={'/admin/categories'}
                                className={({ isActive }) => `${isActive ? 'flex items-center gap-3 bg-gray-700 rounded p-2 w-full' : 'flex items-center gap-3 text-white text-sm ml-2 py-2'}`}>
                                    <TbCategory size={20}/>
                                    Danh mục sản phẩm
                                </NavLink>
                            </div>

                            <div className='text-white text-sm'>          
                                <NavLink onClick={handleClose} to={'/admin/sub-categories'}
                                className={({ isActive }) => `${isActive ? 'flex items-center gap-3 bg-gray-700 rounded p-2 w-full' : 'flex items-center gap-3 text-white text-sm ml-2 py-2'}`}>
                                    <MdCategory size={20}/>
                                    Danh mục sản phẩm phụ
                                </NavLink>
                            </div>

                            <div className='text-white text-sm'>                           
                                <NavLink onClick={handleClose} to={'/admin/products'}
                                className={({ isActive }) => `${isActive ? 'flex items-center gap-3 bg-gray-700 rounded p-2 w-full' : 'flex items-center gap-3 text-white text-sm ml-2 py-2'}`}>
                                    <MdProductionQuantityLimits size={20}/>
                                    Sản phẩm
                                </NavLink>
                            </div>

                            <div className='text-white text-sm'>                     
                                <NavLink onClick={handleClose} to={'/admin/warehouse'}
                                className={({ isActive }) => `${isActive ? 'flex items-center gap-3 bg-gray-700 rounded p-2 w-full' : 'flex items-center gap-3 text-white text-sm ml-2 py-2'}`}>
                                    <LuWarehouse size={20}/>
                                    Quản lý sản phẩm tồn kho
                                </NavLink>
                            </div>

                            <div className='text-white text-sm'>                              
                                <NavLink onClick={handleClose} to={'/admin/all-news'}
                                className={({ isActive }) => `${isActive ? 'flex items-center gap-3 bg-gray-700 rounded p-2 w-full' : 'flex items-center gap-3 text-white text-sm ml-2 py-2'}`}>
                                    <IoNewspaperSharp size={20}/>
                                    Tin tức
                                </NavLink>
                            </div>

                            <div className='text-white text-sm'>                  
                                <NavLink onClick={handleClose} to={'/admin/orders'}
                                className={({ isActive }) => `${isActive ? 'flex items-center gap-3 bg-gray-700 rounded p-2 w-full' : 'flex items-center gap-3 text-white text-sm ml-2 py-2'}`}>
                                    <TiShoppingCart size={20}/>
                                    Đơn hàng
                                </NavLink>
                            </div>

                            <div className='text-white text-sm'>                  
                                <NavLink onClick={handleClose} to={'/admin/reports'}
                                className={({ isActive }) => `${isActive ? 'flex items-center gap-3 bg-gray-700 rounded p-2 w-full' : 'flex items-center gap-3 text-white text-sm ml-2 py-2'}`}>
                                    <TbReportAnalytics size={20}/>
                                    Thống kê
                                </NavLink>
                            </div>
                            
                            <div onClick={handleLogout} className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1 cursor-pointer'>
                                <BiLogOut size={22}/>
                                <button>Đăng xuất</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <FaUserTie size={18}/>
                                <Link onClick={handleClose} to='/my-account'>Thông tin tài khoản</Link>
                            </div>

                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <TiShoppingCart size={20}/>
                                <Link onClick={handleClose} to={'/my-order'}>Đơn hàng</Link>
                            </div>
                                        
                            <div className='flex items-center gap-3 text-white text-sm hover:bg-gray-700 rounded px-2 py-1'>
                                <BiLogOut size={20}/>
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
