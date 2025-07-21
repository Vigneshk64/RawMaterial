import React from 'react'
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Grid,
    Paper,
    Button,
    Divider,
  } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
  import DownloadIcon from '@mui/icons-material/Download';

export default function Header() {
  return (
    <div>
       <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}
            >
              Dashboard
            </Typography>
            <Typography variant="body2">14 January 2022</Typography>
            <Link to="/admin/log" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" style={{ color: 'black' }}>
            Login
          </Typography>
        </Link> 
        <Link to="/admin/logout" style={{ textDecoration: 'none' }}>
          <Typography variant="body2" style={{ color: 'black' }}>
            Logout
          </Typography>
        </Link>           
          </Toolbar>
        </AppBar>

    </div>
  )
}
