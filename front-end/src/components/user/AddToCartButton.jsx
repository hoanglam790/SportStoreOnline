import React from 'react'

const AddToCartButton = ({ data }) => {
    return (
        <div className='w-full max-w-[150px]'>
            <div className='flex w-full h-full'>
                <button className='bg-green-600 hover:bg-green-700 text-white px-2 lg:px-4 py-1 rounded'>Thêm</button>
            </div>
        </div>
    )
}

export default AddToCartButton
