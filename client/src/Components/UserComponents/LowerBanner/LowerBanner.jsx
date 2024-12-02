import React from 'react'
import './LowerBanner.css'
import RightArrow from '../../../assets/HomeCategoryStatic/arrow-right.png'

function LowerBanner() {
  return (
    <div className='LowerBanner'>
        <div className="lowerbanner-left"></div>
        <div className="lowerbanner-right">
            <div className="lowerbanner-right-head">
                <p className='sales'>SALE UP TO 35% OFF</p>
                <h2>
                    HUNDREDS of <br />
                    New lower prices!
                </h2>
                <p className='description'>
                    It’s more affordable than ever to give every <br />
                    room in your home a stylish makeover
                </p>
            </div>
            <button className='shopbtn'>
                Shop Now
                <img src={RightArrow} alt="rightarrow" />
            </button>
        </div>
    </div>
  )
}

export default LowerBanner