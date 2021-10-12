import React, { useContext } from "react";
import {
  AppBar,
  ButtonBase,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import AppContext from "../../appContext";
import { logout } from "../../API/auth";

const Navbar = () => {
  const { isLoggedIn, user } = useContext(AppContext);

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
        <ButtonBase href="/">
          <Typography variant="h6" fontWeight="bold">
            {user?.fullName || user.email}
          </Typography>
        </ButtonBase>
        <Typography
          variant="h5"
          fontFamily="monospace"
          fontWeight="bold"
          style={{ margin: "auto" }}
        >
          Todo app
        </Typography>
        {isLoggedIn ? (
          <ButtonBase color="inherit" onClick={logout}>
            <Typography variant="button" fontWeight="bold" fontSize="small">
              Logout
            </Typography>
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
