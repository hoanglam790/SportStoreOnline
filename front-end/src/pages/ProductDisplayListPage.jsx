import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend'
import axiosErrorAnnounce from '@/utils/AxiosErrorAnnouce'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import displayCurrencyToVND from '@/utils/FormatCurrency'
import displayDiscountPrice from '@/utils/DisplayDiscountPrice'
import AddToCartButton from '@/components/user/AddToCartButton'

const ProductDisplayListPage = () => {
  const params = useParams()
  let productId = params?.product?.split('-').slice(-1)[0]
  const [productData, setProductData] = useState({
    name: '',
    image: []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(0)
  const imageContainer = useRef()
  const [activeTab, setActiveTab] = useState('tab1')
  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const fetchProductDetails = async () => {
    try {
      setIsLoading(true)
      const responseData = await Axios({
        ...connectApi.getProductDetails,
        data: {
          id: productId
        }
      })

      if (responseData.data.success) {
        setProductData(responseData.data.data)
      }
    } catch (error) {
      axiosErrorAnnounce(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
      <div className=''>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 w-full h-full'>
          <img
            src={productData.image[image]}
            className='w-full h-full object-scale-down'
          />
        </div>
        <div className='flex items-center justify-center gap-3 my-2'>
          {productData.image.map((img, index) => {
            return (
              <div
                key={img + index + 'point'}
                className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${
                  index === image && 'bg-slate-300'
                }`}
              ></div>
            )
          })}
        </div>
        <div className='grid relative'>
          <div
            ref={imageContainer}
            className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'
          >
            {productData.image.map((img, index) => {
              return (
                <div
                  className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md'
                  key={img + index}
                >
                  <img
                    src={img}
                    alt='min-product'
                    onClick={() => setImage(index)}
                    className='w-full h-full object-scale-down'
                  />
                </div>
              )
            })}
          </div>
        </div>

        <div className='mt-28 w-full'>
          <ul className='flex border-b'>
            <li
              onClick={() => handleTabClick('tab1')}
              className={`py-2 px-4 ${
                activeTab === 'tab1'
                  ? 'text-blue-700 font-bold text-base text-center bg-gray-100 py-3 border-b-2 border-blue-700 cursor-pointer'
                  : 'text-gray-500 font-semibold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all'
              }`}
            >
              Mô tả sản phẩm
            </li>
            <li
              onClick={() => handleTabClick('tab2')}
              className={`py-2 px-4 ${
                activeTab === 'tab2'
                  ? 'text-blue-700 font-bold text-base text-center bg-gray-100 py-3 border-b-2 border-blue-700 cursor-pointer'
                  : 'text-gray-500 font-semibold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all'
              }`}
            >
              Bài viết
            </li>
          </ul>
        </div>

        <div className='my-6 hidden lg:grid gap-3 '>
          {
            activeTab === 'tab1' && 
            <div>
              <p className='text-base text-justify'>{productData.description}</p>
            </div>
          }          
        </div>
      </div>

      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <h2 className='text-lg font-semibold lg:text-3xl'>
          {productData.name}
        </h2>
        <hr className='border-b mt-6' />
        <div>
          <p className='mt-4 font-semibold'>Giá:</p>
          <div className='flex items-center gap-2 lg:gap-4'>
            <div className='border border-green-600 px-4 py-2 mt-4 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>
                {displayCurrencyToVND(
                  displayDiscountPrice(productData.price, productData.discount)
                )}
              </p>
            </div>
            <div className='flex items-center gap-4 mt-4'>
              {Boolean(productData.discount) && (
                <>
                  <strike className='text-gray-600 font-normal text-xl'>
                    {displayCurrencyToVND(productData.price)}
                  </strike>
                  <p className='font-bold text-green-600 lg:text-2xl'>
                    (-{productData.discount}%)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {productData.quantity_in_stock === 0 ? (
          <p className='text-lg text-red-500 my-2'>Hết hàng</p>
        ) : (
          // <button className='my-4 px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>Add</button>
          <div className='my-6'>
            <AddToCartButton data={productData} />
          </div>
        )}

        <h2 className='font-semibold'>Why shop from binkeyit? </h2>
        <div>
          <div className='flex  items-center gap-4 my-4'>
            {/* <img
                    src={image1}
                    alt='superfast delivery'
                    className='w-20 h-20'
                  /> */}
            <div className='text-sm'>
              <div className='font-semibold'>Superfast Delivery</div>
              <p>
                Get your orer delivered to your doorstep at the earliest from
                dark stores near you.
              </p>
            </div>
          </div>
          <div className='flex  items-center gap-4 my-4'>
            {/* <img
                    src={image2}
                    alt='Best prices offers'
                    className='w-20 h-20'
                  /> */}
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices & Offers</div>
              <p>
                Best price destination with offers directly from the
                nanufacturers.
              </p>
            </div>
          </div>
          <div className='flex  items-center gap-4 my-4'>
            {/* <img
                    src={image3}
                    alt='Wide Assortment'
                    className='w-20 h-20'
                  /> */}
            <div className='text-sm'>
              <div className='font-semibold'>Wide Assortment</div>
              <p>
                Choose from 5000+ products across food personal care, household
                & other categories.
              </p>
            </div>
          </div>
        </div>

        {/****only mobile */}
        <div className='my-4 grid gap-3'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{productData.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayListPage
