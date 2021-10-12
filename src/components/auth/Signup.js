import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useContext, useState } from "react";
import PageContainer from "../layouts/PageContainer";
import AppContext from "../../appContext";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "../../API/auth";

const Signup = () => {
  const appContext = useContext(AppContext);
  const [passwordVisible, togglePasswordVisibility] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string()
        .required("Email or username is required")
        .matches(
          /^[\w@.)(*#$&-]*$/,
          "Username can have letters, digits and characters like: (@ . # * $ & - _) without spaces"
        ),
      password: Yup.string()
        .min(8, "Passwod must be at least 8 characters long")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .equals([Yup.ref("password")], "Passwords do not match"),
    }),
    onSubmit: signup,
  });

  const getFieldProps = (fieldName) => ({
    ...formik.getFieldProps(fieldName),
    error: formik.touched[fieldName] && !!formik.errors[fieldName],
    helperText: formik.touched[fieldName] && formik.errors[fieldName],
  });

  if (appContext.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <PageContainer>
      <Typography
        variant="h4"
        fontFamily="revert"
        fontWeight="bold"
        textAlign="center"
      >
        Todo app
      </Typography>
      <div
        style={{
          backgroundImage: "linear-gradient(transparent 50%,blue 50%, blue)",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          style={{
            width: "35%",
            margin: "auto",
            padding: "1rem",
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Sign up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Full name"
              variant="outlined"
              margin="dense"
              {...getFieldProps("fullName")}
              fullWidth
            />
            <TextField
              name="email"
              label="Username or email"
              variant="outlined"
              margin="dense"
              {...getFieldProps("email")}
              fullWidth
            />
            <TextField
              name="password"
              label="Password"
              variant="outlined"
              {...getFieldProps("password")}
              InputProps={{
                type: passwordVisible ? "text" : "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => togglePasswordVisibility(!passwordVisible)}
                    >
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              margin="dense"
              fullWidth
            />
            <TextField
              name="confimPassword"
              label="Confirm Password"
              variant="outlined"
              {...getFieldProps("confirmPassword")}
              InputProps={{
                type: passwordVisible ? "text" : "password",
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => togglePasswordVisibility(!passwordVisible)}
                    >
                      {passwordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              margin="dense"
              fullWidth
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ margin: "0.5rem auto" }}
              fullWidth
            >
              Sign up
            </Button>
          </form>
          <Typography variant="overline">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Paper>
      </div>
    </PageContainer>
  );
};

export default Signup;
