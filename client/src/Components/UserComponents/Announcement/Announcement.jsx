import React from 'react'
import './Announcement.css'
import TicketIcon from '../../../assets/SimpleIcons/Ticket-icon.png'
import ArrowIcon from '../../../assets/SimpleIcons/arrow-right.png'
import CloseIcon from '../../../assets/SimpleIcons/close.png'

function Announcement() {
  return (
    <div className='Announce'>
        <div className="announce-content">
            <div className="ticket">
                <img src={TicketIcon} alt="Ticket" />
                <p>30% off storewide — Limited time! </p>
            </div>
            <button>
                Shop Now
                <img src={ArrowIcon} alt="RightArrow" />
            </button>
        </div>
        <img className='close' src={CloseIcon} alt="close" />
    </div>
  )
}

export default Announcement