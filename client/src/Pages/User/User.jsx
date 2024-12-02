import React from 'react'
import NavBar from '../../Components/UserComponents/NavBar/NavBar'
import Announcement from '../../Components/UserComponents/Announcement/Announcement'
import { Outlet } from 'react-router-dom'

function User() {
  return (
    <div>
        <Announcement/>
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default User