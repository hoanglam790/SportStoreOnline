import React, { useEffect, useState } from 'react'
import Image_1 from '@/assets/Banner/manu_shirt_banner_1.png'
import Image_2 from '@/assets/Banner/manu_shirt_banner.png'
import Image_3 from '@/assets/Banner/shoes_banner.png'
import Image_4 from '@/assets/Banner/sports_sale_banner.png'
import Image_5 from '@/assets/Banner/sports_equipment_banner.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const Category = () => {
    return (
        <section>
            <div className='title mb-5 text-center'>
                <h2 className='text-3xl font-extrabold text-gray-800 inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-6 after:mx-auto after:bg-blue-800 after:rounded-full'>                  
                    Danh mục sản phẩm
                </h2>
                <p className='text-base text-center mt-10'>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
                </p>
            </div>

            <div className='w-full max-h-screen overflow-hidden relative'>
                <div className='grid md:grid-cols-4 lg:grid-cols-6 gap-6 h-full rounded border-b transition-all'>
                    <div className="flex flex-col items-center justify-center px-5 py-4 shadow-md rounded transition-all">
                        <img src={Image_1} className="w-36 h-28" />
                        <button className='w-full p-1.5 rounded-lg text-sm border border-purple-700 outline-none bg-transparent hover:bg-purple-700 text-black hover:text-white transition-all duration-300 mt-5'>A</button>
                    </div>
                    <div className="flex flex-col items-center justify-center px-5 py-4 shadow-md rounded transition-all">
                        <img src={Image_1} className="w-36 h-28" />
                        <button className='w-full p-1.5 rounded-lg text-sm border border-purple-700 outline-none bg-transparent hover:bg-purple-700 text-black hover:text-white transition-all duration-300 mt-5'>A</button>
                    </div>
                    <div className="flex flex-col items-center justify-center px-5 py-4 shadow-md rounded transition-all">
                        <img src={Image_1} className="w-36 h-28" />
                        <button className='w-full p-1.5 rounded-lg text-sm border border-purple-700 outline-none bg-transparent hover:bg-purple-700 text-black hover:text-white transition-all duration-300 mt-5'>A</button>
                    </div>
                    <div className="flex flex-col items-center justify-center px-5 py-4 shadow-md rounded transition-all">
                        <img src={Image_1} className="w-36 h-28" />
                        <button className='w-full p-1.5 rounded-lg text-sm border border-purple-700 outline-none bg-transparent hover:bg-purple-700 text-black hover:text-white transition-all duration-300 mt-5'>A</button>
                    </div>
                    <div className="flex flex-col items-center justify-center px-5 py-4 shadow-md rounded transition-all">
                        <img src={Image_1} className="w-36 h-28" />
                        <button className='w-full p-1.5 rounded-lg text-sm border border-purple-700 outline-none bg-transparent hover:bg-purple-700 text-black hover:text-white transition-all duration-300 mt-5'>A</button>
                    </div>
                    <div className="flex flex-col items-center justify-center px-5 py-4 shadow-md rounded transition-all">
                        <img src={Image_1} className="w-36 h-28" />
                        <button className='w-full p-1.5 rounded-lg text-sm border border-purple-700 outline-none bg-transparent hover:bg-purple-700 text-black hover:text-white transition-all duration-300 mt-5'>A</button>
                    </div>
                    
                     
                </div>
            </div>
                  
        </section>
        
    )
}

export default Category
