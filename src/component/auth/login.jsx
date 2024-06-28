import React, { useContext, useState } from "react";
import { Context } from "../../main";
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
  InputAdornment 
} from "@mui/material";
import Select from "@mui/material/Select";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import toast from "react-hot-toast";
import { loginValidate } from "../../validation/validate";
import { ZodError } from "zod";
import { Link, Navigate } from "react-router-dom";

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
  const [isShowPass, setIsShowPass] = useState(false);

  const [state, setState] = useState({
    email: "",
    emailErr: false,
    emailErrMsg: "",
    password: "",
    passwordErr: false,
    passwordErrMsg: "",
    role: "",
    roleErr: false,
    roleErrMsg: "",
  });
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      loginValidate.parse(state);
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
      const { email, role, password } = state; // Destructuring state
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}user/login`,
        { email, role, password }, // Passing destructured state
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthorized(true);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  const handelChange = (_event) => {
    setState((_prevState) => ({
      ..._prevState,
      [_event.target.name]: _event.target.value,
      [`${_event.target.name}Err`]: false,
      [`${_event.target.name}ErrMsg`]: "",
    }));
  };
  const validateEmail = (email) => {
    // Regex pattern for validating email addresses
    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const validatePhone = (phone) => {
    if(phone.length < 10){
      return false;
    }
    // Regex pattern for validating phone numbers (basic example, adjust as needed)
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone);
  };

  return (
    <>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", display: "flex", justifyContent: "center" }}
      >
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1 }}
            >
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
                name="password"
                label="Password"
                type={isShowPass ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={state.password}
                helperText={state.passwordErrMsg}
                error={state.passwordErr}
                onChange={handelChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setIsShowPass((prev) => !prev)}
                        edge="end"
                      >
                        {isShowPass ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl sx={{ minWidth: 120, width: "100%" }}>
                <InputLabel id="demo-simple-select-helper-label">
                  Role
                </InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={state.role}
                  label="role"
                  name="role"
                  helperText={state.roleErrMsg}
                  error={state.roleErr}
                  onChange={handelChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>

                  <MenuItem value={"Employer"}>Admin</MenuItem>
                  <MenuItem value={"Job Seeker"}>User</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "red" }}>
                  {state.roleErrMsg}
                </FormHelperText>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item>
                  <Card sx={{ padding: 1.5, backgroundColor: "lightblue" }}>
                    <Link variant="body2" to={"/register"}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Card>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Register;
