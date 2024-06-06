import React, { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom'

import HeroSection from '../organs/HeroSection'
function Home() {
  const { isAuthorized }=useContext(Context)
  if(!isAuthorized){
    return <Navigate to={'/login'}/>
  }
  return (
    <>
      <HeroSection/>

    </>
  )
}

export default Home