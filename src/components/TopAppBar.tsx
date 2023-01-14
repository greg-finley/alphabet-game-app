import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

//drawer elements used
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";
import StorageIcon from "@mui/icons-material/Storage";
import HomeIcon from "@mui/icons-material/Home";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function MainNavigation() {
  /*
  react useState hook to save the current open/close state of the drawer,
  normally variables dissapear afte the function was executed
  */
  const [open, setState] = useState(false);

  /*
  function that is being called every time the drawer should open or close,
  the keys tab and shift are excluded so the user can focus between
  the elements with the keys
  */
  const toggleDrawer = (open: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <div>
          <Link to="/">
            <img src="logo192.png" alt="Icon" height={"35vh"} />
          </Link>
        </div>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 700, paddingLeft: "1rem" }}
        >
          Sports Alphabet Game
        </Typography>

        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        {/* The outside of the drawer */}
        <Drawer
          //from which side the drawer slides in
          anchor="right"
          //if open is true --> drawer is shown
          open={open}
          //function that is called when the drawer should close
          onClose={toggleDrawer(false)}
        >
          {/* The inside of the drawer */}
          <Box
            sx={{
              p: 2,
              height: 1,
              backgroundColor: "#C2BFC0",
            }}
          >
            {/* 
                  when clicking the icon it calls the function toggleDrawer 
                  and closes the drawer by setting the variable open to false
                  */}
            <IconButton sx={{ mb: 2 }} onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Link to="/">
                <ListItemButton>
                  <ListItemIcon>
                    <HomeIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </Link>
              <Link to="/twitter">
                <ListItemButton>
                  <ListItemIcon>
                    <TwitterIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="On Twitter" />
                </ListItemButton>
              </Link>
              <Link to="/data">
                <ListItemButton>
                  <ListItemIcon>
                    <StorageIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Raw Data" />
                </ListItemButton>
              </Link>
              <Link to="/about">
                <ListItemButton>
                  <ListItemIcon>
                    <InfoIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="About" />
                </ListItemButton>
              </Link>
            </Box>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
