import React from 'react'
import './ShopBanner.css'
import ChevronRight from '../../../assets/SimpleIcons/chevron-right.png'

function ShopBanner() {
  return (
    <div className='ShopBanner'>
        <div className="shopbanner-img">
            <div className="shopbanner-content">
                <div className="shopbanner-content-link">
                    <div className='home'>
                        Home
                        <img src={ChevronRight} alt="chevron-right" />
                    </div>
                    <p className='shop'>Shop</p>
                </div>
                <h2>Shop Page</h2>
                <p>Let’s design the place you always imagined.</p>
            </div>
        </div>
        
    </div>
  )
}

export default ShopBanner