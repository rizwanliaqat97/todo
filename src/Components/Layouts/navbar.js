import React, { useContext } from "react";
import {
  AppBar,
  ButtonBase,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import AppContext from "../../AppContext";
import { logout } from "../../API/auth";

const Navbar = () => {
  const { isLoggedIn } = useContext(AppContext);

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          style={{ marginRight: "0.5rem" }}
          color="inherit"
        >
          <Menu />
        </IconButton>
        <Typography style={{ flexGrow: 1 }} variant="h6">
          <ButtonBase href="/">Rizwan</ButtonBase>
        </Typography>
        {isLoggedIn ? (
          <ButtonBase color="inherit" onClick={logout}>
            <Typography variant="button">Logout</Typography>
          </ButtonBase>
        ) : (
          <ButtonBase color="inherit" href="/login">
            <Typography variant="button">Login</Typography>
          </ButtonBase>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
