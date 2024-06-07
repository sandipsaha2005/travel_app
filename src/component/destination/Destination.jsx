import React, { useContext,useEffect, useState } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom'
import { 
  Box,

  CardHeader ,
  CardMedia ,
  CardContent ,
  CardActions ,
  Collapse ,
  Avatar ,
  IconButton,
  Typography ,


 } from '@mui/material'


import CardComp from './Card'
import axios from 'axios'
import { tuple } from 'zod'

function Destination() {
    const { isAuthorized }=useContext(Context)
    const [posts, setPosts]=useState([])
    const getAllPost= async()=>{
      try {
        const res= await axios.get(`${import.meta.env.VITE_API_URL}destination/getAllPost`, {withCredentials:true})
        console.log(res?.data?.posts);
        setPosts(res?.data?.posts)
      } catch (error) {
        console.log(error);
      }
    }

    if(!isAuthorized){
      return <Navigate to={'/login'}/>
    }
    useEffect(() => {
      getAllPost();
    }, [])
    
    
    console.log(posts);
  return (
    <Box sx={{marginTop:15, display:'flex',flexWrap:'wrap',gap:2,justifyContent:'space-evenly'}}>
        { posts.map((post,index)=>(
          <CardComp data={post}/>
        ))}
    </Box>
  )
}

export default Destination