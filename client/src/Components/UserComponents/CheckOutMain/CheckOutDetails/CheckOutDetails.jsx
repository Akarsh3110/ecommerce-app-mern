import React, { useContext, useEffect, useState } from 'react'
import '../CheckOutDetails/CheckOutDetails.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, updateCartQty } from '../../../../redux/shopCart-slice';
import { toast } from 'react-toastify';
import { EditFormContext } from '../../../../Contexts/Editform';
import { addNewAddress, fetchAllAddresses } from '../../../../redux/address-slice';
import { createNewOrder } from '../../../../redux/order-slice';
function CheckOutDetails({tabs,completeCurrentTab,activeTab}) {
    const{selectedColor,setSelectedColor}=useContext(EditFormContext)
    const{shippingCost,setShippingCost}=useContext(EditFormContext)
    const{currentSelectedAddress}=useContext(EditFormContext)
    console.log('CheckOutDetails - Current Selected Address:', currentSelectedAddress);
    // const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
    const {user}=useSelector(state=>state.auth);
    const {cartItems}=useSelector(state=>state.shopCart);
    const {approvalURL}=useSelector(state=>state.shopOrder)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(fetchCartItems(user?.id))
      },[dispatch])

    const [isPaymentStart, setIsPaymentStart] = useState(false)
    const cartItem=cartItems && cartItems.items && cartItems.items.length>0 ? cartItems.items :[]
    const [addressValues, setAddressValues] = useState({
        firstname:'',
        lastname:'',
        name:'',
        email:'',
        address:'',
        city:'',
        state:'',
        country:'',
        pincode:'',
        phone:''
        })
        // const handleInputs = (e) => {
        //     const { name, value } = e.target;
        //     setAddressValues((prevformValues) => ({
        //         ...prevformValues,
        //         [name]: value,
        //     }));
        // };
        const handleInputs = (e) => {
            const { name, value } = e.target;
        
            setAddressValues((prevformValues) => {
                const updatedValues = { 
                    ...prevformValues, 
                    [name]: value 
                };
        
                // Dynamically update `name` when `firstname` or `lastname` changes
                if (name === 'firstname' || name === 'lastname') {
                    updatedValues.name = `${updatedValues.firstname} ${updatedValues.lastname}`.trim();
                }
        
                return updatedValues;
            });
        };

        console.log(addressValues);
        // Dynamically generate the full name
const fullName = `${addressValues.firstname} ${addressValues.lastname}`.trim();

