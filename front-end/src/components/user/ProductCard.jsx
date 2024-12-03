import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
//import { useGlobalContext } from '../provider/GlobalProvider';
//import AddToCartButton from './AddToCartButton';
import urlConvert from '@/utils/urlConvert'
import displayCurrencyToVND from '@/utils/FormatCurrency'
import displayDiscountPrice from '@/utils/DisplayDiscountPrice'
import AddToCartButton from './AddToCartButton'


const ProductCard = ({ data }) => {
    const url = `/product/${urlConvert(data.name)}-${data._id}`
    const [loading, setLoading] = useState(false)

    return (
        <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white'>
            <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
                <img
                    src={data.image[0]}
                    className='w-full h-full object-scale-down lg:scale-125'
                />
            </div>
                
            <div>                
                <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
                    {data.name}
                </div>
                <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base flex items-center mt-5'>
                    {Boolean(data.discount) && (
                        <>
                            <p className='text-green-600 bg-green-100 px-2 w-fit text-sm rounded-full'>
                                -{data.discount}%
                            </p>
                            <strike className='text-gray-500 font-normal text-sm'>{displayCurrencyToVND(data.price)}</strike>
                        </>                  
                    )}
                </div>
            </div>

            <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
                <div className='flex items-center gap-1'>
                    <div className='font-semibold text-xl'>
                        {displayCurrencyToVND(displayDiscountPrice(data.price, data.discount))}
                    </div>
                </div>
                <div className=''>
                    {data.quantity_in_stock == 0 ? (
                    <p className='text-red-500 text-sm text-center'>Hết hàng</p>
                    ) : (
                        <AddToCartButton data={data} />
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
