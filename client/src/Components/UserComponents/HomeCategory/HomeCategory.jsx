import React from 'react'
import './HomeCategory.css'
import RightArrow from '../../../assets/HomeCategoryStatic/arrow-right.png'
import {Link} from 'react-router-dom'

function HomeCategory() {
  return (
    <div className='HomeCategory'>
        <div className="category-left">
            <Link to='/user/shop' className='category-left-head'>
                <h2>Living Room</h2>
                <button className='shopbtn'>
                    Shop Now
                    <img src={RightArrow} alt="right-arrow" />
                </button>
            </Link>
            {/* <div className="category-left-head">
               
            </div> */}
        </div>
        <div className="category-right">
            <div className='category-right-top'>
                <Link to='/user/shop' className='category-right-top-head'>
                    <h2>Bedroom</h2>
                    <button className='shopbtn'>
                       <p>Shop Now</p> 
                        <img src={RightArrow} alt="right-arrow" />
                    </button>
                </Link>
            </div>
            <div className='category-right-bottom'>
                <Link to='/user/shop' className='category-right-bottom-head'>
                    <h2>Kitchen</h2>
                    <button className='shopbtn'>
                        Shop Now
                        <img src={RightArrow} alt="right-arrow" />
                    </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default HomeCategory