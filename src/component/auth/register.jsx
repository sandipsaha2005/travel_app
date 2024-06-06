
import {
  Paper,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Card,
} from "@mui/material";
import Select from "@mui/material/Select";
import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {registerValidate} from "../../validation/validate"
import { ZodError } from "zod";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#556cd6',
//     },
//     secondary: {
//       main: '#19857b',
//     },
//   },
// });

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


function Register() {
  const [state, setState] = useState({
    email: "",
    emailErr:false,
    emailErrMsg:'',
    password: "",
    passwordErr:false,
    passwordErrMsg:'',
    phone: "",
    phoneErr:false,
    phoneErrMsg:'',
    name: "",
    nameErr:false,
    nameErrMsg:'',
    role: "",
    roleErr:false,
    roleErrMsg:''
  });

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      registerValidate.parse(state);
      // API call should not be inside the try block for parsing
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

    try {
      const { name, phone, email, role, password } = state;
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}user/register`,
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);
      toast.success(data.message);
      setIsAuthorized(true);
    } catch (error) {
      console.log(data);
      console.error(error?.response);
      toast.error("Something is wrong");
    }

  };
  

  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }

  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
       [`${_event.target.name}Err`]: false,
       [`${_event.target.name}ErrMsg`]: '',
     }));
  };

  return (
    <>
    {/* <ThemeProvider theme={theme}> */}
      <Grid
        container
        component="main"
        sx={{ height: "100vh", display: "flex", justifyContent: "center" }}
      >
        <CssBaseline />
        {/* <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      /> */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Create a new account
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleRegister}
              sx={{ mt: 1 }}
            >
             

              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={state.name}
                onChange={handelChange}
                helperText={state.nameErrMsg}
                error={state.nameErr}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={handelChange}
                helperText={state.emailErrMsg}
                error={state.emailErr}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="email"
                value={state.phone}
                onChange={handelChange}
                helperText={state.phoneErrMsg}
                error={state.phoneErr}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={state.password}
                helperText={state.passwordErrMsg}
                          error={state.passwordErr}
              onChange={handelChange}
              />
               <FormControl sx={{  minWidth: 120 ,width:'100%'}}
              
              >
                <InputLabel id="demo-simple-select-helper-label">
                Register As
                </InputLabel>
                <Select
                
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={state.role}
                  label="Register As"
                  name="role"
                  helperText={state.roleErrMsg}
                          error={state.roleErr}
                  onChange={handelChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  
                  <MenuItem value={'Employer'}>Employer</MenuItem>
                  <MenuItem value={'Job Seeker'}>Job Seeker</MenuItem>
                </Select>
                <FormHelperText sx={{color:'red'}}>{state.roleErrMsg}</FormHelperText>
              </FormControl>

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                
              >
                Register
              </Button>
              {/* <Link to={"/register"}>Register Now</Link> */}
              <Grid container>
                <Grid item>
                <Card sx={{padding:1.5, backgroundColor:'lightblue'}}>
                  <Link  variant="body2" to={"/login"}>
                    {"Already registered ? login"}
                  </Link>
                  </Card>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    {/* </ThemeProvider> */}
  </>
  );
}

export default Register;
