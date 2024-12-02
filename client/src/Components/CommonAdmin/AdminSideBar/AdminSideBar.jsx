import React, { useState } from 'react'
import "../AdminSideBar/AdminSideBar.css"
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/auth-slice';

function AdminSideBar() {
    const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };
   
  const dispatch=useDispatch()
  const handleLogout=()=>{
    dispatch(logoutUser())
  }

  return (
    <div className="sidebar">
            <h2>3legant.</h2>
            <ul className='side-nav'>
              <li className={`li ${activeIndex === 0 ? 'active' : ''}`}>
                <Link 
                  to='/admin/dashboard'
                  // className={`navlink ${activeIndex === 0 ? 'active' : ''}`}
                  onClick={() => handleClick(0)}
                >
                  Dashboard
                </Link>
              </li>
              <li className={`li ${activeIndex === 1 ? 'active' : ''}`}>
                <Link
                  to='/admin/products'
                  // className={`navlink ${activeIndex === 1 ? 'active' : ''}`}
                  onClick={() => handleClick(1)}
                >
                Products
                </Link>
                </li>
              <li className={`li ${activeIndex === 2 ? 'active' : ''}`}>
                <Link
                  // to='/admin/favourites'
                  // className={`navlink ${activeIndex === 2 ? 'active' : ''}`}
                  onClick={() => handleClick(2)}
                >
                Favourites
                </Link>
              </li>
              <li className={`li ${activeIndex === 3 ? 'active' : ''}`}>
                <Link
                  to='/admin/inbox'
                  // className={`navlink ${activeIndex === 3 ? 'active' : ''}`}
                  onClick={() => handleClick(3)}
                >
                Inbox
                </Link>
              </li>
              <li className={`li ${activeIndex === 4 ? 'active' : ''}`}>
                <Link
                  to='/admin/orderlists'
                  // className={`navlink ${activeIndex === 4 ? 'active' : ''}`}
                  onClick={() => handleClick(4)}
                >
                OrderLists
                </Link>
              </li>
              <li className={`li ${activeIndex === 5 ? 'active' : ''}`}>
                <Link
                  to='/admin/productstock'
                  // className={`navlink ${activeIndex === 5 ? 'active' : ''}`}
                  onClick={() => handleClick(5)}
                >
                Product Stock
                </Link>
              </li>
            </ul>
            <ul className='side-nav-bottom'>
              <li className={`li ${activeIndex === 6 ? 'active' : ''}`}>
                <Link 
                  // to='/admin/settings'
                  onClick={() => handleClick(6)}
                >Settings
                </Link>
              </li>
              <li >
                <Link 
                  // to='/signin'
                  onClick={handleLogout}
                  >
                    LogOut
                </Link>
              </li>
            </ul>
        </div>
  )
}

export default AdminSideBar