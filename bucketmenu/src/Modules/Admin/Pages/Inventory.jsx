import React, { useState } from 'react';
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
import axios from 'axios';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import '../css/Inventory.css'; // Import external CSS file

export default function Inventory() {
  const [category, setCategory] = useState({
    name: '',
    revenue: '',
    status: '',
    rating: '',
    notes: '',
    category: '',
    expiryDate: '' // New expiry date field
  });

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // For previewing images

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: ["revenue"].includes(name) ? parseInt(value) || 0 : value,
    }));
  };

  const handleChangefile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile)); // Generate preview
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', category.name);
      formData.append('revenue', category.revenue);
      formData.append('rating', parseFloat(category.rating) || 0);
      formData.append('status', category.status);
      formData.append('notes', category.notes);
      formData.append('category', category.category);
      formData.append('expiryDate', category.expiryDate);
      formData.append('image', file);

      const res = await axios.post('http://localhost:7002/invent/in', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log("Response from server:", res.data);

      if (res.data.saveInvent) {
        alert("Inserted Successfully");
      } else {
        console.error("Insertion failed:", res.data);
        alert("Insertion failed. Check console.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error submitting form. Check console.");
    }
  };

  return (
    <Box className="inventory-container">
      <Sidebar />
      <Box className="inventory-content">
        <Header />
        <Typography variant="h5" className="inventory-title">
          Recipy-Form
        </Typography>
        <Paper className="inventory-paper">
          <Typography variant="h6" className="inventory-subtitle">
            Inventory Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Name" name='name' variant="outlined" onChange={handleChange} value={category.name} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <input type="file" accept="image/*" onChange={handleChangefile} />
              {imagePreview && <img src={imagePreview} alt="Preview" width={100} height={100} />}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Revenue (Rs.)" value={category.revenue} name='revenue' variant="outlined" onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Expiry Date" type="date" InputLabelProps={{ shrink: true }} name='expiryDate' value={category.expiryDate} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Inventory Status</InputLabel>
                <Select name='status' onChange={handleChange} label="Inventory Status" value={category.status}>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Food Category</InputLabel>
                <Select name="category" value={category.category} onChange={handleChange} label="Food Category">
                  <MenuItem value="Sweets & Snacks">Sweets & Snacks</MenuItem>
                  <MenuItem value="Desserts">Desserts</MenuItem>
                  <MenuItem value="Rice Dishes">Rice Dishes</MenuItem>
                  <MenuItem value="Beverages">Beverages</MenuItem>
                  <MenuItem value="Fast Food">Fast Food</MenuItem>
                  <MenuItem value="Street Food">Street Food</MenuItem>
                  <MenuItem value="Vegan & Healthy">Vegan & Healthy</MenuItem>
                  <MenuItem value="Dairy Products">Dairy Products</MenuItem>
                  <MenuItem value="Frozen & Ready-to-Eat">Frozen & Ready-to-Eat</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label="Additional Notes" multiline rows={3} variant="outlined" name='notes' value={category.notes} onChange={handleChange} />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Divider sx={{ mt: 3, backgroundColor: '#2c3e50' }} />
        <Typography variant="body2" className="inventory-footer">
          Powered by Pharma One © 2022
        </Typography>
      </Box>
    </Box>
  );
}
