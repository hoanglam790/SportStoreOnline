import React from 'react'
import NoData from '../../assets/no-data.png'

const NoDataCategory = () => {
    return (
        <div className='py-10 flex flex-col items-center justify-center'>
            <img src={NoData}
                alt='no-data'
                className='w-[300px] h-[220px]'           
            />
            <p className='text-black text-[20px] p-2'>Không có dữ liệu...</p>
        </div>
    )
}

export default NoDataCategory
