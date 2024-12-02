import React from 'react'
import './Newsletter.css'
import MailIcon from '../../../assets/NewsletterImg/mail-icon.png'

function Newsletter() {
  return (
    <div className='Newsletter'>
        <div className="newletter-content">
            <div className="newletter-content-head">
                <h2>Join Our Newsletter</h2>
                <p>Sign up for deals, new products and promotions</p>
            </div>
            <div className="form-div">
                <div className="input-boxx" >
                    <img src={MailIcon} alt="mail-icon" />
                    <input type="text" placeholder='Email address' />
                </div>
                <button className='signup'>
                    SignUp
                </button>
            </div>
        </div>
    </div>
  )
}

export default Newsletter