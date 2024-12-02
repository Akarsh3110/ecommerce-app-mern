import React from 'react'
import './Banner.css'
import Carousel from '../Carousel/Carousel'

function Banner() {
  return (
    <div className='Banner'>
        <Carousel/>
        <div className="banner-head">
            <h2>
                Simply Unique <span>/</span> <br />
                Simply Betters <span>.</span> 
            </h2>
            <p><span>3legant</span> is a gift & decorations store based in HCMC, <br /> Vietnam. Est since 2019. </p>
        </div>
    </div>
  )
}

export default Banner