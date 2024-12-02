import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function CheckAuth({isAuthenticated,user,children}) {

    const location=useLocation()
    console.log(location.pathname, isAuthenticated);
    if (location.pathname ==="/" ) {
        if (!isAuthenticated) {
          return <Navigate to= "/signup" />;
        } else {
          if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
          } else {
            return <Navigate to="/user/home" />;
          }
        }
      }


    // if(!isAuthenticated && !(location.pathname.includes('/signin') || location.pathname.includes('/signup'))){
    //     return <Navigate to='/signin'/>
    // }


    // if(isAuthenticated && (location.pathname.includes('/signin') || location.pathname.includes('/signup'))){
    //     if(user?.role ==='admin'){
    //         return <Navigate to='/admin/dashboard'/>
    //     }else{
    //         return <Navigate to='/user/home'/>
    //     }
        
    // }

    // if(isAuthenticated && user?.role===!'admin' && location.pathname.includes('/admin')){
    //     return <Navigate to='/unauth-page'/>
    // }

    // if(isAuthenticated && user?.role==='admin' && location.pathname.includes('/user')){
    //     return <Navigate to='/admin/dashboard'/>
    // }

    // return <>{children}</>
    if (
        !isAuthenticated &&
        !(
          location.pathname.includes("/signin") ||
          location.pathname.includes("/signup")
        )
      ) {
        return <Navigate to="/signin" />;
      }
    
      if (
        isAuthenticated &&
        (location.pathname.includes("/signin") ||
          location.pathname.includes("/signup"))
      ) {
        if (user?.role === "admin") {
          return <Navigate to="/admin/dashboard" />;
        } else {
          return <Navigate to="/user/home" />;
        }
      }
    
      if (
        isAuthenticated &&
        user?.role !== "admin" &&
        location.pathname.includes("admin")
      ) {
        return <Navigate to="/unauth-page" />;
      }
    
      if (
        isAuthenticated &&
        user?.role === "admin" &&
        location.pathname.includes("user")
      ) {
        return <Navigate to="/admin/dashboard" />;
      }
    
      return <>{children}</>;
    
    
        
}


export default CheckAuth


