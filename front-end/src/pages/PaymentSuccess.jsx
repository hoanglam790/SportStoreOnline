import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
    const navigate = useNavigate()
    const currentLocation = useLocation()

    const handleBackHome = () => {
        navigate('/')
    }
    return (
        <section className='py-16'>
            <div className='container mx-auto bg-gray-100 h-screen'>
                <div className='p-6 md:mx-auto'>
                    <svg viewBox='0 0 24 24' className='text-green-600 w-16 h-16 mx-auto my-6'>
                        <path fill='currentColor'
                            d='M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'>
                        </path>
                    </svg>
                </div>

                <div className='text-center'>
                    <h3 className='md:text-2xl text-base text-gray-900 font-semibold text-center'>
                        {
                            Boolean(currentLocation?.state?.text) ? location?.state?.text : 'Thanh toán'
                        }
                        Thanh toán thành công!
                    </h3>
                    <p className='text-gray-600 my-2'>Cảm ơn bạn đã hoàn tất việc thanh toán đơn hàng.</p>
                    <p>Chúc bạn một ngày tốt lành!</p>
                    <div className='py-10 text-center'>
                        <button 
                            onClick={handleBackHome} 
                            className='px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-md'>
                            Quay về trang chủ 
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PaymentSuccess