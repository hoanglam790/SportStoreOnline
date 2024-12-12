import React from 'react'
import Image from '@/assets/Banner/sports_sale_banner.png'
import { FaUser } from 'react-icons/fa'
import { IoMdClock } from 'react-icons/io'

const NewsDisplay = () => {
    return (
        <section>
            <div className='title mb-5 text-center'>
                <h2 className='text-3xl font-extrabold text-gray-800 inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-6 after:mx-auto after:bg-blue-800 after:rounded-full'>                  
                    Tin tức nổi bật
                </h2>
                <p className='text-base text-center mt-10'>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
                </p>
            </div>

            <div className='container mx-auto py-4 lg:max-w-6xl max-w-lg md:max-w-full'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    <div className='bg-white rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden mx-auto'>
                        <div className='p-6'>
                            <div className='w-full h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8'>
                                <img src={Image} alt='' className='w-full h-full object-contain'/>
                            </div>
                        </div>
                        <div className='mb-3 flex items-center justify-center text-sm font-medium text-gray-500 dark:bg-white gap-2'>
                            <FaUser size={15} />
                            Users
                            
                            <div className='line-clamp-1 ml-2'>|</div>

                            <IoMdClock size={20} />
                            30/11/2024                            
                        </div>
                        <h3 className='text-xl text-center mt-5 font-bold text-gray-800'>ABC</h3>
                        <hr className='my-4'/>
                        <p className='text-gray-400 text-sm text-justify mx-3 my-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
                        
                        <div className='flex items-center justify-center'>
                            <button className='mt-4 mb-3 inline-block px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white text-[15px]'>
                                Xem thêm
                            </button>
                        </div>                       
                    </div>

                    <div className='bg-white rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden mx-auto'>
                        <div className='p-6'>
                            <div className='w-full h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8'>
                                <img src={Image} alt='' className='w-full h-full object-contain'/>
                            </div>
                        </div>
                        <div className='mb-3 flex items-center justify-center text-sm font-medium text-gray-500 dark:bg-white gap-2'>
                            <FaUser size={15} />
                            Users
                            
                            <div className='line-clamp-1 ml-2'>|</div>

                            <IoMdClock size={20} />
                            30/11/2024                            
                        </div>
                        <h3 className='text-xl text-center mt-5 font-bold text-gray-800'>ABC</h3>
                        <hr className='my-4'/>
                        <p className='text-gray-400 text-sm text-justify mx-3 my-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
                        
                        <div className='flex items-center justify-center'>
                            <button className='mt-4 mb-3 inline-block px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white text-[15px]'>
                                Xem thêm
                            </button>
                        </div>                       
                    </div>

                    <div className='bg-white rounded-xl cursor-pointer hover:scale-[1.03] transition-all relative overflow-hidden mx-auto'>
                        <div className='p-6'>
                            <div className='w-full h-[220px] overflow-hidden mx-auto aspect-w-16 aspect-h-8'>
                                <img src={Image} alt='' className='w-full h-full object-contain'/>
                            </div>
                        </div>
                        <div className='mb-3 flex items-center justify-center text-sm font-medium text-gray-500 dark:bg-white gap-2'>
                            <FaUser size={15} />
                            Users
                            
                            <div className='line-clamp-1 ml-2'>|</div>

                            <IoMdClock size={20} />
                            30/11/2024                            
                        </div>
                        <h3 className='text-xl text-center mt-5 font-bold text-gray-800'>ABC</h3>
                        <hr className='my-4'/>
                        <p className='text-gray-400 text-sm text-justify mx-3 my-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nunc et tempus blandit, metus mi consectetur felis turpis vitae ligula.</p>
                        
                        <div className='flex items-center justify-center'>
                            <button className='mt-4 mb-3 inline-block px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white text-[15px]'>
                                Xem thêm
                            </button>
                        </div>                       
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NewsDisplay
