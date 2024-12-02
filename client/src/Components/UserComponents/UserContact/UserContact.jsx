import React, { useEffect, useState } from 'react'
import '../UserContact/UserContact.css'
import { addNewMessage, fetchAllMessages } from '../../../redux/contact-slice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function UserContact() {

    const dispatch=useDispatch()

    const {user}=useSelector(state=>state.auth)
    const {messageList}=useSelector(state=>state.contact)
    const [contactValues, setContactValues] = useState({
        userId:user?.id,
        name:'',
        email:'',
        message:''
      })
      console.log(contactValues);
      
      const handleInputs=(e)=>{
        setContactValues({
          ...contactValues,
          [e.target.name]:e.target.value
        })
      }
      const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      };


      const handleSend=(e)=> {
        // e.preventDefault()
        dispatch(addNewMessage(contactValues)).then(data=>{
          console.log(data,"messages");
          if(data?.payload?.success){
              dispatch(fetchAllMessages())
              setContactValues('')
              toast.success('Message Sent Successfully',toastOptions)
          }
          
      })
      }

  return (
    <div className='UserContact'>
        <h2>Contact Us</h2>
        <h4>Let's Build the Home of Your Dreams, Together!</h4>
        <p> We’re here to make your home a haven of style and comfort. Whether you have a question, need assistance, or simply want to share your thoughts, we’d love to hear from you! Our dedicated team is ready to help with anything from product inquiries to delivery updates. Let’s connect and create a space that truly feels like home.</p>
        <div className="contact-content">
            <h3>Keep In Touch!</h3>
            <form>
            <div className="input-box">
              <label htmlFor="">Name</label>
                  <input 
                    type="text"
                    placeholder='Your name'
                    name='name'
                    value={contactValues.name}
                    onChange={handleInputs} 
                    />
                </div>
                <div className="input-box">
                <label htmlFor="">Email</label>
                  <input 
                    type="text"
                    placeholder='Your email'
                    name='email'
                    value={contactValues.email}
                    onChange={handleInputs} 
                    />
                </div>
                <div className="input-box">
                  <label htmlFor="">Message</label>
                  <input 
                    type="text"
                    placeholder='Your email'
                    name='message'
                    value={contactValues.message}
                    onChange={handleInputs} 
                    />
                </div>
                <button onClick={()=>handleSend()}>Send Message</button>
            </form>
        </div>
        <div className="contact-through">
          <div className="card1">
            <h3>ADDRESS</h3>
            <p>123 Street ,ABC city</p>
          </div>
          <div className="card1">
            <h3>CONTACT</h3>
            <p>+91 12345667</p>
          </div>
          <div className="card1">
            <h3>MAIL</h3>
            <p>elegant123@gmail.com</p>
          </div>
        </div>
    </div>
  )
}

export default UserContact