console.log({ ...addressValues, name: fullName });
const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };
function handleManageAddress() {
    // e.preventDefault();
    dispatch(addNewAddress({
        ...addressValues,
        userId:user?.id
    })).then(data=>{
        console.log(data);
        if(data?.payload?.success){
            dispatch(fetchAllAddresses(user?.id))
            setAddressValues('')
            toast.success('Address Added Succesfully',toastOptions)
        }
        
    })
}


   
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
      const subTotalAmount=cartItem && cartItem.length>0 ?
    cartItem.reduce((sum,currentItem)=>sum +(currentItem.saleprice*currentItem.quantity), 0)
    :0
      const TotalAmount=(subTotalAmount+(shippingCost))
      const {addressList}=useSelector(state=>state.shopAddress)
      useEffect(() => {
        dispatch(fetchAllAddresses(user?.id))
    }, [dispatch])
    console.log("AddressList",addressList);
    const defaultAddress=addressList[0]
    console.log('default',defaultAddress);
    

      function handleInitiatePaypalPayment() {
        if (isPaymentStart) return; 
        if(!cartItems||cartItems.items.length===0){
            toast.warning("Your Cart is empty..Please Add items to proceed", toastOptions);
            return
        }
        if(!defaultAddress){
            toast.warning("Please add address to proceed", toastOptions);
            return
        }

        const orderData={
                    userId:user?.id,
                    cartId:cartItems?._id,
                    cartItems:cartItems.items.map(singleCartItem=>({
                        productId:singleCartItem.productId,
                        title:singleCartItem.title,
                        image:singleCartItem.image,
                        price:singleCartItem.saleprice,
                        quantity:singleCartItem.quantity,
                    })),
                    address:{
                        addressId:defaultAddress?._id,
                        name:defaultAddress?.name,
                        email:defaultAddress?.email,
                        address:defaultAddress?.address,
                        city:defaultAddress?.city,
                        state:defaultAddress?.state,
                        country:defaultAddress?.country,
                        pincode:defaultAddress?.pincode,
                        phone:defaultAddress?.phone
                    },
                    orderStatus:'pending',
                    paymentMethod:'paypal',
                    paymentStatus:'pending',
                    totalAmount:TotalAmount,
                    orderDate:new Date(),
                    orderUpdateDate:new Date(),
                    paymentId:'',
                    payerId:''
        }
        // console.log('orderData::',orderData);  
        // console.log('Selected:::::',currentSelectedAddress);
            dispatch(createNewOrder(orderData)).then(data=>{
                console.log('neworder',data)
                if(data?.payload?.success){
                    setIsPaymentStart(true);
                    completeCurrentTab(2);
                }else{
                    setIsPaymentStart(false)
                }
            })

            // if (approvalURL) {
            // window.location.href = approvalURL;  // Redirect to PayPal approval URL
            // }

      }

      console.log("setttt",setIsPaymentStart);
      
      if (approvalURL) {
        window.location.href = approvalURL;
      }
    
    
      
      
  return (
    <div className='CheckOutDetails'>
        <div className="left">
            <div className="contact-info">
                <h3>Contact Information</h3>
                <div className="names">
                    <div className="input-box">
                        <label htmlFor="">FIRST NAME</label>
                        <input 
                            type="text"
                            placeholder='First name'
                            name='firstname'
                            value={addressValues.firstname}
                            onChange={handleInputs} />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">LAST NAME</label>
                        <input 
                            type="text" 
                            placeholder='Last name'
                            name='lastname'
                            value={addressValues.lastname}
                            onChange={handleInputs}/>
                    </div>
                </div>
                <div className="input-box">
                    <label htmlFor="">PHONE NUMBER</label>
                    <input 
                        type="text"
                        placeholder='Phone number'
                        name='phone'
                        value={addressValues.phone}
                        onChange={handleInputs} />
                </div>
                <div className="input-box">
                    <label htmlFor="">EMAIL ADDRESS</label>
                    <input 
                        type="text"
                        placeholder='Email address' 
                        name='email'
                        value={addressValues.email}
                        onChange={handleInputs}/>
                </div>
            </div>
            <div className="contact-info">
                <h3>Shipping Address</h3>
                <div className="input-box">
                    <label htmlFor="">STREET ADDRESS*</label>
                    <input 
                        type="text"
                        placeholder='Street address' 
                        name='address'
                        value={addressValues.address}
                        onChange={handleInputs}/>
                </div>
                <div className="input-box">
                    <label htmlFor="">COUNTRY*</label>
                    <input 
                        type="text"
                        placeholder='Country'
                        name='country'
                        value={addressValues.country}
                        onChange={handleInputs} />
                </div>
                <div className="input-box">
                    <label htmlFor="">CITY/TOWN*</label>
                    <input 
                        type="text"
                        placeholder='City' 
                        name='city'
                        value={addressValues.city}
                        onChange={handleInputs}/>
                </div>
                <div className="names">
                    <div className="input-box">
                        <label htmlFor="">STATE</label>
                        <input 
                            type="text"
                            placeholder='State' 
                            name='state'
                            value={addressValues.state}
                            onChange={handleInputs}/>
                    </div>
                    <div className="input-box">
                        <label htmlFor="">ZIP CODE</label>
                        <input 
                            type="text" 
                            placeholder='Pin Code'
                            name='pincode'
                            value={addressValues.pincode}
                            onChange={handleInputs}/>
                    </div>
                </div>
                <div className="radioo">
                        <input type="checkbox" name="" id="different" />
                        <label htmlFor="different">Use a different billing address (optional)</label>
                    </div>
            </div>
            <div className="contact-info">
                <h3>Shipping Address</h3>
                <div className="pay-methods">
                    <div className="credit">
                        <input type="radio" name="payment" id="credit" />
                        <label htmlFor="credit">Pay by Card Credit</label>
                    </div>
                    <div className="credit">
                        <input type="radio" name="payment" id="paypal" />
                        <label htmlFor="credit">Paypal</label>
                    </div>
                </div>
                <div className="input-box">
                    <label htmlFor="">CARD NUMBER</label>
                    <input 
                        type="text"
                        placeholder='1234 1234 1234' />
                </div>
                <div className="names">
                    <div className="input-box">
                        <label htmlFor="">EXPIRATION DATE</label>
                        <input 
                            type="text"
                            placeholder='MM/YY' />
                    </div>
                    <div className="input-box">
                        <label htmlFor="">CVC</label>
                        <input 
                            type="text" 
                            placeholder='CVC code'/>
                    </div>
                </div>
            </div>
            <button 
                className='place'
                onClick={()=>{handleManageAddress();}}
                >Add Address
            </button>
            <button 
                className='place'
                onClick={()=>{handleInitiatePaypalPayment();}}
                >{
                    isPaymentStart? 'Processing Payment..':'Place Order'
                }
            </button>
           
        </div>
        <div className="right">
            <h3>Order Summary</h3>
            <div className="product-container">
                {
                    cartItem.map((item,index) => 
                        (
                        <div key={index} className="cartitem">
                            <img src={item.image} alt={item.title} />
                            <div className="product-contents">
                                <div className="details-left">
                                    <h4>{item.title}</h4>
                                    <p>color{selectedColor}</p>
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
                                </div>
                            </div>
                            <p>${(item.saleprice * item.quantity).toFixed(2)}</p>
                        </div>
                        )
                    )
                }
            </div>
            <div className="summary-bottom">
                <div className="summary-subtotal">
                    <h4>Shipping</h4>
                    <p>{shippingCost}</p>
                </div>
                <div className="summary-subtotal">
                    <h4>SubTotal</h4>
                    <p>{subTotalAmount}</p>
                </div>
                <div className="summary-total">
                    <h4>Total</h4>
                    <p>{TotalAmount}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckOutDetails