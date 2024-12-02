const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../../models/user.model')



const getAllUser=async(req,res)=>{
    try {
        const Users=await User.find({});
        res.status(200).json({
            success:true,
            data:Users,
            message:'All users are fetched'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Some Error Occured'
        })
    }
}

//Register

const registerUser = async (req,res)=>{
    const {name,email,password}=req.body;

    try {
        const checkUser=await User.findOne({email});
        if(checkUser) return res.json({success:false,message:'User Alreadt Exist with the same email'})

        const hashPassword= await bcrypt.hash(password,12)
        const newUser=new User({
            name,
            email,
            password:hashPassword
        })

        await newUser.save();
        res.status(200).json({
            success:true,
            message:'Registration Succesfull'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success:false,
            message:'Some Error Occured'
        })
    }
}


//Login
const loginUser= async(req,res)=>{

    const {email,password}=req.body;
    try {
        const checkUser= await User.findOne({email});
        if(!checkUser) return res.json({
            success:false,
            message:'User Does not exist.Please SignUp'
        })

        const checkPasswordMatch=await bcrypt.compare(password,checkUser.password);
        if(!checkPasswordMatch) return res.json({
            success:false,
            message:'Invalid Password!Please Try Again.'
        })

        const token=jwt.sign({
            id:checkUser._id , role:checkUser.role ,email:checkUser.email,name:checkUser.name
        },'CLIENT_SECRET_KEY',{expiresIn:'60m'});

        res.cookie('token',token,{httpOnly:true, secure:false}).json({
            success:true,
            message:'LoggedIn Succesfully',
            user:{
                email:checkUser.email,
                role:checkUser.role,
                id:checkUser._id,
                name:checkUser.name
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

//LogOut
const logoutUser=(req,res)=>{
    res.clearCookie('token').json({
        success:true,
        message:'LoggedOut Succesfully!'
    })
}

//auth-Middleware

const authMiddleware=async(req,res,next)=>{
    const token=req.cookies.token;
    if(!token) return res.status(401).json({
        success:false,
        message:'Unauthorized User'
    })

    try {
        const decoded=jwt.verify(token,'CLIENT_SECRET_KEY');
        req.user=decoded;
        next()
    } catch (err) {
        res.status(401).json({
            success:false,
            message:'Unauthorized User'
        })
    }
}



module.exports={
    registerUser,
    loginUser,
    logoutUser,
    authMiddleware,
    getAllUser
}