import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import Header from "./Header";
import Contact from "../Images/Contact.JPG";
export default function ContactUs() {
  return (
    <div style={{
        position: "absolute",
backgroundImage: `url(${Contact})`, 
backgroundSize: "cover",
backgroundPosition: "center",
height: "100vh", // Adjust height as needed
width: "100%",}}>

        <div>
          <Header />
            <h1 >Contact Us</h1>
        </div >
        <div style={{marginTop: "200px"}}>
    <Box sx={{ p: 4 }}>
      {/* Contact Details Section */}
      <Grid container spacing={4} justifyContent="space-between">
        {/* Address */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">📍 Our Address</Typography>
            <Typography variant="body1">
              Bucket HQ <br />
              123 Market Street <br />
              Bangalore, KA, India <br />
              Pin Code: 560001
            </Typography>
          </Paper>
        </Grid>

        {/* Contact Info */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">📞 Contact Us</Typography>
            <Typography variant="body1">
              Phone: +91 98765 43210 <br />
              Email: support@bucket.com <br />
              Working Hours: 9 AM - 6 PM (Mon-Fri)
            </Typography>
          </Paper>
        </Grid>

        {/* Mission */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6">🎯 Our Mission</Typography>
            <Typography variant="body1">
              To revolutionize online shopping by providing a hassle-free, affordable, and
              customer-friendly experience while maintaining our commitment to quality and
              innovation.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box
        sx={{
          mt: 4,
          p: 2,
          backgroundColor: "rgba(0, 105, 92, 0.8)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography>© 2025 Bucket. All rights reserved.</Typography>
      </Box>
    </Box>
    </div>
    </div>
  );
}
