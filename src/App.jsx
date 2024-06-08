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
// import Footer from './component/layout/footer'
// import Navbar from './component/layout/navbar'
import Destination from './component/destination/Destination'
import CreateDestination from './component/destination/CreateDestination'
import SingleCard from './component/destination/SingleCard'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context)
  
  useEffect(() => {
   const fetchUser = async()=>{
    try {
      const res= await axios.get("http://localhost:4000/api-v2/user/getUser", {withCredentials:true})
      setUser(res.data.user)
      setIsAuthorized(true)
    } catch (error) {
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
        <Route path='/creat-epost' element={<CreateDestination/>}/>
        <Route path='/location/:id' element={<SingleCard/>}/>

        {/* <Route path='/application/:id' element={<Home/>}/> */}
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Footer/>
      <Toaster/>
    </Router>
      
    </>
  )
}

export default App
