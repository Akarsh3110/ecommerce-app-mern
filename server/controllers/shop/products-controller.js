const Product=require('../../models/product.model')

const getFilteredProducts= async(req,res)=>{
    try {
        const products=await Product.find({})
        res.status(200).json({
            success:true,
            data:products
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Error Occurred'
        })
    }
}

const getProductDetails=async(req,res)=>{
    try {
        const {id}=req.params;
        const product= await Product.findById(id);

        if(!product) return res.status(404).json({
            success:false,
            message:'Product Not Found'
        })

        res.status(200).json({
            success:true,
            data:product,
            message:'Your Product Details fetched'
        })
    } catch (err) {
        console.log(err);
        
        res.status(500).json({
            success:false,
            message:'Some Error Occurred'
        })
    }
}

module.exports={getFilteredProducts,getProductDetails}