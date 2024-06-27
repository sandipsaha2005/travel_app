import { useState, useContext,useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import {Context} from './main'
import './App.css'
import Login from './component/auth/login'
import Register from './component/auth/register'
import Home from './component/home/home'
import NotFound from './component/notfound/index'
import Footer from './component/organs/Footer'
import Navbar from './component/organs/NavBar'
import AboutUs from './component/home/AboutUs'
import Destination from './component/destination/Destination'
import CreateDestination from './component/destination/CreateDestination'
import SingleCard from './component/destination/SingleCard'
import BookForm from './component/destination/BookForm'
import AllBookings from './component/destination/Bookings'
import EditDestination from './component/destination/EditFom'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context)
  
  useEffect(() => {
   const fetchUser = async()=>{
    try {
      console.log("before api ");
      const res= await axios.get(`${import.meta.env.VITE_API_URL}user/getUser`, {withCredentials:true})

      setUser(res.data.user)
      setIsAuthorized(true)
    } catch (error) {
      console.log("in catch");
      setIsAuthorized(false)
    }
   }
   fetchUser();
  }, [isAuthorized])

  
  return (
    <>
    <Router>
     <Navbar/>
      <Routes>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/destinations' element={<Destination/>}/>
        <Route path='/book/:id' element={<BookForm/>}/>
        <Route path='/bookings/:id' element={<AllBookings/>}/>
        <Route path='/edit/:id' element={<EditDestination/>}/>
        <Route path='/creat-post' element={<CreateDestination/>}/>
        <Route path='/location/:id' element={<SingleCard/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>

        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
      <Toaster/>
    </Router>
      
    </>
  )
}

export default App
