import {
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from 'react';
import PageContainer from './Layouts/PageContainer';

// const useStyles = makeStyles((theme) => ({
//   main: {
//     backgroundImage: 'linear-gradient(transparent 50%,blue 50%, blue)',
//     flexGrow: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   paper: {
//     width: '35%',
//     [theme.breakpoints.down('md')]: { width: '50%' },
//     [theme.breakpoints.down('sm')]: { width: '95%' },
//     margin: 'auto',
//     padding: theme.spacing(4),
//     boxSizing: 'border-box',
//   },
//   formFields: {
//     margin: '1rem auto',
//   },
// }));

const Login = () => {
  const [passwordVisible, togglePasswordVisibility] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <PageContainer>
      <div style={{
        backgroundImage: 'linear-gradient(transparent 50%,blue 50%, blue)',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Paper elevation={6} style={{
          width: '35%',
          margin: 'auto',
          padding: '1rem',
          boxSizing: 'border-box',
        }}>
          <Typography variant="h5" gutterBottom>
            Log in
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Username or email"
              variant="filled"
              style={{
                margin: '1rem auto',
              }}
              fullWidth
              autoFocus
            />
            <TextField
              name="password"
              label="Password"
              variant="filled"
              fullWidth
              InputProps={{
                type: passwordVisible ? 'text' : 'password',
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
              style={{
                margin: '1rem auto',
              }}
            />
            <Button type="submit">Log in</Button>
          </form>
        </Paper>
      </div>
    </PageContainer>
  );
};

export default Login;
