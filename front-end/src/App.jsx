import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/user/Header'
import Footer from './components/user/Footer'
import fetchUser from './utils/FetchUser'
import { setUserDetails } from './redux/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAllCategories, setAllSubCategories } from './redux/productSlice'
import Axios from './utils/AxiosConfig'
import connectApi from './common/ApiBackend'

function App() {
  const dispatch = useDispatch()

  const checkIsAdminHeader = window.location.pathname.includes('admin')
  const checkIsAdmin = window.location.pathname.includes('admin')
  
  const fetchUsers = async() => {
    const userData = await fetchUser()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategoryData = async() => {
    try {
        const responseData = await Axios({
            ...connectApi.getCategory
        })

        if(responseData.data.success){
          dispatch(setAllCategories(responseData.data.data))
        }

    } catch (error) {
        
    } finally{

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
        
    } finally{

    }
  }

  useEffect(() => {
    fetchUsers()
    fetchCategoryData()
    fetchSubCategoryData()
  }, [])

  return (
    <>
      <Header />
      <main className='max-w-screen-2xl mx-auto mt-[125px]'>
        <Outlet />
      </main>      
      <Footer />
    </>
  )
}

export default App
