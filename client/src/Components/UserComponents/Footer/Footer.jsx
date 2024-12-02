import React from 'react'
import './Footer.css'
import { Link } from "react-router-dom";
import InstagramIcon from '../../../assets/SocialIcons/instagram.png'
import FacebookIcon from '../../../assets/SocialIcons/facebook.png'
import YouTubeIcon from '../../../assets/SocialIcons/youtube.png'

function Footer() {
  return (
    <div className='Footer'>
        <div className="footer-top">
            <div className="logo">
                <h3>3legant <span>.</span></h3>
                |
                <p>Gift & Decoration Store</p>
            </div>
            <ul className="footer-nav">
                <li>
                    <Link to='/home'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/shop'>
                        Shop
                    </Link>
                </li>
                <li>
                    <Link to='/product'>
                        Product
                    </Link>
                </li>
                <li>
                    <Link to='/contact'>
                        Contact Us
                    </Link>
                </li>
            </ul>
        </div>
        <div className="footer-bottom">
            <div className="copyright">
                <p className='copy'>Copyright © 2023 3legant. All rights reserved</p>
                <p className='privacy'>Privacy Policy</p>
                <p className='terms'>Terms of Use</p>
            </div>
            <div className="social-icons">
                <button><img src={InstagramIcon} alt="instagram" /></button>
                <button><img src={FacebookIcon} alt="facebook" /></button>
                <button><img src={YouTubeIcon} alt="youtube" /></button>
            </div>
        </div>
    </div>
  )
}

export default Footer