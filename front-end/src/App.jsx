import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/user/Header'
import Footer from './components/user/Footer'
import fetchUser from './utils/FetchUser'
import { setUserDetails } from './redux/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  const checkIsAdminHeader = window.location.pathname.includes('admin')
  const checkIsAdmin = window.location.pathname.includes('admin')
  
  const fetchUsers = async() => {
    const userData = await fetchUser()
    dispatch(setUserDetails(userData.data))
  }

  useEffect(() => {
    fetchUsers()
  }, [])


  return (
    <>
      <Header isAdmin={checkIsAdminHeader} />
      <main className='max-w-screen-2xl mx-auto mt-[125px]'>
        <Outlet />
      </main>      
      <Footer isAdmin={checkIsAdmin}/>
    </>
  )
}

export default App
