import React from 'react'
import { Outlet } from 'react-router-dom'
import UserContact from '../../Components/UserComponents/UserContact/UserContact'
import Values from '../../Components/UserComponents/Values/Values'
import Footer from '../../Components/UserComponents/Footer/Footer'
// import NavBar from '../../Components/NavBar/NavBar'
// import Announcement from '../../Components/Announcement/Announcement'

function Contact() {
  return (
    <div>
        {/* <Announcement/>
        <NavBar/> */}
        {/* <Outlet/> */}
        <UserContact/>
        <Values/>
        <Footer/>
    </div>
  )
}

export default Contact