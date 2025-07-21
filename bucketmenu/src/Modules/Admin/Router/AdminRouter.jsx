import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../Pages/Home';
import LoginAdmin from '../Pages/LoginAdmin';
// import Register from '../Pages/Register';
import TableComponent from '../Pages/Table';
import Categary from '../Pages/Categary';
import  Inventory  from '../Pages/Inventory';
import ViewCatogory from '../Pages/ViewCatogory';
import Logout from '../Pages/Logout';


export default function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/log' element={<LoginAdmin/>} />
        {/* <Route path='/reg' element={<Register />} /> */}
        <Route path='/view' element={<TableComponent/>} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/Categary' element={<Categary/>} />
<Route path='/viewcat' element={<ViewCatogory />} />
                <Route path='/logout' element={<Logout />} />
        

      </Routes>
    </div>
  )
}
