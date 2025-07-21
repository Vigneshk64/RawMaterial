import React, { useState } from 'react';
import Header from '../Component/Header';
import Sidebar from '../Component/Sidebar'; // Ensure Sidebar is imported
import { Box, Typography, Paper, Divider } from '@mui/material';
import axios from 'axios';

export default function Category() {
    const[Category,setCategory]=useState({
        Categoryname:''
    });
    const handleChange = (e) => {
                setCategory({ ...Category, [e.target.name]: e.target.value });  //...is spread operator
              };

    const handleSubmit=async (e) => {
     e.preventDefault();
     console.log("Category",Category)

     await axios.post('http://localhost:7002/category/cate', Category)

     .then((res)=>{
                 if(res.savecategory){
                  alert("Inserted Successfully")
                 }
               })
               .catch((err)=>{
                 console.log(err)
               })
     }
    




  return (
    <div>
      <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#ad9450' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#325c4e', p: 3 }}>
          {/* Top Bar */}
          <Header />

          {/* Page Title */}
          <Typography variant="h5" sx={{ mb: 3, color: '#cc99ff', fontWeight: 'bold' }}>
            Inventory & Revenue Form
          </Typography>

          {/* Form Section */}
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
          <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary" style={{marginLeft:"990px"}}>
View Category
              </button>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Inventory Details
            </Typography>

            <div className="d-flex justify-content-center mb-4">
            <div data-mdb-input-init className="form-outline me-3" style={{ width: '14rem' }}>
  <input
    type="text"
    id="form1"
    name="Categoryname"
    className="form-control"
    value={Category.Categoryname}
    onChange={handleChange}
  />
  <label className="form-label" htmlFor="form1">Enter Category</label>
</div>

              <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
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
