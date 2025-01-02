import React, { useEffect, useState } from 'react'
import Image_1 from '@/assets/Banner/manu_shirt_banner_1.png'
import Image_2 from '@/assets/Banner/manu_shirt_banner.png'
import Image_3 from '@/assets/Banner/shoes_banner.png'
import Image_4 from '@/assets/Banner/sports_sale_banner.png'
import Image_5 from '@/assets/Banner/sports_equipment_banner.png'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { IoMdClock } from 'react-icons/io'
import moment from 'moment'

const BannerPage = () => {
    const [currentImage, setCurrentImage] = useState(0)
    const [currentTime, setCurrentTime] = useState(moment())

    const bannerImages = [
        Image_1,
        Image_2,
        Image_3,
        Image_4,
        Image_5
    ]

    const prevImage = () => {
        if(currentImage != 0){
            setCurrentImage(prev => prev - 1)
        }      
    }

    const nextImage = () => {
        if(bannerImages.length - 1 > currentImage){
            setCurrentImage(prev => prev + 1)
        }      
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if(bannerImages.length - 1 > currentImage){
                nextImage()
            }
            else{
                setCurrentImage(0)
            }
        }, 5000) // Tự động đổi hình ảnh sau 5 giây
        return () => clearInterval(interval)
    }, [currentImage])

    // Xử lý sự kiện cập nhật thời gian theo thời gian thực
    useEffect(() => {
        const intervalTime = setInterval(() => {   // Cập nhật giá trị thời gian mỗi giây
            setCurrentTime(moment())    // Trả về thời gian hiện tại
        }, 1000) // 1000ms: 1s
        return () => clearInterval(intervalTime)    // Dọn dẹp interval
    },[])

    // Mảng đặt tên thứ trong tuần theo tiếng Việt
    const daysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
    const formatDate = `${daysOfWeek[currentTime.day()]}, ngày ${currentTime.format('DD/MM/YYYY - HH:mm:ss')}`

    return (
        <div className='w-full max-h-screen overflow-hidden relative rounded-lg'>
            <div className='flex justify-end mb-3'>
                <div className='flex items-center gap-2'>
                    <IoMdClock size={23}/>
                    <p className='font-semibold italic'>
                        {formatDate}
                    </p>
                </div>              
            </div>
            <div className='absolute z-10 w-full h-full items-center md:flex hidden'>
                <div className='flex justify-between w-full'>
                    <button onClick={prevImage} className='bg-white shadow-md rounded-full m-2 p-2 hover:bg-transparent hover:text-white'><FaAngleLeft size={25}/></button>
                    <button onClick={nextImage} className='bg-white shadow-md rounded-full m-2 p-2 hover:bg-transparent hover:text-white'><FaAngleRight size={25}/></button>
                </div>               
            </div>
            <div className='flex'>
            {
                bannerImages.map((imageUrl, index) => {
                    return (
                    <>
                        <div key={imageUrl} 
                            style={{transform: `translateX(-${currentImage * 100}%)`}}
                            className='w-full h-[450px] min-w-full min-h-full transition-all'>
                            <img src={imageUrl} className='w-full h-[450px] object-cover'/>
                        </div>
                    </>                                              
                    )
                })
            }
            </div>           
        </div>
    )
}

export default BannerPage
