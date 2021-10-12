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
import { login } from "../../API/auth";
import AppContext from "../../appContext";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const appContext = useContext(AppContext);
  const [passwordVisible, togglePasswordVisibility] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email or username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: login,
  });

  const getFieldProps = (fieldName) => ({
    ...formik.getFieldProps(fieldName),
    error: !!formik.errors[fieldName],
    helperText: formik.errors[fieldName],
  });
  if (appContext.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <PageContainer>
      <Typography
        variant="h4"
        fontFamily="monospace"
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
            Log in
          </Typography>
          <form onSubmit={formik.handleSubmit}>
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
              {...getFieldProps("password")}
              fullWidth
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={{ margin: "0.5rem auto" }}
              fullWidth
            >
              Log in
            </Button>
          </form>
          <Typography variant="overline">
            Don't have an account yet? <Link to="/signup">Sign up</Link>
          </Typography>
        </Paper>
      </div>
    </PageContainer>
  );
};

export default Login;
