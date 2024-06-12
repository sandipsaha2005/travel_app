import React, { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom'

import HeroSection from '../organs/HeroSection'
import Services from '../organs/Services'
import TopDestination from '../organs/TopDestination'
function Home() {
  const { isAuthorized }=useContext(Context)
  if(!isAuthorized){
    return <Navigate to={'/login'}/>
  }
  return (
    <>
      <HeroSection/>
      <Services/>
      <TopDestination/>

    </>
  )
}

export default Home