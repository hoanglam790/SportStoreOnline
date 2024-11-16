import React from 'react'
import { IoMdHome } from 'react-icons/io'
import { TfiEmail } from 'react-icons/tfi'
import { FaPhoneAlt, FaFacebookSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-gray-800 py-5 mt-4 font-sans tracking-wide'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-10 py-8'>
        <div className='column01'>
          <h3 className='text-lg font-semibold mb-6 text-white'>About us</h3>
          <p className='text-gray-400 text-base text-justify'>
            This is a website that shows to everyone all matches, all tournaments and another things in Top Seed Manager.
          </p>
        </div>

        <div className='column2 mx-20'>
          <h3 className='text-lg font-semibold mb-6 text-white'>Information</h3>
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
          <h3 className='text-lg font-semibold mb-6 text-white'>Contact us</h3>
          <ul className='mt-4 flex-wrap justify-center gap-4 lg:space-x-6 max-lg:flex-col max-lg:items-center max-lg:space-y-2'>         
            <li className='flex text-yellow-400'>              
              <IoMdHome className='size-12' />
              <p className='text-gray-400 text-base text-justify ml-5'>359 La Xuan Oai Street, Truong Thanh Ward, Thu Duc District, Ho Chi Minh City.</p>                          
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
          <h3 className='text-lg font-semibold mb-6 text-white'>Follow us</h3>
          <ul className='flex flex-wrap gap-x-5 gap-4'>            
            {/* Facebook */}
            <li>
              <Link to='/'>
                <FaFacebookSquare className='text-blue-600 text-3xl'/>
              </Link>
            </li>

            {/* Instagram */}
            <li>
              <a href='/' className='text-xl'>
                <svg xmlns='http://www.w3.org/2000/svg' class='inline w-6 h-6' viewBox='0 0 24 24'>
                  <linearGradient id='a' x1='-37.106' x2='-26.555' y1='-72.705' y2='-84.047' gradientTransform='matrix(0 -1.982 -1.844 0 -132.522 -51.077)' gradientUnits='userSpaceOnUse'>
                    <stop offset='0' stop-color='#fd5' />
                    <stop offset='.5' stop-color='#ff543e' />
                    <stop offset='1' stop-color='#c837ab' />
                  </linearGradient>
                  <path fill='url(#a)' d='M1.5 1.633C-.386 3.592 0 5.673 0 11.995c0 5.25-.916 10.513 3.878 11.752 1.497.385 14.761.385 16.256-.002 1.996-.515 3.62-2.134 3.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091C18.89.029 18.778.005 15.91 0 5.737.005 3.507-.448 1.5 1.633z' data-original='url(#a)' />
                  <path fill='#fff' d='M11.998 3.139c-3.631 0-7.079-.323-8.396 3.057-.544 1.396-.465 3.209-.465 5.805 0 2.278-.073 4.419.465 5.804 1.314 3.382 4.79 3.058 8.394 3.058 3.477 0 7.062.362 8.395-3.058.545-1.41.465-3.196.465-5.804 0-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794 1.597c7.574-.012 8.538-.854 8.006 10.843-.189 4.137-3.339 3.683-7.211 3.683-7.06 0-7.263-.202-7.263-7.265 0-7.145.56-7.257 6.468-7.263zm5.524 1.471a1.063 1.063 0 1 0 0 2.126 1.063 1.063 0 0 0 0-2.126zm-4.73 1.243a4.55 4.55 0 1 0 .001 9.101 4.55 4.55 0 0 0-.001-9.101zm0 1.597c3.905 0 3.91 5.908 0 5.908-3.904 0-3.91-5.908 0-5.908z' data-original='#ffffff' /> 
                </svg>
              </a>
            </li>

            {/* Youtube */}
            <li>
              <a href='/' className='text-xl'>
                <span className='[&>svg]:h-7 [&>svg]:w-7 [&>svg]:fill-[#ff0000]'>
                  <svg xmlns='http://www.w3.org/2000/svg' className='inline w-6 h-8' viewBox='0 0 572 512'>   
                    <path d='M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z' />
                  </svg>
                </span>               
              </a>
            </li>
          </ul>
        </div>
      </div>
        
      <hr className='mx-10 my-8 border-gray-400' />
      
      <div className='pb-3'>
        <p className='text-gray-400 text-base text-center'>© Copyright 2024 by Hoang Lam. All rights reserved. Please don't copy and re-up.</p>
      </div>
    </footer>
  )
}

export default Footer
