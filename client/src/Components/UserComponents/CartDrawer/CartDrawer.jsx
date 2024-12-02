import React from 'react'
import '../CartDrawer/CartDrawer.css'
import CloseIcon from '../../../assets/SimpleIcons/close-white.png'
import CartTile from '../CartTile/CartTile'
import { useNavigate } from 'react-router-dom'

function CartDrawer({ isOpen, toggleCart , cartItems}) {
    const navigate=useNavigate()
    const totalCartAmount=
    cartItems && cartItems.length>0 ?
    cartItems.reduce((sum,currentItem)=>sum +(currentItem.saleprice*currentItem.quantity), 0)
    :0

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <div className="top-part">
            <div className="head">
                <h2>Cart</h2>
                <button className="close-btn" onClick={toggleCart}>
                    <img src={CloseIcon} alt="close" />
                </button>
            </div>
            <div className="product-tiles">
                {
                    cartItems && cartItems.length > 0 ?
                    cartItems.map((item) => <CartTile cartItem={item}/>) :null
                }
            </div>
        </div>
        <div className="bottom-part">
            <div className="fields">
                <div className="subtotal">
                    <h4>Subtotal</h4>
                    <p>${totalCartAmount}</p>
                </div>
                <div className="total">
                    <h4>Total</h4>
                    <p>${totalCartAmount}</p>
                </div>
            </div>
            <div className="buttons">
                <button 
                    className='checkout'
                    onClick={()=>navigate('/user/checkout')}>Checkout</button>
                <button className='view'>View Cart</button>
            </div>
        </div>
        
    </div>
  )
}

export default CartDrawer