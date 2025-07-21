import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { Link, useNavigate } from 'react-router-dom';

const pages = ['Home', 'About', 'Contact Us'];

export default function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNotif, setAnchorElNotif] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleOpenNotifMenu = (event) => setAnchorElNotif(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleCloseNotifMenu = () => setAnchorElNotif(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1F1F1F', width: '100%' }}>
      <Toolbar
        disableGutters
        sx={{
          width: '100%',
          px: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left: Logo + Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AdbIcon sx={{ mr: 1, color: '#FFD700' }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              '&:hover': { color: '#FFD700' },
            }}
          >
            RECIPY
          </Typography>
        </Box>

        {/* Center: Navigation */}
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
          {pages.map((page) => (
            <Button
              key={page}
              component={Link}
              to={`/${page.toLowerCase().replace(' ', '')}`}
              sx={{
                color: 'white',
                mx: 1,
                '&:hover': { color: '#FFD700', backgroundColor: 'rgba(255, 255, 255, 0.1)' },
              }}
            >
              {page}
            </Button>
          ))}
        </Box>

        {/* Right: Notifications + User Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Notifications">
            <IconButton
              onClick={() => navigate('/notifications')}
              sx={{
                color: 'white',
                '&:hover': { color: '#FFD700' },
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorElNotif}
            open={Boolean(anchorElNotif)}
            onClose={handleCloseNotifMenu}
            sx={{
              mt: '45px',
              '& .MuiPaper-root': {
                backgroundColor: '#282828',
                color: 'white',
                borderRadius: '10px',
              },
            }}
          >
            <MenuItem onClick={handleCloseNotifMenu}>You have a message</MenuItem>
          </Menu>

          <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{
                p: 0,
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: '0px 0px 10px rgba(255, 215, 0, 0.8)' },
              }}
            >
              <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorElUser}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
            sx={{
              mt: '45px',
              '& .MuiPaper-root': {
                backgroundColor: '#282828',
                color: 'white',
                borderRadius: '10px',
              },
            }}
          >
            <MenuItem component={Link} to="/sign" onClick={handleCloseUserMenu} sx={{ '&:hover': { backgroundColor: '#444' } }}>
              Registration
            </MenuItem>
            <MenuItem component={Link} to="/logout" onClick={handleCloseUserMenu} sx={{ '&:hover': { backgroundColor: '#444' } }}>
              Logout
            </MenuItem>
            <MenuItem component={Link} to="/" onClick={handleCloseUserMenu} sx={{ '&:hover': { backgroundColor: '#444' } }}>
              Login
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
