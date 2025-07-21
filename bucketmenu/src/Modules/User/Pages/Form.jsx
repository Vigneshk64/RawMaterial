import React, { useState,useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import '../css/ContactForm.css';
import axios from 'axios';


export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });  //...is spread operator
  };
  const [file,setFiles]=useState([])

  const handleChangefile=(e,index)=>{
    console.log(e.target.files[0])
    setFiles(e.target.files[0])
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);  //save the all data in console
  };

  const AllData =new FormData()
  const Handlesubmit= async()=>{
  AllData.append('name', formData.name);
  AllData.append('email', formData.email);
  AllData.append('phone', formData.phone);
  AllData.append('address',formData.address);
  AllData.append('image',file);

  await axios.post('http://localhost:7002/api/insert', AllData)

  .then((res)=>{
    if(res.savestudent){
      alert("Inserted Successfully")
    }
  })
  .catch((err)=>{
    console.log(err)
  })
  
}

const [data,setData]=useState([])
useEffect(()=>{
  axios.get('http://localhost:7002/api/get')
  .then((res)=>{
    console.log(res.data)
    setData(res.data)
  })
  .catch((err)=>{
    console.log(err)
  })
},[])



  return (

    <Box className="form-container">
      <Typography variant="h4" className="form-title">Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          className="form-field"
        /> <br/><br/>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          className="form-field"
        /> <br/><br/>
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          required
          className="form-field"
        /> <br/><br/>
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          required
          className="form-field"
        /> <br/><br/>
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          className="form-field"
        /> <br/><br/>
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          required
          className="form-field"
          />
          <div>
          <label htmlFor='img'>Image :</label>
          <input type="file" 
          id="img" 
          name="image"
          onChange={handleChangefile} 
          required
          />
        </div>



         <br/><br/>


        <Button variant="contained" type="submit" onClick={Handlesubmit} className="submit-button">
          Submit
        </Button>
      </form>
    </Box>
  );
}