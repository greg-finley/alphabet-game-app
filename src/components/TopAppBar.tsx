import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function TopAppBar() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div><img src="logo192.png" alt="Icon" height={'35vh'} /></div>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              ml: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '5vw',
            }}
          >
            Sports Alphabet Game
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopAppBar;
