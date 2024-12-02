import React, { useEffect } from 'react'
import './AdminDashboard.css'
import TotalUserIcon from '../../../assets/DashIcons/User.png'
import Upp from '../../../assets/DashIcons/upp.png'
import OrderIcon from '../../../assets/DashIcons/Order.png'
import SalesIcon from '../../../assets/DashIcons/Sales.png'
import PendingIcon from '../../../assets/DashIcons/Pending.png'
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersForAdmin } from '../../../redux/adminOrder-slice';
import { getAllUsersList } from '../../../redux/auth-slice'


function AdminDashboard() {
  // const dispatch=useDispatch()
  const {usersList}=useSelector(state=>state.auth)
  const{orderList}=useSelector(state=>state.adminOrder)
  const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getAllOrdersForAdmin())
        // dispatch(getAllUsersList())
    }, [dispatch])
  console.log('lu',orderList)

  // useEffect(() => {
  //   dispatch(getAllUsersList())
  // }, [dispatch])
  console.log('lumm',usersList)

  const confirmedOrders = orderList.filter(order => order.orderStatus === 'confirmed');
  const pendingOrders = orderList.filter(order => order.orderStatus === 'pending');

  return (
    <div className='AdminDashboard'>
      <div className="admin-contents">
        <h2>Dashborad</h2>
        <div className="dashboard-cards">
          <div className="card">
            <div className="card-top">
              <div className="card-top-left">
                <p>Total User</p>
                <h3>{usersList.length}</h3>
              </div>
              <div className="card-top-right">
                <img src={TotalUserIcon} alt='TotalUserIcon' />
              </div>
            </div>
            <div className="card-bottom">
              <img src={Upp} alt="upp" />
              <p> <span>8.5%</span> Up from yesterday</p>
            </div>
          </div>
          <div className="card">
          <div className="card-top">
              <div className="card-top-left">
                <p>Total Order</p>
                <h3>{confirmedOrders.length}</h3>
              </div>
              <div className="card-top-right">
                <img src={OrderIcon} alt='OrderIcon' />
              </div>
            </div>
            <div className="card-bottom">
              <img src={Upp} alt="upp" />
              <p> <span>1.3%</span> Up from yesterday</p>
            </div>
          </div>
          <div className="card">
            <div className="card-top">
                <div className="card-top-left">
                  <p>Total Sales</p>
                  <h3>40,342</h3>
                </div>
                <div className="card-top-right">
                  <img src={SalesIcon} alt='SalesIcon' />
                </div>
              </div>
              <div className="card-bottom">
                <img src={Upp} alt="upp" />
                <p> <span>4.3%</span> Up from yesterday</p>
              </div>
          </div>
          <div className="card">
            <div className="card-top">
                <div className="card-top-left">
                  <p>Pending Orders</p>
                  <h3>{pendingOrders.length}</h3>
                </div>
                <div className="card-top-right">
                  <img src={PendingIcon} alt='PendingIcon' />
                </div>
              </div>
              <div className="card-bottom">
                <img src={Upp} alt="upp" />
                <p> <span>1.8%</span> Up from yesterday</p>
              </div>
            </div>
        </div>
        
      </div>

    </div>
  )
}

export default AdminDashboard