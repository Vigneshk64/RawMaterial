import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar';

export default function Forms() {
  const [status, setStatus] = React.useState('');
  const [category, setCategory] = React.useState('');

  return (
    <div>
      <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f5f5f5' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#325c4e', p: 3 }}>
          {/* Top Bar */}
          <Header />

          {/* Page Title */}
          <Typography variant="h5" sx={{ mb: 3, color: '#fff', fontWeight: 'bold' }}>
            Inventory & Revenue Form
          </Typography>

          {/* Form Section */}
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Inventory Details
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Total Medicines" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Medicine Groups" variant="outlined" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Revenue (Rs.)" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Month & Year" variant="outlined" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Inventory Status</InputLabel>
                  <Select value={status} onChange={(e) => setStatus(e.target.value)} label="Inventory Status">
                    <MenuItem value="Good">Good</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Critical">Critical</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Medicine Category</InputLabel>
                  <Select value={category} onChange={(e) => setCategory(e.target.value)} label="Medicine Category">
                    <MenuItem value="Tablets">Tablets</MenuItem>
                    <MenuItem value="Syrups">Syrups</MenuItem>
                    <MenuItem value="Injections">Injections</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Notes"
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Footer */}
          <Divider sx={{ mt: 3, backgroundColor: '#2c3e50' }} />
          <Typography variant="body2" sx={{ p: 2, textAlign: 'center', color: '#fff' }}>
            Powered by Pharma One © 2022
          </Typography>
        </Box>
      </Box>
    </div>
  );
}