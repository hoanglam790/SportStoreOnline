import React from 'react'
import { IoMdHome } from 'react-icons/io'
import { TfiEmail } from 'react-icons/tfi'
import { Link } from 'react-router-dom'
import { FaPhoneAlt, FaFacebookSquare } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
import { IoLogoYoutube } from 'react-icons/io5'
import { useSelector } from 'react-redux'

const Footer = ({ isAdmin }) => {
  const user = useSelector(state => state.user_data)

  return (
    <footer className='bg-gray-800 font-sans tracking-wide md:justify-between'>
      {
        user.role === 'Admin' ? (
        <>
          <div className='w-full bg-gray-800 text-white py-5 text-center'>
            <p className='text-gray-400 text-base text-center'>© Copyright 2024 by Hoang Lam. All rights reserved. Please don't copy and re-up.</p>
          </div>
        </>
      ) : (
        <>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 py-8'>
            <div className='column01'>
              <h3 className='text-lg font-semibold mb-6 text-white'>Thông tin</h3>
              <p className='text-gray-400 text-base text-justify'>
                This is a website that shows to everyone all matches, all tournaments and another things in Top Seed Manager.
              </p>
            </div>

          <div className='column2 mx-20'>
            <h3 className='text-lg font-semibold mb-6 text-white'>Đường dẫn</h3>
            <ul className='space-y-4'>
              <li>
                <a href='/' className='text-gray-400 hover:text-white text-base'>Trang chủ</a>
              </li>
              <li>
                <a href='/' className='text-gray-400 hover:text-white text-base'>Sản phẩm</a>
              </li>
              <li>
                <a href='/' className='text-gray-400 hover:text-white text-base'>Tin tức</a>
              </li>
              <li>
                <a href='/' className='text-gray-400 hover:text-white text-base'>Liên hệ</a>
              </li>
            </ul>
          </div>

          <div className='column3 mx-10'>
            <h3 className='text-lg font-semibold mb-6 text-white'>Liên hệ</h3>
            <ul className='mt-4 flex-wrap justify-center gap-4 lg:space-x-6 max-lg:flex-col max-lg:items-center max-lg:space-y-2'>         
              <li className='flex text-yellow-400'>              
                <IoMdHome className='size-12' />
                <p className='text-gray-400 text-base text-justify ml-5'>359 đường Lã Xuân Oai, phường Trường Thạnh, TP. Thủ Đức, TPHCM.</p>                          
              </li>
            </ul>
       
            <ul className='mt-4 flex-wrap justify-center gap-4 lg:space-x-6 max-lg:flex-col max-lg:items-center max-lg:space-y-2'>         
              <li className='flex items-center text-yellow-400'>              
                <TfiEmail />
                <p className='text-gray-400 text-base ml-3'>hoanglamxh790@gmail.com</p>
              </li>
            </ul>

            <ul className='mt-4 flex-wrap justify-center gap-4 lg:space-x-6 max-lg:flex-col max-lg:items-center max-lg:space-y-2'>                     
              <li className='flex items-center text-yellow-400'>              
                <FaPhoneAlt />
                <p className='text-gray-400 text-base ml-3'>(+84) 912 567 790</p>
              </li>
            </ul>
          </div>

          <div className='column4 mx-12'>
            <h3 className='text-lg font-semibold mb-6 text-white'>Theo dõi</h3>
            <ul className='flex flex-wrap gap-x-5 gap-4'>            
              {/* Facebook */}
              <li>
                <Link to='/'>
                  <FaFacebookSquare className='text-blue-600 text-3xl'/>
                </Link>
              </li>

              {/* Instagram */}
              <li>
                <Link href='/' className='text-3xl'>
                  <FaInstagram />
                </Link>
              </li>

              {/* Youtube */}
              <li>
                <Link href='/' className='text-3xl [&>svg]:fill-[#ff0000]'>
                  <IoLogoYoutube />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className='mx-8 my-6 border-gray-400' />
        
        <div className='pb-6'>
          <p className='text-gray-400 text-base text-center'>© Bản quyền 2024 bởi Hoàng Lâm. Vui lòng không sao chép hay đăng tải dưới mọi hình thức.</p>
        </div>
        </>
      )}
    </footer>
  )
}

export default Footer
