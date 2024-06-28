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
function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate=useNavigate()
  const {id}=useParams();

  const getAllBookings = async () => {
    try {
      
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}user/getbookings/${id}`,
        { withCredentials: true }
      );

      setBookings(res?.data?.booking);
      if (res?.data?.success) {
        setTimeout(() => {
          // setloading(false);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();

  }, []);

  console.log(bookings);


  return (
 
    <WavyBackground className="max-w-4xl mx-auto pb-40 overflow-auto">
      {bookings?.length>0 
      ?
      <div className="flex gap-4 bg-transparent flex-col mt-44">
        {bookings?.map((elem, index) => (
          <Card sx={{ maxWidth: "100%",backGrouondColor:'gray',borderBottom:'3px solid red',borderLeft:'3px solid red' }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Your Booking for {elem?.destinationLocation} from {moment(elem.fromDate).format('DD-MM-YY')} to {moment(elem?.toDate).format('DD-MM-YY')} is in progress.
                </Typography>
                <Typography>Mr {elem?.name}</Typography>
                <Typography>Your email: {elem?.email}</Typography>
                <Typography>Your Phone: {elem?.phone}</Typography>
                <Typography>Tour Starts: {elem?.fromDate}</Typography>
                <Typography>Tour Ends: {elem?.toDate}</Typography>
                <Typography>Your Status :{elem?.approved==false ? <p style={{color:'red',paddingLeft:3}}>'In progress'</p>  : 'Your request is approved, Our Guide will contact soon'}</Typography>
                
                
              </CardContent>
              
            </CardActionArea>

            <Box sx={{display:'flex',justifyContent:'end',padding:2}}>
            <Button variant="outlined" disabled={!elem || elem.approved} onClick={() => navigate(`/edit/${elem?._id}`)}>
  {elem && elem.approved ? 'Approved' : 'Edit'}
</Button>
            </Box>
          </Card>
        ))}
        </div>
      :
      <div style={{fontWeight:'600',fontSize:18,color:'white'}} >You don't have any Bookings</div>
      }
      
      
    </WavyBackground>
  );
}

export default AllBookings;
