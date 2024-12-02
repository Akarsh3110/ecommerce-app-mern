
import { Route, Routes } from 'react-router-dom';
import './App.css';





import SignIn from './Pages/SignIn/SignIn'
import SignUp from './Pages/SignUp/SignUp';
import Home from './Pages/Home/Home';
import Shop from './Pages/Shop/Shop';
import Product from './Pages/Product/Product';
import Contact from './Pages/Contact/Contact';
import Admin from './Pages/Admin/Admin';
import AdminDashboard from './Components/AdminComponents/AdminDashboard/AdminDashboard';
import AdminProduct from './Components/AdminComponents/AdminProduct/AdminProduct';
import User from './Pages/User/User';
import CheckAuth from './Components/Common/CheckAuth';
import UnAuth from './Pages/UnAuth.jsx/UnAuth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { checkAuth } from './redux/auth-slice';
import AddProduct from './Components/AdminComponents/AddProduct/AddProduct';
import { EditFormContext } from './Contexts/Editform';
import CheckOut from './Pages/CheckOut/CheckOut'
import UserAccount from './Components/UserComponents/UserAccount/UserAccount';
import UserSearch from './Components/UserComponents/UserSearch/UserSearch';
import AdminOrders from './Components/AdminComponents/AdminOrders/AdminOrders';
import PaypalReturn from './Components/UserComponents/PaypalReturn';
import Success from './Components/UserComponents/Success/Success';
import ProductStock from './Components/AdminComponents/ProductStock/ProductStock';
import AdminInbox from './Components/AdminComponents/AdminInbox/AdminInbox';

// const initialState={
//   image:null,
//   title:'',
//   description:'',
//   saleprice:'',
//   realprice:'',
//   measurement:'',
//   colors:[],
//   category:'',
//   stock:'',
//   label:'',
// };

function App() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [productDetails, setProductDetails] = useState([])
  const [formValues, setFormValues] = useState({
    image:null,
    title:'',
    description:'',
    saleprice:'',
    realprice:'',
    measurement:'',
    colors:[],
    category:'',
    stock:'',
    label:'',
  })
  const [currentEditedId, setcurrentEditedId] = useState(null)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  // const isAuthenticated=false;
  // const user=null

  const {user,isAuthenticated,isLoading}=useSelector(state=>state.auth);
  // console.log(isAuthenticated);
  
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if(isLoading) return <div>Loading</div>

  console.log('Current Context State:', {
    formValues,
    currentSelectedAddress,
    productDetails,
    shippingCost,
    selectedColor,
});

  return (
    <div className="App">
    <EditFormContext.Provider value={{formValues,setFormValues,currentEditedId, setcurrentEditedId,productDetails, setProductDetails,shippingCost, setShippingCost,selectedColor, setSelectedColor,currentSelectedAddress, setCurrentSelectedAddress}}>
      <Routes>
        <Route path='/'
           element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            </CheckAuth>
           }   
        />
        <Route path='/user' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} allowedRole="user">
             <User/>
          </CheckAuth>
         }>
          <Route path='home' element={<Home/>}/>
          <Route path='shop' element={<Shop/>}/>
          <Route path='product' element={<Product/>}/>
          <Route path='contact' element={<Contact/>}/>
          <Route path='checkout' element={<CheckOut/>}/>
          <Route path='account' element={<UserAccount/>}/>
          <Route path='paypal-return' element={<PaypalReturn/>}/>
          <Route path='payment-success' element={<Success/>}/>
          <Route path='search' element={<UserSearch/>}/>
        </Route> 
        <Route path='/signup' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <SignUp/>
          </CheckAuth>
          }/>
        <Route path='/signin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <SignIn/>
          </CheckAuth>
          
        }/>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} allowedRole="user"
>
            <Admin/>
          </CheckAuth>
        }>
        
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='products' element={<AdminProduct/>}/>
          <Route path='addproduct' element={<AddProduct/>}/>
          <Route path='favourites' element={<AdminProduct/>}/>
          <Route path='inbox' element={<AdminInbox/>}/>
          <Route path='orderlists' element={<AdminOrders/>}/>
          <Route path='productstock' element={<ProductStock/>}/>
          <Route path='settings' element={<AdminProduct/>}/>
        
        </Route>
        <Route path='/unauth-page' element={<UnAuth/>}/>
      </Routes>
    </EditFormContext.Provider> 
    </div>
  );
}

export default App;
