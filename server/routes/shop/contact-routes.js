const express=require('express')

const {
    addMessage,
    fetchAllMessage
}=require('../../controllers/shop/contact-controllers');

const router=express.Router()

router.post('/add',addMessage)
router.get('/get',fetchAllMessage)


module.exports=router