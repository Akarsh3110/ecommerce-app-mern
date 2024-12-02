const Order=require('../../models/order.model')
const Product=require('../../models/product.model')
const ProductReview=require('../../models/review.model')


const addProductReview=async(req,res)=>{
    try {
        const {
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue
        }=req.body;

        const order=await Order.findOne({
            userId,
            "cartItems.productId":productId,
            orderStatus:'confirmed'
        })

        if(!order){
            return res.status(403).json({
                success:false,
                message:'You need to purchase the product to review it'
            })
        }

        const checkExistingReview=await ProductReview.findOne({productId,userId});
        if(checkExistingReview){
            return res.status(400).json({
                success:false,
                message:'You are already Reviewed This product'
            })
        }

        const newReview=new ProductReview({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue
        })

        await newReview.save();

        const reviews=await ProductReview.find({productId});
        const totalReviewsLength=reviews.length;
        const averageReview=reviews.reduce((sum,reviewItem)=>sum+reviewItem.reviewValue,0)/totalReviewsLength;

        await Product.findByIdAndUpdate(productId,{averageReview});
        res.status(201).json({
            success:true,
            data:newReview
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            succsess:true,
            message:'Some Error Occurred'
        })
    }
}

const getProductReviews=async(req,res)=>{
    try {
        const {productId}=req.params;
        const reviews=await ProductReview.find({productId});
        res.status(200).json({
            success:true,
            data:reviews
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            succsess:true,
            message:'Some Error Occurred'
        })
    }
}

module.exports={addProductReview,getProductReviews}