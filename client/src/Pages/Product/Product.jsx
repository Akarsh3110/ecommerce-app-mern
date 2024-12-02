import React from 'react'
import ProductDetails from '../../Components/UserComponents/ProductDetails/ProductDetails'
import ProductCarousel from '../../Components/UserComponents/ProductCarousel/ProductCarousel'
import LowerBanner from '../../Components/UserComponents/LowerBanner/LowerBanner'
import Footer from '../../Components/UserComponents/Footer/Footer'
// import { Outlet } from 'react-router-dom'
// import Announcement from '../../Components/Announcement/Announcement'
// import NavBar from '../../Components/NavBar/NavBar'

function Product() {
  return (
    <div>
        {/* <Announcement/>
        <NavBar/> */}
        {/* <Outlet/> */}
        {/* <h2>Product</h2> */}
        <ProductDetails/>
        <ProductCarousel/>
        <LowerBanner/>
        <Footer/>
    </div>
  )
}

export default Product