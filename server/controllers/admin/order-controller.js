const Order=require('../../models/order.model')

const getAllOrdersOfAllUsers=async(req,res)=>{
    try {
        
        const orders=await Order.find({});

        if(!orders.length){
            return res.status(404).json({
                success:false,
                message:'No orders Found'
            })
        }

        res.status(200).json({
            success:true,
            data:orders,
            message:'Order Details by User fetched'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Some error occurred'
        })
    }
}

const getOrderDetailsForAdmin=async(req,res)=>{
    try {
        const {id}=req.params;

        const order=await Order.findById(id);

        if(!order){
            return res.status(404).json({
                success:false,
                message:' order not Found'
            })
        }

        res.status(200).json({
            success:true,
            data:order,
            message:'Order Details by OrderId is fetched'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Some error occurred'
        })
    }
}

const updateOrderStatus=async(req,res)=>{
    try {
        const {id}=req.params;
        const {orderStatus}=req.body;

        const order=await Order.findById(id);
        if(!order){
            return res.status(404).json({
                success:false,
                message:' order not Found'
            })
        }
        await Order.findByIdAndUpdate(id,{orderStatus})
        res.status(200).json({
            success:true,
            message:'OrderStatus Updated'
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Some Error Occurred'
        })
        
    }
}

module.exports={getAllOrdersOfAllUsers,getOrderDetailsForAdmin,updateOrderStatus}