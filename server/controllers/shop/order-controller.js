const paypal=require('../../helpers/paypal');
const Order=require('../../models/order.model');
const Cart=require('../../models/cart.model');
const Product=require('../../models/product.model')

const calculateTotalAmount = (cartItems) => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

const createOrder=async(req,res)=>{
    try {
        const {
            userId,
            cartId,
            cartItems,
            address,
            orderStatus,
            paymentMethod,
            paymentStatus,
            // totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId
        }=req.body;

        console.log('Order Data Received:', req.body);
        const totalAmount = calculateTotalAmount(cartItems);


        const create_payment_json={
            intent:'sale',
            payer:{
                payment_method:'paypal'
            },
            redirect_urls:{
                // return_url:'http://localhost:3000/user/paypal-return',
                return_url: `${process.env.CLIENT_BASE_URL}/user/checkout?return_url=orderComplete`,
                cancel_url:`${process.env.CLIENT_BASE_URL}/user/paypal-cancel`
            },
            transactions:[
                {
                    item_list:{
                        items:cartItems.map((item)=>({
                            name:item.title,
                            sku:item.productId,
                            // price:item.price.toFixed(2),
                            // price: parseFloat(item.price).toFixed(2),
                            price: (item.price).toFixed(2), 
                            currency:'USD',
                            quantity:item.quantity,
                        }))
                    },
                    amount:{
                        currency:'USD',
                        total:totalAmount.toFixed(2),
                    },
                    description:'description'
                }
            ]
        }

        paypal.payment.create(create_payment_json,async(error,paymentInfo)=>{
            if(error){
                // console.log(error);
                console.log('PayPal Error Details:', JSON.stringify(error.response?.details, null, 2));               
                return res.status(500).json({
                    success:false,
                    message:'Error While creatig paypal payment'
                })
            }else{
                const newlyCreatedOrder=new Order({
                    userId,
                    cartId,
                    cartItems,
                    address,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId
                })
                await newlyCreatedOrder.save();

                const approvalURL=paymentInfo.links.find(link=>link.rel==='approval_url').href;

                res.status(200).json({
                    success:true,
                    approvalURL,
                    orderId:newlyCreatedOrder._id
                })
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Some Error Occured'
        })
        
    }
}

const capturePayment=async(req,res)=>{
    try {
        const {paymentId,payerId,orderId}=req.body;

        let order=await Order.findById(orderId);
        if(!order){
            return res.status(404).json({
                success:false,
                message:'Order not found'
            })
        }
        order.paymentStatus='paid';
        order.orderStatus='confirmed';
        order.paymentId=paymentId;
        order.payerId=payerId;

        for(let item of order.cartItems){
            let product=await Product.findById(item.productId);

            if(!product){
                return res.status(404).json({
                    success:false,
                    message: `Not Enough Stock for the Product ${product.title} `,
                })
            }

            product.stock-=item.quantity;
            await product.save();
        }

        const getCartId=order.cartId;
        await Cart.findByIdAndDelete(getCartId)

        await order.save();

        res.status(200).json({
            success:true,
            data:order,
            message:'Order Confirmed'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Some Error Occured'
        })
        
    }
}

const getAllOrderByUser=async(req,res)=>{
    try {
        const {userId}=req.params;
        
        const orders=await Order.find({userId});

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

const getOrderDetails=async(req,res)=>{
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

module.exports={createOrder,capturePayment,getAllOrderByUser,getOrderDetails}