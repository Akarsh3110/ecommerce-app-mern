import React, { useContext, useEffect, useState } from 'react'
import '../CheckOutMain/CheckOutMain.css'
import CheckOutCart from './CheckOutCart/CheckOutCart';
import CheckOutDetails from './CheckOutDetails/CheckOutDetails';
import OrderComplete from './OrderComplete/OrderComplete';
import { EditFormContext } from '../../../Contexts/Editform';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { capturePayment } from '../../../redux/order-slice';

function CheckOutMain() {
    const{currentSelectedAddress,setCurrentSelectedAddress}=useContext(EditFormContext)
    console.log('kkkia',currentSelectedAddress);
    
    // Track the active tab and completion status
    const [activeTab, setActiveTab] = useState(0);
    const location = useLocation(); // Get location object from React Router
    const [completedTabs, setCompletedTabs] = useState([]);


    // Handle Tab Completion
    const completeCurrentTab = () => {
        if (!completedTabs.includes(activeTab)) {
            setCompletedTabs([...completedTabs, activeTab]);
        }

        // Move to the next tab
        if (activeTab < tabs.length - 1) {
            setActiveTab(activeTab + 1);
        }
    };
    // // Tabs Data
    // const tabs = [
    //     {label:"Shopping Cart",component:<CheckOutCart tabs={tabs} completeCurrentTab={completeCurrentTab} activeTab={activeTab}/>}, 
    //     {label:"Checkout Details" ,component:<CheckOutCart/>}, 
    //     {label:"Order Complete" ,component:<CheckOutCart/>}
    // ];

    const tabs = [
        { label: "Shopping Cart" },
        { label: "Checkout Details" },
        { label: "Order Complete" },
    ];

    const [currentOrderId,setCurrentOrderId]=useState(null)

    const navigate = useNavigate();
    const dispatch=useDispatch();
    // const location=useLocation();
    const params=new URLSearchParams(location.search);
    const paymentId=params.get('paymentId');
    const payerId=params.get('PayerID');
    const returnUrl = params.get('return_url');

    useEffect(() => {
        if(paymentId && payerId){
            const orderId=JSON.parse(sessionStorage.getItem('currentOrderId'));
            if(orderId){
                setCurrentOrderId(orderId);
                console.log("After setting currentOrderId:", orderId);
                dispatch(capturePayment({paymentId,payerId,orderId})).then(data=>{
                console.log("payment CApture response",data);
                
                if(data?.payload?.success){
                    
                    sessionStorage.removeItem('currentOrderId');
                    navigate('/user/checkout?return_url=orderComplete');
                    // window.location.href='/user/checkout?return_url=orderComplete';
                }
            })
            }
            
        }
    }, [paymentId,payerId,dispatch])
    // Tab components
    const tabComponents = [
        <CheckOutCart tabs={tabs} completeCurrentTab={completeCurrentTab} activeTab={activeTab} />,
        <CheckOutDetails tabs={tabs} completeCurrentTab={completeCurrentTab} activeTab={activeTab} currentSelectedAddress={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress}/>,
        <OrderComplete tabs={tabs} currentOrderId={currentOrderId} />,
    ];

    
    useEffect(() => {
        if (returnUrl) {
            if (returnUrl.includes('checkOutDetails')) {
                setActiveTab(1);

                // Simulate cart clearing
                setTimeout(() => {
                    console.log('Cart cleared');
                    window.location.href = '/user/checkout?return_url=orderComplete';
                }, 1000);
            } else if (returnUrl.includes('orderComplete')) {
                setActiveTab(2);
            }
        }
    }, [returnUrl]);
    
        

  return (
    <div className='CheckOutMain'>
        <div className="head">
            <h3>Cart</h3>
            <ul className="tab-list">
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        className={`tab-item ${activeTab === index ? "active" : ""} ${
                            completedTabs.includes(index) ? "completed" : ""
                        }`}
                        onClick={() => {
                            if (index <= activeTab) setActiveTab(index); // Allow navigation to active or previous tabs
                        }}
                        style={{ pointerEvents: index <= activeTab ? "auto" : "none" }} // Disable future tabs
                    >
                        <div className="tab-number">
                            {completedTabs.includes(index) ? "✔" : index + 1}
                        </div>
                        <span className="tab-label">{tab.label}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="tab-content">
                {/* Render the active tab's content component */}
                {/* {tabs[activeTab].component} */}
                {tabComponents[activeTab]}
                {/* <button onClick={completeCurrentTab}>
                    {activeTab < tabs.length - 1 ? "Next" : "Finish"}
                </button> */}
            </div>
    </div>
  )
}

export default CheckOutMain