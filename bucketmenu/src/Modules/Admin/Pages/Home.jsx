import React from 'react'

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
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
       <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#fff8e1' }}>
      {/* Sidebar */}
   <Sidebar/>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#ffebcd' }}>
        {/* Top Bar */}
       <Header/>  

        {/* Cards Section */}
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center', backgroundColor: '#ffcc80' }}>
              <Typography variant="h6" color="success.main">
                Insert Recipe
              </Typography>
              <Typography variant="subtitle1">Form</Typography>
              <Link to={'/admin/inventory'}>
              <Button variant="contained" size="small" sx={{ mt: 1, backgroundColor: '#d84315' }}>
                Click
              </Button>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center', backgroundColor: '#ffe082' }}>
              <Typography variant="h6" color="warning.main">
                1250+ Recipes
              </Typography>
              <Typography variant="subtitle1">Available Dishes</Typography>
              <Link to={'/admin/viewcat'}>
              <Button variant="contained" size="small" sx={{ mt: 1, backgroundColor: '#d84315' }}>
                Explore Now
              </Button>
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center', backgroundColor: '#ffab91' }}>
              <Typography variant="h6" color="primary.main">
                500+
              </Typography>
              <Typography variant="subtitle1">Trending Recipes</Typography>
              <Button variant="contained" size="small" sx={{ mt: 1, backgroundColor: '#d84315' }}>
                View Trends
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={2} sx={{ p: 2, textAlign: 'center', backgroundColor: '#ff7043' }}>
              <Typography variant="h6" color="error.main">
                50+
              </Typography>
              <Typography variant="subtitle1">New Recipes Added</Typography>
              <Button variant="contained" size="small" sx={{ mt: 1, backgroundColor: '#d84315' }}>
                Discover Now
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Other Sections */}
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, backgroundColor: '#ffccbc' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recipe Inventory
              </Typography>
              <Typography>Total Recipes: 1250+</Typography>
              <Typography>Recipe Categories: 24</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, backgroundColor: '#ffe0b2' }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Report
              </Typography>
              <Typography>Most Viewed Recipe: Spaghetti Carbonara</Typography>
              <Typography>New Uploads This Month: 50+</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Divider sx={{ mt: 3, backgroundColor: '#bf360c' }} />
        <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
          Powered by Recipe World © 2025
        </Typography>
      </Box>
    </Box>
    </div>
  )
}
