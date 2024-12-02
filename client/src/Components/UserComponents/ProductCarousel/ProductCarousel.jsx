import React, { useContext, useEffect } from 'react'
import '../ProductCarousel/ProductCarousel.css'
import RightArrow from '../../../assets/HomeCategoryStatic/arrow-right.png'
import StarIcon from '../../../assets/Rating/Star Icon.png'
import UserProductTile from '../UserProductTile/UserProductTile'
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts, fetchProductDetails } from '../../../redux/shopProduct-slice'
import { useNavigate } from 'react-router-dom'


function ProductCarousel() {
    const dispatch = useDispatch()
 
    const {productList}=useSelector(state=>state.shopProducts)
    // const {productDetails}=useSelector(state=>state.shopProducts)
    //fetch list of products
    useEffect(() => {
       dispatch(fetchAllFilteredProducts())
    }, [dispatch])
    console.log(productList);

    const navigate=useNavigate()
    function handleGetProductDetails(getCurrentProductId){
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId))
        navigate('/user/product')
    }
    
    
  return (
    <div className='ProductCarousel'>
        <div className="productcarousel-head">
            <h2>
                New <br/>
                Arrivals
            </h2>
            <button>
                More Products
                <img src={RightArrow} alt="right-arrow" />
            </button>
        </div>
        <div className="productlist-scroll">
            <div className="productlist">
                {/* <div className="product">
                    <div className="imagecard">
                        <div className="badges">
                            <h3>NEW</h3>
                            <p>-50%</p>
                        </div>
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
                            Loveseat Sofa
                        </h3>
                        <div className="price">
                            <p className='sale-price'>$199.00</p>
                            <p className='strike-price'>$400.00</p>
                        </div>
                    </div>
                </div> */}
            {
                productList && productList.length>0 ?
                productList.map((productItem)=><UserProductTile product={productItem} handleGetProductDetails={handleGetProductDetails}/>): null
            }
                
            </div>
        </div>
    </div>
  )
}

export default ProductCarousel