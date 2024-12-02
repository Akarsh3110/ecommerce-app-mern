const Address=require('../../models/address.model')

const addAddress=async(req,res)=>{
    try {
        const {
            userId,
            name,
            email,
            address,
            city,
            state,
            country,
            pincode,
            phone
        }=req.body;
        if(!userId ||!name ||!email || !address || !city || !state||!country || !pincode || !phone){
            return res.status(400).json({
                success:false,
                message:'Invalid data provided'
            })
        }

        const newlyCreatedAddress=new Address({
            userId,name,email,address,city,state,country,pincode,phone
        })
        await newlyCreatedAddress.save();
        res.status(200).json({
            success:true,
            data:newlyCreatedAddress,
            message:'Address is created'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Some Error Occurred'
        })
    }
}

const fetchAllAddress=async(req,res)=>{
    try {
        const {userId}=req.params;
        if(!userId){
            return res.status(400).json({
                success:false,
                message:'UserId is required'
            })
        }

        const addressList= await Address.find({userId});
        res.status(200).json({
            success:true,
            data:addressList,
            message:'Address Fetched'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Some Error Occurred'
        })
    }
}

const editAddress=async(req,res)=>{
    try {
        const {userId ,addressId}=req.params;
        const formData=req.body
        if(!userId || !addressId){
            return res.status(400).json({
                success:false,
                message:'UserId and AddressId  is required'
            })
        }

        const address=await Address.findOneAndUpdate({
            _id:addressId,
            userId
        },formData,{new:true})

        if(!address){
            res.status(404).json({
                success:false,
                message:'Address Not Found'
            })
        }

        res.status(200).json({
            success:true,
            data:address
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Some Error Occurred'
        })
    }
}

const deleteAddress=async(req,res)=>{
    try {
        const {userId ,addressId}=req.params;
        if(!userId || !addressId){
            return res.status(400).json({
                success:false,
                message:'UserId and AddressId  is required'
            })
        }

        const address=await Address.findOneAndDelete({
            _id:addressId,
            userId
        })

        if(!address){
            res.status(404).json({
                success:false,
                message:'Address Not Found'
            })
        }

        res.status(200).json({
            success:true,
            message:'Address Deleted Successfully'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Some Error Occurred'
        })
    }
}

module.exports={
    addAddress,
    fetchAllAddress,
    editAddress,
    deleteAddress
}