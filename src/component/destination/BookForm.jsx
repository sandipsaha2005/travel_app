import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../main";
import { Navigate, useNavigate, useParams } from "react-router-dom";
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
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Title from "../organs/title";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import { LoadingButton } from "@mui/lab";
import { createBookingValidate } from "../../validation/validate";
import { ZodError } from "zod";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function CreateDestination() {
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [postDetails, setPostDetails] = useState({});
  const [state, setState] = useState({
    name: "",
    nameErr: false,
    nameErrMsg: "",
    email: "",
    emailErr: false,
    emailErrMsg: "",
    phone: "",
    phoneErr: false,
    phoneErrMsg: "",
    fromDate: dayjs(),
    fromDateErr: false,
    fromDateErrMsg: "",
    toDate: dayjs(),
    toDateErr: false,
    toDateErrMsg: "",
    people: "",
    peopleErr: false,
    peopleErrMsg: "",
  });

  const getData = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}destination/getPost/${id}`;
      const res = await axios.get(apiUrl, { withCredentials: true });
      setPostDetails(res?.data?.post);
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  const handleChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: String(event.target.value),
      [`${event.target.name}Err`]: false,
      [`${event.target.name}ErrMsg`]: "",
    }));
  };

  const handleDateChange = (name, date) => {
    setState((prevState) => ({
      ...prevState,
      [name]: date,
      [`${name}Err`]: false,
      [`${name}ErrMsg`]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("before valid");
      createBookingValidate.parse(state);
      console.log("after valid");
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.issues;
        console.log(errors);

        errors.length > 0 &&
          errors.forEach((error) => {
            if (error.message !== "") {
              const field = error.path[0] + "Err";

              setState((prevState) => ({
                ...prevState,
                [field]: true,
                [`${field}Msg`]: error.message,
              }));
            }
          });
      }
      return;
    }
    let resEmail = validateEmail(state?.email);
    if (resEmail == false) {
      toast.error("Enter a valid Email");
      return;
    }

    if (validatePhone(state.phone) == false) {
      toast.error("Enter a valid Phone Number");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}user/create-booking`,
        {
          name: state.name,
          email: state.email,
          phone: state.phone,
          fromDate: state.fromDate,
          toDate: state.toDate,
          people: state.people,
          destinationId: postDetails?._id,
          destinationName: postDetails?.title,
          destinationLocation: postDetails?.city,
          userId: user?._id,
          approved: false,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        setLoading(false);
        toast.success(res?.data?.message);
        navigate(`/bookings/${user?._id}`);
      }
    } catch (error) {
      console.log("something went wrong", error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    // Regex pattern for validating email addresses

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePhone = (phone) => {
    if (phone.length < 10) {
      return false;
    }
    // Regex pattern for validating phone numbers (basic example, adjust as needed)
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone);
  };

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  // const handleDateChange = (field, date) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     [fromDate]: date,
  //     fromDateErr: false,
  //     fromDateErrMsg: "",
  //   }));
  // };

  const validateDates = () => {
    const { fromDate, toDate } = state;
    let fromDateErr = false;
    let fromDateErrMsg = '';
    let toDateErr = false;
    let toDateErrMsg = '';

    if (fromDate && toDate && fromDate > toDate) {
      fromDateErr = true;
      fromDateErrMsg = 'Start date should be earlier than end date';
      toDateErr = true;
      toDateErrMsg = 'End date should be later than start date';
    }

    setState((prevState) => ({
      ...prevState,
      fromDateErr,
      fromDateErrMsg,
      toDateErr,
      toDateErrMsg,
    }));
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Box sx={{ marginTop: 25, display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Title title={"Create Booking"} muiStyle={{ textAlign: "center" }} />
        <Card>
          <Card>
            <Typography align="center" sx={{ fontWeight: 600, marginTop: 4 }}>
              Basic Details
            </Typography>
          </Card>
          <Card
            sx={{
              padding: 5,
              width: "60vw",
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
                  label="Name"
                  id="name"
                  name="name"
                  value={state.name}
                  error={state.nameErr}
                  helperText={state.nameErrMsg}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Email"
                  id="email"
                  name="email"
                  value={state.email}
                  error={state.emailErr}
                  helperText={state.emailErrMsg}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  value={state.phone}
                  error={state.phoneErr}
                  helperText={state.phoneErrMsg}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Start Date"
                      value={state.fromDate}
                      onChange={(date) => handleDateChange("fromDate", date)}
                      // minDate={new Date()}
                      slotProps={{
                        textField: {
                          error: state.fromDateErr,
                          helperText: state.fromDateErrMsg,
                          format:"DD/MM/YYYY"
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={state.fromDate}
                    onChange={(date) => handleDateChange("fromDate", date)}
                    // minDate={new Date()}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={state.fromDateErr}
                        helperText={state.fromDateErrMsg}
                      />
                    )}
                  />
                </LocalizationProvider> */}
              </Grid>
              <Grid item xs={6}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">
                    No of People
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={state.people}
                    name="people"
                    error={state.peopleErr}
                    helperText={state.peopleErrMsg}
                    label="No of People"
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {[...Array(10)].map((_, i) => (
                      <MenuItem value={i + 1} key={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{state.peopleErrMsg}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="End Date"
                      value={state.toDate}
                      onChange={(date) => handleDateChange("toDate", date)}
                      slotProps={{
                        textField: {
                          error: state.toDateErr,
                          helperText: state.toDateErrMsg,
                          format:"DD/MM/YYYY"
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>

              <Grid
                item
                xs={16}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <LoadingButton
                  fullWidth
                  sx={{ maxWidth: "250px", minHeight: "50px" }}
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
