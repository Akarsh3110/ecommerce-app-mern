// import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { capturePayment } from '../../redux/order-slice';

// function PaypalReturn() {

//     // const navigate = useNavigate();
//     const dispatch=useDispatch();
//     const location=useLocation();
//     const params=new URLSearchParams(location.search);
//     const paymentId=params.get('paymentId');
//     console.log('paymentId',paymentId);
    
//     const payerId=params.get('PayerID');
//     console.log('payId',payerId);
//     // const returnUrl = params.get('return_url');

//     useEffect(() => {
//         if(paymentId && payerId){
//             const orderId=JSON.parse(sessionStorage.getItem('currentOrderId'));

//             dispatch(capturePayment({paymentId,payerId,orderId:orderId})).then(data=>{
//                 console.log("payment CApture response",data);
                
//                 if(data?.payload?.success){
//                     sessionStorage.removeItem('currentOrderId');
//                     // navigate('/user/checkout?return_url=orderComplete');
//                     window.location.href='/user/payment-success';
//                     // navigate('/user/payment-success');
//                 }
//             })
//         }
//     }, [paymentId,payerId,dispatch])

//   return (
    
//     <div>Processing Your Payment...</div>
//   )
// }

// export default PaypalReturn