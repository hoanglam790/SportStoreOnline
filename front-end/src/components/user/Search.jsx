import React, { useEffect, useState } from 'react'
import { GrSearch } from 'react-icons/gr'
import { useLocation, useNavigate } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'

const Search = () => {
    const navigate = useNavigate()
    const currentLocation = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false)

    useEffect(() => {
        const urlPage = location.pathname === '/search'
        setIsSearchPage(urlPage)
    }, [currentLocation])

    const redirectToSearchPage = () => {
        navigate('/search')
    }

    return (
        <div className='flex w-full min-w-[200px] lg:min-w-[300px] h-12 rounded-md border overflow-hidden focus-within:border-orange-400'>
            <button className='flex items-center justify-between ml-auto w-full h-full p-3 text-neutral-500'>
                <div>
                    {
                        !isSearchPage ? (
                            <div onClick={redirectToSearchPage}>
                                <TypeAnimation
                                    sequence={[
                                        // Same substring at the start will only be typed out once, initially
                                        'Tìm kiếm "Áo thể thao"',
                                        1000, // wait 1s before replacing "Áo thể thao" with "Giày thể thao"
                                        'Tìm kiếm "Giày thể thao"',
                                        1000,
                                        'Tìm kiếm "Áo đấu"',
                                        1000,
                                        'Tìm kiếm "Trái bóng"',
                                        1000
                                    ]}
                                    wrapper="span"
                                    speed={50}                       
                                    repeat={Infinity}
                                />
                            </div>
                        ) : (
                            <div className='w-full h-full'> 
                                <input type='text' 
                                    placeholder='Tìm kiếm...' 
                                    className='w-full h-full bg-transparent outline-none'/>
                            </div>
                        )       
                    }
                </div>                               
                <GrSearch className=' fill-gray-600'/>
            </button>           
        </div>
    )
}

export default Search
