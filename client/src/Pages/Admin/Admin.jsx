import React from 'react'
// import { Routes,Route } from "react-router-dom";
// import CommonAdmin from '../../Components/CommonAdmin/CommonAdmin'
import { Outlet } from 'react-router-dom'
import '../Admin/Admin.css'
import AdminNav from '../../Components/CommonAdmin/AdminNav/AdminNav'
import AdminSideBar from '../../Components/CommonAdmin/AdminSideBar/AdminSideBar'


function Admin() {
  return (
    <div className='Admin'>
        <AdminSideBar/>
        <AdminNav/>
        {/* <Outlet/> */}
    </div>
  )
}

export default Admin