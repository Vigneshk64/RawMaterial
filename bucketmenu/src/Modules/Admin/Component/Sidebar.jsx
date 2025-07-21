import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import TableChartIcon from '@mui/icons-material/TableChart';
import StoreIcon from '@mui/icons-material/Store';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SettingsIcon from '@mui/icons-material/Settings';

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        backgroundColor: '#d7ccc8', // Improved background color
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          py: 2,
          backgroundColor: '#325c4e',
          color: 'white',
        }}
      >
        Recipy
      </Typography>
      <Box sx={{ flex: 1, mt: 2 }}>
        <SidebarLink to="/admin" icon={<DashboardIcon />} text="Dashboard" />
        <SidebarLink to="/admin/view" icon={<TableChartIcon />} text="Tables" />
        <SidebarLink to="/admin/inventory" icon={<ReceiptLongIcon />} text="MenuForm" />
        <SidebarLink to="/admin/viewcat" icon={<StoreIcon />} text="Store" />
        <Typography>{<SettingsIcon />} Configuration</Typography>
      </Box>
    </Box>
  );
}

// Reusable Sidebar Link Component
function SidebarLink({ to, icon, text }) {
  return (
    <Link to={to} style={{ textDecoration: 'none' }}>
      <Typography
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          color: 'black',
          padding: '8px',
          borderRadius: '4px',
          '&:hover': { color: 'white', backgroundColor: '#d84315' },
        }}
      >
        {icon} <span style={{ marginLeft: '8px' }}>{text}</span>
      </Typography>
    </Link>
  );
}
