const {imageUploadUtils}=require('../../helpers/cloudinary')
const Product=require('../../models/product.model')



const handleImageUpload=async(req,res)=>{
    try {
        const b64=Buffer.from(req.file.buffer).toString('base64');
        const url='data:'+req.file.mimetype +";base64,"+b64;
        const result=await imageUploadUtils(url);

        res.json({
            success:true,
            result
        })
    } catch (err) {
        console.log(err);
        res.json({
            success:false,
            message:'Error Occurred'
        })
        
    }
}

//Add  a new Product

const addProduct=async(req,res)=>{
    try {
        const {
            image,
            title,
            description,
            saleprice,
            realprice,
            measurement,
            colors,
            category,
            stock,
            label,
        }=req.body;
        const newlyCreatedProduct=new Product({
            image,
            title,
            description,
            saleprice,
            realprice,
            measurement,
            colors,
            category,
            stock,
            label
        })

        await newlyCreatedProduct.save()
        res.status(201).json({
            success:true,
            data:newlyCreatedProduct,
            message:'Product Added'
        })
        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Error Occurred'
        })
    }
}



//Fetch all products

const fetchAllProducts=async(req,res)=>{
    try {
        const listOfProducts=await Product.find({});
        res.status(200).json({
            success:true,
            data:listOfProducts,
            message:'ProductList Fetched'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Error Occurred'
        })
    }
}


//Edit a Product

const editProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const {
            image,
            title,
            description,
            saleprice,
            realprice,
            measurement,
            colors,
            category,
            stock,
            label,
        }=req.body;
        const findProduct=await Product.findById(id);
        if(!findProduct) return res.status(404).json({
            success:true,
            message:'Product Not Found'
        })

        findProduct.title=title || findProduct.title;
        findProduct.description=description || findProduct.description;
        findProduct.saleprice=saleprice || findProduct.saleprice;
        findProduct.realprice=realprice || findProduct.realprice;
        findProduct.measurement=measurement || findProduct.measurement;
        findProduct.colors=colors || findProduct.colors;
        findProduct.category=category || findProduct.category;
        findProduct.stock=stock || findProduct.stock;
        findProduct.label=label || findProduct.label;
        findProduct.image=image || findProduct.image;

        await findProduct.save();
        res.status(200).json({
            success:true,
            data:findProduct,
            message:'Product Edited Successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Error Occurred'
        })
    }
}

//Delete a product

const deleteProduct=async(req,res)=>{
    try {
        const {id}=req.params;
        const productDelete= await Product.findByIdAndDelete(id);
        if(!productDelete) return res.status(404).json({
            success:true,
            message:'Product Not Found'
        })

        res.status(200).json({
            success:true,
            message:'Product Deleted Succesfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Error Occurred'
        })
    }
}


module.exports={handleImageUpload,addProduct,fetchAllProducts,editProduct,deleteProduct}