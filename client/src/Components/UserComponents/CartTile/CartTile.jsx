import React, { useContext } from 'react'
import '../CartTile/CartTile.css';
import CloseGrey from '../../../assets/SimpleIcons/close-grey.png'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, updateCartQty } from '../../../redux/shopCart-slice';
import { toast } from "react-toastify";
import { EditFormContext } from '../../../Contexts/Editform';

function CartTile({cartItem}) {
  const{selectedColor,setSelectedColor}=useContext(EditFormContext)
  const {productList}=useSelector(state=>state.shopProducts)
  const {cartItems}=useSelector(state=>state.shopCart)
  const {user}=useSelector(state=>state.auth);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  const dispatch=useDispatch()
  function handleCartItemDelete(getCartItem) {
    dispatch(deleteCartItem({userId:user?.id,productId:getCartItem?.productId}))
    .then(data=>{
      if(data?.payload?.success){
        toast.success('Cart Item Deleted Succesfully',toastOptions)
      }
    })
  }

 

  function handleUpdateQty(getCartItem,typeOfAction) {
    if(typeOfAction=='plus'){
      let getCartItems=cartItems.items || [];

      if(getCartItems.length){
          const indexOfCurrentItem=getCartItems.findIndex(item=>item.productId===getCartItem?.productId);
          const getCurrentProductIndex=productList.findIndex(product=>product._id===getCartItem?.productId);
          const getTotalStock=productList[getCurrentProductIndex].stock
          if(indexOfCurrentItem>-1){
              const getQuantity=getCartItems[indexOfCurrentItem].quantity;
              if(getQuantity +1 > getTotalStock){
                  toast.warning(`Only ${getQuantity} quantity can be added for this item`,toastOptions)
                  return;
              }
          }

          
      }
    }

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

  return (
    <div className='CartTile'>
        <img src={cartItem?.image} 
          alt={cartItem?.title} 
        />
        <div className="middle">
          <h4>{cartItem.title}</h4>
          <p>Color:{selectedColor}</p>
          <div className="buttons">
            <button
              disabled={cartItem?.quantity===1} 
              onClick={()=>handleUpdateQty(cartItem,'minus')} 
              className='minus'>-</button>
            <span>{cartItem?.quantity}</span>
            <button 
              onClick={()=>handleUpdateQty(cartItem,'plus')} 
              className='plus'>+</button>
          </div>
        </div>
        <div className="end">
          <p>${(cartItem?.saleprice * cartItem?.quantity).toFixed(2)}</p>
          <img onClick={()=>handleCartItemDelete(cartItem)} src={CloseGrey} alt="close" />
        </div>
    </div>
  )
}

export default CartTile