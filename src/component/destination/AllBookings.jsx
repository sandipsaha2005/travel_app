import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Card, Box ,Button} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { BorderBottom, BorderLeft, Padding, Widgets } from "@mui/icons-material";
import { WavyBackgroundDemo } from "../../test";
import { WavyBackground } from "../ui/WavyBack"
import CardComp from "./Card";
import moment from "moment";

import { Context } from "../../main";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
function GetAllBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate=useNavigate()
  const {id}=useParams();

  const getAllBookings = async () => {
    try {
      
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}user/get-all-bookings`,
        { withCredentials: true }
      );

      setBookings(res?.data?.posts);
      if (res?.data?.success) {
        setTimeout(() => {
          // setloading(false);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleApprove= async (id)=>{
    try {
      let res=await axios.post(`${import.meta.env.VITE_API_URL}user/approve/${id}`,{approved:true},{withCredentials: true})
      toast.success("Approved Sucessfully")
    } catch (error) {
      console.log(error);
    }
    
    // console.log(id);
  }

  useEffect(() => {
    getAllBookings();

  }, [handleApprove]);



  return (
 
    <WavyBackground className="max-w-4xl mx-auto pb-40 overflow-auto">
      
        {bookings?.length >0 ?
        <div className="flex gap-4 bg-transparent flex-col mt-44">
        {bookings?.map((elem, index) => (
          <Card sx={{ maxWidth: "100%",backGrouondColor:'gray',borderBottom:'3px solid red',borderLeft:'3px solid red' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Your Booking for {elem?.destinationLocation} from {moment(elem.fromDate).format('DD-MM-YY')} to {moment(elem?.toDate).format('DD-MM-YY')}.
                </Typography>
                <Typography>Mr {elem?.name}</Typography>
                <Typography>Your email: {elem?.email}</Typography>
                <Typography>Your Phone: {elem?.phone}</Typography>
                <Typography>Tour Starts: {moment(elem?.fromDate).format('dd-mm-yy') }</Typography>
                <Typography>Tour Ends: {moment(elem?.toDate).format('dd-mm-yy')}</Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                  destinationId : "667575178d2d906acc6a1701" destinationLocation
                  : "Highland Council" destinationName : "Shreks Swamp" email :
                  "thisis@gmail.com" fromDate : "Wed, 26 Jun 2024 18:05:35 GMT"
                  name : "Sandip Saha" people : "5" phone : "09800960950" toDate
                  : "Thu, 27 Jun 2024 18:05:35 GMT" __v : 0 _id :
                  "667c587a294148824abcc4c8" onClick={()=>navigate(`/edit/${elem?._id}`)
                </Typography> */}
                
              </CardContent>
              
            </CardActionArea>
            <Box sx={{display:'flex',justifyContent:'end',padding:2}}>
            <Button variant="outlined" disabled={!elem || elem?.approved} onClick={()=>handleApprove(elem?._id)} >{elem?.approved==true ? 'Already Approved': 'approve'} </Button>
            </Box>

            
          </Card>
        ))}
        </div>
      :
      <div style={{fontSize:20,fontWeight:600,color:'white'}}>No Bookings Pending</div>
      }
        
        
      
    </WavyBackground>
  );
}

export default GetAllBookings;
