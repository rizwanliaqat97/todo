import React from 'react';
import {
  AppBar,
  ButtonBase,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" style={{ marginRight: "0.5rem" }} color="inherit">
          <Menu />
        </IconButton>
        <Typography style={{ flexGrow: 1 }} variant="h6">
          <ButtonBase href="/">Rizwan</ButtonBase>
        </Typography>
        <ButtonBase color="inherit" href="/login">
          <Typography variant="button">Login</Typography>
        </ButtonBase>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
