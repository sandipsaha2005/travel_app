
import React,{useState, useEffect,   Suspense ,useContext } from "react";
import { CardBody, CardContainer, CardItem } from "./component/ui/Card";
import { Navigate, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import { Context } from "./main";
import { LampContainer } from './component/ui/slidingText'
import toast from 'react-hot-toast'
import { InfiniteMovingCards } from './component/ui/InfiMoving'
import { WavyBackground } from "./component/ui/WavyBack"

import axios from 'axios'
import { 
  Box,
  Card ,
  CardHeader ,
  CardMedia ,
  CardContent ,
  CardActions ,
  Collapse ,
  Avatar ,
  IconButton,
  Typography ,
 } from '@mui/material'
import './custom.css'

import {cn} from './utils/cn'
import { HoveredLink, Menu, MenuItem, ProductItem } from "./component/ui/Navbar"


export function ThreeDCardDemo(data) {
  const navigate=useNavigate();
  console.log(data);
  const handleNavigate=()=>{
    console.log(
      "nav"
    );
    navigate(`/location/${data?.data?._id}`)
  }
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-gray   w-auto sm:w-[30rem] h-auto  p-6 border gradient-border rounded-lg">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-black-600 dark:text-black "
        >
          {data?.data?.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-black-300"
        >
          {data?.data?.category}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4 cursor-pointer" >
          <img
            src={data?.data?.images[1]?.url}
            height={1000}
            width={1000}
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
            onClick={handleNavigate}
          />
        </CardItem>
        <Box marginTop={3}>
        <Typography>{data?.data?.city}</Typography>
        <Typography>{data?.data?.country}</Typography>
        </Box>

      </CardBody>
    </CardContainer>
  );
}

export function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const navigate=useNavigate();
  const {isAuthorized,setIsAuthorized,user}= useContext(Context)
  const handleLogout= async()=>{
    try {
        const res=await axios.get(`${import.meta.env.VITE_API_URL}user/logout`,{withCredentials:true})
        console.log('Logout response:', res)
        toast.success(res?.data?.message)
        setIsAuthorized(false)
        navigate('/login')
    } catch (error) {
        console.log(error);
        toast.error(" something went wrong");
        
        setIsAuthorized(true)
    }
    
}
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive} >
        <Box className="text-white cursor-pointer" onClick={()=>navigate('/')}>Home</Box>
        <Box className="text-white cursor-pointer" onClick={()=>navigate('/destinations')}>Destinatons</Box>
        <Box className="text-white cursor-pointer" onClick={()=>navigate('/about-us')}>About Us</Box>
        {user?.role=='Employer' && (
          <Box className="text-white cursor-pointer" onClick={()=>navigate('/creat-post')}>Create Destination</Box>
        )}
        
        <Box className="text-white cursor-pointer" onClick={()=>navigate(`/bookings/${user?._id}`)}>My Bookings</Box>
        <Box className="text-white cursor-pointer" onClick={handleLogout}>Logout</Box>
        
    
        
        
        <MenuItem setActive={setActive} active={active} item="Contact">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href='/about-us'>About Us</HoveredLink>
            <HoveredLink href="/individual">Individual</HoveredLink>
            <HoveredLink href="/team">Team</HoveredLink>
            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Travel <br /> With Us
      </motion.h1>
    </LampContainer>
  );
}

export function WavyBackgroundDemo() {
  return (
    <WavyBackground className="max-w-4xl mx-auto pb-40">
      
    </WavyBackground>
  );
}

export function InfiniteMovingCardsDemo() {
  const testimonials = [
    {
      quote:
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
      name: "Charles Dickens",
      title: "A Tale of Two Cities",
    },
    {
      quote:
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
      name: "William Shakespeare",
      title: "Hamlet",
    },
    {
      quote: "All that we see or seem is but a dream within a dream.",
      name: "Edgar Allan Poe",
      title: "A Dream Within a Dream",
    },
    {
      quote:
        "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
      name: "Jane Austen",
      title: "Pride and Prejudice",
    },
    {
      quote:
        "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
      name: "Herman Melville",
      title: "Moby-Dick",
    },
  ];
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}


import { TypewriterEffectSmooth } from './component/ui/StyleText';

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: 'Travel',
    },
    {
      text: 'With',
    },
    
    {
      text: 'Traveller.',
      className: 'text-blue-500 dark:text-blue-500',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">
      <p className="text-neutral-600 dark:text-neutral-900 text-xs sm:text-base">
        The road to freedom starts from here
      </p>
      <TypewriterEffectSmooth words={words} />
      {/* <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button className="w-40 h-10 rounded-xl bg-white text-black border border-black text-sm">
          Signup
        </button>
      </div> */}
    </div>
  );
}





