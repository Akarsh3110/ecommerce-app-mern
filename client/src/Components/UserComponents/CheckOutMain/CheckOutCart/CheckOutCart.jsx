import React, { useContext, useEffect, useState } from 'react'
import '../CheckOutCart/CheckOutCart.css'
import CloseIcon from '../../../../assets/SimpleIcons/close-grey.png'
import CouponIcon from '../../../../assets/SimpleIcons/ticket-percent.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItems, updateCartQty } from '../../../../redux/shopCart-slice';
import { toast } from 'react-toastify';
import { EditFormContext } from '../../../../Contexts/Editform'

function CheckOutCart({tabs,completeCurrentTab,activeTab}) {
    const {user}=useSelector(state=>state.auth);
    const {cartItems}=useSelector(state=>state.shopCart);
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchCartItems(user?.id))
      },[dispatch])
      const cartItem=cartItems && cartItems.items && cartItems.items.length>0 ? cartItems.items :[]


      const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      };


    const subTotalAmount=
    cartItem && cartItem.length>0 ?
    cartItem.reduce((sum,currentItem)=>sum +(currentItem.saleprice*currentItem.quantity), 0)
    :0

      function handleUpdateQty(getCartItem,typeOfAction) {
        dispatch(updateCartQty({
          userId:user?.id , productId:getCartItem?.productId , quantity: 
          typeOfAction==='plus' ?
            getCartItem?.quantity + 1 : getCartItem?.quantity - 1
        })).then(data=>{
          if(data?.payload?.success){
            toast.success('Cart Item Updated Succesfully',toastOptions)
          }
        })
      }

    const [selectedShipping, setSelectedShipping] = useState(""); // Tracks the selected shipping option
    // const [shippingCost, setShippingCost] = useState(0); // Tracks the shipping cost
    const{shippingCost,setShippingCost}=useContext(EditFormContext)
    const handleRadioChange = (event) => {
        const value = event.target.value;
        setSelectedShipping(value); // Update selected shipping option
        if (value === "free_shipping") {
            setShippingCost(0);
        } else if (value === "express_shipping") {
            setShippingCost(15.00); // Example cost for express shipping
        }else if(value === "pick_up"){
            setShippingCost(-21.00);
        }
    };

    const TotalAmount=(subTotalAmount+(shippingCost)).toFixed(2)

  return (
    <div className='CheckOutCart'>
        <div className="top">
            <table className='cart-table'>
                <thead>
                    <tr>
                        <th className='product-label'>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItem.map((item, index) => (
                    <tr key={index}>
                        <td className='product'>
                            <div className="product-wrapper">
                                <img src={item.image} alt={item.title} />
                                <div className="product-contents">
                                    <h4>{item.title}</h4>
                                    <p>color{item.colors}</p>
                                    <button className='remove'>
                                        <img src={CloseIcon} alt="close" />
                                        Remove
                                    </button>
                                </div>
                            </div>
                            
                        </td>
                        <td className='quantity'>
                            <div className="count-buttons">
                                <button 
                                    disabled={item?.quantity===1}
                                    onClick={()=>handleUpdateQty(item,'minus')}
                                    className='minus'>-</button>
                                <p>{item.quantity}</p>
                                <button
                                    onClick={()=>handleUpdateQty(item,'plus')} 
                                    className='plus'>+</button>
                            </div>
                        </td>
                        <td className='saleprice'>${item.saleprice}</td>
                        <td className='subprice'>${(item.saleprice * item.quantity).toFixed(2)}</td>
                        
                    </tr>
                    ))}
                </tbody>
            </table>

            <div className="cart-summary">
                <h3>Cart Summary</h3>
                <div className="content-summary">
                    <div className="input-box">
                        <input 
                            type="radio" 
                            name="shipping" 
                            id="free"
                            value="free_shipping"
                            checked={selectedShipping === "free_shipping"}
                            onChange={handleRadioChange} />
                        <label htmlFor="free">Free Shipping</label>
                        <p>$0.00</p>
                    </div>
                    <div className="input-box">
                        <input 
                            type="radio" 
                            name="shipping" 
                            id="express" 
                            value="express_shipping"
                            checked={selectedShipping === "express_shipping"}
                            onChange={handleRadioChange}/>
                        <label htmlFor="express">Express Shipping</label>
                        <p>$15.00</p>
                    </div>
                    <div className="input-box">
                        <input 
                            type="radio" 
                            name="shipping" 
                            id="pickup" 
                            value="pick_up"
                            checked={selectedShipping === "pick_up"}
                            onChange={handleRadioChange}/>
                        <label htmlFor="pickup">Pick Up</label>
                        <p>%21.00</p>
                    </div>
                    <div className="cost">
                        <div className="totalprice sub">
                            <h4>Subtotal</h4>
                            <p>${subTotalAmount}</p>
                        </div>
                        <div className="totalprice total">
                            <h4>Total</h4>
                            <p>${TotalAmount}</p>
                        </div>
                    </div>
                    {<button 
                        className='checkout-btn'
                        onClick={()=>{
                            if (!selectedShipping) {
                                alert("Please select a shipping option.");
                            } else {
                                completeCurrentTab();
                            }
                        }}
                        >
                        {activeTab < tabs.length - 1 ? "CheckOut" : "Finish"}
                    </button>}
                </div>
            </div>
        </div>
        <div className="bottom">
            <h4>Have a coupon?</h4>
            <p>Add your code for an instant cart discount</p>
            <div className="coupon-box">
                <img src={CouponIcon} alt="coupon" />
                <input 
                    type="text" 
                    placeholder='Coupon Code'/>
                <button>Apply</button>
            </div>
        </div>
    </div>
  )
}

export default CheckOutCart