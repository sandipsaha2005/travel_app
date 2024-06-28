import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Typography,
  Popover,
} from "@mui/material";
import Title from "../organs/title";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { LoadingButton } from "@mui/lab";
import { createDestValidate } from "../../validation/validate";
import { ZodError } from "zod";
import { AssistWalkerTwoTone } from "@mui/icons-material";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function CreateDestination() {
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [image1, setImage1] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loadingGeo, setLoadinGeo] = useState(false);
  const [getLoc, setGeoLoc] = useState({
    lat: null,
    lng: null,
  });
  const [cityNameForLat, setCityNameForlat] = useState("");
  const [cityNameForLng, setCityNameForlng] = useState("");
  const [state, setState] = useState({
    title: "",
    titleErr: false,
    titleErrMsg: "",
    categroy: "",
    categroyErr: false,
    categroyErrMsg: "",
    country: "",
    countryErr: false,
    countryErrMsg: "",
    city: "",
    cityErr: false,
    cityErrMsg: "",
    description: "",
    descriptionErr: false,
    descriptionErrMsg: "",
    priceRange: "",
    priceRangeErr: false,
    priceRangeErrMsg: "",
    lat: "",
    latErr:false,
    latErrMsg:'',
    lng: "",
    lngErr:false,
    lngErrMsg:'',
    todo1:'',
    todo1Err:false,
    todo1ErrMsg:'',
    todo2:'',
    todo2Err:false,
    todo2ErrMsg:'',
    todo3:'',
    todo3Err:false,
    todo3ErrMsg:'',
    todo4:'',
    todo4Err:false,
    todo4ErrMsg:'',
    todo5:'',
    todo5Err:false,
    todo5ErrMsg:'',
    neighburHood:'',
    neighburHoodErr:false,
    neighburHoodErrMsg:'',
    guideName:'',
    guideNameErr:false,
    guideNameErrMsg:'',



  });
  const [files, setFiles] = useState([]);
  const [guideImage,setGuideImage]=useState();
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  const handleCityNameChange = (e) => {
    setCityNameForlat(e.target.value);
  };
  const handleCityNameChange2 = (e) => {
    setCityNameForlng(e.target.value);
  };

  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      createDestValidate.parse(state);
   
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        errors.length > 0 &&
          errors.forEach((error) => {
            if (error.message !== "") {
              const field = error.path[0] + "Err";

              setState((_prevState) => ({
                ..._prevState,
                [field]: true,
                [`${field}Msg`]: error.message,
              }));
            }
          });
      }
      return;
    }

    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("category", state.categroy); // Corrected typo
    formData.append("country", state.country);
    formData.append("city", state.city);
    formData.append("description", state.description);
    formData.append("priceRange", state.priceRange);
    formData.append("todo1", state.todo1);
    formData.append("todo2", state.todo2);
    formData.append("todo3", state.todo3);
    formData.append("todo4", state.todo4);
    formData.append("neighburHood", state.neighburHood);
    formData.append("guideName", state.guideName);
    // formData.append("guideImage", guideImage);
    formData.append("lat", state.lat);
    formData.append("lng", state.lng);

    files.forEach((file, index) => {
      formData.append(`images`, file);
    });

    try {
      setloading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}destination/createPost`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status == 200) {
        setloading(false);
        toast.success(res?.data?.message);
        navigate("/destinations");
      }
    } catch (error) {
      console.log("something went wrong", error);
      toast.error("Smething wen wront")
      setloading(false)
    }
  };

  const getCoordinates = async (cityName) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=AIzaSyAIQLNf9tDJel_w8wdw4mX7ghcI3rcwQeY`;

    try {
      console.log(cityName);
      const response = await axios.get(url);
      console.log(response);
      if (response.data.status === "OK") {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng };
      } else {
        throw new Error("Unable to fetch coordinates");
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const handleGetLat = async (cityName) => {
    setLoadinGeo(true)
    console.log(cityNameForLat);
    let { lat, lng } = await getCoordinates(cityNameForLat);
    setGeoLoc({
      lat: lat,
    });
    console.log(lat);
    setState({
      lat: lat,
      lng: lng,
    });
    setLoadinGeo(false)
    setCityNameForlat("");
    setCityNameForlng("");

  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }


  return (
    <Box sx={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Title
          title={"Create Destination"}
          muiStyle={{ textAlign: "center", }}
          varient='h2'
        />
        <Card>
          <Card>
          <Typography align="center" sx={{ fontWeight: 600, marginTop: 4 }}>
            Basic Details
          </Typography>
          </Card>
          <Card
            sx={{
              padding: 5,
              width: "85vw",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Title"
                  id="title"
                  name="title"
                  value={state.title}
                  error={state.titleErr}
                  helperText={state.titleErrMsg}
                  onChange={handelChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Country"
                  id="country"
                  name="country"
                  value={state.country}
                  error={state.countryErr}
                  helperText={state.countryErrMsg}
                  onChange={handelChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="City"
                  id="city"
                  name="city"
                  value={state.city}
                  error={state.cityErr}
                  helperText={state.cityErrMsg}
                  onChange={handelChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Latiture"
                  id="lat"
                  name="lat"
                  value={state.lat}
                  error={state.latErr}
                  helperText={state.latErrMsg}
                  onChange={handelChange}
                />
                <Card sx={{ padding: 1 }}>
                  <Button
                    aria-describedby={id}
                    variant="contained"
                    onClick={handleClick}
                  >
                    Calculate Latitude and Longitude
                  </Button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                  >
                    <Card
                      sx={{
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <TextField
                        autoComplete="off"
                        fullWidth
                        label="Enter the city name"
                        id="cityNameForLat"
                        name="cityNameForLat"
                        value={cityNameForLat}
                        // error={city}
                        // helperText={}
                        onChange={handleCityNameChange}
                      />
                      {/* <Button variant="outlined" onClick={handleGetLat}>Submit</Button> */}
                      <LoadingButton
                        size="small"
                        onClick={handleGetLat}
                        variant="outlined"
                        loading={loadingGeo}
                        id="validate"
                      >
                        Submit
                      </LoadingButton>
                    </Card>
                  </Popover>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Longtitude"
                  id="lng"
                  name="lng"
                  value={state.lng}
                  error={state.lngErr}
                  helperText={state.lngErrMsg}
                  onChange={handelChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Category"
                  id="category"
                  name="categroy"
                  value={state.categroy}
                  error={state.categroyErr}
                  helperText={state.categroyErrMsg}
                  onChange={handelChange}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    Price Range
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={state.priceRange}
                    name="priceRange"
                    error={state.priceRangeErr}
                    helperText={state.priceRangeErrMsg}
                    label="Price Range"
                    onChange={handelChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"1000 - 10,000"}>1000 - 10,000</MenuItem>
                    <MenuItem value={"20,000 - 50,000"}>
                      10,000 - 15,000
                    </MenuItem>
                    <MenuItem value={"50,000 -  100,000"}>
                      15,000 - 20,000
                    </MenuItem>
                    <MenuItem value={"50,000 -  100,000"}>
                      20,000 - 25,000
                    </MenuItem>
                    <MenuItem value={"50,000 -  100,000"}>
                      25,000 - 30,000
                    </MenuItem>
                    <MenuItem value={"50,000 -  100,000"}>
                      30,000 - 40,000
                    </MenuItem>
                    <MenuItem value={"50,000 -  100,000"}>
                      40,000 - 55,000
                    </MenuItem>
                    <MenuItem value={"50,000 -  100,000"}>
                      60,000 - 75,000
                    </MenuItem>
                    <MenuItem value={"50,000 -  100,000"}>
                      80,000 - 100,000
                    </MenuItem>
                    <MenuItem value={"50,000 -  100,000"}>
                      100,000 - 150,000
                    </MenuItem>
                  </Select>
                  <FormHelperText>{state.priceRangeErrMsg}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: 2, paddingTop: 2 }}>
                <Card sx={{ paddingTop: 2, paddingBottom: 2 }}>
                  <Typography align="center" sx={{ fontWeight: 600 }}>
                    What To DO
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="To Do 1"
                  id="todo1"
                  name="todo1"
                  value={state.todo1}
                  error={state.todo1Err}
                  helperText={state.todo1ErrMsg}
                  onChange={handelChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="To Do 2"
                  id="category"
                  name="todo2"
                  value={state.todo2}
                  error={state.todo2Err}
                  helperText={state.todo2ErrMsg}
                  onChange={handelChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="To Do 3"
                  id="todo3"
                  name="todo3"
                  value={state.todo3}
                  error={state.todo3Err}
                  helperText={state.todo3ErrMsg}
                  onChange={handelChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="To Do 4"
                  id="todo4"
                  name="todo4"
                  value={state.todo4}
                  error={state.todo4Err}
                  helperText={state.todo4ErrMsg}
                  onChange={handelChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Neighbourhood highlights"
                  id="neighburHood"
                  name="neighburHood"
                  value={state.neighburHood}
                  error={state.neighburHoodErr}
                  helperText={state.neighburHoodErrMsg}
                  onChange={handelChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Guide Name"
                  id="guideName"
                  name="guideName"
                  value={state.guideName}
                  error={state.guideNameErr}
                  helperText={state.guideNameErrMsg}
                  onChange={handelChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <Typography sx={{paddingBottom:1}}>Guide Image</Typography>
                <input
                  type="file" 
                  accept="image/png, image/jpeg, image/webp, image/avif"
                  name="file"
                  onChange={(event) => handleFileChange(event)}
                />
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Typography>Description</Typography>

                <textarea
                  name="description"
                  id="description"
                  value={state.description}
                  error={state.descriptionErr}
                  helperText={state.descriptionErrMsg}
                  onChange={handelChange}
                  style={{
                    width: "100%",
                    minHeight: "200px",
                    border: "1px solid blue",
                  }}
                ></textarea>
              </Grid>

              {/* <Grid item xs={4}>
                {Array.from(Array(5)).map((_, index) => (
                  <input
                    key={index}
                    name={`image-${index}`}
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/avif"
                    onChange={(event) => handleFileChange(event, index)}
                  />
                ))}
              </Grid> */}
              <Grid item xs={6} sx={{display:'flex',alignItems:'center'}}>
                <Card>
                <Typography sx={{paddingBottom:1}}>Image 1  : {' '}</Typography>
                <input 
                type="file" 
                accept="image/png, image/jpeg, image/webp, image/avif"
                name="file"
                onChange={(event) => handleFileChange(event)}
                />
                </Card>
              </Grid>
              <Grid item xs={6} sx={{display:'flex',alignItems:'center'}}>
                <Card>
                <Typography sx={{paddingBottom:1}}>Image 2  : {' '}</Typography>
                <input 
                type="file" 
                accept="image/png, image/jpeg, image/webp, image/avif"
                name="file"
                onChange={(event) => handleFileChange(event)}
                />
                </Card>
              </Grid>
              <Grid item xs={6} sx={{display:'flex',alignItems:'center'}}>
                <Card>
                <Typography sx={{paddingBottom:1}}>Image 3  : {' '}</Typography>
                <input 
                type="file" 
                accept="image/png, image/jpeg, image/webp, image/avif"
                name="file"
                onChange={(event) => handleFileChange(event)}
                />
                </Card>
              </Grid>
              <Grid item xs={6} sx={{display:'flex',alignItems:'center'}}>
                <Card>
                <Typography sx={{paddingBottom:1}}>Image 4  : {' '}</Typography>
                <input 
                type="file" 
                accept="image/png, image/jpeg, image/webp, image/avif"
                name="file"
                onChange={(event) => handleFileChange(event)}
                />
                </Card>
              </Grid>
              <Grid item xs={6} sx={{display:'flex',alignItems:'center'}}>
                <Card>
                <Typography sx={{paddingBottom:1}}>Image 5  : {' '}</Typography>
                <input 
                type="file" 
                accept="image/png, image/jpeg, image/webp, image/avif"
                name="file"
                onChange={(event) => handleFileChange(event)}
                />
                </Card>
              </Grid>
              
              
              
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <LoadingButton
                  //   disabled={formik.isSubmitting}
                  fullWidth
                  sx={{ maxWidth: "150px",minHeight:'40px',minWidth:'150px' }}
                  size="small"
                  type="submit"
                  variant="contained"
                  loading={loading}
                  id="validate"
                >
                  Submit
                </LoadingButton>
              </Grid>
            </Grid>
          </Card>
        </Card>
      </form>
    </Box>
  );
}

export default CreateDestination;
