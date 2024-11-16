import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/pages/Header'
import Footer from './components/pages/Footer'

function App() {
  return (
    <>
      <Header />
      <main className='min-h-screen max-w-screen-2xl mx-auto'>
        <Outlet />
      </main>      
      <Footer />
    </>
  )
}

export default App
