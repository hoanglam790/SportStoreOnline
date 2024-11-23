import checkIsAdmin from '@/utils/checkIsAdmin'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Logo from '../assets/access-denied.png'

const AdminPermission = ({ children }) => {
    const user = useSelector(state => state.user_data)

    return (
        <>
            {
                checkIsAdmin(user.role) ? children : 
                <>
                    <div className='p-4 flex items-center justify-center'>
                        <img src={Logo} className='w-[450px] h-[330px] mix-blend-multiply'/>
                        {/*  */}
                    </div>
                    <p className='bg-red-300 text-red-700 text-xl text-center font-medium p-5 mx-auto'>Xin lỗi. Bạn không có quyền truy cập.</p>                  
                </>
                
            }
        </>
    )
}

export default AdminPermission 
