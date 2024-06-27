import React, { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom'

import HeroSection from '../organs/HeroSection'
import Services from '../organs/Services'
import TopDestination from '../organs/TopDestination'
import BookingSteps from '../organs/BookingSteps'
import Testimonials from '../organs/Testimonials'
import NewsLetter from '../organs/NewsLetter'
import {InfiniteMovingCardsDemo} from '../../test'
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
      <BookingSteps/>
      {/* <Testimonials/> */}
      <InfiniteMovingCardsDemo/>
      <NewsLetter/>

    </>
  )
}

export default Home