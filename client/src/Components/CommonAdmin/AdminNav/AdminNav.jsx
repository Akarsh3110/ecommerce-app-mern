import React, { useEffect } from 'react'
import '../AdminNav/AdminNav.css'
import SearchIcon from '../../../assets/SimpleIcons/search.png'
import ChevronDown from '../../../assets/SimpleIcons/chevron-down.png'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'


function AdminNav() {
 
  const {isAuthenticated,user}=useSelector(state=>state.auth)
  
  return (
    <div className="AdminNav">
        <div className="header">
            <div className="search">
              <img src={SearchIcon} alt="search" />
              <input type="text" placeholder='Search' />
            </div>
            <div className="profile">
              {/* <img src="" alt="" /> */}
              <div className="admin-label">{user?.name[0].toUpperCase()}</div>
              <div className="profile-content">
                <h3>{user?.name}</h3>
                <p>{user?.role}</p>
              </div>
              <button>
                <img src={ChevronDown} alt="" />
              </button>
            </div>
        </div>
        <div className="admin-layout">
            <Outlet/>
        </div>
    </div>
    
  )
}

export default AdminNav