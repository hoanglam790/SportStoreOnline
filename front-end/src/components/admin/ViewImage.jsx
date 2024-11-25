import React from 'react'
import { IoMdClose } from 'react-icons/io'

const ViewImage = ({ url, close }) => {
    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-neutral-800 bg-opacity-60'>
            <div className='w-full max-w-md p-4 h-[70vh] bg-white '>
                <button onClick={close} className='w-fit block ml-auto'>
                    <IoMdClose size={25} />
                </button>
                <img 
                    alt='full-image'
                    src={url}
                    className='w-[500px] h-[450px] object-scale-down'
                />
            </div>
            
        </div>
    )
}

export default ViewImage
