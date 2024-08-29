// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "../../../assets/styles/Slider.scss";

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const SliderSwiper = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide><Link className='w-full select-none'><img src="src/assets/images/slider_img_2.jpg" alt="" /></Link></SwiperSlide>
        <SwiperSlide><Link className='w-full select-none'><img src="src/assets/images/slider_img_1.jpg" alt="" /></Link></SwiperSlide>
        <SwiperSlide><Link className='w-full select-none'><img src="src/assets/images/slider_img_3.jpg" alt="" /></Link></SwiperSlide>
        <SwiperSlide><Link className='w-full select-none'><img src="src/assets/images/slider_img_4.jpg" alt="" /></Link></SwiperSlide>
        <SwiperSlide><Link className='w-full select-none'><img src="src/assets/images/slider_img_5.jpg" alt="" /></Link></SwiperSlide>
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default SliderSwiper;
