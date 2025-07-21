import React from 'react'
import { useState , useEffect} from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';


export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        Password:''
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });  //...is spread operator
      };
    
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);  //save the all data in console
      
     
    
      await axios.post('http://localhost:7002/app/insert', formData)
    
      .then((res)=>{
        if(res.saveadmin){
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
    <div>
      <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' name='name' type='text' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' name='email' type='email' onChange={handleChange}/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' name='password' type='password' onChange={handleChange}/>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </div>
  )
}
