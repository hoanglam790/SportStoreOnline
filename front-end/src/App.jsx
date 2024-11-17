import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/pages/Header_main'
import Footer from './components/pages/Footer'
import toast, { Toaster } from 'react-hot-toast'
import fetchUser from './utils/FetchUser'
import { setUserDetails } from './redux/userSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  const fetchUsers = async() => {
    const userData = await fetchUser()
    dispatch(setUserDetails(userData.data))
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <Header />
      <main className='min-h-screen max-w-screen-2xl mx-auto'>
        <Outlet />
      </main>      
      <Footer />
      <Toaster />
    </>
  )
}

export default App
