import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Post } from '../../../../Backend/models/jobSchema'
// import { GiHamburgerMenu } from 'react-icons/gi'

function Navbar() {
    const [show,setShow]=useState(false)
    const {isAuthorized,setIsAuthorized,user}= useContext(Context)
    const navigate=useNavigate()
    const handleLogout= async()=>{
        try {
            const res=await axios.get("http://localhost:4000/api-v2/user/logout",{withCredentials:true})
            toast.success(res?.data?.message)
            setIsAuthorized(false)
            navigate('/login')
        } catch (error) {
            toast.error(error.res.data.message);
            setIsAuthorized(true)
        }
    }
  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          {/* <img src="/JobZee-logos__white.png" alt="logo" /> */}
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOMEe
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              ALL Post
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}

          <button onClick={handleLogout}>LOGOUT</button>
        </ul>
        <div className="hamburger">
          {/* <GiHamburgerMenu onClick={() => setShow(!show)} /> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar