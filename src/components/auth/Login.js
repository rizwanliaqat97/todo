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

const Login = () => {
  const appContext = useContext(AppContext);
  const [passwordVisible, togglePasswordVisibility] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;

    login({ username, password });
  };

  if (appContext.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <PageContainer>
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
          <form onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Username or email he"
              variant="filled"
              margin="dense"
              fullWidth
              autoFocus
            />
            <TextField
              name="password"
              label="Password"
              variant="filled"
              fullWidth
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
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              margin="dense"
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
