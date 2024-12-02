import React, { useContext, useEffect, useState } from 'react'
import './AdminProduct.css'
import PlusIcon from '../../../assets/SimpleIcons/Plus-icon.png'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AdminProductTile from '../AdminProductTile/AdminProductTile'
import { fetchAllProducts } from '../../../redux/product-slice'
import { EditFormContext } from '../../../Contexts/Editform'

function AdminProduct() {
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])
  const {productList}=useSelector(state=>state.adminProducts)
  // const productList=productList.data
  // console.log(productList.data);

  // const [currentEditedId, setcurrentEditedId] = useState(null)
  const{setcurrentEditedId,currentEditedId}=useContext(EditFormContext)
  const{setFormValues,formValues}=useContext(EditFormContext)

  function handleClick(e){
    e.preventDefault();
    setFormValues('')
    setcurrentEditedId(null)
  }
 
  
  return (
    <div className='AdminProduct'>
      <button className='addnew' onClick={handleClick}>
        <img src={PlusIcon} alt="plus-icon" />
        <Link to='/admin/addproduct'>Add New Product</Link> 
      </button>
      <div className="admin-product-contents">
        <h2>Products</h2>
        {/* <div className="banner">
          
        </div> */}
        
        <div className="product-list">
          {
            productList && productList.length > 0 ?
            productList.map((productItem)=><AdminProductTile product={productItem} currentEditedId={currentEditedId} setcurrentEditedId={setcurrentEditedId} setFormValues={setFormValues} />):null
          }
        </div>
      </div>
    </div>
  )
}

export default AdminProduct