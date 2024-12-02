import React from 'react'
import '../StarRating/StarRating.css'
import { StarIcon } from "lucide-react";

function StarRating({rating,handleRatingChange}) {
  return (
    [1,2,3,4,5].map(star=><button 
    className='star-button'
    style={{
      color: star <= rating ? 'yellow' : 'black', // Change color conditionally
    }}
    onClick={handleRatingChange?()=>handleRatingChange(star):null}>
        <StarIcon style={{
      fill: star <= rating ? 'yellow' : 'black', // Change color conditionally
    }}/>
    </button>)
  )
}

export default StarRating