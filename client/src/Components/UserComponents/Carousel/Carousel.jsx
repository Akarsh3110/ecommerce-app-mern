import React, { useEffect, useState } from 'react'
import './Carousel.css'
import Carousal1 from '../../../assets/Carousel/HomeCarousel/HomeCarousel Img1.png'
import Carousal2 from '../../../assets/Carousel/HomeCarousel/HomeCarousel Img2.jpg'
import Carousal3 from '../../../assets/Carousel/HomeCarousel/HomeCarousel Img3.jpg'
import Arrowleft from '../../../assets/SimpleIcons/arrow-left-Carousel.png'
import ArrowRight from '../../../assets/SimpleIcons/arrow-right-Carousel.png'

function Carousel() {
    const sliderImages=[Carousal1,Carousal2,Carousal3]

    const [slide, setSlide] = useState(0)
    const [autoplay, setAutoplay] = useState(true)
    let timeout=null

    useEffect(() => {
        if (autoplay) {
            timeout = setTimeout(() => {
                nextSlide();
            }, 3000);
        }
        return () => clearTimeout(timeout);
    }, [slide, autoplay]);

    const nextSlide=()=>{
        setSlide(slide===sliderImages.length-1? 0 : slide+1)
    }
    const prevSlide=()=>{
        setSlide(slide===0? sliderImages.length-1 : slide-1)
    }

  return (
    <div className='Carousel'>
        <button className='arrow arrow-left' onClick={prevSlide}>
            <img src={Arrowleft} alt="arrow-left" />
        </button>
        {
            sliderImages.map((item,index) => {
                return <img src={item} key={index} className={slide===index ? 'slide': 'slide slide-hidden'}/>
            })
        }
        <button className='arrow arrow-right' onClick={nextSlide}>
            <img src={ArrowRight} alt="arrow-right" />
        </button>
        <div className="indicators">
            {
                sliderImages.map((_,index)=>{
                    return <button key={index} onClick={()=>setSlide(index)} className={slide===index? 'indicator':'indicator indicator-inactive'}></button>
                })
            }
        </div>
    </div>
  )
}

export default Carousel