require('dotenv').config();

const express=require('express')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser');
const cors=require('cors')
const  authRouter=require('./routes/auth-routes.js');
const adminProductsRouter=require('./routes/admin/products-routes.js')
const shopProductRouter=require('./routes/shop/products-routes.js')
const shopCartRouter=require('./routes/shop/cart-routes.js')
const shopAddressRouter=require('./routes/shop/address-routes.js')
const shopOrderRouter=require('./routes/shop/order-routes.js')
const adminOrderRouter=require('./routes/admin/order-routes.js')
const shopSearchRouter=require('./routes/shop/search-routes.js')
const shopReviewRouter=require('./routes/shop/review-routes.js')
const shopContactRouter=require('./routes/shop/contact-routes.js')


const app=express()
const PORT=process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_BASE_URL,
        // 'http://localhost:3000',
        methods:['GET','POST','PUT','DELETE'],
        allowedHeaders:[
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials:true
    })
)
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',authRouter)
app.use('/api/admin/products', adminProductsRouter)
app.use('/api/admin/orders', adminOrderRouter)

app.use('/api/shop/products', shopProductRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAddressRouter)
app.use('/api/shop/order', shopOrderRouter)
app.use('/api/shop/search', shopSearchRouter)
app.use('/api/shop/review', shopReviewRouter)
app.use('/api/shop/contact', shopContactRouter)


app.listen(PORT,()=>(console.log('Server is Running on Port:'+PORT)))

mongoose.connect(process.env.MONGO_URL
// 'mongodb+srv://31akarshb:akarsh31@clusterproject.zvl2y.mongodb.net/'
)
    .then(()=>console.log('MongoDB Connected'))
    .catch((err)=>console.log(err))
