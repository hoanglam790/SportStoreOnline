import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/user/Header'
import Footer from './components/user/Footer'
import fetchUser from './utils/FetchUser'
import { setUserDetails } from './redux/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAllCategories, setAllSubCategories, setAllProducts, setLoadingCategories } from './redux/productSlice'
import Axios from './utils/AxiosConfig'
import connectApi from './common/ApiBackend'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GlobalProvider from './provider/GlobalProvider'

function App() {
  const dispatch = useDispatch()
  
  const fetchUsers = async() => {
    const userData = await fetchUser()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategoryData = async() => {
    try {
      dispatch(setLoadingCategories(true))
      const responseData = await Axios({
          ...connectApi.getCategory
      })

      if(responseData.data.success){
        dispatch(setAllCategories(responseData.data.data))
      }

    } catch (error) {
        console.log(error)
    } finally{
      dispatch(setLoadingCategories(false))
    }
  }

  const fetchSubCategoryData = async() => {
    try {
        const responseData = await Axios({
            ...connectApi.getAllSubCate
        })

        if(responseData.data.success){
          dispatch(setAllSubCategories(responseData.data.data))
        }
    } catch (error) {
        console.log(error)
    } finally{

    }
  }

  const fetchProductData = async() => {
    try {
        const responseData = await Axios({
            ...connectApi.getProduct
        })

        if(responseData.data.success){
          dispatch(setAllProducts(responseData.data.data))
        }

    } catch (error) {
        console.log(error)
    } finally{

    }
  }

  useEffect(() => {
    fetchUsers()
    fetchCategoryData()
    fetchSubCategoryData()
    fetchProductData()
  }, [])

  return (
    <>
      <GlobalProvider>
        <Header />
        <main className='max-w-screen-2xl mx-auto mt-[125px]'>
          <Outlet />
        </main>      
        <Footer />
        <ToastContainer />
      </GlobalProvider>        
    </>
  )
}

export default App
