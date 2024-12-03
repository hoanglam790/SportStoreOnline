import React from 'react'

const ProductCardAdmin = ({ data }) => {
  return (
    <div className='w-36 p-4 bg-white rounded'>
        <div>
            <img 
                src={data?.image[0]} 
                alt={data.name}
                className='w-full h-36 mt-3 object-scale-down'
            />
        </div>
        <p className='text-ellipsis line-clamp-2 font-normal mt-2'>{data?.name}</p>
    </div>
  )
}

export default ProductCardAdmin
