import { Box } from '@mui/material'
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

function SingleCard() {
    const {id}=useParams();
    const [state,setState]=useState({})
    console.log(id);
    const getData= async()=>{
        try {
            const res=await axios.get(`http://localhost:4000/api-v2/destination/getPost/${id}`,{withCredentials:true})
            // console.log(res?.data?.post);
            setState((res?.data?.post))
        } catch (error) {
            console.log(error);
        }
        
    }
    useEffect(() => {
      getData();
    }, [])
    console.log(state);
  return (
    <Box sx={{marginTop:15}}>

    hii
    <img src={state?.image?.url} alt="" />
    </Box>
  )
}

export default SingleCard