import React from 'react'
// import Announcement from '../../Components/Announcement/Announcement'
// import NavBar from '../../Components/NavBar/NavBar'
import ShopBanner from '../../Components/UserComponents/ShopBanner/ShopBanner'
import ShopProductList from '../../Components/UserComponents/ShopProductList/ShopProductList'
import Newsletter from '../../Components/UserComponents/Newsletter/Newsletter'
import Footer from '../../Components/UserComponents/Footer/Footer'

function Shop() {
  return (
    <div>
        {/* <Announcement/>
        <NavBar/> */}
        <ShopBanner/>
        <ShopProductList/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Shop