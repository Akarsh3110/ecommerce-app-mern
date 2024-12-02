import React, { useEffect, useState } from 'react'
import './NavBar.css'
import SearchIcon from '../../../assets/SimpleIcons/search-icon.png'
import CartIcon from '../../../assets/SimpleIcons/shopping bag.png'
import ProfileIcon from '../../../assets/SimpleIcons/profile-icon.png'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../redux/auth-slice'
import CartDrawer from '../CartDrawer/CartDrawer'
import { fetchCartItems } from '../../../redux/shopCart-slice'


function NavBar() {
    const navigate=useNavigate()
    const [activeIndex, setActiveIndex] = useState(0);
    const {isAuthenticated,user}=useSelector(state=>state.auth)
    console.log('User',user);
    

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const [isVisible, setIsVisible] = useState(false);
  const handleClickDialog = () => {
    setIsVisible(!isVisible);  // Toggle the visibility state
  };

  const dispatch=useDispatch()
  const handleLogOut=()=>{
    dispatch(logoutUser())
  }

  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const {cartItems}=useSelector(state=>state.shopCart)
      console.log('CartItems',cartItems);
      
  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//         if (!event.target.closest('.dialog-content') && isVisible) {
//             setIsVisible(false);
//         }
//     };

//     document.addEventListener('click', handleOutsideClick);
//     return () => {
//         document.removeEventListener('click', handleOutsideClick);
//     };
// }, [isVisible]);

  return (
    <div className='NavBar'>
        <h2>3legant.</h2>
        <ul className='center-nav'>
            <li>
                <Link
                    to='/user/home'
                    className={`navlink ${activeIndex === 0 ? 'active' : ''}`}
                    onClick={() => handleClick(0)}
                 >
                    Home
                 </Link>
            </li>
            <li>
                <Link
                    to='/user/shop'
                    className={`navlink ${activeIndex === 1 ? 'active' : ''}`}
                    onClick={() => handleClick(1)}
                 >
                    Shop
                </Link>
            </li>
            <li>
                <Link
                    // to='/user/product'
                    className={`navlink ${activeIndex === 2 ? 'active' : ''}`}
                    onClick={() => handleClick(2)}
                 >
                    Product
                </Link>
            </li>
            <li>
                <Link
                    to='/user/contact'
                    className={`navlink ${activeIndex === 3 ? 'active' : ''}`}
                    onClick={() => handleClick(3)}
                 >
                    Contact Us
                </Link>
            </li>
        </ul>
        <ul className='right-nav'>
            <li><img 
                src={SearchIcon} 
                alt="searchIcon" 
                onClick={()=>navigate('/user/search')}/>
            </li>
            <li className="cart-icon-wrapper">
                <img  onClick={toggleCart} src={CartIcon} alt="cartIcon" />
                {cartItems?.items?.length > 0 && (
                    <span className="cart-badge">{cartItems.items.length}</span>
                )}
            </li>
            <li><img onClick={handleClickDialog} src={ProfileIcon} alt="profileIcon" /></li>
        </ul>
        {isVisible && (
        <div className='dialog'>
            <div className="dialog-content">
                <div className="user" onClick={()=>navigate('/user/account')}>
                    <div className="account-label">{user?.name[0].toUpperCase()}</div>
                    <p>{user?.name}</p>
                </div>
                <button onClick={handleLogOut} className='logout-btn'>LogOut</button>
            </div>
        </div>
        )}
        <CartDrawer cartItems={cartItems && cartItems.items && cartItems.items.length>0 ? cartItems.items :[]} isOpen={isCartOpen} toggleCart={toggleCart}/>
    </div>
  )
}

export default NavBar