import { useGlobalContext } from '@/provider/GlobalProvider'
import displayCurrencyToVND from '@/utils/FormatCurrency'
import React from 'react'
import { IoClose } from 'react-icons/io5'

const DisplayCartItems = ({ close }) => {
    const { totalPrice, totalPriceNotDiscount } = useGlobalContext()

    return (
        <section className='bg-neutral-900 fixed top-0 bottom-0 left-0 right-0 bg-opacity-70'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
                <div className='flex items-center justify-between shadow-md p-2 gap-2'>
                    <h2 className='font-semibold text-[18px]'>Giỏ hàng của bạn</h2>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>

                <div className='min-h-[75vh] lg:min-h-[80vh] max-h-[calc(100vh-130px)] h-full bg-blue-50'>

                </div>

                <div className='p-2'>
                    <div className='bg-green-600 text-neutral-100 text-base font-bold p-4 rounded static bottom-3 flex items-center justify-between'>
                        <div>
                            <p>Tổng cộng</p>
                            {displayCurrencyToVND(totalPrice)}
                        </div>
                        <button>Thanh toán</button>                     
                    </div>
                    
                </div>
            </div>           
        </section>
    )
}

export default DisplayCartItems
