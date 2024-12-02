const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema(
    {
    image:String,
    title:String,
    description:String,
    saleprice:Number,
    realprice:Number,
    measurement:String,
    colors:Array,
    category:String,
    stock:Number,
    label:String,
},
{timestamps:true}
)

module.exports=mongoose.model('Product',ProductSchema)