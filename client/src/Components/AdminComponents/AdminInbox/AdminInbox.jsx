import React, { useEffect } from 'react'
import '../AdminInbox/AdminInbox.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllMessages } from '../../../redux/contact-slice';
function AdminInbox() {
    const {messageList}=useSelector(state=>state.contact);
    const dispatch=useDispatch()

    useEffect(() => {
        dispatch(fetchAllMessages())
    }, [dispatch])
    console.log(messageList)
  return (
    <div className='AdminInbox'>
        <div className="adminInbox-content">
            <h2>Inbox</h2>
            <div className="inbox-messages">
                {
                    messageList && messageList.length>0?
                    messageList.map((item,idx) => (
                        <div key={idx} className="message-box">
                            <h3>{item.name}</h3>
                            <h4>{item.email}</h4>
                            <p>{item.message}</p>
                        </div>
                    ))
                    
                    :<h2>No Messages Found</h2>
                }
                
            </div>
        </div>
    </div>
  )
}

export default AdminInbox