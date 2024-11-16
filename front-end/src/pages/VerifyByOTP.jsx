import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import toast from 'react-hot-toast'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'

const VerifyPasswordByOtp = () => {
    const [userData, setUserData] = useState(['','','','','',''])

    const navigate = useNavigate()

    const inputNumber = useRef([])
    const currentLocation = useLocation()
    console.log('location', currentLocation)
    useEffect(() => {
        if(!currentLocation?.state?.email){
            navigate('/forgot-password')
        }
    },[])

    // const handleChange = (e, index) => {
    //     const value = e.target.value
    //     const newData = [...userData]
    //     newData[index] = value
    //     setUserData(newData)
    //     if(value && index < 5){
    //         inputNumber.current[index + 1].focus()
    //     }
    // }
    
    const valideValue = userData.every(e => e)

    const handleSubmitLogin = async(e) => {
        e.preventDefault()
        try {
            const responseData = await Axios({
                ...connectApi.verifyPasswordByOtp,
                data: {
                    otp: userData.join(''),
                    email: currentLocation?.state?.email
                }
            })

            // Thông báo lỗi
            if(responseData.data.error){
                toast.error(responseData.data.message)
            }

            if(responseData.data.success){
                toast.success(responseData.data.message)
                setUserData(['','','','','',''])
                //navigate('/verification-password')
            }

        } catch (error) {
            axiosErrorAnnounce(error)
        }
    }

    return (
        <section id='login'>
            <div className='container mx-auto p-8'>
                <div className='font-[sans-serif] bg-gray-50 max-w-md w-full px-4 py-8 mx-auto'>
                    <form onSubmit={handleSubmitLogin}>
                        <div className='mb-12'>
                            <h3 className='text-gray-800 text-4xl text-center font-extrabold'>Thông tin xác thực</h3>
                        </div>
                        <div>
                            <label className='text-gray-800 text-sm block mb-2 px-2 py-1'>Mã OTP: </label>
                            <div className='flex items-center w-full gap-3'>
                                {
                                    userData.map((element, index) => {
                                        return(
                                            <input type='number' required
                                                key={'otp' + index}
                                                name='otp'
                                                value={userData[index]}
                                                maxLength={1}
                                                className='text-gray-800 bg-white border border-gray-300 w-full text-sm text-center px-4 py-2.5 rounded-md outline-blue-500'
                                                ref={(ref) => {
                                                    inputNumber.current[index] = ref
                                                    return ref
                                                }}   
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                    const newData = [...userData]
                                                    newData[index] = value
                                                    setUserData(newData)
                                                    if(value && index < 5){
                                                        inputNumber.current[index + 1].focus()
                                                    }
                                                }}                                            
                                            />
                                        )
                                    })
                                }
                            </div>
                            
                        </div>

                        <div className='mt-8'>
                            <button disabled={!valideValue} className={`${valideValue ? 'w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-green-700 hover:bg-green-500 rounded-md focus:outline-none' 
                                : 'w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none'}`}>
                            Đăng ký
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default VerifyPasswordByOtp
