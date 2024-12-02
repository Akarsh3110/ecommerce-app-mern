import React from 'react'
// import Announcement from '../../Components/Announcement/Announcement'
// import NavBar from '../../Components/NavBar/NavBar'
import Banner from '../../Components/UserComponents/Banner/Banner'
import HomeCategory from '../../Components/UserComponents/HomeCategory/HomeCategory'
import ProductCarousel from '../../Components/UserComponents/ProductCarousel/ProductCarousel'
import Values from '../../Components/UserComponents/Values/Values'
import LowerBanner from '../../Components/UserComponents/LowerBanner/LowerBanner'
import Newsletter from '../../Components/UserComponents/Newsletter/Newsletter'
import Footer from '../../Components/UserComponents/Footer/Footer'

function Home() {
  return (
    <div>
        {/* <Announcement/>
        <NavBar/> */}
        <Banner/>
        <HomeCategory/>
        <ProductCarousel/>
        <Values/>
        <LowerBanner/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home