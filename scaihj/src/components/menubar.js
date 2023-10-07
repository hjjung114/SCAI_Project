import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import AboutPage from './Pages/about';
// import About from './Pages/about';
// import { Link, RouteComponentProps } from 'react-router-dom';


export default function MenuBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* <BrowserRouter>
          <Routes>
            <Route path="/" element={<AboutPage />}>
               */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                HOME
              </Typography>
            {/* </Route>
            </Routes>
          </BrowserRouter> */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                ABOUT
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                PAGE
              </Typography>

        </Toolbar>
      </AppBar>
    </Box>
  );
}