import React from 'react'
import '../AdminProductTile/AdminProductTile.css'
import FavIcon from '../../../assets/SimpleIcons/love.png'
import { useNavigate } from 'react-router-dom';
import { useContext ,useState} from "react";
import { EditFormContext } from '../../../Contexts/Editform';

function AdminProductTile({product}) {

    const{setFormValues,formValues}=useContext(EditFormContext)
    const{setcurrentEditedId,currentEditedId}=useContext(EditFormContext)
 
 
    console.log(formValues);
    console.log(setFormValues);
    

    const navigate=useNavigate()
    
    const handleEdit = () => {
        navigate('/admin/addproduct',{ state: { id: product._id }})
        setcurrentEditedId(product._id);
        setFormValues({
          image: product.image,
          title: product.title,
          description: product.description,
          saleprice: product.saleprice,
          realprice: product.realprice,
          measurement: product.measurement,
          colors: product.colors,
          category: product.category,
          stock: product.stock,
          label: product.label
        });
      };

    

  return (
    <div className='AdminProductTile'>
        <img 
        src={product?.image} 
        alt={product?.title}
        className='product-image'
        />
        <div className="product-details">
            <div className="product-info">
                <div className="top-part">
                    <h2>{product.title}</h2>
                    <button><img src={FavIcon} alt="like" /></button>
                </div>
                <div className="prices">
                    <p className='sale'>${product.saleprice}</p>
                    <p className='real'>${product.realprice}</p>
                </div>
            </div>
            <button onClick={handleEdit}>Edit</button>
        </div>
    </div>
  )
}

export default AdminProductTile