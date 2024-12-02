import React, { useContext, useEffect, useState } from 'react'
import '../ProductDetails/ProductDetails.css'
// import StarIcon from '../../../assets/Rating/Star Icon.png'
import ChevronRight from '../../../assets/SimpleIcons/chevron-right.png'
import FavIcon from '../../../assets/SimpleIcons/love.png'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, fetchCartItems } from '../../../redux/shopCart-slice'
import { toast } from "react-toastify";
import { EditFormContext } from '../../../Contexts/Editform'
import StarRating from '../../Common/StarRating/StarRating'
import { addReview, getReviews } from '../../../redux/review-slice'

function ProductDetails({}) {
    const {cartItems}=useSelector(state=>state.shopCart)
    const {productDetails}=useSelector(state=>state.shopProducts)
    console.log(productDetails);
    // const [selectedColor, setSelectedColor] = useState(null);
    const {reviews}=useSelector(state=>state.shopReview)
    const [reviewMsg,setReviewMsg]=useState('');
    const [rating,setRating]=useState(0);
    const{selectedColor,setSelectedColor}=useContext(EditFormContext)
    const handleColorClick = (color) => {
        setSelectedColor(color); // Update the selected color
        console.log('Selected Color:', color); // Log the selected color
      };

      const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      };

      const {user}=useSelector(state=>state.auth)
      const dispatch=useDispatch()
      
      const handleAddtoCart=(getCurrentProductId,getTotalStock)=>{
        console.log(cartItems);
        
        console.log(getCurrentProductId);
        console.log('User ID:', user?.id);
        let getCartItems=cartItems.items || [];

        if(getCartItems.length){
            const indexOfCurrentItem=getCartItems.findIndex(item=>item.productId===getCurrentProductId);
            if(indexOfCurrentItem>-1){
                const getQuantity=getCartItems[indexOfCurrentItem].quantity;
                if(getQuantity +1 > getTotalStock){
                    toast.warning(`Only ${getQuantity} quantity can be added for this item`,toastOptions)
                    return;
                }
            }

            
        }

        dispatch(addToCart({userId:user?.id, productId: getCurrentProductId ,quantity:1}))
        .then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchCartItems(user?.id));
                toast.success(data?.payload?.message,toastOptions)
            }
        })
      }

      function handleRatingChange(getRating) {
        setRating(getRating)
      }
      
      function handleAddReview() {
        dispatch(addReview({
            productId:productDetails?._id,
            userId:user?.id,
            userName:user?.name,
            reviewMessage:reviewMsg,
            reviewValue:rating
        })).then(data=>{
            console.log(data);
            setReviewMsg('')
            setRating(0)
            if(data?.payload?.success){
                dispatch(getReviews(productDetails?._id));
                toast.success('Review Added Succsefully',toastOptions)
            }
        })
      }

      useEffect(() => {
        if(productDetails!==null){
            dispatch(getReviews(productDetails?._id));
        }
      }, [productDetails,dispatch])
      console.log(reviews);
      
      const averageReview=reviews && reviews.length>0?
      reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/reviews.length:0

  return (
    <div className='ProductDetails'>
        <div className="path">
            <p> 
                Home
                <img src={ChevronRight} alt="right" />
            </p>
            <p> 
                Shop
                <img src={ChevronRight} alt="right" />
            </p>
            <p> 
                Product
                <img src={ChevronRight} alt="right" />
            </p>
        </div>
        <div className="product-details-conatiner">
            <div className="image-container">
                <img 
                src={productDetails?.image} 
                alt={productDetails?.title} 
                />
            </div>
            <div className="details-container">
                <div className="top-details">
                    <div className="rating">
                        <div className="stars">
                            <StarRating rating={averageReview}/>
                        </div>
                        
                        <p>({averageReview.toFixed(2)}) Reviews</p>
                    </div>
                    <h3>{productDetails?.title}</h3>
                    <p className='description'>{productDetails?.description}</p>
                    <div className="prices">
                        <h4>${productDetails?.saleprice}</h4>
                        <p>${productDetails?.realprice}</p>
                    </div>
                </div>
                <div className="middle-details">
                    <div className="measurement">
                        <p className='label'>measurement</p>
                        <p className='measure'>{productDetails?.measurement}</p>
                    </div>
                    <div className="colors">
                        <div className="colorlabel">
                            <p>Choose color</p>
                            <img src={ChevronRight} alt="chevron-right" />
                        </div>
                        <p className='color'>{selectedColor?selectedColor:'Select color of Your choice'}</p>
                        <div className="colorselection">
                            {/* <div className="color-round">

                            </div> */}
                            {productDetails?.colors.map((color, index) => (
                                <div
                                key={index}
                                onClick={() => handleColorClick(color)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius:'50%',
                                    backgroundColor: color, // Set the background color dynamically
                                    // border: '1px solid #000',
                                    border:selectedColor === color ? '3px solid black' : '1px solid #000',
                                    cursor:'pointer',
                                }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="detail-buttons">
                    <div className="button-top">
                        <div className="count-buttons">
                            <button className='minus'>-</button>
                            <p>1</p>
                            <button className='plus'>+</button>
                        </div>
                        <button className='wishlist'>
                            <img src={FavIcon} alt="like" />
                            <p>Wishlist</p>
                        </button>
                    </div>
                    <button 
                        onClick={()=>handleAddtoCart(productDetails?._id,productDetails?.stock)} 
                        className='addcart'
                        disabled={productDetails?.stock === 0}>Add To Cart</button>
                </div>
                <div className="small-info">
                    <div className="category-details">
                        <p className='category-label'> SKU</p>
                        <p className='category-value'>1117</p>
                    </div>
                    <div className="category-details">
                        <p className='category-label'> CATEGORIES</p>
                        <p className='category-value'>{productDetails?.category}</p>
                    </div>
                </div>
                <div className="additional-details">
                    <details>
                        <summary>
                            Additional Info 
                            <img className='arrow'src={ChevronRight} alt="down" />
                        </summary>
                        <h4>Details</h4>
                        <p>You can use the removable tray for serving. The design makes it easy to put the tray back after use since you place it directly on the table frame without having to fit it into any holes.</p>
                    </details>
                    <details>
                        <summary>
                            Add Review 
                            <img className='arrow'src={ChevronRight} alt="down" />
                        </summary>
                        <div className="reviewdiv">
                            <label htmlFor="">Write a Review:</label>
                            <div className="rating-input">
                                <StarRating rating={rating} handleRatingChange={handleRatingChange}/>
                            </div>
                            <input type="text" 
                                    placeholder='Add Review message'
                                    name='reviewMsg'
                                    value={reviewMsg}
                                    onChange={(event)=>setReviewMsg(event.target.value)}/>
                            <button 
                                disabled={reviewMsg.trim()===''}
                                onClick={handleAddReview}>
                                    Submit
                            </button>
                        </div>
                    </details>
                    <details>
                        <summary>
                            Reviews 
                            <img className='arrow'src={ChevronRight} alt="down" />
                        </summary>
                        <h4>Reviews</h4>
                        <div className="reviews">
                            {
                                reviews && reviews.length >0?
                                reviews.map((reviewItem)=>
                                <div className='review'>
                                    <div className="user-review">
                                        <div className="user-label-review">
                                            {reviewItem?.userName[0].toUpperCase()}
                                        </div>
                                        <h3>{reviewItem?.userName}</h3>
                                    </div>
                                    <div className="review-msg">
                                        <StarRating rating={reviewItem?.reviewValue}/>
                                        <p>{reviewItem?.reviewMessage}</p>
                                    </div>
                                </div>):<h2>No Reviews</h2>
                            }
                        </div>
                    </details>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails