import AddToCartButton from '@/components/user/AddToCartButton'
import displayDiscountPrice from '@/utils/DisplayDiscountPrice'
import displayCurrencyToVND from '@/utils/FormatCurrency'
import urlConvert from '@/utils/urlConvert'
import React from 'react'
import { Link } from 'react-router-dom'

const ProductPageDisplayHome = ({ data }) => {
    const url = `/product/${urlConvert(data.name)}-${data._id}`

    return (
        <Link to={url} className='flex flex-col px-5 py-4 border border-gray-300 rounded cursor-pointer transition-all'>
            <div className='w-full h-full relative'>
                <img
                    src={data?.image[0]}
                    className='w-full h-[250px] object-cover mix-blend-multiply'
                />                      
            </div>
            <div className='p-2 flex-1 flex flex-col'>
                <div className='flex-1 mt-3'> {/** truncate: hiển thị ngắn gọn văn bản*/}
                    <h5 className='text-sm sm:text-base text-center font-bold text-gray-800'>{data?.name}</h5>
                    <div className='flex flex-wrap gap-2 mt-2'>
                        <div className='flex gap-2'>
                        {Boolean(data?.discount) && (
                            <>
                                <p className='text-green-600 bg-green-100 px-2 w-fit text-sm rounded-full'>
                                    -{data?.discount}%
                                </p>
                                <strike className='text-gray-500 font-normal text-sm'>{displayCurrencyToVND(data?.price)}</strike>
                            </>                  
                        )}
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between gap-2 mt-2'>
                        <div className='flex items-center gap-1'>
                            <div className='font-semibold text-xl'>
                                {displayCurrencyToVND(displayDiscountPrice(data?.price, data?.discount))}
                            </div>
                        </div>
                        <div className=''>
                            {data?.quantity_in_stock == 0 ? (
                            <p className='text-red-500 text-sm text-center'>Hết hàng</p>
                            ) : (
                                <AddToCartButton data={data} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductPageDisplayHome
