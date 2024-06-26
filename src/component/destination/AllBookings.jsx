import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Padding, Widgets } from "@mui/icons-material";
import CardComp from "./Card";
import moment from "moment";
function AllBookings() {
  const [bookings, setBookings] = useState([]);

  const getAllBookings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}user/getbookings`,
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

  useEffect(() => {
    getAllBookings();
  }, []);

  console.log(bookings);
  return (
    <Box
      sx={{
        marginTop: 20,
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "space-evenly",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "90%",
          justifyContent: "center",
          padding: 10,
        }}
      >
        {bookings.map((elem, index) => (
          <Card sx={{ maxWidth: "100%" }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Your Booking for {elem?.destinationLocation} from {moment(elem.fromDate).format('DD-MM-YY')} to {moment(elem?.toDate).format('DD-MM-YY')} is in progress.
                </Typography>
                <Typography>Mr {elem?.name}</Typography>
                <Typography>Your email: {elem?.email}</Typography>
                <Typography>Your Phone: {elem?.phone}</Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                  destinationId : "667575178d2d906acc6a1701" destinationLocation
                  : "Highland Council" destinationName : "Shreks Swamp" email :
                  "thisis@gmail.com" fromDate : "Wed, 26 Jun 2024 18:05:35 GMT"
                  name : "Sandip Saha" people : "5" phone : "09800960950" toDate
                  : "Thu, 27 Jun 2024 18:05:35 GMT" __v : 0 _id :
                  "667c587a294148824abcc4c8"
                </Typography> */}
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Card>
    </Box>
  );
}

export default AllBookings;
