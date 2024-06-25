
import React,{useState, useEffect,   Suspense  } from "react";
import { CardBody, CardContainer, CardItem } from "./component/ui/Card";
import { Navigate, useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import { LampContainer } from './component/ui/slidingText'
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
        <CardItem translateZ="100" className="w-full mt-4">
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

        {/* <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            // as={Link}
            href="https://twitter.com/mannupaaji"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </CardItem>
        </div> */}
      </CardBody>
    </CardContainer>
  );
}

export function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const navigate=useNavigate();
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive} >
        <Box className="text-white cursor-pointer" onClick={()=>navigate('/creat-post')}>Home</Box>
        <Box className="text-white cursor-pointer" onClick={()=>navigate('/destinations')}>Destinatons</Box>
        <Box className="text-white cursor-pointer" onClick={()=>navigate('/about-us')}>About Us</Box>
    
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/web-dev">Web Development</HoveredLink>
            <HoveredLink href="/interface-design">Interface Design</HoveredLink>
            <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
            <HoveredLink href="/branding">Branding</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              href="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              href="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              href="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              href="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
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

