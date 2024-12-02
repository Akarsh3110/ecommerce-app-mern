import React from 'react'
import '../UserProductTile/UserProductTile.css'
import StarIcon from '../../../assets/Rating/Star Icon.png'
// import Sofa from '../../../assets/NewArrival/Arrival1.png'

function UserProductTile({product,handleGetProductDetails}) {
  return (
    <div onClick={()=>handleGetProductDetails(product?._id)} className='UserProductTile'>
        <div className="imagecard">
            <img src={product?.image} 
                alt={product?.title} 
            />
            {
                product?.stock===0?
                <div className="badges">
                    <h3>{product?.label}</h3>
                    <p className="bg-red">Out of Stock</p>
                </div> :
                product?.stock<10?
                <div className="badges">
                    <h3>{product?.label}</h3>
                    <p className="bg-red">{`Only ${product?.stock} items left`}</p>
                </div> :
                product?.saleprice>0?
                <div className="badges">
                    <h3>{product?.label}</h3>
                    <p>OFF</p>
                </div> :null
            }
            
        </div>
        <div className="cardcontent">
            <div className="stars">
                <img src={StarIcon} alt="star" />
                <img src={StarIcon} alt="star" />
                <img src={StarIcon} alt="star" />
                <img src={StarIcon} alt="star" />
                <img src={StarIcon} alt="star" />
            </div>
            <h3 className="product-title">
                {product?.title}
            </h3>
            <div className="price">
                <p className='sale-price'>${product?.saleprice}</p>
                <p className='strike-price'>${product?.realprice}</p>
            </div>
        </div>                             
    </div>
  )
}

export default UserProductTile