import React, { useEffect, useState } from 'react'
import '../AdminOrders/AdminOrders.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '../../../redux/adminOrder-slice';
import { toast } from 'react-toastify';

function AdminOrders() {
    const {orderList,orderDetails}=useSelector(state=>state.adminOrder);
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getAllOrdersForAdmin())
    }, [dispatch])
    console.log('Admin OrderLIst',orderList);
    const [ordervalues, setOrderValues] = useState({
       orderStatus:''
      })
      console.log(ordervalues);
    const handleInputs=(e)=>{
        setOrderValues({
          ...ordervalues,
          [e.target.name]:e.target.value
        })
      }

      const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      };

      function handleUpdateStatus(currentOrder){
        // e.preventDefault();
        dispatch(updateOrderStatus({id:currentOrder?._id , orderStatus:ordervalues.orderStatus})).then(data=>{
            console.log(data,'1234');
            console.log(currentOrder?._id,'iddd');
            console.log(ordervalues.orderStatus);
            if(data?.payload?.success){
                dispatch(getOrderDetailsForAdmin(currentOrder?._id));
                dispatch(getAllOrdersForAdmin())
                setOrderValues('');
                toast.success('OrderStatus Updated',toastOptions)
            }
            
        })
      }
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
    <div className='AdminOrders'>
        <div className="adminorder-content">
            <h2>Order Details</h2>
            <table className='adminorder-table'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                        <th>Order Price</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList && orderList.length>0?
                        orderList.map((item, index) => (
                        <tr key={index}>
                            <td className='odid'>
                                {item._id}
                            </td>
                            <td className='odd'>
                                {item.orderDate.split('T')[0]}
                            </td>
                            <td className='ods'><h4 
                                            style={{
                                                backgroundColor: item?.orderStatus === 'confirmed' ? 'green' :
                                                item?.orderStatus === 'rejected' ? 'red' :
                                                'blue',
                                                color: 'white', // To make the text readable
                                                padding: '6px', 
                                                borderRadius: '15px'
                                            }}
                                        >{item.orderStatus}</h4></td>
                            <td className='oda'>${item.totalAmount}</td>
                            <td><button
                                    onClick={() => handleOpenDialog(item)}
                                    >Details</button></td>
                        </tr>
                    )):null}
                </tbody>
            </table>
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
                                                padding: '6px', 
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
                                    <div className="input-box">
                                        <label htmlFor="">OrderStatus</label>
                                        <input type="text" 
                                                placeholder='Status'
                                                name='orderStatus'
                                                value={ordervalues.orderStatus}
                                                onChange={handleInputs}/>
                                    </div>
                                    <button 
                                        className='status'
                                        onClick={()=>handleUpdateStatus(selectedOrder)}>Update Order Status</button>
                                    <button onClick={handleCloseDialog}>Close</button>
                                </div>
                            </div>
                        )}
        </div>
    </div>
  )
}

export default AdminOrders