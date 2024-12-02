const Contact=require('../../models/contact.model')

const addMessage=async(req,res)=>{
    // try {
    //     const {
    //         userId,
    //         name,
    //         email,
    //         message,        
    //     }=req.body;
    //     console.log(req.body);
    //     // const userId = req.user.id;
    //     if (!name) console.log('Missing name');
    //     if (!email) console.log('Missing email');
    //     if (!message) console.log('Missing message');

    //     if(!name || !email || !message){
    //         return res.status(400).json({
    //             success:false,
    //             message:'Invalid data provided'
    //         })
    //     }

    //     const newlyCreatedMessage=new Contact({
    //         name,email,message,userId
    //     })
    //     await newlyCreatedMessage.save();
    //     res.status(200).json({
    //         success:true,
    //         data:newlyCreatedMessage,
    //         message:'Message is created'
    //     })
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json({
    //         success:false,
    //         message:'Some Error Occurred'
    //     })
    // }

    try {
        const { userId, name, email, message } = req.body;
    
        if (!name || !email || !message) {
          return res.status(400).json({
            success: false,
            message: "All fields are required.",
          });
        }
    
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(email)) {
        //   return res.status(400).json({
        //     success: false,
        //     message: "Invalid email format.",
        //   });
        // }
    
        const newlyCreatedMessage = new Contact({
          userId,
          name,
          email,
          message,
        });
    
        await newlyCreatedMessage.save();
    
        res.status(201).json({
          success: true,
          data: newlyCreatedMessage,
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          message: err.message || "Unable to add contact message.",
        });
      }
    
}

const fetchAllMessage=async(req,res)=>{
    try {
        // const {userId}=req.params;
        // const userId = req.user.id;
        // if(!userId){
        //     return res.status(400).json({
        //         success:false,
        //         message:'UserId is required'
        //     })
        // }

        const MessageList= await Contact.find({});
        res.status(200).json({
            success:true,
            data:MessageList,
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

module.exports={addMessage,fetchAllMessage}
