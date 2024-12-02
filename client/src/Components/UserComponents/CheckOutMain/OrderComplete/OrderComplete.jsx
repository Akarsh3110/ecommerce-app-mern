import React, { useEffect } from 'react'
import '../OrderComplete/OrderComplete.css'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import {  getAllOrdersByUserId, getOrderDetails } from '../../../../redux/order-slice';
function OrderComplete({currentOrderId}) {
    const navigate=useNavigate()
    
    const {user}=useSelector(state=>state.auth)
    console.log(user,'uuu')
    const {orderList,orderDetail}=useSelector(state=>state.shopOrder)
    // console.log(orderList,'OrderrrList');
    console.log(orderDetail,'OOOO');
    
    // const currentOrder=orderList && orderList.length >0 ? orderList[orderList.length - 1] : null;
    // const currentCartItem=orderDetail&& orderDetail.length>0?orderDetail.cartItems:null
    // console.log('currr',currentOrder);
    // console.log('curru',currentCartItem);
    // const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    // console.log('oreee',orderId);
    
    const dispatch =useDispatch()
    console.log(currentOrderId,'oom');
    
    useEffect(() => {
        dispatch(getOrderDetails(currentOrderId))
    }, [dispatch,currentOrderId])
    console.log(orderDetail,'OOOO');

   
    
   
  return (
    <div className='OrderComplete'>
        <div className="success-box">
            <div className="success-title">
                <h3>Thank you!🎉</h3>
                <h2>Your order has been received</h2>
            </div>
            <div className="success-items">
                {
                    orderDetail?.cartItems && orderDetail?.cartItems.length>0?
                    orderDetail?.cartItems.map((item) =>(
                        <div className="itemm">
                            <div className="roundy-label">{item.quantity}</div>
                            <img src={item.image} alt={item.title} />
                        </div>
                        
                    )):null
                }
            </div>
            <div className="success-details">
                <div className="success-details-left">
                    <p>Order Code </p>
                    <p>Date </p>
                    <p>Total</p>
                    <p>Payment Method</p>
                </div>
                <div className="success-details-right">
                    <p> {orderDetail?._id}</p>
                    <p> {orderDetail?.orderDate.split('T')[0]}</p>
                    <p> {orderDetail?.totalAmount.toFixed(2)}</p>
                    <p> {orderDetail?.paymentMethod}</p>
                </div>
                
            </div>
            <button onClick={()=>navigate('/user/account')}>Purchase History</button>
        </div>
    </div>
  )
}

export default OrderComplete