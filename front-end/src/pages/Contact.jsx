import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
    return (
        <section className='py-12'> 
            <div className='container mx-auto'>
                <ul className='flex font-[sans-serif] space-x-4 pb-3 mb-4 mx-auto lg:max-w-7xl sm:max-w-full'>
                    <Link to={'/'} className='flex items-center text-gray-500 text-base cursor-pointer'>
                        Trang chủ
                    </Link>
                    <li className='text-black text-lg'>/</li>
                    <li className='flex items-center font-bold text-base'>Liên hệ</li>
                </ul>
                <hr className='mx-auto mb-8 border-gray-400'/>
                <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4207676358483!2d106.78253487480617!3d10.855566889298087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276e7ea103df%3A0xb6cf10bb7d719327!2zSFVURUNIIC0gxJDhuqFpIGjhu41jIEPDtG5nIG5naOG7hyBUUC5IQ00gKFRodSBEdWMgQ2FtcHVzKQ!5e0!3m2!1svi!2s!4v1708516740647!5m2!1svi!2s' width='100%' height='600' style={{border:0}} allowFullScreen='' loading='lazy' referrerPolicy='no-referrer-when-downgrade'></iframe>
                
                <div className='mx-auto w-full px-4 py-28 text-center lg:w-6/12'>
                    <p className='font-sans text-xl leading-relaxed text-inherit font-semibold'>
                    Co-Working
                    </p>
                    <h2 className='font-sans text-4xl font-bold leading-[1.3] text-blue-gray-900 my-3'>
                    Build something
                    </h2>
                    <p className='font-sans text-xl font-normal leading-relaxed text-blue-gray-500'>
                    Put the potentially record low maximum sea ice extent tihs year down to low ice. According to the National Oceanic and Atmospheric Administration, Ted, Scambos.
                    </p>
                </div>
                <div className='mx-auto my-8 font-[sans-serif]'>
                    <div className='grid lg:grid-cols-3 md:grid-cols-2 max-md:max-w-lg mx-auto gap-12'>
                        <div className='p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='w-12 h-12 bg-blue-100 p-3 rounded-lg shrink-0' viewBox='0 0 32 32'>
                                <path d='M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z' data-original='#000000' />
                                <path d='M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z' data-original='#000000' />
                            </svg>
                            <div className='content'>
                                <h3 className='text-gray-800 text-xl font-semibold mb-3'>Customization</h3>
                                <p className='text-gray-600 text-sm'>Tailor our product to suit your needs Expand your reach with our global network.</p>
                            </div>
                        </div>
                        <div className='p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='w-12 h-12 bg-blue-100 p-3 rounded-lg shrink-0' viewBox='0 0 682.667 682.667'>
                                <defs>
                                    <clipPath id='a' clipPathUnits='userSpaceOnUse'>
                                    <path d='M0 512h512V0H0Z' data-original='#000000' />
                                    </clipPath>
                                </defs>
                                <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeMiterlimit={10} strokeWidth={40} clip-path='url(#a)' transform='matrix(1.33 0 0 -1.33 0 682.667)'>
                                    <path d='M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z' data-original='#000000' />
                                    <path d='M178 271.894 233.894 216 334 316.105' data-original='#000000' />
                                </g>
                            </svg>
                            <div className='content'>
                                <h3 className='text-gray-800 text-xl font-semibold mb-3'>Customization</h3>
                                <p className='text-gray-600 text-sm'>Tailor our product to suit your needs Expand your reach with our global network.</p>
                            </div>
                        </div>
                        <div className='p-4 flex gap-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300'>
                            <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' className='w-12 h-12 bg-blue-100 p-3 rounded-lg shrink-0' viewBox='0 0 512.001 512.001'>
                                <path d='M271.029 0c-33.091 0-61 27.909-61 61s27.909 61 61 61 60-27.909 60-61-26.909-61-60-61zm66.592 122c-16.485 18.279-40.096 30-66.592 30-26.496 0-51.107-11.721-67.592-30-14.392 15.959-23.408 36.866-23.408 60v15c0 8.291 6.709 15 15 15h151c8.291 0 15-6.709 15-15v-15c0-23.134-9.016-44.041-23.408-60zM144.946 460.404 68.505 307.149c-7.381-14.799-25.345-20.834-40.162-13.493l-19.979 9.897c-7.439 3.689-10.466 12.73-6.753 20.156l90 180c3.701 7.423 12.704 10.377 20.083 6.738l19.722-9.771c14.875-7.368 20.938-25.417 13.53-40.272zM499.73 247.7c-12.301-9-29.401-7.2-39.6 3.9l-82 100.8c-5.7 6-16.5 9.6-22.2 9.6h-69.901c-8.401 0-15-6.599-15-15s6.599-15 15-15h60c16.5 0 30-13.5 30-30s-13.5-30-30-30h-78.6c-7.476 0-11.204-4.741-17.1-9.901-23.209-20.885-57.949-30.947-93.119-22.795-19.528 4.526-32.697 12.415-46.053 22.993l-.445-.361-21.696 19.094L174.28 452h171.749c28.2 0 55.201-13.5 72.001-36l87.999-126c9.9-13.201 7.2-32.399-6.299-42.3z' data-original='#000000' />
                            </svg>
                            <div className='content'>
                                <h3 className='text-gray-800 text-xl font-semibold mb-3'>Customization</h3>
                                <p className='text-gray-600 text-sm'>Tailor our product to suit your needs Expand your reach with our global network.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mx-auto w-full px-4 mt-28 text-center'>
                    <p className='font-sans text-xl leading-relaxed text-inherit font-semibold'>
                    Liên hệ với chúng tôi
                    </p>
                    <h2 className='font-sans text-4xl font-bold leading-[1.3] text-blue-gray-900 my-3'>
                    Bạn có muốn làm việc với chúng tôi không ?
                    </h2>
                    <p className='font-sans text-xl font-normal leading-relaxed text-blue-gray-500'>
                    Vui lòng hoàn thành biểu mẫu này và chúng tôi sẽ phản hồi cho bạn trong vòng 24 giờ.
                    </p>
                </div>

                <form className='mx-auto w-full mt-8 lg:w-5/12'>
                    <div className='mb-8 flex gap-8'>
                        <div className='relative w-full min-w-[200px] h-11'>
                            <input className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Họ tên' />
                        </div>
                        <div className='relative w-full min-w-[200px] h-11'>
                            <input className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Email' />
                        </div>             
                    </div>
                    <div className='relative w-full min-w-[200px] h-12'>
                        <textarea id='message' rows='4' className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Nội dung của bạn'></textarea>             
                    </div>
                    <button className='flex items-center justify-center font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm mt-20 py-4 px-7 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] w-full' type='button'>
                    Gửi tin nhắn
                    </button>
                </form>
            </div>              
        </section>
    )
}

export default Contact
