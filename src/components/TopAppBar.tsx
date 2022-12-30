import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function TopAppBar() {
  return (
    <AppBar component="nav" position="sticky">
    <Toolbar>
    <div><a href='/'><img src="logo192.png" alt="Icon" height={'35vh'} /></a></div>
      <Typography
        variant="h6"
        component="div"
        sx={{
          ml: 2,
          fontFamily: 'monospace',
          fontWeight: 700,
          color: 'inherit',
          textDecoration: 'none',
          fontSize: '1.2rem',
        }}
      >
        Sports Alphabet Game
      </Typography>
    </Toolbar>
  </AppBar>
  );
}
export default TopAppBar;
