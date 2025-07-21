import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../Pages/About"
import Home from "../Pages/Home";
import ContactUs from "../Pages/ContactUs";
import Form from "../Pages/Form";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import View from "../Pages/View";
import SingleView from "../Pages/SingleView";
import Order from "../Pages/Order";
import Logout from "../Pages/Logout";
import Prepay from "../Pages/Prepay";
import Notification from "../Pages/Notification";
export default function UserRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form" element={<Form />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/sign" element={<SignUp />} />
        <Route path="/view" element={<View />} />
        <Route path="/singleview/:id" element={<SingleView />} />
        <Route path="/order/:id" element={<Order />} /> {/* Corrected Route */}
        <Route path='/logout' element={<Logout />} />
        <Route path='/prepay' element={<Prepay />} />
        <Route path="/notifications" element={<Notification />} />

      </Routes>
    </div>
  );
}
