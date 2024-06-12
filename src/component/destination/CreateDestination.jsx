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

} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { LoadingButton } from '@mui/lab';
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
  const [loading,setloading]=useState(false)
  const [image1,setImage1]=useState();
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
  });
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
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
    setloading(true)
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


    files.forEach((file, index) => {
      formData.append(`images`, file);
    });

    try {
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
        setloading(false)
        toast.success(res?.data?.message);
        navigate("/destinations");
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  console.log(files);

  return (
    <Box sx={{ marginTop: 15, display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Card
          sx={{
            padding: 5,
            width: "90vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={6}>
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

            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                fullWidth
                multiline
                label="Description"
                id="description"
                name="description"
                value={state.description}
                error={state.descriptionErr}
                helperText={state.descriptionErrMsg}
                onChange={handelChange}
              />
            </Grid>
            <Grid item xs={8}>
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
                  <MenuItem value={"20,000 - 50,000"}>20,000 - 50,000</MenuItem>
                  <MenuItem value={"50,000 -  100,000"}>
                    50,000 - 100,000
                  </MenuItem>
                </Select>
                <FormHelperText>{state.priceRangeErrMsg}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              {Array.from(Array(5)).map((_, index) => (
                <input
                  key={index}
                  name={`image-${index}`}
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/avif"
                  onChange={(event) => handleFileChange(event, index)}
                />
              ))}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <LoadingButton
								//   disabled={formik.isSubmitting}
								fullWidth
								sx={{ maxWidth: '150px' }}
								size='small'
								type='submit'
								variant='contained'
								loading={loading}
								id='validate'
							>
								Submit
							</LoadingButton>
             
            </Grid>
          </Grid>
        </Card>
      </form>
    </Box>
  );
}

export default CreateDestination;
