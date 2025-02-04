import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import Swal from 'sweetalert2'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'

const VerifyPasswordByOtp = () => {
    const [userData, setUserData] = useState(['','','','','',''])
    const navigate = useNavigate()
    const currentLocation = useLocation()
    const inputNumber = useRef([])  
    //console.log('location', currentLocation)
    
    const valideValue = userData.every(e => e)

    // Xử lý dữ liệu nhập vào
    const handleInput = (e, index) => {
        const value = e.target.value
        const newData = [...userData]
        newData[index] = value
        setUserData(newData)
        if(value && index < inputNumber.current.length - 1){
            inputNumber.current[index + 1].focus()
        }
    }

    // Xử lý sự kiện khi nhập sai => nhấn phím Backspace để lùi lại
    const handleKeyDown = (e, index) => {
        const value = e.target.value
        const newData = [...userData]
        newData[index] = value
        setUserData(newData)
        if(e.key === 'Backspace' && value === '' && index > 0){
            inputNumber.current[index - 1].focus()
        }
    }

    // Xử lý sự kiện khi sao chép và dán dữ liệu vào mảng
    const handleCopyAndPaste = (e) => {
        e.preventDefault() // Ngăn không cho trình duyệt xử lý mặc định
        const pasteValue = e.clipboardData.getData('text') // Lấy dữ liệu dán từ clipboard
        const numbers = pasteValue.split('').slice(0, userData.length) // Tách chuỗi dán thành mảng số và cắt theo chiều dài của mảng userData
        const newData = [...userData]

        // Cập nhật mảng userData với các số dán vào
        numbers.forEach((number, index) => {
            newData[index] = number
        })
        setUserData(newData) // Cập nhật lại state
    }

    // Xử lý sự kiện nhấn nút xác nhận
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
                setUserData(['','','','','',''])
                navigate('/reset-password', {
                    state: {
                        data: responseData.data,
                        email: currentLocation?.state?.email
                    }
                })
            }
        } catch (error) {
            axiosErrorAnnounce(error)
        }
    }

    // Xử lý sự kiện reset lại giá trị về ban đầu khi nhập sai
    const handleResetData = () => {
        setUserData(['', '', '', '', '', ''])  // Đặt lại giá trị của mảng userData
    }

    useEffect(() => {
        if(!currentLocation?.state?.email){
            navigate('/forgot-password')
        }
    },[])

    return (
        <section id='login'>
            <div className='container mx-auto p-8 mt-32'>
                <div className='font-[sans-serif] bg-gray-50 max-w-xl w-full px-4 py-8 mx-auto'>
                    <form onSubmit={handleSubmitLogin} className='bg-slate-900 p-8 rounded-lg shadow-lg text-sm'>
                        <div className='mb-12'>
                            <h3 className='text-white text-4xl text-center font-extrabold'>Thông tin xác thực</h3>
                        </div>
                        <div>
                            <label className='text-white text-sm text-center block mb-6 px-2 py-1'>Nhập mã OTP bao gồm 6 số đã được gửi đến email của bạn: </label>
                            <div className='flex items-center justify-between w-full gap-3'>
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
                                            onChange={(e) => handleInput(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            onPaste={handleCopyAndPaste}                                                                            
                                        />
                                    )
                                })
                            }
                            </div>                           
                        </div>

                        <div className='mt-12'>
                            <button disabled={!valideValue} className={`${valideValue ? 'w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-green-600 hover:bg-green-500 rounded-md focus:outline-none' 
                                : 'w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-gray-700 rounded-md focus:outline-none cursor-not-allowed'}`}>
                            Xác thực
                            </button>
                        </div>
                        <div className='mt-3'>
                            <button onClick={handleResetData} className='w-full flex items-center justify-center gap-4 py-2.5 px-5 text-sm tracking-wide text-white bg-transparent border border-gray-500 hover:bg-white hover:text-black rounded-md'>
                            Đặt lại
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default VerifyPasswordByOtp
