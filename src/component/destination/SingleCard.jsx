import { Box, Grid, Card, Typography,useMediaQuery ,useTheme  } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

function SingleCard() {
  const { id } = useParams();
  const [state, setState] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Log the ID to ensure it's being received
  console.log("ID from useParams:", id);

  const getData = async () => {
    try {
      // Construct the full API URL and log it
      const apiUrl = `${import.meta.env.VITE_API_URL}destination/getPost/${id}`;
      console.log("API URL:", apiUrl);

      // Make the API call
      const res = await axios.get(apiUrl, { withCredentials: true });

      // Log the response for debugging
      console.log("API Response:", res?.data?.post);

      // Update the state with the fetched data
      setState(res?.data?.post);
    } catch (error) {
      // Log any error that occurs during the API call
      console.error("API call error:", error);
    }
  };

  useEffect(() => {
    // Call the getData function to fetch data when the component mounts
    getData();
  }, [id]); // Ensure useEffect re-runs if the ID changes


  console.log("State:", state);

  return (
    // <Box
    //   sx={{
    //     marginTop: 15,
    //     height: "100vh",
    //   }}
    // >
    //   <Box
    //     sx={{
    //       display: "flex",
    //       justifyContent: "center",
    //       // flexDirection:'column'
    //     }}
    //   >
    //     <Card sx={{ width: "90vw", height: "70vh" }}>
    //       <Grid
    //         container
    //         spacing={2}
    //         // sx={{ display: "flex", flexWrap: "wrap" }}
    //       >
    //         <Grid item xs={4}>
    //           <Card sx={{height:'100%'}}>
    //             {state?.images?.[0]?.url ? (
    //               <img
    //                 src={state.images[0].url}
    //                 alt="Destination"
    //                 height="100%"
    //                 width="100%"
    //               />
    //             ) : (
    //               <p>No image available</p>
    //             )}
    //           </Card>
    //         </Grid>
            
    //           {!isMobile && (
    //         <Grid item xs={8}>
    //           <ImageList
    //             sx={{ width: "100%", height: "100%" }}
    //             cols={2}
    //             rowHeight={200}
    //             gap={5}
    //           >
    //             {state?.images?.slice(1).map((image, index) => (
    //               <ImageListItem key={index + 1} sx={{ padding: 2 }}>
    //                 <img src={image.url} loading="lazy" height="200px" />
    //               </ImageListItem>
    //             ))}
    //           </ImageList>
    //         </Grid>
    //       )}

              
            
    //       </Grid>
    //     </Card>
    //   </Box>
    //   <Box
    //     sx={{
    //       marginTop:5,
    //       display: "flex",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Card sx={{ width: "90vw" }}>
    //       <Typography>{state?.title}</Typography>
    //     </Card>
    //   </Box>
    //   <Box
    //     sx={{
    //       marginTop:5,
    //       display: "flex",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <Card sx={{ width: "90vw" }}>
    //       <Typography>About this place</Typography>
    //       <Typography>{state?.description}</Typography>
    //     </Card>
    //   </Box>
    // </Box>
    <Box
    sx={{
      marginTop: 15,
      height: "100vh",
      
    }}
  >
    <Box sx={{display: "flex",
      justifyContent: "center",}}>
    <Card sx={{ width: "90vw", height: "70vh" }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        <Grid item xs={12} sm={4} sx={{ height: isMobile ? 'auto' : '100%' }}>
          <Card sx={{ height: '100%' }}>
            {state?.images?.[0]?.url ? (
              <img
                src={state.images[0].url}
                alt="Destination"
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            ) : (
              <p>No image available</p>
            )}
          </Card>
        </Grid>
        {!isMobile && (
          <Grid item xs={8}>
            <ImageList
              sx={{ width: "100%", height: "100%" }}
              cols={2}
              rowHeight={200}
              gap={5}
            >
              {state?.images?.slice(1).map((image, index) => (
                <ImageListItem key={index + 1} sx={{ padding: 2 }}>
                  <img src={image.url} loading="lazy" height="200px" />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        )}
      </Grid>
    </Card>
    

    </Box>

    <Box
        sx={{
          marginTop:5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: "90vw" }}>
          <Typography>{state?.title}</Typography>
          <Typography>{state?.category}</Typography>
        </Card>
      </Box>
      <Box
        sx={{
          marginTop:5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: "90vw" }}>
          <Typography>About this place</Typography>
          <Typography>{state?.description}</Typography>
        </Card>
      </Box>

    </Box>


  );
}

export default SingleCard;
