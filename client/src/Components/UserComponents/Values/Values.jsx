import React from 'react'
import './Values.css'
import Truck from '../../../assets/ValuesCards/fast delivery.png'
import MoneyBag from '../../../assets/ValuesCards/money.png'
import Lock from '../../../assets/ValuesCards/lock 01.png'
import Phone from '../../../assets/ValuesCards/call.png'



function Values() {
  return (
    <div className='Values'>
        <div className="card">
            <img src={Truck} alt="truck" />
            <div className="card-head">
                <h3>Free Shipping</h3>
                <p>Order above $200</p>
            </div>
        </div>
        <div className="card">
            <img src={MoneyBag} alt="moneybag" />
            <div className="card-head">
                <h3>Money-back</h3>
                <p>30 days guarantee</p>
            </div>
        </div>
        <div className="card">
            <img src={Lock} alt="lock" />
            <div className="card-head">
                <h3>Secure Payments</h3>
                <p>Secured by Stripe</p>
            </div>
        </div>
        <div className="card">
            <img src={Phone} alt="call" />
            <div className="card-head">
                <h3>24/7 Support</h3>
                <p>Phone and Email support</p>
            </div>
        </div>
        
    </div>
  )
}

export default Values