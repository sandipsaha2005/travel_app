import {
  Box,
  Grid,
  Card,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import BookIcon from "@mui/icons-material/Book";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Map from "../organs/Map";
import { ThreeDCardDemo } from "../../test";
import { Context } from "../../main";


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
  const { user } = useContext(Context);
  const [state, setState] = useState({});
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let img;
  const getData = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}destination/getPost/${id}`;
      const res = await axios.get(apiUrl, { withCredentials: true });
      img = res?.data?.post.images[0].url;
      setState(res?.data?.post);
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  console.log(state);
  return (
    <Box
      sx={{
        marginTop: 20,
        height: "100%",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Card sx={{ width: "90vw", height: "70vh" }}>
          <Grid container spacing={2} sx={{ height: "100%" }}>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{ height: isMobile ? "auto" : "100%" }}
            >
              <Card sx={{ height: "100%" }}>
                {state?.images?.[0]?.url ? (
                  <img
                    src={state.images[1].url}
                    alt="Destination"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </Card>
            </Grid>
            {!isMobile && (
              <Grid item xs={8}>
                {/* <ImageList
                  sx={{ width: "100%", height: "100%" }}
                  cols={2}
                  rowHeight={200}
                  gap={5}
                >
                  {state?.images?.slice(2, 6).map((image, index) => (
                    <ImageListItem key={index + 1} sx={{ padding: 2 }}>
                      <img src={image.url} loading="lazy" height="200px" style={{marginTop:'5px',marginBottom:'5px'}}/>
                    </ImageListItem>
                  ))}
                </ImageList> */}
                <ImageList
                  sx={{ width: "100%", height: "100%" }}
                  cols={2}
                  rowHeight={200}
                  
                >
                  {state?.images?.slice(2, 6).map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                        height="200px"  
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            )}
          </Grid>
        </Card>
      </Box>

      <Card sx={{ width: "100%", padding: "4%" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Card
              sx={{
                paddingTop: 1,
                paddingBottom: 2,
                paddingLeft: 2,
                borderBottom: "2px solid blue",
              }}
            >
              <Typography sx={{ fontSize: 19, fontWeight: 600 }}>
                {state?.country}
              </Typography>
              <Typography sx={{ fontSize: 19, fontWeight: 600 }}>
                {state?.city}
              </Typography>
            </Card>
          </Grid>
          {user?.role == "Job Seeker" && (
            <Grid item xs={4}>
              <Card
                sx={{
                  paddingTop: 2,
                  paddingBottom: 3.5,
                  paddingLeft: 2,
                  display: "flex",
                  justifyContent: "center",
                  borderBottom: "2px solid blue",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/book/${state?._id}`)}
                >
                  <BookIcon />
                  Book the Place
                </Button>
              </Card>
            </Grid>
          )}
        </Grid>

        <Box
          sx={{
            marginTop: 3,
          }}
        >
          <Typography sx={{ marginBottom: 2, fontSize: 17, fontWeight: 500 }}>
            What you will do in {state?.city} <ArrowForwardIcon />
          </Typography>
          <Box
            sx={{
              width: "90vw",
              paddingBottom: 2,
              paddingLeft: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Card sx={{ padding: 1.5, borderBottom: "1px solid red" }}>
              <Typography>
                {" "}
                <HolidayVillageIcon /> {state?.todo1}
              </Typography>
            </Card>
            <Card sx={{ padding: 1.5, borderBottom: "1px solid red" }}>
              <Typography>
                <HolidayVillageIcon /> {state?.todo2}
              </Typography>
            </Card>
            <Card sx={{ padding: 1.5, borderBottom: "1px solid red" }}>
              <Typography>
                <HolidayVillageIcon /> {state?.todo3}
              </Typography>
            </Card>
            <Card sx={{ padding: 1.5, borderBottom: "1px solid red" }}>
              <Typography>
                <HolidayVillageIcon /> {state?.todo4}
              </Typography>
            </Card>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: 5,
          }}
        >
          <Typography sx={{ marginBottom: 2, fontSize: 17, fontWeight: 500 }}>
            About this place <ArrowForwardIcon />
          </Typography>
          <Card
            sx={{ width: "90vw", padding: 3, borderBottom: "2px solid green" }}
          >
            <Typography>{state?.description}</Typography>
          </Card>
        </Box>

        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "90vw" }}>
            <Typography sx={{ fontSize: 17, fontWeight: 500, marginBottom: 1 }}>
              Meet your Host - {state.guideName}
            </Typography>
            {/* <Card sx={{ height: "40%", minHeight: "100px", width: "20%" }}> */}
            {state?.images?.[0]?.url ? (
              <Avatar
                alt="Guide Name"
                src={state?.images?.[0]?.url}
                sx={{ width: 200, height: 200, border: "1px solid red" }}
              />
            ) : (
              <p>No image available</p>
            )}
            {/* </Card> */}
          </Box>
        </Box>

        {state.lat && state.lng && (
          <Card sx={{ padding: 1, display: "flex", justifyContent: "right" }}>
            <Map lat={state.lat} lng={state.lng} />
          </Card>
        )}
      </Card>
    </Box>
  );
}

export default SingleCard;
