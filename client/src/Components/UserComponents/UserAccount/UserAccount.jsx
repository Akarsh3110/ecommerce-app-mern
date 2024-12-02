import React, { useContext, useEffect, useState } from 'react'
import '../UserAccount/UserAccount.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAddress, fetchAllAddresses } from '../../../redux/address-slice';
import { toast } from 'react-toastify';
import { EditFormContext } from '../../../Contexts/Editform';
import { getAllOrdersByUserId } from '../../../redux/order-slice';
function UserAccount() {
    const {user}=useSelector(state=>state.auth);
    const {addressList}=useSelector(state=>state.shopAddress)
    const {orderList}=useSelector(state=>state.shopOrder)
    const{currentSelectedAddress,setCurrentSelectedAddress}=useContext(EditFormContext)
    // const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
    const dispatch=useDispatch()
    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id))
    }, [dispatch])
    console.log("AddressList",addressList);

    const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      };

    function handleDeleteAddress(getCurrentAddress) {
        console.log(getCurrentAddress);
        dispatch(deleteAddress({userId:user?.id,addressId:getCurrentAddress._id}))
        .then(data=>{
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id));
                toast.success("Address Deleted Succesfully",toastOptions)
            }
        })
    }
    
    const handleSelectAddress = (address) => {
        setCurrentSelectedAddress(address);
        console.log('Selected Address:', address);
    };
    console.log(currentSelectedAddress);
    // useEffect(() => {
    //     if (currentSelectedAddress) {
    //       setCurrentSelectedAddress(currentSelectedAddress);
    //     }
    //   }, [currentSelectedAddress]); 
      
    
    useEffect(() => {
       dispatch(getAllOrdersByUserId(user?.id)) 
    }, [dispatch])


    console.log('OOrderList',orderList);
    
    const [selectedOrder, setSelectedOrder] = useState(null); // For storing the selected order details
    const [isDialogOpen, setIsDialogOpen] = useState(false); // For managing dialog visibility

    const handleOpenDialog = (order) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedOrder(null);
    };

  return (
    <div className='UserAccount'>
        <div className="user-container">
            <h2>Hello {user?.name}!</h2>
            <div className="main-container">
                <div className="main-left">
                    <div className="account-details">
                        <div className="rounded-label">
                            {user?.name[0].toUpperCase()}
                        </div>
                        <div className="user-account-info">
                            <h3>{user?.name}</h3>
                            <h4>{user?.email}</h4>
                            <p>{user?.role}</p>
                        </div>
                    </div>
                    <div className="address-containers">
                        {
                            addressList && addressList.length > 0 ?
                            addressList.map((singleAddressItem,index) => (
                                <div key={index} 
                                    className="single-address"
                                    onClick={()=>handleSelectAddress(singleAddressItem)}>
                                    <h3>Name:{singleAddressItem.name}</h3>
                                    <h4>Email:{singleAddressItem.email}</h4>
                                    <h4>ph:{singleAddressItem.phone}</h4>
                                    <h4>Address:{singleAddressItem.address}</h4>
                                    <h4>City:{singleAddressItem.city}</h4>
                                    <h4>State:{singleAddressItem.state}</h4>
                                    <h4>Country:{singleAddressItem.country}</h4>
                                    <h4>pin-code:{singleAddressItem.pincode}</h4>
                                    <button onClick={()=>handleDeleteAddress(singleAddressItem)}>Delete</button>
                                </div>
                            )):null
                        }
                    </div>
                </div>
                <div className="main-right">
                    <h2>Order Summary</h2>
                    <div className="order-container">
                        {
                            orderList && orderList.length >0 ?
                            orderList.map((singleOrder,index) => (
                                <div 
                                    key={index}
                                    className="single-order">
                                        <h4>OrderId:{singleOrder?._id}</h4>
                                        <h4>OrderDate:{singleOrder?.orderDate.split('T')[0]}</h4>
                                        {/* <h4>OrderStatus:{singleOrder?.orderStatus}</h4> */}
                                        <h4 
                                            style={{
                                                backgroundColor:  singleOrder?.orderStatus === 'confirmed' ? 'green' :
                                                singleOrder?.orderStatus === 'rejected' ? 'red' :
                                                'blue',
                                                color: 'white', // To make the text readable
                                                padding: '5px', 
                                                borderRadius: '15px'
                                            }}
                                        >
                                            OrderStatus: {singleOrder?.orderStatus}
                                        </h4>
                                        <h4>OrderPrice:{singleOrder?.totalAmount}</h4>
                                        <button
                                            onClick={() => handleOpenDialog(singleOrder)}
                                            >Details</button>
                                </div>
                            )):null
                        }
                        {isDialogOpen && (
                            <div className="dialog-overlay">
                                <div className="dialog-box">
                                    <h3>ORDER DETAILS</h3>
                                    <p><strong>OrderId:</strong> {selectedOrder?._id}</p>
                                    <p><strong>OrderDate:</strong> {selectedOrder?.orderDate.split('T')[0]}</p>
                                    <p><strong>OrderStatus:</strong> 
                                    <h4 style={{
                                                backgroundColor: selectedOrder?.orderStatus === 'confirmed' ? 'green' :
                                                selectedOrder?.orderStatus === 'rejected' ? 'red' :
                                                'blue',
                                                color: 'white', // To make the text readable
                                                padding: '3px', 
                                                borderRadius: '15px'
                                            }}>{selectedOrder?.orderStatus}</h4></p>
                                    <p><strong>Total Amount:</strong> ${selectedOrder?.totalAmount}</p>
                                    <h3><strong>ITEMS:</strong></h3>
                                    <ul>
                                        {selectedOrder?.cartItems.map((item, idx) => (
                                            <li key={idx}>
                                                {item.title} - {item.quantity} x ${item.price}
                                            </li>
                                        ))}
                                    </ul>
                                    <h3><strong>ADDRESS INFO:</strong></h3>
                                    <p><strong>Name:</strong> {selectedOrder?.address?.name}</p>
                                    <p><strong>Address:</strong> {selectedOrder?.address?.address}</p>
                                    <p><strong>City:</strong> {selectedOrder?.address?.city}</p>
                                    <p><strong>Pincode:</strong> {selectedOrder?.address?.pincode}</p>
                                    <p><strong>Phone:</strong> {selectedOrder?.address?.phone}</p>
                                    <button onClick={handleCloseDialog}>Close</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserAccount