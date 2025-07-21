import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import '../css/LoginAdmin.css';

export default function Login() {
    const [formData, setFormData] = useState({
      email: '',
      password: '' // Changed 'Password' to lowercase
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('Form Data:', formData);
  
      try {
        const res = await axios.post('http://localhost:7002/app/signup', formData)
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            localStorage.setItem('admintoken', res.data.authtoken);
            alert("Login Successfully");
            navigate("/admin");
          } else {
            alert("Invalid Credentials", "Error");
          }
        });
        if (res.data.saveadmin) {
          alert("Inserted Successfully");
        }
      } catch (err) {
        console.error("Login Error:", err);
      }
    };
  
    return (
      <div>
        <MDBContainer className="my-5 gradient-form">
          <MDBRow className="d-flex align-items-center justify-content-center">
            <MDBCol md="6" className="mb-5">
              <div className="d-flex flex-column ms-5">
                <div className="text-center">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{ width: '185px' }} alt="logo" />
                  <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                </div>
  
                <p>Secure Admin Access – Please log in to continue</p>
  
                <MDBInput wrapperClass='mb-4' label='Email address' name='email' id='form1' type='email' onChange={handleChange} />
                <MDBInput wrapperClass='mb-4' label='Password' id='form2' name='password' type='password' onChange={handleChange} />
                <div className="text-center pt-1 mb-5 pb-1 d-flex justify-content-center">
                  <MDBBtn 
                    className="gradient-custom-2 sign-in-button"
                    onClick={handleSubmit}
                  >
                    Sign In
                  </MDBBtn>
                </div>
  
                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                  <p className="mb-0">Don't have an account?</p>
                  <MDBBtn outline className='mx-2' color='danger'>
                    Register
                  </MDBBtn>
                </div>
              </div>
            </MDBCol>
  
            <MDBCol md="6" className="mb-5">
              <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100">
                <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 className="mb-4">Welcome Back, Admin</h4>
                  <p className="small mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
}
